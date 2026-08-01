# ploutonAI_proposal-landingpage
# context:

UI WORK

FRONTEND

AI AND BACKEND

ALL REQUIRRED REPORTS ARE IN REPORTS FOLDER

# UI DESIGN: SALEHA 
# Figma design: 
`https://www.figma.com/design/bTP7NqnMo4G3akGBMqornq/Plouton.AI-Proposal?node-id=0-1&t=olnS5LE3ST090m8z-1`

#  Frontend deployed link: HUZAIFA 
`https://plouton-ai-proposal-landingpage-mg7-smoky.vercel.app/`
# AI AND BACKEND WORK:
# Self-Healing ERP UI Detection API : IZMA 

This service provides AI-powered detection for self-healing UI elements.

## Live Base URL
`https://plouton-ai-proposal-landingpage-hi5.vercel.app/`

## 📖 Interactive API Documentation
You can test and view all endpoints using Swagger UI:
* **Swagger Docs:** `https://plouton-ai-proposal-landingpage-hi5.vercel.app/docs`

## 🔌 API Endpoints

### 1. Health Check
Checks if the backend API service is online and running.

* **URL:** `/`
* **Method:** `GET`
* **Headers:** `Content-Type: application/json`
* **Response (200 OK):**
  ```json
  {
    "status": "online",
    "service": "Self-Healing Agent POC"
  }
  
* **URL:** `/detect`
* **Method:** `POST`
* **Headers:** `Content-Type: application/json`
* **Response (200 OK):**
  ```json
  {
  "old_html": "<div>...</div>",
  "new_html": "<div>...</div>"
  }
  '''json
  {
  "success": true,
  "message": "ERP UI analysis completed",
  "results": {
    "success": true,
    "message": "ERP UI self-healing analysis completed",
    "summary": {
      "old_elements": 75,
      "new_elements": 75,
      "changes_detected": 7,
      "text_changes": 7,
      "attribute_changes": 2,
      "new_elements_detected": 0,
      "removed_elements_detected": 0,
      "self_healing_candidates": 7,
      "review_required": 0
    },
    "results": [
      {
        "change_type": "TEXT CHANGE",
        "original_element": {
          "tag": "div",
          "text": "sidebar main",
          "selector": "div.app",
          "dom_path": "html/body[1]/div[1]",
          "attributes": {
            "id": "",
            "class": "app",
            "name": "",
            "type": "",
            "aria-label": "",
            "role": "",
            "placeholder": ""
          }
        },
        "replacement": {
          "tag": "div",
          "text": "sidebar",
          "selector": "div.app",
          "dom_path": "html/body[1]/div[1]",
          "attributes": {
            "id": "",
            "class": "app",
            "name": "",
            "type": "",
            "aria-label": "",
            "role": "",
            "placeholder": ""
          }
        },
        "changes": [
          {
            "type": "TEXT CHANGE",
            "old": "sidebar main",
            "new": "sidebar"
          }
        ],
        "confidence": 0.8,
        "status": "SELF-HEALING CANDIDATE",
        "healing_action": "Automatically replace div.app with div.app"
      },
      {
        "change_type": "TEXT CHANGE",
        "original_element": {
          "tag": "span",
          "text": "pending approval",
          "selector": "span.badge",
          "dom_path": "html/body[1]/div[1]/main[1]/section[2]/div[1]/div[1]/span[1]",
          "attributes": {
            "id": "",
            "class": "badge",
            "name": "",
            "type": "",
            "aria-label": "",
            "role": "",
            "placeholder": ""
          }
        },
        "replacement": {
          "tag": "span",
          "text": "verified",
          "selector": "span.badge",
          "dom_path": "html/body[1]/div[1]/main[1]/section[2]/div[1]/div[1]/span[1]",
          "attributes": {
            "id": "",
            "class": "badge",
            "name": "",
            "type": "",
            "aria-label": "",
            "role": "",
            "placeholder": ""
          }
        },
        "changes": [
          {
            "type": "TEXT CHANGE",
            "old": "pending approval",
            "new": "verified"
          }
        ],
        "confidence": 0.8,
        "status": "SELF-HEALING CANDIDATE",
        "healing_action": "Automatically replace span.badge with span.badge"
      }
  /* Additional detected changes array */
    ]
  }
  }
  ---

## 🎨 Frontend Integration & UI Workflow Guidance

When the user clicks the **"Open Demo"** button on the solution card, follow this interface workflow:

### 1. Input State
* **Pre-load Data:** Automatically populate the input fields with default sample data (`old_html` and `new_html`).
* **Trigger Action:** Provide an **"Analyze"** / **"Self-Heal"** button that sends a `POST` request to `/detect`.

### 2. Summary Display (Top Metrics)
Map the `results.summary` object to top-level summary cards/widgets:
* **Total Changes Detected:** `results.summary.changes_detected`
* **Text Changes:** `results.summary.text_changes`
* **Attribute Changes:** `results.summary.attribute_changes`
* **Self-Healing Candidates:** `results.summary.self_healing_candidates`

### 3. Detailed Findings Display
Iterate through the `results.results` array to render major UI detection findings:
* **Old vs. New Comparison:** Clearly display structural or text replacements (e.g., `approve invoice` → `process payment`, or `!` → `✓`).
* **Healing Action:** Highlight the automated repair rule for each element using the `healing_action` string (e.g., *Automatically replace #approve-invoice with #process-payment*).
    "status": "online",
    "service": "Self-Healing Agent POC"
  }
