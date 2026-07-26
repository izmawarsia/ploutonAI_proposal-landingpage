import json
import os
import math

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

with open("logs.json", "r", encoding="utf-8") as f:
    logs = json.load(f)

app = FastAPI(
    title="Natural Language Audit Assistant API",
    description="""
REST API for querying finance audit logs using natural language.

Features:
- Semantic Search using Gemini Embeddings
- AI-generated Audit Explanations
- Multi-turn Conversation Support
- Finance Controller Audit Assistant
""",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Stores conversation history
sessions = {}


class ChatRequest(BaseModel):
    session_id: str
    message: str


def get_embedding(text: str):

    url = (
    "https://generativelanguage.googleapis.com/v1beta/models/"
    f"gemini-embedding-001:embedContent?key={GEMINI_API_KEY}"
)

    response = requests.post(
        url,
        json={
            "model": "models/gemini-embedding-001",
            "content": {
                "parts": [
                    {
                        "text": text
                    }
                ]
            }
        }
    )

    data = response.json()

    if "embedding" not in data:
        raise Exception(data)

    return data["embedding"]["values"]


def cosine_similarity(a, b):

    dot = sum(x * y for x, y in zip(a, b))

    mag_a = math.sqrt(sum(x * x for x in a))

    mag_b = math.sqrt(sum(x * x for x in b))

    return dot / (mag_a * mag_b)


def semantic_retrieve(question, logs):

    question_embedding = get_embedding(question)

    scored = []

    for log in logs:

        log_embedding = get_embedding(log["description"])

        score = cosine_similarity(
            question_embedding,
            log_embedding
        )

        scored.append(
            {
                **log,
                "score": score
            }
        )

    scored.sort(
        key=lambda x: x["score"],
        reverse=True
    )

    return scored[0]


def generate_explanation(question, record, history):

    url = (
    f"https://generativelanguage.googleapis.com/v1beta/models/"
    f"gemini-3-flash-preview:generateContent?key={GEMINI_API_KEY}"
)
    history_text = ""

    if history:

        history_text = (
            "Previous Conversation:\n\n"
            + "\n".join(
                f"User: {item['question']}\nAssistant: {item['answer']}"
                for item in history
            )
            + "\n\n"
        )

    prompt = f"""
You are an AI Finance Audit Assistant.

Your job is to answer finance controller questions using ONLY the supplied audit record.

{history_text}

Audit Record:

{json.dumps(record, indent=2)}

User Question:

{question}

Instructions:

- Answer only from the audit record.
- Do not invent facts.
- Keep answers professional and concise.
- If the answer is unavailable in the audit record, clearly state that.
- Understand follow-up questions using previous conversation.
"""

    response = requests.post(
        url,
        json={
            "contents": [
                {
                    "parts": [
                        {
                            "text": prompt
                        }
                    ]
                }
            ]
        }
    )

    data = response.json()

    if "candidates" not in data:
        raise Exception(data)

    return data["candidates"][0]["content"]["parts"][0]["text"]


def detect_intent(question):

    q = question.lower()

    if "why" in q or "flag" in q:
        return "TRANSACTION_EXCEPTION_QUERY"

    elif "workflow" in q:
        return "WORKFLOW_QUERY"

    elif "close cycle" in q or "month-end" in q:
        return "CLOSE_CYCLE_QUERY"

    else:
        return "GENERAL_STATUS_QUERY"


@app.post("/api/chat")
def chat(req: ChatRequest):

    try:

        if req.session_id not in sessions:
            sessions[req.session_id] = []

        history = sessions[req.session_id]

        record = semantic_retrieve(
            req.message,
            logs
        )

        answer = generate_explanation(
            req.message,
            record,
            history
        )

        history.append(
            {
                "question": req.message,
                "answer": answer
            }
        )

        if len(history) > 10:
            history.pop(0)

        return {
    "status": "success",
    "session_id": req.session_id,
    "intent": detect_intent(req.message),
    "query_entities": {
        "transaction_id": record.get("transaction_id"),
        "workflow": record.get("workflow"),
        "transaction_status": record.get("status")
    },
    "nlp_response": answer
}
    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@app.get("/api/health")
def health():

    return {

        "status": "ok",

        "service": "Natural Language Audit Assistant",

        "version": "1.0.0"

    }