"""Link preview image (Open Graph) in the style of the site's first screen: gradient, stars, thin white text.

Usage: python social_image.py   -> ../../public/social-image.png (1200x630)

Drawn at 2x and scaled down, so thin lines and text stay smooth. The stars use a fixed random seed,
so the same script always produces the same image.
"""
import math
import random
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).parent.parent.parent / "public" / "social-image.png"
W, H, S = 1200, 630, 2
# Segoe UI ships with Windows; the site's first screen uses it too (system font stack, light weight).
LIGHT = "segoeuil.ttf"
SEMILIGHT = "segoeuisl.ttf"

# The first two colours of the site's animated gradient (mainBody.gradientColors in src/editable-stuff/config.js).
# The site shows a small, moving part of it; the image takes the blue and part of the way to the teal,
# where white text still reads well.
BLUE = (98, 147, 202)
TEAL = (26, 215, 192)
TEAL_SHARE = 0.6
ANGLE = 136  # degrees, as in the site's linear-gradient(136deg, ...)
WHITE = (255, 255, 255)

NAME = "Vitaly Kvashin"
ROLE = "Backend Developer (C# / .NET)"
ADDRESS = "skuill.com/portfolio"


def gradient(start, end):
    """A CSS-like linear gradient at ANGLE from start (top left) to end (bottom right)."""
    angle = math.radians(ANGLE)
    dx, dy = math.sin(angle), -math.cos(angle)
    length = abs(W * dx) + abs(H * dy)  # CSS gradient line: the end colours land exactly in the corners
    mask = Image.new("L", (W * S, H * S))
    mask.putdata([
        round(255 * max(0.0, min(1.0, ((x / S - W / 2) * dx + (y / S - H / 2) * dy) / length + 0.5)))
        for y in range(H * S)
        for x in range(W * S)
    ])
    return Image.composite(Image.new("RGB", mask.size, end), Image.new("RGB", mask.size, start), mask)


def stars(image, seed=12):
    """Small and medium white dots, like the two star layers of the site's background."""
    layer = Image.new("RGBA", image.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    rnd = random.Random(seed)
    for count, size in ((150, 1), (45, 2)):
        for _ in range(count):
            x, y = rnd.uniform(0, W) * S, rnd.uniform(0, H) * S
            draw.ellipse((x, y, x + size * S, y + size * S), fill=(*WHITE, rnd.randint(120, 230)))
    return Image.alpha_composite(image.convert("RGBA"), layer)


def font(name, size):
    return ImageFont.truetype(name, size * S)


def text(image):
    draw = ImageDraw.Draw(image)
    centre = W / 2 * S
    draw.text((centre, 228 * S), NAME, font=font(LIGHT, 118), fill=WHITE, anchor="mm")
    draw.text((centre, 330 * S), ROLE, font=font(SEMILIGHT, 40), fill=WHITE, anchor="mm")
    # The address in an outlined pill, like the "More about me" button on the site.
    address = font(SEMILIGHT, 28)
    width = draw.textlength(ADDRESS, font=address) / S + 56
    top, height = 416, 58
    draw.rounded_rectangle(
        ((W - width) / 2 * S, top * S, (W + width) / 2 * S, (top + height) * S),
        radius=8 * S, outline=WHITE, width=round(1.5 * S),
    )
    draw.text((centre, (top + height / 2) * S), ADDRESS, font=address, fill=WHITE, anchor="mm")


if __name__ == "__main__":
    stop = tuple(round(b + (t - b) * TEAL_SHARE) for b, t in zip(BLUE, TEAL))
    image = stars(gradient(BLUE, stop))
    text(image)
    image.convert("RGB").resize((W, H), Image.LANCZOS).save(OUT, optimize=True)
    print(f"{OUT} ({OUT.stat().st_size // 1024} KB)")
