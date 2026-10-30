# Progression write migration — 2026-10-30

Production is still 2.9.11. Automatic matches must remain disabled. This is an
implementation inventory, not a claim that deployed rules protect these writes.
AST scan covered 171 source/server files and found 1,452 candidate SDK operations;
those candidates include reads and non-Firestore methods, not 1,452 vulnerabilities.

## Priority paths confirmed by source inspection

| Priority | Source / entry point | Directly affected data | Required migration |
| --- | --- | --- | --- |
| 1 | `src/actions/competition.js`: `saveMatchStats` | Player stats, pendingXP, rating, energy; match score and team table | Automatic mode now rejects this action and routes ADM to the server correction panel. Default production still uses legacy path. Database enforcement pending. |
| 1 | `src/actions/players.js`: `updateTeamStats` | Legacy team classification | Automatic mode rejects manual table writes. Read UI still needs authoritative competitionStandings integration. |
| 1 | `src/actions/administration.js`: `adminAction('WEEK')` | Current/pending XP, energy, salary, tax and sponsorship balances | Server batch/job with idempotency, authoritative reads and match-lock coordination. Must not reset pendingXP from stale browser state. |
| 1 | `src/actions/competition.js`: `handleSeasonTurnAdvanced` | Attributes/overall, career snapshot, season stats, contracts and prizes | Resumable server season-close job; protect active matches and define correction cutoff. Preserve all finance/contract effects. |
| 2 | `src/actions/players.js`: `handleCoachTrain`, `handlePlayerSoloTrain` | XP, attributes, overall, energy, injuries, consumed equipment | Authenticated actor/role/club validation; server randomness, costs and cooldowns; atomic item consumption; prevent concurrent match/training writes. |
| 2 | `src/actions/players.js`: `handleAssistantRegen` | Player energy/XP and assistant energy/XP | Server eligibility/affinity/perk calculation and transaction, including current employment. |
| 2 | `src/actions/players.js`: `handleUseItem`, `handleCoachUseItem` | Energy, toxicity, equipment and inventory | Server-owned item availability/effects and atomic consumption; never trust item payload from client. |
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
- Next implementation priority: weekly/season jobs and authoritative standings,
  followed by training/recovery/item transactions and national match integration.
