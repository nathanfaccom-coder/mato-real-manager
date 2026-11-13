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
| 2 | `src/actions/players.js`: `handleCoachTrain`, `handlePlayerSoloTrain` | XP, attributes, overall, energy, injuries, consumed equipment | Solo training migrated: verified player identity, match locks, server randomness, costs/XP/attributes, equipped-snapshot consumption and receipt. Equip now verifies owned sales and atomically moves the canonical snapshot; coach training and purchase/source-field provenance still pending. |
| 2 | `src/actions/players.js`: `handleAssistantRegen` | Player energy/XP and assistant energy/XP | Implemented gated staff-recovery transaction, current employment/ownership and locks, authoritative perks/cost/XP and retry ledger; unit/emulator/mobile tests pass. Source-data rules still pending. |
| 2 | `src/actions/players.js`: `handleUseItem`, `handleCoachUseItem` | Energy, toxicity, equipment and inventory | Equip migrated to authenticated ownership/category/power checks, match locks and atomic inventory/profile/receipt transaction. Consumables and coach items remain pending; sales provenance still requires purchase and source-rule migration. |
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
- Next implementation priority: coach training, consumable inventory, purchases and employment,
  weekly/season jobs and national match integration.

## Surgery migration

Surgery review/execution now uses verified identity, current club/patient/locks,
source-bound quote and a receipt-backed transaction for funds, fee, injury, staff
progression, logs and failure news. Secure UI reviews and confirms server values;
unknown network errors retain the request, explicit stale-review 409 requires a
new review. Default build retains old writes. This is not protection against
legacy public source-field mutations; rules/account migration remains mandatory.
