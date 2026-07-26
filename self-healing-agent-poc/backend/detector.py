from bs4 import BeautifulSoup
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import re


# ============================================================
# AI MODEL
# ============================================================

# Lightweight local semantic model
model = SentenceTransformer("all-MiniLM-L6-v2")


# ============================================================
# TEXT CLEANING
# ============================================================

def clean_text(text):
    if not text:
        return ""

    text = re.sub(r"\s+", " ", text)
    return text.strip().lower()


# ============================================================
# DIRECT TEXT
# ============================================================

def get_direct_text(tag):
    """
    Gets text directly belonging to an HTML element.
    Prevents parent divs from duplicating all child text.
    """

    direct_parts = []

    for item in tag.contents:

        if getattr(item, "name", None) is None:
            value = clean_text(str(item))

            if value:
                direct_parts.append(value)

    return clean_text(" ".join(direct_parts))


# ============================================================
# DOM PATH
# ============================================================

def get_dom_path(tag):
    """
    Creates a stable DOM path based on tag positions.

    Example:
    html/body/div[1]/main/section[2]/div[1]/button[1]

    IDs and classes are intentionally ignored so that
    ID/class changes themselves can be detected.
    """

    path = []

    current = tag

    while current is not None and getattr(current, "name", None):

        if current.name == "html":
            path.append("html")
            break

        parent = current.parent

        if parent is None or not getattr(parent, "find_all", None):
            path.append(current.name)
            break

        same_tags = [
            child
            for child in parent.find_all(current.name, recursive=False)
        ]

        try:
            position = same_tags.index(current) + 1
        except ValueError:
            position = 1

        path.append(f"{current.name}[{position}]")

        current = parent

    return "/".join(reversed(path))


# ============================================================
# SELECTOR
# ============================================================

def get_selector(tag):

    if tag.get("id"):
        return f"#{tag.get('id')}"

    classes = tag.get("class", [])

    if classes:
        return (
            tag.name
            + "."
            + ".".join(
                clean_text(str(c)).replace(" ", "-")
                for c in classes
            )
        )

    return tag.name


# ============================================================
# ATTRIBUTES
# ============================================================

def get_attributes(tag):

    return {
        "id": tag.get("id", ""),
        "class": " ".join(tag.get("class", [])),
        "name": tag.get("name", ""),
        "type": tag.get("type", ""),
        "aria-label": tag.get("aria-label", ""),
        "role": tag.get("role", ""),
        "placeholder": tag.get("placeholder", "")
    }


# ============================================================
# MEANINGFUL ELEMENT EXTRACTION
# ============================================================

def get_elements(html):

    soup = BeautifulSoup(html, "html.parser")

    elements = []

    meaningful_tags = [
        "button",
        "input",
        "select",
        "textarea",
        "a",
        "span",
        "td",
        "th",
        "label",
        "h1",
        "h2",
        "h3",
        "h4",
        "p",
        "div"
    ]

    for tag in soup.find_all(meaningful_tags):

        full_text = clean_text(
            tag.get_text(" ", strip=True)
        )

        direct_text = get_direct_text(tag)

        attributes = get_attributes(tag)

        # ----------------------------------------
        # Decide whether element is meaningful
        # ----------------------------------------

        is_interactive = tag.name in [
            "button",
            "input",
            "select",
            "textarea",
            "a"
        ]

        has_identifier = bool(
            tag.get("id")
            or tag.get("class")
            or tag.get("aria-label")
            or tag.get("role")
        )

        has_text = bool(
            direct_text or full_text
        )

        # Ignore completely decorative containers
        if not is_interactive and not has_text:
            continue

        # For containers, only keep them if they have
        # direct text. This prevents parent divs from
        # duplicating child text.
        if tag.name == "div" and not direct_text:
            continue

        elements.append({

            "tag": tag.name,

            "text": direct_text or full_text,

            "full_text": full_text,

            "selector": get_selector(tag),

            "dom_path": get_dom_path(tag),

            "attributes": attributes,

            "html": str(tag)[:1000]

        })

    return elements


# ============================================================
# TEXT SIMILARITY
# ============================================================

def semantic_similarity(text1, text2):

    text1 = clean_text(text1)
    text2 = clean_text(text2)

    if not text1 or not text2:
        return 0.0

    if text1 == text2:
        return 1.0

    try:

        embeddings = model.encode(
            [text1, text2],
            convert_to_numpy=True
        )

        score = cosine_similarity(
            [embeddings[0]],
            [embeddings[1]]
        )[0][0]

        return float(score)

    except Exception:
        return 0.0


# ============================================================
# ATTRIBUTE CHANGES
# ============================================================

def detect_attribute_changes(old_attr, new_attr):

    changes = []

    keys = [
        "id",
        "class",
        "name",
        "type",
        "aria-label",
        "role",
        "placeholder"
    ]

    for key in keys:

        old_value = clean_text(str(old_attr.get(key, "")))
        new_value = clean_text(str(new_attr.get(key, "")))

        if old_value != new_value:

            # Only report if either side has a value
            if old_value or new_value:

                changes.append({
                    "type": f"{key.upper()} CHANGE",
                    "old": old_attr.get(key, ""),
                    "new": new_attr.get(key, "")
                })

    return changes


# ============================================================
# CHANGE TYPE
# ============================================================

def get_change_type(text_changed, attribute_changes, tag_changed=False):

    changes = []

    if text_changed:
        changes.append("TEXT CHANGE")

    for change in attribute_changes:
        changes.append(change["type"])

    if tag_changed:
        changes.append("ELEMENT TYPE CHANGE")

    return ", ".join(changes)


# ============================================================
# CONFIDENCE
# ============================================================

def calculate_confidence(
    old_element,
    new_element,
    same_dom_path=False
):

    score = 0.0

    # Same DOM position is extremely strong evidence
    if same_dom_path:
        score += 0.55

    # Same tag
    if old_element["tag"] == new_element["tag"]:
        score += 0.15

    # Same parent structure / path prefix
    old_parent = old_element["dom_path"].rsplit("/", 1)[0]
    new_parent = new_element["dom_path"].rsplit("/", 1)[0]

    if old_parent == new_parent:
        score += 0.10

    # Semantic similarity
    semantic = semantic_similarity(
        old_element["text"],
        new_element["text"]
    )

    score += semantic * 0.20

    return round(min(score, 1.0), 3)


# ============================================================
# FIND SEMANTIC FALLBACK MATCH
# ============================================================

def find_semantic_match(old_element, new_elements, used_paths):

    candidates = []

    for new_element in new_elements:

        if new_element["dom_path"] in used_paths:
            continue

        # Prefer same tag
        tag_bonus = (
            0.15
            if old_element["tag"] == new_element["tag"]
            else 0
        )

        semantic = semantic_similarity(
            old_element["text"],
            new_element["text"]
        )

        score = semantic * 0.85 + tag_bonus

        candidates.append(
            (score, new_element)
        )

    if not candidates:
        return None

    candidates.sort(
        key=lambda x: x[0],
        reverse=True
    )

    best_score, best_element = candidates[0]

    # Only accept meaningful semantic matches
    if best_score >= 0.55:

        return {
            "element": best_element,
            "confidence": round(
                min(best_score, 1.0),
                3
            )
        }

    return None


# ============================================================
# MAIN SELF-HEALING DETECTOR
# ============================================================

def detect_self_healing(old_html, new_html):

    old_elements = get_elements(old_html)
    new_elements = get_elements(new_html)

    old_by_path = {
        item["dom_path"]: item
        for item in old_elements
    }

    new_by_path = {
        item["dom_path"]: item
        for item in new_elements
    }

    results = []

    used_new_paths = set()

    # ========================================================
    # 1. FIRST PASS
    # Compare elements at the SAME DOM POSITION
    # ========================================================

    for path, old_element in old_by_path.items():

        new_element = new_by_path.get(path)

        if new_element is None:
            continue

        used_new_paths.add(path)

        text_changed = (
            clean_text(old_element["text"])
            != clean_text(new_element["text"])
        )

        attribute_changes = detect_attribute_changes(
            old_element["attributes"],
            new_element["attributes"]
        )

        tag_changed = (
            old_element["tag"]
            != new_element["tag"]
        )

        # No change
        if (
            not text_changed
            and not attribute_changes
            and not tag_changed
        ):
            continue

        change_type = get_change_type(
            text_changed,
            attribute_changes,
            tag_changed
        )

        confidence = calculate_confidence(
            old_element,
            new_element,
            same_dom_path=True
        )

        # ====================================================
        # STATUS
        # ====================================================

        if confidence >= 0.70:

            status = "SELF-HEALING CANDIDATE"

            healing_action = (
                f"Automatically replace "
                f"{old_element['selector']} "
                f"with {new_element['selector']}"
            )

        elif confidence >= 0.50:

            status = "REVIEW REQUIRED"

            healing_action = (
                f"Possible replacement: "
                f"{old_element['selector']} "
                f"-> {new_element['selector']}"
            )

        else:

            status = "LOW CONFIDENCE"

            healing_action = "Manual review required"

        results.append({

            "change_type": change_type,

            "original_element": {
                "tag": old_element["tag"],
                "text": old_element["text"],
                "selector": old_element["selector"],
                "dom_path": old_element["dom_path"],
                "attributes": old_element["attributes"]
            },

            "replacement": {
                "tag": new_element["tag"],
                "text": new_element["text"],
                "selector": new_element["selector"],
                "dom_path": new_element["dom_path"],
                "attributes": new_element["attributes"]
            },

            "changes": (
                (
                    [{
                        "type": "TEXT CHANGE",
                        "old": old_element["text"],
                        "new": new_element["text"]
                    }]
                    if text_changed
                    else []
                )
                + attribute_changes
                + (
                    [{
                        "type": "ELEMENT TYPE CHANGE",
                        "old": old_element["tag"],
                        "new": new_element["tag"]
                    }]
                    if tag_changed
                    else []
                )
            ),

            "confidence": confidence,

            "status": status,

            "healing_action": healing_action

        })

    # ========================================================
    # 2. SEMANTIC FALLBACK
    # Handles moved/restructured elements
    # ========================================================

    for old_element in old_elements:

        path = old_element["dom_path"]

        # Already compared
        if path in new_by_path:
            continue

        match = find_semantic_match(
            old_element,
            new_elements,
            used_new_paths
        )

        if match is None:
            continue

        new_element = match["element"]

        used_new_paths.add(
            new_element["dom_path"]
        )

        confidence = match["confidence"]

        results.append({

            "change_type": "ELEMENT RELOCATED / POSSIBLE REPLACEMENT",

            "original_element": {
                "tag": old_element["tag"],
                "text": old_element["text"],
                "selector": old_element["selector"],
                "dom_path": old_element["dom_path"],
                "attributes": old_element["attributes"]
            },

            "replacement": {
                "tag": new_element["tag"],
                "text": new_element["text"],
                "selector": new_element["selector"],
                "dom_path": new_element["dom_path"],
                "attributes": new_element["attributes"]
            },

            "changes": [],

            "confidence": confidence,

            "status": (
                "SELF-HEALING CANDIDATE"
                if confidence >= 0.70
                else "REVIEW REQUIRED"
            ),

            "healing_action": (
                f"Possible replacement: "
                f"{old_element['selector']} "
                f"-> {new_element['selector']}"
            )

        })

    # ========================================================
    # 3. NEW ELEMENTS
    # ========================================================

    new_elements_detected = []

    for new_element in new_elements:

        path = new_element["dom_path"]

        if path not in old_by_path:

            # If already consumed by semantic fallback,
            # don't report again.
            if path in used_new_paths:
                continue

            new_elements_detected.append({

                "tag": new_element["tag"],
                "text": new_element["text"],
                "selector": new_element["selector"],
                "dom_path": new_element["dom_path"],
                "attributes": new_element["attributes"]

            })

    # ========================================================
    # 4. REMOVED ELEMENTS
    # ========================================================

    removed_elements = []

    for old_element in old_elements:

        path = old_element["dom_path"]

        if path not in new_by_path:

            removed_elements.append({

                "tag": old_element["tag"],
                "text": old_element["text"],
                "selector": old_element["selector"],
                "dom_path": old_element["dom_path"],
                "attributes": old_element["attributes"]

            })

    # ========================================================
    # SUMMARY
    # ========================================================

    text_changes = sum(
        1
        for result in results
        if "TEXT CHANGE" in result["change_type"]
    )

    attribute_changes = sum(
        1
        for result in results
        if any(
            word in result["change_type"]
            for word in [
                "ID CHANGE",
                "CLASS CHANGE",
                "NAME CHANGE",
                "TYPE CHANGE",
                "ARIA-LABEL CHANGE",
                "ROLE CHANGE",
                "PLACEHOLDER CHANGE"
            ]
        )
    )

    self_healing_candidates = sum(
        1
        for result in results
        if result["status"]
        == "SELF-HEALING CANDIDATE"
    )

    review_required = sum(
        1
        for result in results
        if result["status"]
        == "REVIEW REQUIRED"
    )

    summary = {

        "old_elements": len(old_elements),

        "new_elements": len(new_elements),

        "changes_detected": len(results),

        "text_changes": text_changes,

        "attribute_changes": attribute_changes,

        "new_elements_detected": len(
            new_elements_detected
        ),

        "removed_elements_detected": len(
            removed_elements
        ),

        "self_healing_candidates":
            self_healing_candidates,

        "review_required":
            review_required

    }

    # ========================================================
    # FINAL RESPONSE
    # ========================================================

    return {

        "success": True,

        "message":
            "ERP UI self-healing analysis completed",

        "summary": summary,

        "results": results,

        "new_elements": new_elements_detected,

        "removed_elements": removed_elements

    }