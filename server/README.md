# Match server (development only)

Production is still 2.9.11. This directory is not included in the browser bundle.
The Supabase synthetic probe passed, but live match automation is NOT enabled.

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
application's security rules or account migration.

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

- `POST .../start`: Firebase bearer token; server derives fixture classification.
- `POST .../command`: Firebase bearer token; server derives controller and clock.
- `POST .../finalize`: `x-worker-key`; processes at most one due job per call.

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
