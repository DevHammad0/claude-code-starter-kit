---
paths:
  - "backend/**/*.py"
  - "backend/alembic/**"
---

# Backend Standards

## Replace this file with your backend rules scoped to Python/backend files.
## These only load when Claude touches backend/**/*.py files.

## Example rules for FastAPI + Python:

### Async
- `async def` for ALL route handlers and DB calls — no sync functions

### API Layer
- Pydantic v2 schemas at every API boundary — no raw dicts in/out
- `HTTPException` with correct status codes — never return errors in 200
- Every protected route uses auth dependency — no exceptions
- Route handlers only orchestrate — never query DB directly

### Repository Pattern
- All DB access in `repositories/` — injected via `Depends()`

### Configuration
- All env vars via `pydantic-settings` in `core/config.py`
- Run: `uv run uvicorn app.main:app --reload`
- Migrations: `uv run alembic upgrade head`
