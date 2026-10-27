"""Link preview image (Open Graph) in the style of the LinkedIn cover: light background, the round mosaic, Bahnschrift.

Usage: python social_image.py   -> ../../public/social-image.png (1200x630)

The mosaic comes from ../linkedin-cover/mosaic.py, so the preview and the cover stay alike. Drawn at 2x and
scaled down; the tiles use a fixed random seed, so the same script always produces the same image.
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent / "linkedin-cover"))
from mosaic import INK, PAPER, S, TERRACOTTA, Image, ImageDraw, font, round_mosaic  # noqa: E402

OUT = Path(__file__).parent.parent.parent / "public" / "social-image.png"
W, H = 1200, 630

NAME = "Vitaly Kvashin"
ROLE = "Backend Developer (C# / .NET)"
ADDRESS = "skuill.com/portfolio"


if __name__ == "__main__":
    image = Image.new("RGB", (W * S, H * S), PAPER)
    round_mosaic(image, cx=880, cy=315, r=215, tile=11, ring=4)
    draw = ImageDraw.Draw(image)
    left = 90
    draw.text((left * S, 200 * S), NAME, font=font(64, "SemiBold"), fill=INK)
    draw.text((left * S, 290 * S), ROLE, font=font(32, "Regular"), fill=INK)
    draw.line((left * S, 365 * S, (left + 64) * S, 365 * S), fill=TERRACOTTA, width=3 * S)
    draw.text((left * S, 392 * S), ADDRESS, font=font(26, "Regular"), fill=TERRACOTTA)
    image.resize((W, H), Image.LANCZOS).save(OUT, optimize=True)
    print(f"{OUT} ({OUT.stat().st_size // 1024} KB)")
