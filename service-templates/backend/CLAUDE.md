# Backend — [Framework] ([Language])

## Entry Points
```bash
# Replace with your actual commands
uv sync && uv run uvicorn app.main:app --reload   # FastAPI/Python
# or
npm install && npm run dev                         # Node.js
```

## Structure
```
# Replace with your actual structure
app/
├── main.py          # entry point
├── core/
│   ├── config.py    # env vars (pydantic-settings)
│   ├── database.py  # DB session
│   └── auth.py      # auth dependency
├── api/v1/          # route handlers
├── models/          # ORM models
├── schemas/         # request/response schemas
├── services/        # business logic
└── repositories/    # DB access layer
```

## Key Constraints
- [List your non-negotiable backend rules here]
- [E.g.: All env vars via pydantic-settings, never os.environ directly]
- [E.g.: Route handlers never query DB directly]
