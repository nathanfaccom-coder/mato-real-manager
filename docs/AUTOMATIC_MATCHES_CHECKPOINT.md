# Automatic matches — implementation checkpoint

Status: development only; not released. Production remains 2.9.11.
Base production commit: c1bf3866a99011be0a34e76db19343666ed2fb02.

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

## Critical deployment blocker

Only admins currently use Firebase Auth. Other accounts compare legacy credentials
in public Firestore documents. Repository rules intentionally allow public writes
except adminProfiles. Effective deployed rules still need inspection.

The Firebase plugin was found and suggested but is NOT yet confirmed connected.
Install/connect it to project `gerenciador-de-times-matoreal`. Do not ask for secret
keys in chat. Do not publish client-only automatic XP as though it were secure.

## Next steps (not completed)

1. Inspect actual Firebase authentication, rules, billing/functions support and
   existing deployment. Plan compatible authenticated identities for clubs,
   players and staff; protect credentials and sensitive progression writes.
2. Deploy server-owned match creation/classification, snapshots/seed, commands
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
7. Atomically reconcile fixture scores, club standings, per-competition cards/
   suspensions, financial effects and trophies. These are not handled by the
   current settlement helper yet. Existing manual writes must be replaced.
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
