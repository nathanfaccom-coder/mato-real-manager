# Match server (development only)

Production is still 2.9.11. This directory is not included in the browser bundle.
The Supabase synthetic probe passed, but live match automation is NOT enabled.

## Staff dismissal (gated; not deployed)

`POST .../staff-dismiss-review` accepts `{staffId}` and derives the existing
four-week salary fine from current same-club staff data. Verified TEAM binding,
entity ownership, active club/staff and team match lock are checked. It returns
name, fine, affordability and a quote bound to the current contract/salary/balances.
`POST .../staff-dismiss` accepts `{requestId,staffId,quote}` only. Changed reviewed
state yields 409 before mutation. All COACH/DOCTOR/SCOUT/ASSISTANT roles are covered.

Exact-cent team debit, staff payment, FREE team assignment, zero contract, base
salary reset (2500) and private audit receipt commit atomically. Same request returns
the original outcome even after release, preventing double payment. Secure client
confirms server terms, keeps uncertain requests and reviews again after explicit
409. Default legacy behavior remains. Buyout, raises, negotiated exits, hiring,
contract source protection and wider account/rules migration are still pending.

## Product deletion (gated; not deployed)

`POST .../product-delete` accepts `{requestId,productId}` and requires the verified
active COMPANY owner of the product. `POST .../admin-product-delete` accepts the
same shape but requires recent authentication and the owner ADM or an active ADM
with companies permission. Client-supplied role/company fields are rejected.

Deletion and private audit receipt commit atomically. The receipt retains actor,
product company/name/stock, timestamp and result. Repeats return the same outcome;
a different product cannot reuse the request. Revocation is checked on replay.
Inventory already purchased and company balance remain unchanged; no production
refund is created. Transactions conflict with purchase/restock of the same product,
preventing stale writes from resurrecting it. Both client deletion entry points
use the server in secure mode and retain uncertain requests. Legacy mode unchanged.

## Manufacturing (gated; not deployed)

`POST .../manufacture` accepts requestId, nullable productId, name/desc/img,
cat/power/price and quantity. Verified COMPANY binding/ownership and active company
are required. Server getProdCost determines the debit; category, power 0–100,
quantity 1–200, exact-cent price floor, current balance and product ownership are
validated. Existing stock is incremented from current state, never browser totals.
Changing category/power requires zero existing stock (or a separate new product),
so cheap old units cannot be upgraded without manufacturing cost.

Debit, product/stock, launch or promotion news and private receipt commit atomically.
Identical retries return the same product and never charge again. Secure company
form keeps its values/request after uncertain responses and closes on confirmation;
it bypasses the old separate debit and onSaveProd writes. Images up to 500,000
characters fit the bounded 600,000-byte manufacture request; other routes keep
8,192-byte limits. Source rules remain migration blockers.

## Purchases and gifts (gated; not deployed)

`POST .../purchase` accepts `{requestId,productId,sellerId,giftPlayerId,expectedPrice}`
(giftPlayerId is null for an ordinary purchase). Verified TEAM/PLAYER/staff binding
resolves the buyer collection and ownership. TEAM is the server binding; USER
is only the trusted-session UI alias and is rejected by the purchase endpoint.
Current buyer, seller and recipient,
product seller, stock, exact-cent balances, agreed price and applicable match locks
are checked transactionally. A changed price requires the user to review it again.

Debit, seller credit, stock, canonical inventory item, gift fame/tracker/news and
private receipt under serverConfig/purchase_{uid}/operations commit together.
Duplicate requests return the original sale; changed purchase details cannot reuse
a receipt. Preserves seven gifts/day with server Brazil date and legacy date-string
compatibility, gift-only immediate fame, ordinary luxury use behavior and gift
news. Client repeats ambiguous requests instead of charging again. New inventory
records carry buyerType; equip/consume reject incompatible typed ownership.

This verifies purchase against stored product data. Product editing, source-field
rules and old inventory/account migration remain mandatory before activation.

## Coach training and study (gated; not deployed)

`POST .../coach-training` accepts `{requestId,type,playerIds}`. Training selects
1–5 unique same-club players and an existing focus; STUDY requires an empty list.
Verified COACH binding/entity ownership, active profile/club, current energy and
team/player locks are checked. Free coaches can study. Canonical perk IDs resolve
server catalog values, never mutable browser bonuses. CT and affinity bonuses,
equipment, synergy/youth multipliers, critical gains, attribute cap, 1% injury risk,
position learning and coach XP/level/perk/affinity progression are retained.

Coach/player changes, equipment snapshot consumption, ten-entry club log and
private serverConfig/coachTraining_{uid}/operations receipt are atomic. Random draws
are fixed across transaction retries. Same selection/focus/request replays results;
a reused request with another selection/focus fails. Injured/exhausted players are
skipped; the existing 20-energy session cost remains (study costs 30). Injury keeps
equipment, charges 15 player energy and earns no coach XP for that player. Training
never deletes sales by an embedded equipped ID. Secure UI keeps uncertain request
IDs. Production activation still requires purchase/source/account/rules migration.

## Staff consumables (gated; not deployed)

`POST .../staff-consume` accepts `{requestId,itemId}` only. The server selects
COACH/DOCTOR/SCOUT/ASSISTANT from the verified binding and matching active users
profile; client role/effects are rejected. It verifies entity ownership, current
club lock and inventory ownership. Categories energy/SAUDE/CONSUMIVEL preserve
existing staff UI support. Free staff retain access.

Uses the same atomic inventory/toxicity/receipt engine as player consumption, with
separate role-bound receipts under serverConfig/staffConsume_{uid}/operations.
Staff-specific rules remain: missing energy defaults to 100, full energy blocks
before risk effects, and both sickness and vomiting zero energy without creating
player injuries or changing mood. Secure action retries uncertain requests and
removes inventory only after confirmation. Source sales/profile rules and purchase
provenance remain deployment blockers.

## Player consumables (gated; not deployed)

`POST .../consume-item` accepts only `{requestId,itemId}`. Verified PLAYER identity,
entity owner, active profile/club, match locks, sale ownership and SAUDE/CONSUMIVEL
category are checked in a transaction. Stored inventory supplies the bonus. Energy
(cap 100), daily toxicity, sickness/vomiting, item deletion and private receipt
under `serverConfig/consume_{uid}/operations` commit together. Identical retries
return the original effect. Different items serialize the same daily counter.

Server time uses America/Sao_Paulo days, with legacy browser date-string support.
Existing third-use 40% intoxication and fourth+ 95% vomiting remain, including the
intoxication block and injury shape. Injury recovery is not redefined here. Secure
client keeps uncertain request IDs and waits for confirmation to remove inventory.
Purchases and source-field rules remain migration blockers.

## Equipment (gated; not deployed)

`POST .../equip-item` accepts only `{requestId,itemId}`. Verified active PLAYER
binding/ownership resolves the player; current inventory ownership, category
(CHUTEIRA/LUVAS), integer bonus and player/team match locks are checked in one
transaction. The stored sale supplies name/category/power/image; no item effects
come from the request. Sale deletion, equipped snapshot and private receipt under
`serverConfig/equip_{uid}/operations` commit together. Replays return the original
receipt even after training has consumed the snapshot; they never restore it.
Replacement preserves the existing no-refund behavior for the old equipment.

The secure UI retains uncertain request IDs and changes inventory only after an
API confirmation. Default mode is unchanged. This verifies ownership against
stored sales, not their provenance under legacy public rules. Purchases, product
fields, sales and equipped snapshots must be protected before activation.

## Individual training (gated; not deployed)

`POST .../solo-training` accepts `{requestId,type}` for one of ten existing focuses.
The current verified PLAYER binding/ownership resolves the subject. Active profile,
current energy/injury and team/player match locks are required; free players can
train. Server randomness preserves 2% injury risk, energy costs, 8–15 base XP,
equipment bonus and attribute evolution capped at 99. Receipt, player progression,
equipment consumption and bounded club log are atomic and retry-safe.

Equipped items were already removed from sales when equipped. This operation
consumes the current equipped snapshot, never a sales document named by its ID.
Equip now checks stored inventory ownership atomically. Purchase provenance and
source-field rules still need migration before activation. The secure action sends no player/reward payload and
retains uncertain request/type. Ordinary production mode retains legacy behavior.

## Surgery review and execution (gated; not deployed)

`POST .../surgery-review` accepts `{playerId}` and returns procedure terms and a
source-bound quote. `POST .../surgery-execute` accepts only
`{requestId, playerId, procedureId, quote}`. Both verify current active DOCTOR
binding/ownership/employment, club, injured patient and match locks. Review uses
shared surgery policy; raw staff/player finances and private metadata are omitted.
Changed quoted state or affordability returns 409 before writes. The UI then
requires another review and confirmation; uncertain network errors reuse the same
request. Private serverConfig/surgery_{uid}/operations receipts replay outcomes.

Execution atomically debits hospital fund before player balance, charges energy,
updates injury and doctor progression, pays fee only on success, resets donors on
success, records bounded team log and failure news unless cold-blood applies.
All existing success/failure/skill effects are retained. Concurrent requests cannot
repeat the same reviewed source state. Source-data rules and wider migration are
still blockers: do not activate this under legacy public-write permissions.

## Medical evaluation (gated; not deployed)

`POST .../medical-evaluate` accepts only `{requestId, playerId}`. It requires the
verified active DOCTOR binding/ownership, active employment and club, same-club
injured patient and no team/player match locks. The server derives 10 energy cost
(or 5 with FAST_DIAGNOSIS), +5 staff XP and the existing level-based healing chance.
Only injuries outside the moderate/severe/extreme catalogs can heal, matching the
legacy category rule. Success removes injury and resets recoveryLeft while
preserving other patient fields. Staff progression, healing and the private
serverConfig/evaluation_{uid}/operations receipt commit together. Retries cannot
reroll or charge twice; changing patient/club on the same receipt is rejected.
The secure medical dashboard uses the API and retains uncertain request IDs.
Surgery/supplies and source-field protection remain activation blockers.

## Medical research (gated; not deployed)

`POST .../doctor-study` accepts only `{requestId}` and requires a current active
DOCTOR binding, matching ownership and profile. It reuses study's transaction,
club-lock check and input validation with a separate doctorStudy_{uid} receipt
namespace. It derives 10–24 base XP, rounds the 20% SPORTS_NUTRITION bonus and
charges 20 energy once. Level/perk rules remain unchanged. Neither role nor bonus
amount may come from the client. Secure DoctorDashboard retries the same request
on uncertain failure and displays confirmed XP. Default mode is unchanged.
Medical evaluation, surgery, supplies and public source-field rules still require
migration before this or other progression endpoints may be activated.

## Coach and doctor skill selection (gated; not deployed)

`POST .../staff-perks` accepts `{}`; `POST .../staff-perk-choose` accepts only
`{revision, perkId}`. They use the same transactional offer/receipt implementation
as assistant skills, but require verified COACH or DOCTOR bindings and matching
ownership/profile roles. The server selects the canonical role catalog and denies
cross-role skills or client-provided effect multipliers. Offers and receipts live
under serverConfig/staffPerks_{role}_{uid}, separate from assistant history.
The secure coach and doctor dashboards render persisted options and safely retry
choices. Default mode remains unchanged; legacy database rules and other medical,
training, inventory and employment mutations still block production activation.

## Assistant perk offers and selection (gated; not deployed)

`POST .../assistant-perks` accepts an empty object and returns a persisted random
subset of up to three unlearned catalog skills, with a revision. It requires the
current verified active ASSISTANT binding, ownership and profile. Refreshing does
not reroll the offer. No pending points or no remaining skills returns no options.
`POST .../assistant-perk-choose` accepts only `{revision, perkId}` and atomically
validates the offer, appends the canonical skill, consumes one pending point and
records a receipt. Concurrent different selections cannot spend the same point;
same-choice retries return the receipt, including after the next offer is created.
Client-provided effects, stale/unoffered choices and invalid profiles are denied.

The secure assistant dashboard renders these offers and can retry a lost response.
Other staff operations and public source-field protection still need migration. The
new serverConfig documents use the existing recursive server-only candidate
boundary; production rules have not been changed or claimed secure.

## Assistant study (gated; not deployed)

`POST .../staff-study` accepts only `{requestId}`. The verified ASSISTANT must have
an active binding, matching ownership and active profile. Employed assistants
cannot study while their club has a match lock; unemployed assistants may study.
The server derives 10–24 XP and charges 20 energy, preserving the existing single
level-up and perk-every-third-level rules, including study beyond level 30.
Staff progression and the private serverConfig/study_{uid}/operations receipt
commit atomically; retries return the original award, concurrent recovery/study
cannot overspend. The secure dashboard retains uncertain request IDs and does
not write study rewards directly. Default login mode retains legacy behavior.
Other staff perk flows and protection of legacy source fields remain blockers.

## Assistant recovery (gated; not deployed)

`POST .../staff-recovery` accepts only `{requestId, playerIds}` (1–5 distinct IDs).
Verified current ASSISTANT binding/ownership/employment and active club are required.
The transaction rejects team/player match locks and players outside the club.
It derives perk effects and random XP/mood on the server; caps player energy at
100, preserves injured players, charges staff once and updates staff progression
and the club activity log atomically. All-injured sessions have no cost/staff XP.

The private serverConfig/recovery_{uid}/operations receipt retains the exact
result for retry; the same key cannot change club or participants. Random draws
are stable across transaction retries. The gated UI retains selection/request ID
on uncertain failures and uses no direct database mutation for recovery.
Perk selection, other training/items and protection of source fields
still need migration. Do not enable this endpoint under the legacy public rules.

`node tests/staff-recovery-ui.mjs` verifies the real action/dashboard with an
isolated API and database-access rejection at 390px. The full emulator suite
includes authenticated recovery and concurrent receipt/cost tests.

## Competition standings (gated; not deployed)

`POST .../competition-standings` accepts competitionId and seasonId from an
authenticated viewer. The transaction checks the activation gate and competition
season, reads at most 65 aggregate documents and rejects more than 64 teams rather
than truncating the standings. It exposes only club name/ID, points, matches,
wins/draws/losses, goals and shared rank. No legacy team.stats, credentials or audit
metadata are returned. Friendly matches never contribute to this collection.

Optional competition.teamIds supplies enrolled zero-match clubs; otherwise the UI
explicitly shows only clubs with registered results. Ties use existing points,
wins and goal difference; tied clubs share the rank (ID order is display-only).
An index candidate is included but has not been deployed. The gated league/state
tables resolve competition/season from linked calendar fixtures and offer manual
refresh. Missing links do not silently fall back to legacy totals. Completed
official broadcasts also expose standings and refresh after result correction.
Custom knockout/bracket UI and the protected calendar migration remain pending.

## Administrator result corrections (gated; not deployed)

`POST .../match-correction-review` requires recent ADM authentication and accepts
only matchId. It returns the current revision, sporting facts, participant names
and eligibility, without audit identity/reason or credentials. Closed-season
records can be reviewed but cannot be corrected.

The gated MatchCenter and completed Broadcast now open MatchCorrectionPanel for
competition administrators. It reauthenticates, clears the entered password,
loads server facts and submits a required reason with the reviewed revision.
Participant fields are grouped in expandable cards for mobile use. Failed or
conflicting requests discard the form; explicit reload is required before retry.
The client allowlist strips names, minutes, sides and XP from correction requests.

`POST .../match-correct` requires a recently authenticated competition ADM and the
existing matchAutomation gate. Input: matchId, expectedRevision (at least 1),
reason, score [home,away], ownGoals [creditedHome,creditedAway], and players keyed
by the exact recorded participant IDs. Each player supplies goals, assists,
tackles, saves, yellows, reds and rating (0–10, one decimal). Extra fields fail.
Player goals plus own goals must equal the scoreboard; assists cannot exceed
player goals. Two yellows require a red. The server derives XP; it never accepts
client XP, fatigue, minutes, sides, classification or season.

Only FINISHED server runs in the current season can be corrected. Authorization,
revision, ledger, player/career aggregates, official table, run score and audit
commit in one transaction. Concurrent requests at the same revision apply once;
a stale retry must reload. Participation and fatigue stay unchanged. This route
does not yet support creating a manual match, changing participation/minutes or
correcting a closed season. Production deployment remains pending.

## Install and verify

Requires Node >=22 and Java >=21 for current Firebase emulators:

```sh
npm ci --prefix server
npm test
cd server
npx -y firebase-tools@latest emulators:exec --only auth,firestore --project demo-mato-real --config firebase.emulator.json 'node tests/firebase-integration.mjs'
```

The emulator test refuses non-local hosts and uses a demo project. Its ephemeral
RSA credential has no permissions outside the emulator. The OAuth owner token is
an emulator-only convention; it is never used by firebase-runtime.js. The
`tests/deny-all.rules` fixture is NOT a production ruleset. The test checks actual
Auth tokens, disabled users, REST transactions, simultaneous settlement, exact
XP/energy, retry backoff, and lock cleanup. It does not validate the legacy
application's security rules. It also checks owner-authorized binding of a verified
Auth identity, server-resolved session and immediate binding revocation; it does
not perform a production account migration.

## Deployment entry point

`supabase-entry.js` uses the pinned official Firebase Admin SDK in `deno.json`.
The production runtime accepts only project `gerenciador-de-times-matoreal` and
rejects emulator environment variables. Configure credentials through a secure
server-secret manager; never put them in git, browser code, logs or chat.

Required server environment variables:

- `MATO_REAL_FIREBASE_SERVICE_ACCOUNT`: service-account JSON for that project.
- `MATO_REAL_WORKER_SECRET`: independently generated random secret, at least 32
  bytes, shared only with the scheduler; never expose it to clients.
- `MATO_REAL_MATCHES_ENABLED`: remains unset/false until all activation criteria
  below pass.

The Edge platform's `verify_jwt` must be false for this specific entrypoint:
`start` and `command` verify Firebase tokens (including revocation) in the handler,
while `finalize` verifies the separate scheduler secret. This is custom
verification, not a public unauthenticated write API.

- `POST .../fixture-review`: recently authenticated competitions ADM, `{fixtureId}`;
  authoritative fixture IDs/names, current approval revision, eligibility and
  blockers. Does not expose passwords, audit metadata or arbitrary profile fields.
- `POST .../fixture-approve`: recently authenticated competitions ADM;
  `{fixtureId,homeId,awayId,competitionId,seasonId,approved,expectedRevision,reason}`.
  Explicit reviewed identities must match a current pending fixture. Stores private
  approval plus revision audit under `serverConfig/fixture_{id}` atomically.
  Retries are idempotent; changed identities invalidate approval; no changes after
  a run starts. Public `serverVerified` alone never authorizes official XP.
- `POST .../match-view`: Firebase identity, `{matchId}`; whitelisted replay,
  sporting metadata and confirmed result. No authors, worker errors or audit data.
- `POST .../match-list`: Firebase identity, `{}`; newest ten sporting summaries,
  no client limit/query, no rosters/seed. Both reads require the automation gate.
- `POST .../start`: Firebase bearer token; server derives fixture classification.
- `POST .../command`: Firebase bearer token; server derives controller and clock.
- `POST .../session`: Firebase bearer token and empty JSON object; returns only
  the linked game type, entity ID and binding revision. Never accepts a requested
  UID or role and never returns legacy passwords.
- `POST .../account-bind`: main owner bearer token with authentication within
  five minutes; body `{uid,type,entityId}`. Target Auth identity must have verified
  email, be enabled and not be administrative. Requires active existing entity.
- `POST .../account-state`: same owner/recent-auth requirement; body
  `{uid,active,expectedRevision,reason}`. Disabling reserves ownership; retries
  cannot silently reactivate or transfer a binding.
  Reactivation rechecks enabled/verified Auth identity, current active profile,
  ownership lock and exclusion of administrative identities on the server.
- `POST .../finalize`: `x-worker-key`; processes at most one due job per call.
- `POST .../player-apply`: verified/enabled Firebase identity; strict profile
  fields name/nationality/position/instagram/pixelAppearance/expectedRevision.
  Creates one private pending application per UID, never a public player.
- `POST .../player-application`: Firebase identity and empty JSON; own status only.
- `POST .../player-application-review`: recent main-owner authentication, `{uid}`;
  private application data for Federation review.
- `POST .../player-application-decide`: recent main-owner authentication;
  `{uid,approve,expectedRevision,reason}`. Atomic approval creates a player with
  server-derived attributes/economy plus identity binding/ownership/audits.
  Rejection permits a corrected resubmission at the current revision. Replayed
  submissions/decisions do not create new profiles or reroll attributes.

Player applications additionally require serverConfig/playerRegistration with
enabled true and schemaVersion 1, AND the accountMigration gate. Instagram stays
in playerApplications (private), not the public player document. Approval checks
the current Auth identity again. New players retain existing initial rules:
overall 45 for outfield / 60 goalkeeper, balance 0, salary 1500, value 40000,
FREE team, energy 100 and pendingXP 0. No client UID, role, stats or money accepted.

Secure-login builds offer NOVO JOGADOR on the login screen and player application
review below the owner's binding manager. Submission uses a separate nonpersistent
Auth session; it does not replace the current logged-in account. Other profile
types still need their secure registration migration. Existing-profile binding
continues to require explicit independent review; registration cannot claim one.
- `POST .../account-review`: same owner/recent-auth requirement as mutations;
  `{uid}` loads an existing binding or `{uid,type,entityId}` previews a candidate.
  Returns target Auth email/verified/disabled status, sanitized binding and
  profile name/eligibility/availability. No passwords or other owner's UID.
  This read endpoint requires the account migration gate and never writes data.

The gated AdminPanel now includes VÍNCULOS DE ACESSO for the main owner only.
The owner reauthenticates, enters the target UID and either reviews its current
binding or selects an existing active profile. Only a returned eligible preview
offers binding confirmation. Disable/reactivate requires a reason and sends the
reviewed revision; edits to UID/type/profile discard the preview. Backend checks
remain authoritative even if the browser is modified. Review is not a claim of
profile ownership: the owner must independently verify the requester. No silent
reassignment/transfer feature is provided.

Account routes also require `serverConfig/accountMigration` with
`enabled: true, schemaVersion: 1`. Keep it absent/disabled until production rules
protect `authAccounts`, `accountEntityOwners`, `accountBindingAudit` and
`serverConfig` against all client writes. The global environment switch also
remains disabled. Binding is explicit owner review, never proof by an old game
password. Allowed game types are TEAM, PLAYER, COMPANY, PRESS, PRESS_WORKER,
COACH, DOCTOR, SCOUT and ASSISTANT. TEAM resolves to the legacy UI type USER.
The browser has an opt-in migration path for this session endpoint, disabled in
normal builds. Do not enable it or the new backend while public-write rules
remain deployed.

## Client migration build (not ready for production)

`VITE_SECURE_GAME_LOGIN=true` selects email/password Firebase Auth for non-admin
login and server-confirmed session restore. It requires `VITE_MATCH_API_URL` to
equal `https://pyqmrzpgjepazitrjwpc.supabase.co/functions/v1/match-api`. This endpoint
is planned, not deployed. Missing/wrong configuration fails closed; there is no
fallback to legacy passwords or localStorage authorization. The ordinary build
does not set either variable and preserves the existing login.

The client requests only its own session using a Firebase ID token, refuses HTTP
redirects, uses a 20-second timeout and reads the returned profile from the
server (not offline Firestore cache). Profile passwords are excluded from that
result. It revalidates when the Auth token changes or the tab becomes visible;
all server mutations must independently verify authorization on every request.
This is not continuous polling or immediate push revocation of visible UI.

The migration login now offers Auth-only identity registration, verification
resend/status and password recovery. Each runs in a separate app with persistence
NONE; it never creates a game profile, writes a binding or replaces a primary
session. The UID shown to the user is only an identifier for owner review, not
proof of profile ownership. Delivery failure after registration preserves the
identity so verification can be retried. Recovery uses a generic result for
unknown/known addresses. UI prevents repeat submissions while a request runs;
provider quota/rate limits still apply.

The migration build hides legacy registration tabs and guards all six legacy
registration actions. Player registration now has the private application flow
above; teams, staff, companies and press still need secure replacements before
rollout. The default build preserves old registration behavior. No live emails or
production identities were created during testing.

Before enabling: migrate remaining profile registration, protect
profile reads/writes and finish the match integration. The
Auth emulator test now exercises real client SDK registration, verification
action code, password reset and rejection of the previous password. This does
not validate live email delivery, provider configuration or deployed rules.

The scheduler uses a 180-second lease and retries with 30-second exponential
backoff capped at one hour. A permanent failure remains inspectable in
`workerFailures`/`lastWorkerErrorAt` and does not block the entire queue. Deploy
`firestore.indexes.json` before enabling the scheduler. The settlement ledger
protects against replay even when a worker crashes after commit.

## Activation prerequisites

1. Secure credentials and verify the full SDK in the hosted Edge runtime.
2. Migrate legacy logins and server-owned `authAccounts` bindings; do not trust
   client roles or automatically claim accounts using publicly exposed passwords.
3. Replace deployed public-write rules and verify real application permissions.
4. Protect fixtures, player XP/energy, serverConfig, runs, ledgers, locks and audits.
5. Complete national-team, disciplinary, financial, correction and frontend flows.
6. Stage end-to-end tests, configure a bounded authenticated scheduler and only
   then enable both the environment switch and database activation gate.

No real credentials, data migration, production rules or live cron were changed
by the local integration tests.

## Partial server namespace Rules test

From repository root, with Java 21+:

```sh
node scripts/security-inventory.mjs security-audit.local.json
npx -y firebase-tools@15.34.1 emulators:exec --only auth,firestore --project demo-mato-real --config firebase.boundary-emulator.json 'node server/tests/server-boundary.mjs'
```

The detailed inventory is local/untracked; the reviewed findings are in
`docs/SECURITY_AUDIT.json`. `firebase/firestore-server-boundary.rules` is a
PROTOTYPE, not deployed and not a complete game policy. It closes direct client
access to fourteen server namespaces while retaining the current legacy policy.
The test verifies 392 denied attempts, including principal and descendants, and
also explicitly proves that legacy team reads and balance forgery still succeed.
That remaining critical vulnerability blocks activation. Protecting new ledgers
alone does not protect the player attributes, fixtures and finances they depend on.

In secure-login builds, player password controls now send recovery to the current
Auth email; the ADM cannot display or overwrite another user's password. Default
build still preserves legacy behavior pending the full migration.

## Broadcast integration (gated)

Secure-login builds use the API for shared friendly creation, official fixture
start, replay loading and coach commands. The selected match polls every 15 seconds
only while visible and until settlement; recent listings refresh on demand. Local
previews do not persist. UI separates simulated full-time from confirmed server
results. Start/command retries retain an uncertain request's idempotency key.

`node tests/transmission-ui.mjs` is an isolated mobile browser harness with mock
API and no external traffic; requires working Playwright Chromium. It now passes locally with Chromium Headless Shell; full Chrome could not
start because its singleton socket was denied.
This does not replace full end-to-end testing with a real staging backend.

The gated Central de Jogos offers fixture review/approval. The current ADM
reauthenticates, reviews server-returned clubs/competition/season, and enters a
reason before approving or revoking. Decisions carry the reviewed revision and
sporting identifiers; the server rejects stale data. Invalid legacy calendar
records display blockers and still need an explicit migration. The panel does
not grant account ownership privileges or create missing competitions.
