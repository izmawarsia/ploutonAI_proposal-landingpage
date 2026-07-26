from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from detector import detect_self_healing


app = FastAPI(
    title="Self-Healing Agent POC",
    description="AI-powered ERP UI change detection and recovery system"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "status": "online",
        "service": "Self-Healing Agent POC"
    }


@app.post("/detect")
async def detect(
    old_page: UploadFile = File(...),
    new_page: UploadFile = File(...)
):

    old_html = (await old_page.read()).decode("utf-8")
    new_html = (await new_page.read()).decode("utf-8")

    results = detect_self_healing(
        old_html,
        new_html
    )

    return {
        "success": True,
        "message": "ERP UI analysis completed",
        "results": results
    }