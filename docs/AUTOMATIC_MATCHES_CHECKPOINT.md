# Automatic matches — implementation checkpoint

Status: development only; not released. Production remains 2.9.11.
Base production commit: c1bf3866a99011be0a34e76db19343666ed2fb02.

## Authoritative league/state standings connected — 2026-10-30

- Added authenticated, bounded competition-standings projection from server-owned
  aggregates, isolated by competition/season. It never reads legacy team.stats and
  omits private fields. Counter consistency is checked; oversized tables fail
  rather than silently truncating. Index candidate added, not deployed.
- Optional competition.teamIds includes clubs with zero matches. Without it, UI
  explicitly shows clubs with registered results only. Points/wins/goal-difference
  ties share rank; ID ordering does not claim a sporting tie-breaker.
- Gated league/state tables use linked calendar competitions, separate state
  fixtures from national leagues and do not fall back to old totals when links are
  missing. Completed official broadcasts expose the same standings; correction
  revision remounts/refetches them. Custom knockout brackets still need integration.
- 194 unit tests pass; local browser harness verifies mobile rendering, corrected
  points with one played match, and clearing stale rows on network failure.
  Auth/Firestore emulator confirms authenticated standings after actual official
  settlement/correction with no duplicate appearances. Build passes. GitHub full
  validation will run on the pushed commit; no live deployment occurred.
- Estimated progress now 72% complete / 28% remaining. Security, account migration,
  server credentials/scheduler, weekly/season/training/recovery/item and national
  match integration remain blockers. Production remains 2.9.11.

## Legacy progression path inventory and rollout guard — 2026-10-30

- Verified GitHub run 41049873412 succeeded for 0f7705eef8a200747e2a0c15186a9aef8d00b204:
  all unit/E2E/build/smoke/mobile-harness checks passed for the prior summary fixes.
- Automatic mode now blocks legacy saveMatchStats/updateTeamStats action wrappers,
  including the owner. Legacy result/table modals show navigation to the recorded
  server correction flow. Ordinary production behavior stays unchanged.
- Audited direct progression mutation paths and recorded concrete remaining work
  in PROGRESSION_WRITE_MIGRATION.md. Client guards do NOT enforce database security;
  protected source-data rules, identity migration and server-side replacement of
  weekly/season/training/recovery/item/national mutations remain release blockers.
- Remaining-work estimate stays 32% / completion 68%: this closes an accidental
  double-accounting path in the gated client, not the underlying migration.

## Confirmed match summary and fatigue integration — 2026-10-30

- RecordedMatchSummary displays committed score/revision, player notes, goals,
  assists, cards, XP (including penalties) and actual energy deducted. Replay
  simulation ratings are no longer presented as the authoritative final report
  for server-owned games. Explicit refresh loads later ADM corrections.
- Energy display is the deduction from this match, not a fabricated current energy
  balance. Friendly XP explanation states the displayed values include daily caps.
- Verified existing engine behavior: settled energy carries into the next snapshot,
  affects play, and below 25 excludes selection. Replaying does not deduct energy.
  No engine-version or simulation formula changes were needed.
- 186 unit tests passed. GitHub run 40980146044 passed build/smoke and all 42 E2E
  cases but revealed mobile overflow in the extended harness. Fixed native range
  input margins (4px overflow) and result refresh discarding replay presentation
  state, including after ADM corrections. Full isolated mobile harness now passes
  locally with Chromium Headless Shell, including refreshed notes and replay seek.
- Latest small replay/layout fixes await their new GitHub run; do not label the
  earlier run green. No production deployment or backend activation occurred.
- Approximate progress: 68% complete / 32% remaining (effort estimate, not measured
  task completion). Security/migration/deployment and remaining gameplay blockers
  remain; production is still 2.9.11.

## ADM correction interface validated — 2026-10-29

- Added recent-auth ADM match-correction-review, returning only reviewed sporting
  facts, participant names, revision and eligibility. It does not expose audit
  actor/reason or credentials. Closed seasons are visible but correction disabled.
- Gated MatchCenter and finished Broadcast now offer the mobile correction panel
  to competition administrators. It clears the password after reauthentication,
  requires a reason, submits the reviewed revision and strips XP/minutes/identity
  fields. Errors/conflicts discard the form; reload is required before retry.
- 184 unit tests and real local Auth/Firestore integration pass. GitHub validation
  run 40970979790 for 018c45dd49d7fca54d66bc0180262a0d4405708c passes: build,
  compiled-app smoke, all 42 E2E cases and mobile transmission/correction harness.
  Harness checks 390px layout, password clearing, payload, refreshed revision and
  rejection/reload after a conflicting correction. All data is isolated fixtures.
- Approximate progress now 65% complete / 35% remaining, effort estimate only.
  Natan requests an updated percentage in future progress reports; change it only
  for meaningful completed work, and distinguish tests from live release readiness.
- Production remains 2.9.11. Manual new-match entry, changed participation/minutes,
  closed-season policy and the earlier security/migration/deployment/gameplay
  blockers are still outstanding. No production gates or data changed.

## ADM result correction server — 2026-10-29

- Added recent-auth competition-ADM-only match-correct route. It accepts sporting
  facts, revision and reason; rejects XP/minutes/side/identity injection and changed
  participants. Score must equal player goals plus explicit credited own goals.
- Authorization, active gate/current season, finished run, expected revision,
  ledger, career/XP aggregates, official standings, run score and audit share a
  single transaction. Fatigue and original participation are preserved. Concurrent
  corrections at the same revision apply once; stale callers must reload.
- 182 unit tests pass. Real local Auth/Firestore emulator integration passes,
  including club denial, concurrent ADM correction, preserved energy, updated
  career/fixture revision and audit identity. No production data was touched.
- UI, manual match entry, minutes/participant correction and closed-season policy
  remain pending. This completes the server path for correcting recorded sporting
  facts, not the entire ADM workflow. Existing release blockers below still apply.
- User-facing remaining-work estimate: approximately 40% (rough effort estimate,
  not a measured task count or a delivery date). Do not infer deployment readiness
  from green isolated tests. Production is still 2.9.11 with activation disabled.

## Release validation complete — 2026-10-29

- GitHub validation run 40969076362 succeeded for fa0949f21c8981893b5a2faba9ca714a9041f2ab:
  176 unit tests, build, compiled-app smoke test, all 42 E2E tests and the isolated
  transmission/fixture-approval browser harness passed.
- Press and journalist tests explicitly require the removal of LANÇAR SÚMULA (XP)
  and EDITAR TABELA while preserving ESCREVER NOTÍCIA. Only those two approved
  removals are applied to the pinned production visual reference; the 1% pixel
  threshold and all remaining screen comparisons are unchanged.
- Broadcast regression now seeks to the actual timeline maximum and plays through
  the final presentation before checking ratings. The obsolete fixed 90-minute
  seek and fixed 30-minute wall duration ignored added time. It still asserts
  player ratings fit the mobile screen, local preview performs no database writes,
  and legacy shared broadcast writes only its isolated expected collection.
- This validates isolated fixtures, NOT live authenticated backend deployment.
  Production remains 2.9.11. No gates, rules, credentials or live data changed.
  Legacy source-data security, hosted credentials/scheduler, account migration and
  remaining gameplay integration listed below still block activation/publication.

## Release validation repairs — 2026-10-28

- Inspected failed GitHub E2E run 40677698255: most visual comparisons used an
  obsolete monolithic pre-2.9.11 baseline; national tests demanded version 2.9.1;
  replay whistle test exposed a real seek/presentation pause defect.
- Local/replay clock now advances immediately after seeking past presentation;
  live shared match timing remains server/wall-clock anchored. Browser harness
  verifies seeking to 20:00 during intro and advancing within five seconds.
- Visual reference is pinned to published production commit c1bf386 (2.9.11),
  extracted into a separate source tree. Entry point explicitly targets that tree,
  not current source. Removed one-sided visual hiding; 1% threshold unchanged.
  National login version expectation matches published 2.9.11.
- Downloaded Chromium Headless Shell (not full Chrome): browser harness now PASSES
  locally at 390x844 for replay/result, API creation, absent non-ADM report action,
  approval panel and replay seek. Earlier full-Chrome socket failure is overcome.
  This is an isolated fixture test, not live backend end-to-end validation.
- 176 unit tests pass. Added harness to GitHub CI even when main E2E fails, so
  browser evidence is collected there too. Full updated E2E run remains pending.
- No production release or activation. Migration/credentials/remaining gameplay
  integration blockers remain as previously documented.

## ADM fixture review and approval panel — 2026-10-28

- Added recently authenticated, competitions-ADM-only POST fixture-review. It
  reads the current fixture, approval revision, competition, season, clubs and run
  in a transaction, returning names/identifiers, eligibility and specific blockers.
  It omits credentials, audit actor/reason and arbitrary legacy fields.
- Central de Jogos in the gated build now offers CONFERIR / APROVAR CALENDÁRIO.
  Panel reauthenticates the current ADM, clears the password, loads the server
  review and sends only reviewed sporting IDs, revision, decision and reason.
  Approval/revocation reloads the review; failures discard it. Server rejects
  changed pairing, stale revision and started games regardless of UI state.
- Both owner and active competitions sub-ADM use their own Firebase identity;
  no owner-only binding permission is reused or widened. Legacy invalid calendars
  display blockers and cannot be silently upgraded by this panel.
- 176 unit tests passed; real Auth/Firestore integration passed including owner
  review and ordinary-user denial. Default and enabled frontend builds passed.
  Browser harness extended for panel interaction but remains UNEXECUTED because
  Chromium cannot create its required socket in this environment.
- No live data, rules, identities or release changed. Full migration/security,
  credentials/deployment, remaining profile registration, ADM result corrections,
  national/financial/disciplinary integration and browser QA still block release.

## Server-backed broadcasts and match viewing — 2026-10-28

- Added authenticated POST match-view and match-list (fixed newest 10) under
  the existing off-by-default automation gate. Whitelisted sporting projections
  omit UIDs, account details, audit reasons, worker metadata and locks. Commands
  have stable hashed public IDs; snapshots whitelist players/attributes/appearance.
- Result is shown only when both the finished run and result ledger exist.
  Sporting simulation parity tested after projection; list omits rosters/seed.
- In secure-login builds Broadcast creates shared friendlies through start API,
  reads/replays server snapshots and polls the selected match every 15 seconds
  while visible, stopping after confirmed settlement. Recent list refresh is manual.
  Local previews remain nonpersistent. No client settlement or XP grant exists.
- LiveCoach uses the command API for server games; pending uncertain requests reuse
  their idempotency key. Server checks strict boolean active, valid binding revision
  and matching account ownership lock in addition to current employment.
- MatchCenter can start official matches or open existing runs in Broadcast.
  Approval remains required server-side. Non-ADM no longer see manual report action
  even in legacy mode. Secure mode still needs the ADM corrections UI/API.
- 171 unit tests passed; real Auth/Firestore emulator passed including private
  projection, bounded listing and official/friendly settlement. Both build modes
  compiled (latest enabled build after integration). No live services activated.
- Browser interaction harness tests/transmission-ui.mjs prepared with isolated API
  fixtures and blocked external traffic. Chromium launch is blocked in this runtime
  by socket() Operation not permitted; the browser test has NOT passed. Do not
  describe this as visually validated. Run it in a browser-enabled environment.
- Firebase CLI remains unauthenticated. Supabase credentials/API/cron, complete
  public/private data migration, source-data Rules, remaining signup types,
  national/financial/disciplinary integration and ADM correction/approval UI remain
  release blockers. Production is still 2.9.11; keep feature disabled.

## Protected official-fixture approval — 2026-10-28

- Added POST fixture-approve: recent Firebase authentication and strict active
  competitions ADM authorization; explicit fixture/clubs/competition/season,
  revision, approve/revoke and reason. Requires existing automation gate.
- Approval and revision audit live under serverConfig/fixture_{id}, already a
  server-only namespace in the candidate Rules. Transaction verifies current
  fixture, active clubs/competition and season. Started games cannot be altered.
- Official start now requires this protected approval and exact sporting identity;
  a forged legacy serverVerified flag alone is rejected. Changing participants,
  competition or season invalidates approval. Concurrent retries create one audit.
- Fixed ADM authorization to reject truthy nonboolean active and string permissions.
- 163 unit tests passed; Auth/Firestore emulator passed including forged marker,
  unauthorized approval, concurrent approval, changed fixture, and full official
  settlement. Existing friendly/account/registration checks also passed.
- No approval UI, live rules, migration or activation shipped in this step.
  Full source-data protection and remaining integration blockers above still apply.
- Publication inspection: Supabase connection works; only the two retired probe
  functions exist, no match-api. Firebase CLI failed authentication. Reauthentication
  and secure service credentials are required, but are NOT the only release blockers.

## Private player registration and atomic approval — 2026-10-27

- Added server/player-registration.js: verified/enabled non-admin identity submits
  strictly allowlisted name/nation/position/Instagram/appearance/revision. Private
  playerApplications keyed by UID; no public player or binding until approval.
  Both accountMigration and new playerRegistration server gates required (off).
- Main owner reviews and approves/rejects with recent authentication, revision
  and reason. Approval transaction creates the player, binding, ownership lock
  and audits together. Line OVR45/GK60, balance0, pendingXP0, energy100 and other
  existing initial defaults derived by server. No client money/XP/attributes.
  Instagram remains private; no email/password/UID copied to public player.
- Duplicate submission/approval cannot create extra players or reroll attributes.
  Comparison canonicalizes profile keys to tolerate Firestore map ordering.
  Rejection allows corrected resubmission at current revision. Binding/profile
  collisions and disabled/unverified identities abort without partial writes.
- Gated login offers SecurePlayerRegistration; own submission/status uses an
  isolated nonpersistent verified Auth session. Admin binding tab now includes
  PlayerApplicationManager. Existing-profile binding remains independent; new
  registration cannot take over existing accounts. Other profile types pending.
- API routes player-apply, player-application, player-application-review and
  player-application-decide added. Private subject lookup rejects client UID;
  owner review/decision require the existing five-minute auth_time check.
- 157 unit tests passed; real Auth/Firestore emulator tests passed including
  submission retry, unauthorized fields/reads, simultaneous approval and trusted
  resulting player session. Both build modes passed. No browser visual test or
  live registration/email/production data change was performed.
- Added playerApplications/playerApplicationAudit to the limited Rules prototype.
  392 namespace attacks denied on 14 namespaces; deliberate legacy balance
  forgery still succeeds. Audit stays CRITICAL. AST inventory now163 files/1353
  operation candidates. Rules remain undeployed and insufficient for activation.
- Next: secure remaining profile creation and migrate public/private legacy data
  and economics/calendar mutations, then full match UI/discipline/finance/national
  integration and hosted credentials/API/cron. Do not ship this draft yet.

## Partial Rules boundary and credential controls — 2026-10-27

- Ran AST inventory across 160 source/server files (1306 candidate operations,
  including non-Firestore methods). scripts/security-inventory.mjs reproduces it;
  detailed security-audit.local.json intentionally untracked. Reviewed collection
  names, dynamic mappings and all where/orderBy/limit candidates. See audit below.
- docs/SECURITY_AUDIT.json scores the existing transition policy CRITICAL (1/5).
  Public legacy profile/financial writes and credentials remain; client UI checks
  and secure Auth do not fix that. Do not activate automatic rewards yet.
- firebase/firestore-server-boundary.rules is a limited, undeployed prototype:
  excludes 12 new server-owned root namespaces at all depths from the legacy
  recursive grant, preserving existing adminProfiles constraints. It does NOT
  protect legacy teams/players/calendar/economy and must NOT be presented as a
  complete production policy. Original transition Rules file unchanged.
- Root firebase.boundary-emulator.json + server/tests/server-boundary.mjs compile
  and test that candidate in demo-mato-real only. 336 get/list/create/update/
  delete/descendant attacks denied across unauthenticated, ordinary/subADM,
  press-named and principal identities. SDK writes and existing admin boundary
  retained. Test deliberately demonstrates that legacy balance forgery still
  succeeds; this is a documented outstanding critical issue, not a hidden pass.
- Secure-login mode now replaces player password field updates with recovery
  to the current Firebase Auth email; admin password display/change is blocked
  in this mode. Legacy/default flow unchanged until migration. 147 unit tests
  passed; default and secure-enabled builds passed. No live emails/deployment.
- Next: migrate secure creation of game profiles, split public/private documents,
  move financial/XP/calendar mutations behind trusted APIs or strict validated
  rules, and test complete permissions before any activation. Hosted credentials
  and final match UI/national/disciplinary/financial flows remain outstanding.

## Main-owner binding manager — 2026-10-27

- Added gated admin/AccountBindingManager.jsx in AdminPanel, main owner only.
  Reauthentication, UID lookup, active profile selection, sanitized server review,
  explicit bind confirmation and revision-checked disable/reactivate with reason.
  Editing selection discards review; requests disable the form; passwords clear
  after use. No reassignment or identity transfer flow, no direct binding writes.
- New POST account-review requires verified main owner + auth_time <=5 minutes
  and account migration gate. Returns target Auth email/status, binding metadata,
  selected profile name/eligibility/availability only. No legacy credentials or
  other owner's identity. Unverified/disabled/inactive/claimed targets cannot bind.
- Reactivation now rechecks real Auth user verified/enabled/email and transaction
  checks current profile eligibility, owner lock and non-administrative identity.
  Missing/mismatched ownership never offers an available profile or enables it.
- account-client.js sends refreshed Firebase token, allowlisted payload, no
  redirects, timeout and no-store; rejects changed owner session and stale auth.
  API remains authoritative even if UI state is forged.
- 145 unit tests passed. Both default and secure-enabled builds passed. Real
  Firebase emulators passed full integration including owner review, non-owner
  denial without email disclosure, identity lifecycle, binding/revocation and
  match settlement/retries. Browser interaction/visual QA of new panel not run.
- No deployment, real migration, real messages or live credentials changed.
  Next: secure new-profile creation/password settings and comprehensive protected
  data access/rules, then remaining match integration. Still NOT production-ready.
- To avoid lost global caches, local CLI15.34.1 now exists at scratch/firebase-cli
  and FIREBASE_EMULATORS_PATH points to scratch/firebase-emulators. Java21 remains
  scratch/java21. These are temporary runtime tools, not repository artifacts.

## Identity lifecycle UI — 2026-10-27

- Added services/identity-access.js and SecureAccessForm.jsx to the disabled
  migration path: Auth-only register, verification resend/status and recovery.
  Uses isolated Firebase app with persistence NONE and cleanup, Portuguese
  language, 12..128-character new passwords. No Firestore writes, automatic
  binding, game account creation or legacy credential validation in this flow.
- Verification send failure preserves the new identity and offers resend rather
  than losing the account. Reset response does not reveal whether email exists.
  UID displayed for explicit Federation review; never a password/token.
- Secure migration mode hides old signup tabs and guards six legacy creation
  actions. Default production behavior unchanged. Secure creation of new game
  profiles and migration of legacy password controls remain pending.
- 137 unit tests passed. Real Auth emulator using Firebase client SDK passed
  registration -> confirmation action -> verified status -> reset action -> old
  password rejected/new accepted, with isolated apps disposed. Existing server
  integration (binding, sessions, settlement, retry, revocation) also passed.
  No real email was sent and no production identity was created. Build with
  secure flag enabled passed; default build also checked before commit.
- Next: owner binding UI, secured profile creation/settings, complete protected
  database access and rules before enabling the feature. Hosted secret/API/cron
  deployment and full match integration remain pending; not a release.

## Client identity integration — 2026-10-27

- Added services/trusted-session.js (injected SDK/network for testing) and
  game-auth.js (Firebase compat adapter). Non-admin login, App session restore
  and login form now have a build-time opt-in secure path. Default stays off.
- VITE_SECURE_GAME_LOGIN=true requires the exact planned Mato Real Supabase
  match-api URL; no URL/localStorage/public-document toggle. The API is NOT live.
  Firebase handles email/password; API receives only ID token + empty JSON.
  Trusted role/entity/revision resolve the profile with source:server, excluding
  its legacy password. No client role/ID claim or fallback to legacy credentials.
- Restore waits for Firebase Auth initialization, ignores localStorage identity,
  rejects an account switch/logout during the request. Token change and returning
  to the tab trigger revalidation. Network failure blocks access; denied binding
  returns to login. Existing ADM and visitor entry points remain separate.
- 131 unit tests passed including token use, no credential leakage to match API,
  rejected role/path/revision, revoked/disabled backend, and logout race. Builds
  validated with migration flag both on and off; no real user login or hosted
  end-to-end migration tested. Production remains unchanged at 2.9.11.
- NEXT: secure registration/verification/recovery + password settings, owner
  binding UI, compatible protected data access/rules, then full match flows.
  Legacy signup still exists. Do NOT enable migration build in production yet.

## Verified identity bindings — 2026-10-27

- Added server/account-bindings.js and authenticated HTTP routes account-bind,
  account-state, session. Main owner only can bind a verified, enabled Auth email
  identity to an active game entity; administrative identities and bots excluded.
  Account changes additionally require token auth_time within five minutes.
- Transactions enforce one identity per entity and one entity per identity,
  idempotent binding, revision-checked activation changes and append-only audit
  records. Disabled bindings reserve ownership; retrying bind cannot reactivate.
  Session resolves only the verified caller and cross-checks the ownership lock,
  active boolean, revision, current entity status and current staff role.
- No legacy password is proof of ownership. No passwords, emails or tokens are
  copied into bindings/audits or returned by session. Malformed roles, spoofed
  identity/role payloads and stale owner authentication are tested.
- All 125 unit tests passed. Real Firebase Auth + Firestore emulator integration
  passed again: verified identity binding, session resolution, immediate binding
  revocation, concurrent settlement, exact XP/energy, scheduler retry and disabled
  Auth token rejection. This does NOT verify deployed application rules.
- Default-disabled. Additional serverConfig/accountMigration enabled/schemaVersion
  gate is required. No real migration, server secret provisioning, rules/index
  deployment, live match endpoint, cron or client activation performed.
- Browser App.jsx still restores non-admin accounts from a localStorage hint and
  reads public legacy profiles. Next migration step: use Firebase identity and
  trusted session resolution for login/restore; add a reviewed owner binding UI;
  protect all affected collections and replace legacy writes before activation.
  Do not simply enable the gate or wire rewards while public writes remain.
- Supabase connection works; do not ask user to reconnect it. Its available tools
  lack server-secret provisioning. A prior browser authentication attempt timed
  out; no authenticated browser or deployed Firebase credential is confirmed.

## Official SDK, scheduler and emulator verification — 2026-10-27

- Added server/firebase-runtime.js using pinned firebase-admin 14.5.0 and official
  preferRest transport. Enforces Mato Real project and rejects emulator vars.
  server/package-lock.json pins the server dependency tree separately from client.
- server/supabase-entry.js wires Firebase-verified start/command and secret-protected
  finalize. Fail-closed until MATO_REAL_MATCHES_ENABLED=true plus Firestore gate.
  No real service-account secret provisioned and no live API/cron deployed.
- server/match-scheduler.js handles one due game/request with 180s lease, retry
  backoff 30s..1h, queue fairness. New runs include nextAttemptAt. Index candidate
  server/firestore.indexes.json not deployed. Three scheduler unit tests passed.
- Full root unit suite: 116 passed. Real Firebase Auth + Firestore emulators
  (CLI15.34.1, Firestore1.22.0, Java21) integration PASSED with official REST SDK:
  authenticated HTTP start, idempotent retry, simultaneous finalization without
  duplicate XP/energy, audit/locks, transient scheduler failure/recovery, and
  rejection after disabling the Auth user. Test uses demo-mato-real only.
- server/tests/deny-all.rules is ONLY a local test fixture, NOT application rules.
  It verifies that client REST calls cannot write test data even with an admin
  user token; server IAM/admin credentials are separate. Production legacy rules
  remain unchanged and insecure. Auth migration still required.
- Local Deno registry downloads failed due network connection refusal. Instead,
  hosted match-sdk-probe imported firebase-admin14.5.0 and initialized Firestore
  + Auth on Supabase successfully (HTTP200 authorized,401 without token). Zero
  database requests and no Firebase credentials used in that probe. Replaced it
  with disabled410 handler and verify_jwt=true (version2) afterwards.
- Hosted SDK INIT is verified; hosted Firestore RPC, credential exchange and
  combined simulation/SDK memory peak are NOT yet verified.
- See server/README.md for reproducible tests, required server-secret names and
  activation prerequisites. Never paste service-account private keys into chat.

## Server command and HTTP boundaries — 2026-10-26

- server/match-commands.js accepts only verified Firebase UID plus allowlisted
  payload. It reads server-owned authAccounts bindings, verifies active club or
  current coach employment, derives side/time from the run, deduplicates requests,
  restricts roster IDs, limits 120 commands/run and one command/side/second.
  Engine still resolves actual lineup/substitution eligibility and penalty windows.
- server/match-http.js is a default-disabled Fetch handler for start/command.
  Requires injected Firebase Admin Auth verifyIdToken(token,true) (revocation),
  allowlisted CORS, POST/JSON, bounded 8KiB streamed body, no request UID trust.
  Dependencies are injected; no actual Admin SDK credential deployment yet.
- 113 unit tests passed, including denied forged identities/timestamps, press,
  inactive accounts, coach transfer, opponent substitutions and revoked sessions.
  These do NOT replace a real Firebase Auth / Firestore emulator integration test.
- Neither module deployed/activated. authAccounts migration and rules protecting
  bindings/run/config/player data are prerequisites. Existing client passwords
  remain the critical blocker; do not silently bind identities from client claims.
- Supabase connector exposes no secret-management tool in this session. Need a
  supported secure server credential provisioning path before wiring Firebase
  Admin SDK in Supabase; never request service-account private keys in chat.

## Hosted Supabase feasibility verified — 2026-10-26

- Connected account: Mato real; organization ipanxehbabmyrzfilael (Mato Real),
  confirmed Free. Existing project pyqmrzpgjepazitrjwpc, ACTIVE_HEALTHY, us-east-1.
- Deployed isolated match-runtime-probe using a random 256-bit header credential,
  SHA-256 digest and one-hour expiry; no Firebase credentials or database access.
- Six hosted seeds (1,2,3,10,20,30), 40 players, 120 tactics commands each passed.
  Entire generated report exactly matched the local engine, including XP/fatigue.
  Hosted handler wall time 153–235ms. This is NOT CPU or peak memory measurement.
- Unauthenticated call rejected with 401. After tests replaced the probe with a
  disabled 410 handler and restored platform JWT verification (deployment v2).
- Evidence: docs/hosted-runtime-probe.json. No game data, schema, billing, Firebase
  rules or published frontend changed. Production still 2.9.11.
- Next: authenticated server integration and Firebase access adapter, then scheduling,
  safe auth/rules migration, remaining domain effects and end-to-end validation.
  The hosted simulation test alone does NOT establish production readiness.

## Free hosting direction — user approved 2026-10-26

Nathan declined enabling Blaze and approved testing Supabase Free for the server
while retaining GitHub Pages and existing Firebase data. Do NOT enable billing or
migrate game data based on the previous Firebase-only deployment plan.

- Previous checkpoint before connection is superseded by hosted verification above.
  Never enable billing; current scope remains the Free plan.
- Installed Deno 2.9.6 in the scratch npm cache and executed the existing JS engine.
- Added scripts/benchmark-match-runtime.mjs: 30 seeds, 40-player rosters, 120 tactics
  commands per match, summary report generation. Both Node and Deno passed locally.
- Reduced server memory by adding an optional summaryOnly mode to engine v10.
  It retains every 30th frame (exactly the samples already used by energy policy).
  The viewer default continues to keep all frames; old engine versions unchanged.
  Worker opts into this mode. Regression test compares scores, stats, events,
  ratings, possession, shootouts, XP and fatigue against full replay on 8 seeds.
- docs/free-runtime-benchmark.json records measurements and limitations. Deno
  observed max CPU ~441ms, sampled heap ~55MiB and RSS ~195MiB. This is LOCAL, not
  hosted Edge performance, and excludes auth/Firestore/network/retry overhead.
- Full unit suite now 103 passed. Frontend Vite build checked separately.
- Next: connect Supabase, verify a genuinely Free project, deploy an authenticated
  synthetic-only probe, examine hosted CPU/memory/logs before porting the Firestore
  adapter and scheduling. No Firebase secrets should be placed in source/client.
- Supabase docs checked: Free 500k function invocations/month; 2s CPU/request,
  256MB memory, 150s wall time. Cron can invoke Edge functions without viewers.
  Free projects can pause after inactivity. Keep reads within Firestore free quotas
  too. Do not promise unlimited free service or exact hosted completion timing.
- Original outstanding items below still apply: legacy auth migration, protected
  rules, commands, national teams, corrections, sanctions, finances, UI integration.

## Implemented and locally tested

- Shared match policy: official XP, 10% friendly XP capped at 10 positive XP per
  player/Brazil day; proportional energy (25 line/12 goalkeeper per 90 minutes),
  position-sensitive ratings using only existing engine stats; diminishing
  returns for tackles/saves. Formula is provisional pending simulation calibration.
- Server-only settlement transaction: result ledger, daily allowance, current
  player XP/energy, career categories, season/competition aggregates, revision
  audit. Duplicate settlement and concurrent allowance access are tested.
- Server-only worker adapter `server/match-worker.js`: derives report from the
  server-owned run snapshot/commands and settles after its end time without any
  browser. Worker has NO deployed scheduler or callable entry point yet.
- Official/Friendly/Total career UI, legacy known counts preservation without
  fabricated historic appearances or minutes.
- Both season routines call the same progression helper, preserving XP remainders,
  avoiding capped-attribute losses, using known attributes for overall.
- Training recalculates overall and deduplicates known training attribute targets.
- Press result/table controls removed; actions/modal guards limit them to admins
  with competition permission. THIS IS NOT YET A DATABASE SECURITY BOUNDARY.
- 88 unit tests passed, plus the worker integration test (89 total). Production
  build passed. No browser visual QA yet in this turn (browser executable absent).
- Existing simulation test expected exactly 90 minutes despite added time; updated
  to assert duration from snapshot added time without changing engine behavior.
- Legacy extraction contract test excludes the newly added progression module,
  whose behavior is covered by dedicated tests.

## Firebase inspection and follow-up (2026-10-25, Brazil)

- Firebase plugin installation confirmed. CLI authentication succeeded and project
  access verified. No further installation request is necessary.
- Inspected production through the official Firebase MCP server running via CLI.
  Active project is `gerenciador-de-times-matoreal`, matching src/services/firebase.js.
- Database `(default)` is STANDARD / FIRESTORE_NATIVE, location `nam5`.
- MCP environment reports billing disabled. Cloud Functions listing returned 403
  SERVICE_DISABLED for cloudfunctions.googleapis.com. No services or billing were
  enabled. Production Functions deployment requires Blaze; a billing decision is
  required before proceeding with that deployment architecture.
- Retrieved actual deployed Firestore rules: they match the transitional rules
  in this repository. Public read/write outside adminProfiles is CONFIRMED, not
  merely inferred from source. Do not deploy automatic settlement under these rules.
- Added defensive report validation (types, bounds, valid aggregate document IDs,
  correction reason and revision). This is not a substitute for trusted event
  derivation, authentication or fixture membership validation.
- Corrected fatigue revisions to track actual energy deducted at zero and refund
  only that amount, bounded by current capacity. Added regression tests for low
  starting energy, repeated corrections and intervening recovery.
- Added server-only `startMatch`: verified caller UID contract, active competition
  ADM checks, default-disabled activation gate, server-built snapshots/seed/time,
  official fixture + competition + current season validation, deterministic official
  run IDs, friendly idempotency keys and team/player participation locks.
  Existing public fixtures are deliberately NOT automatically trusted; they need
  serverVerified metadata from a protected ADM migration/API still to implement.
- Official settlement optionally commits fixture score/status and isolated
  competition standings in the SAME transaction as player rewards and the result
  ledger. Corrections reverse only the old match contribution. Legacy team table
  UI is not switched to this collection yet; disciplinary/financial effects remain.
- Worker releases only its own participant locks after successful settlement.
  Retry remains safe if a crash occurs between settlement and lock cleanup.
- Full unit suite: 102 passed. These are in-memory/unit tests, NOT Firestore security
  emulator verification. No production writes or feature activation performed.

## Critical deployment blocker

Only admins currently use Firebase Auth. Other accounts compare legacy credentials
in public Firestore documents. Deployed rules allow public writes except
adminProfiles, confirmed by the read-only inspection above.

Firebase inspection previously worked through the CLI/MCP. Do not ask for secret
keys in chat. Do not publish client-only automatic XP as though it were secure.
User rejected paid Firebase/Blaze: keep the Supabase Free approach. Hosted server
credential provisioning and legacy authentication migration remain unresolved.

## Next steps (not completed)

1. Inspect actual Firebase authentication, rules, billing/functions support and
   existing deployment. Plan compatible authenticated identities for clubs,
   players and staff; protect credentials and sensitive progression writes.
2. Deploy the tested server-owned match creation/classification adapter, snapshots/seed, commands
   with author/time validation and participant locks. Official creation must
   validate a real ADM fixture/competition and use a deterministic unique run ID.
   Never trust a client report, XP, kind, timestamp or supplied snapshot.
3. Add reliable scheduled/task finalization calling the worker. Protect matchRuns,
   results, audits and daily budgets. Include pending writes/retry handling.
4. Integrate Broadcast/MatchCenter: official fixture start, friendly start, preview
   with zero persistence, viewing existing run/result, server commands. The secure-login build now uses the server API for club broadcasts;
   default build remains legacy. National fixtures and complete ADM UI remain.
5. Integrate national fixtures and results into the same trusted pipeline.
6. Add ADM manual match entry/correction endpoint with strict report validation,
   revision checks, reason, minute limits, score consistency and position notes.
   Settlement helper is for trusted server callers only; not a public API.
7. Connect legacy table UI to the new atomic fixture/competition standings path.
   Add per-competition cards/suspensions, financial effects and trophies; these
   are not handled by the current settlement helper. Existing manual writes must
   be replaced. Add authenticated ADM fixture approval/correction endpoints.
8. Finalize fatigue integration with engine performance, prorrogação (the engine
   currently adds stoppage time and shootouts, not a new extra-time phase), avoid
   double spending and define correction policy after clamped depletion/recovery.
9. Calibrate ratings/XP on representative simulated matches. Existing engine lacks
   reliable shot difficulty/interception/error events: do not claim those metrics.
10. Validate correction after season conversion and subsequent matches; XP deltas
    currently enter pendingXP, so cross-season corrections need explicit policy.
11. Verify legacy career snapshot before ANY old stats reset. Old season routines
    still perform other financial/contract work; migrate carefully. No production
    database migration has run.
12. Complete UI details: match details, competition/season selectors, public player
    profile career, precise progress forecast, responsive visual/accessibility QA.
13. Test real Firestore emulator/rules/auth denial and retries, then stage, bump
    version, publish backend before frontend activation, verify live deployment.

## Authorization/preferences

Nathan authorizes implementation/testing/publication of requested updates without
repeated routine confirmation, preserve mechanics/data, increment release version,
return game URL. No need to ask again about the agreed design. If automatic review
blocks publishing, explain the actual blocker. Do not claim this checkpoint is a
finished feature or that the security rules are already deployed.
