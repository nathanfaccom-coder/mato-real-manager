# Progression write migration — 2026-10-30

Production is still 2.9.11. Automatic matches must remain disabled. This is an
implementation inventory, not a claim that deployed rules protect these writes.
AST scan covered 171 source/server files and found 1,452 candidate SDK operations;
those candidates include reads and non-Firestore methods, not 1,452 vulnerabilities.

## Priority paths confirmed by source inspection

| Priority | Source / entry point | Directly affected data | Required migration |
| --- | --- | --- | --- |
| 1 | `src/actions/competition.js`: `saveMatchStats` | Player stats, pendingXP, rating, energy; match score and team table | Automatic mode now rejects this action and routes ADM to the server correction panel. Default production still uses legacy path. Database enforcement pending. |
| 1 | `src/actions/players.js`: `updateTeamStats` | Legacy team classification | Automatic mode rejects manual table writes. League/state UI now uses authoritative competitionStandings in automatic mode. Custom knockout brackets remain pending. |
| 1 | `src/actions/administration.js`: `adminAction('WEEK')` | Current/pending XP, energy, salary, tax and sponsorship balances | Server batch/job with idempotency, authoritative reads and match-lock coordination. Must not reset pendingXP from stale browser state. |
| 1 | `src/actions/competition.js`: `handleSeasonTurnAdvanced` | Attributes/overall, career snapshot, season stats, contracts and prizes | Resumable server season-close job; protect active matches and define correction cutoff. Preserve all finance/contract effects. |
| 2 | `src/actions/players.js`: `handleCoachTrain`, `handlePlayerSoloTrain` | XP, attributes, overall, energy, injuries, consumed equipment | Solo training migrated: verified player identity, match locks, server randomness, costs/XP/attributes, equipped-snapshot consumption and receipt. Equip now verifies owned sales and atomically moves the canonical snapshot; coach training/study now uses verified COACH identity, same-club selection, locks, canonical perks/CT, atomic effects and replay receipts. Purchase/source-field provenance still pending. |
| 2 | `src/actions/players.js`: `handleAssistantRegen` | Player energy/XP and assistant energy/XP | Implemented gated staff-recovery transaction, current employment/ownership and locks, authoritative perks/cost/XP and retry ledger; unit/emulator/mobile tests pass. Source-data rules still pending. |
| 2 | `src/actions/players.js`: `handleUseItem`, `handleCoachUseItem` | Energy, toxicity, equipment and inventory | Equip migrated to authenticated ownership/category/power checks, match locks and atomic inventory/profile/receipt transaction. Player consumables now validate owned inventory and atomically apply server-derived energy/toxicity/risk with receipt and locks. Staff consumables now use verified staff roles and matching users profiles with separate receipts, retaining their zero-energy sickness rule. Sales provenance still requires purchase and source-rule migration. |
| 2 | `src/national/service.js`: result settlement | Player nationalStats, energy, trophies | Integrate national snapshots/fixtures into the same automatic ledger; avoid separate flat fatigue charge. |
| 3 | `src/actions/players.js`: `savePlayer` and other administrative editors | Broad player record | Narrow field-specific ADM operations, audited, with privileged progression fields denied to profile edits. |
| 3 | `src/actions/competition.js`: calendar CRUD/generation | Fixture identity, status, scoreboard, competition | Server calendar lifecycle; private approval alone does not protect public source fixtures. |

## Release boundary

- The new action guard is UX/rollout defense only. A modified client can bypass it.
- Existing public legacy passwords/reads and broad writes must be migrated before
  restrictive production rules can be deployed without breaking existing accounts.
- Server match ledger correctness alone cannot protect energy/XP while another
  public path can overwrite those same player fields.
- Do not solve this by deleting training, items, weekly payments or season finance.
  Port and verify their behavior before denying their legacy mutations.
- AssistantDashboard.handleStudy now uses an authenticated receipt-backed study
  transaction in secure mode (unit/emulator/mobile tested). Assistant perk offers
  and choices now use persisted server options and atomic point consumption.
  Coach/doctor perk offers and choices also use role-verified server catalogs.
  Medical study now uses the same transactional service with verified DOCTOR role
  and server-derived nutrition bonus. Medical evaluation now checks current club,
  patient injury and match locks in a receipt-backed transaction. Inventory,
  employment and other inventory/economy paths still mutate source fields.
- Next implementation priority: product/source inventory protection and employment,
  weekly/season jobs and national match integration.

## Surgery migration

Surgery review/execution now uses verified identity, current club/patient/locks,
source-bound quote and a receipt-backed transaction for funds, fee, injury, staff
progression, logs and failure news. Secure UI reviews and confirms server values;
unknown network errors retain the request, explicit stale-review 409 requires a
new review. Default build retains old writes. This is not protection against
legacy public source-field mutations; rules/account migration remains mandatory.

## Purchase migration

Secure purchases/gifts now derive buyer identity and item effects on the server.
Exact-cent payment, seller credit, inventory/stock, gift fame/news/daily count and
receipt are atomic. The expected price is checked, and uncertain retries reuse the
same request. Typed new inventory prevents cross-role ID collisions in equip/use.
Product management, old inventory and public source-field rules still require
migration; a verified purchase does not make forgeable catalog data trustworthy.

## Product manufacturing follow-up

CompanyDashboard currently debits production cost directly before calling
onSaveProd without awaiting it; saveProduct then writes absolute stock and emits
news separately. Port the entire debit + stock increment + product write + news
as one authenticated COMPANY transaction. Derive cost using getProdCost on the
server and enforce the existing 0–100 power range and price floor. Review changes
to category/power on existing stock so paid production cannot be silently upgraded.
Purchase bindings use TEAM (backend), not USER (UI alias from resolveGameAccount).
The integration test must create a TEAM binding through account-bind before buying.

## Manufacturing implementation

Secure CompanyDashboard now sends quantity to a verified COMPANY endpoint instead
of debiting first and saving absolute stock. Server-derived cost, balance, current
stock increment, product and news commit with a retry receipt. Effect changes on
existing stock are rejected until sold out; a separate product can be created.
Default UI keeps legacy mechanics. Product deletion, legacy action entry points,
profile/catalog source rules and account/inventory migration remain pending.

## Product deletion implementation

Company and shopping ADM delete handlers now use separate authenticated routes,
with ownership or companies permission checked server-side. ADM requires recent
authentication. Deletion and audit receipt are atomic; purchased inventory and
balances remain intact. Replays are safe and stale purchase/restock cannot recreate
the product. Remaining catalog protection requires restricting legacy direct writes
and completing source/account migration; client routing alone is not DB protection.

## Staff contract migration — dismissal

handleFireCoach now uses server review/execute in secure mode. Verified TEAM
ownership and current same-club staff determine the four-salary fine. Source-bound
quote, match lock, exact-cent debit/payment, release/base salary and audit receipt
are enforced transactionally. Unknown response retains request, explicit 409
renews review and confirmation. Hiring, buyout, raises and negotiated departures
remain direct-write paths to migrate before locking employment/finance fields.

## Staff contract migration — self buyout

Secure BUYOUT now derives the authenticated staff subject and current clause/club
on the server, reviews terms before confirmation and atomically pays the club and
releases the contract. Exact-cent fallback is ten salaries, matching existing rule.
Receipt replay works after the profile becomes FREE; stale quotes require another
review. No client staff ID, clause, team or balance is accepted. Hiring, raise and
negotiated-departure paths still require migration before source writes are denied.

## Staff contract proposals

RAISE and RESIGN_REQ submission now uses authenticated staff-contract-request in
secure mode. Server derives the current staff/club and validates the requested
salary; proposal creation and retry receipt are atomic. Submission never changes
salary or contract. The client retains uncertain requests and avoids direct writes.
Director decisions and hiring remain pending; source offers are still publicly
writable under legacy rules, so serverCreated cannot be trusted as authorization.
