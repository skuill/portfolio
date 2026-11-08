"""Builds tiny blurred previews of the Interests photos: npm run placeholders (needs Pillow)."""
import base64
import io
import json
from pathlib import Path

from PIL import Image

PREVIEW_WIDTH = 24
STUFF = Path(__file__).parent.parent / "src" / "editable-stuff"


def preview(path):
    image = Image.open(path).convert("RGB")
    height = round(image.height * PREVIEW_WIDTH / image.width)
    buffer = io.BytesIO()
    image.resize((PREVIEW_WIDTH, height), Image.LANCZOS).save(buffer, "WEBP", quality=40)
    return "data:image/webp;base64," + base64.b64encode(buffer.getvalue()).decode()


previews = {path.name: preview(path) for path in sorted(STUFF.glob("interests_*.webp"))}
(STUFF / "photo-placeholders.json").write_text(json.dumps(previews, indent=2) + "\n", encoding="utf-8")
print(f"Saved {len(previews)} previews")
