# Automatic matches — implementation checkpoint

Status: development only; not released. Production remains 2.9.11.
Base production commit: c1bf3866a99011be0a34e76db19343666ed2fb02.

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

Firebase access is now working through the CLI/MCP. Do not ask for secret keys in
chat. Do not publish client-only automatic XP as though it were secure. Billing
activation and legacy authentication migration remain unresolved.

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
   with zero persistence, viewing existing run/result, server commands. Current
   Broadcast is still the old friendlyBroadcasts flow and grants no new rewards.
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
