# Auth Service — [Auth Library]

## Entry Points
```bash
# Replace with your actual commands
pnpm install
pnpm dev
```

## Key Rules
- [Auth service is sole auth authority — API only verifies, never issues]
- [Shared secret must be identical in auth/.env and backend/.env]
- [List your auth-specific rules here]

## Environment Variables
```bash
AUTH_SECRET=<secret>        # must match backend/.env exactly
DATABASE_URL=...
# OAuth provider keys
```
