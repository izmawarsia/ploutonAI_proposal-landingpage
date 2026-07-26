import json
import os
import math
from typing import Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

with open("logs.json", "r", encoding="utf-8") as f:
    logs = json.load(f)

app = FastAPI()

# CORS: taake frontend (kisi bhi domain se) is API ko call kar sake
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Har session ki conversation history yahan memory mein store hoti hai
# (production mein Redis/database use hoga)
sessions: dict[str, list] = {}


class ChatRequest(BaseModel):
    session_id: str
    message: str


def get_embedding(text: str) -> list[float]:
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key={GEMINI_API_KEY}"
    response = requests.post(
        url,
        json={"model": "models/gemini-embedding-001", "content": {"parts": [{"text": text}]}},
    )
    data = response.json()
    if "embedding" not in data:
        raise Exception(f"Embedding failed: {data}")
    return data["embedding"]["values"]


def cosine_similarity(a: list[float], b: list[float]) -> float:
    dot = sum(x * y for x, y in zip(a, b))
    mag_a = math.sqrt(sum(x * x for x in a))
    mag_b = math.sqrt(sum(x * x for x in b))
    return dot / (mag_a * mag_b)


def semantic_retrieve(question: str, logs: list) -> dict:
    question_embedding = get_embedding(question)
    scored = []
    for log in logs:
        log_embedding = get_embedding(log["description"])
        score = cosine_similarity(question_embedding, log_embedding)
        scored.append({**log, "score": score})
    return sorted(scored, key=lambda x: x["score"], reverse=True)[0]


def generate_explanation(question: str, record: dict, history: list) -> str:
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key={GEMINI_API_KEY}"

    history_text = ""
    if history:
        history_text = "Previous conversation:\n" + "\n".join(
            f"Q: {h['question']}\nA: {h['answer']}" for h in history
        ) + "\n\n"

    prompt = (
        f"{history_text}Record:\n{json.dumps(record, indent=2)}\n\n"
        f"Question: {question}\n\n"
        "Write a short, professional English answer using only the exact numbers/details "
        "in this record. Do not invent any new number or fact. If this question is a "
        "follow-up to the previous conversation, answer with that context in mind."
    )

    response = requests.post(url, json={"contents": [{"parts": [{"text": prompt}]}]})
    data = response.json()
    if "candidates" not in data:
        raise Exception(f"Generation failed: {data}")
    return data["candidates"][0]["content"]["parts"][0]["text"]


def format_time(sec: Optional[int]) -> Optional[str]:
    if sec is None:
        return None
    m = str(sec // 60).zfill(2)
    s = str(sec % 60).zfill(2)
    return f"{m}:{s}"


def build_ui_control(record: dict) -> dict:
    badge_colors = {"flagged": "amber", "pending_approval": "amber", "completed": "green"}
    suggested_actions_by_status = {
        "flagged": ["Approve difference", "Reject transaction", "View raw log file"],
        "pending_approval": ["Approve payment", "Escalate to senior controller"],
        "completed": ["View raw log file"],
    }
    return {
        "show_replay_button": record["replay_timestamp_seconds"] is not None,
        "replay_timestamp_seconds": record["replay_timestamp_seconds"],
        "replay_timestamp_formatted": format_time(record["replay_timestamp_seconds"]),
        "status_badge": record["status"].upper(),
        "badge_color": badge_colors.get(record["status"], "gray"),
        "highlight_agent_id": record["agent_id"],
        "suggested_actions": suggested_actions_by_status.get(record["status"], []),
    }


@app.post("/api/chat")
def chat(req: ChatRequest):
    try:
        if req.session_id not in sessions:
            sessions[req.session_id] = []
        history = sessions[req.session_id]

        record = semantic_retrieve(req.message, logs)
        nlp_response = generate_explanation(req.message, record, history)

        history.append({"question": req.message, "answer": nlp_response})
        if len(history) > 10:
            history.pop(0)

        return {
            "status": "success",
            "session_id": req.session_id,
            "intent": "GENERAL_STATUS_QUERY" if record["status"] == "completed" else "TRANSACTION_EXCEPTION_QUERY",
            "query_entities": {
                "transaction_id": record["transaction_id"],
                "workflow": record["workflow"],
            },
            "nlp_response": nlp_response,
            "ui_control": build_ui_control(record),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/health")
def health():
    return {"status": "ok"}
