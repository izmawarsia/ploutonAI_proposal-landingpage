# Audit Assistant API (FastAPI version)

## Local mein chalane ka tareeqa

```
pip install -r requirements.txt
cp .env.example .env
```
`.env` mein apni Gemini API key daalo, phir:
```
uvicorn main:app --reload
```
Server `http://localhost:8000` pe chalega. (FastAPI default port 8000 hai, Node wala 3001 nahi)

Test karne ke liye (PowerShell):
```
Invoke-RestMethod -Uri "http://localhost:8000/api/chat" -Method Post -ContentType "application/json" -Body (@{session_id="test123"; message="TX-2041 kyun flag hua?"} | ConvertTo-Json)
```
