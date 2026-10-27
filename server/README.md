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
registration actions. Creating new game profiles still requires a secure
replacement before rollout; this is currently an existing-profile migration
path. The default build preserves old registration behavior. No live emails or
production identities were created during testing.

Before enabling: migrate password settings/new-profile registration, protect
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
