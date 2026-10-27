"""LinkedIn cover in the style of Soviet mosaic panels (sun, mountains, forest, water).

Usage: python mosaic.py        -> linkedin-cover.png (the medallion variant in use)
       python mosaic.py all    -> also variant-panel.png and variant-frieze.png

Scenes are described in 1584x396 coordinates; the output is 2x (3168x792). Every scene is laid as
small irregular tiles with light grout, like a real mosaic. The profile photo covers the bottom-left,
so nothing important lives there.
"""
import math
import random
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).parent
W, H, S = 1584, 396, 2
FONT = "bahnschrift.ttf"  # ships with Windows 10+; Pillow finds it in the system fonts folder

PAPER = (250, 247, 241)
SKY = (240, 233, 219)
OCHRE = (226, 162, 59)
OCHRE_PALE = (240, 207, 138)
TERRACOTTA = (199, 86, 47)
TEAL = (86, 157, 146)
SLATE = (140, 172, 194)
DEEP = (36, 71, 107)
PINE = (38, 74, 62)
PINE_LIGHT = (56, 102, 84)
SNOW = (251, 250, 246)
WATER = (44, 93, 134)
WATER_LIGHT = (91, 141, 181)
INK = (34, 40, 49)


def ridge(x, peaks):
    """Height of a mountain range at x: straight slopes between (x, y) peaks and valleys."""
    for (x0, y0), (x1, y1) in zip(peaks, peaks[1:]):
        if x0 <= x <= x1:
            return y0 + (y1 - y0) * (x - x0) / (x1 - x0)
    return H


def in_triangle(x, y, apex_x, apex_y, base_y, half_width):
    if not apex_y <= y <= base_y:
        return False
    return abs(x - apex_x) <= half_width * (y - apex_y) / (base_y - apex_y)


def landscape(sun, back, front, trees, water_y, sky=None):
    """Returns colour_at(x, y) for a sun, two mountain ranges, pines and water."""
    sx, sy, sr = sun

    def colour_at(x, y):
        if y >= water_y:
            wave = 3 * math.sin(x / 18)
            return WATER_LIGHT if (y - water_y + wave) % 18 < 5 else WATER
        for ax, base, h, hw in trees:
            if in_triangle(x, y, ax, base - h, base - h * 0.45, hw * 0.7) or in_triangle(x, y, ax, base - h * 0.7, base, hw):
                return PINE_LIGHT if x < ax else PINE
        front_y = ridge(x, front)
        if y >= front_y:
            return TEAL
        back_y = ridge(x, back)
        if y >= back_y:
            return SNOW if y < back_y + 14 and back_y < 205 else SLATE
        d = math.hypot(x - sx, y - sy)
        if d < sr * 0.5:
            return OCHRE
        if d < sr * 0.72:
            return TERRACOTTA
        if d < sr:
            return OCHRE
        if d < sr * 1.75:
            angle = math.degrees(math.atan2(y - sy, x - sx)) % 360
            if int(angle // 12) % 2 == 0:
                return OCHRE_PALE
        return sky

    return colour_at


def lay_tiles(image, colour_at, box, tile=10, grout=1.3, seed=1, inside=None):
    """Covers box (x0, y0, x1, y1, in 1x units) with jittered square tiles."""
    rnd = random.Random(seed)
    draw = ImageDraw.Draw(image)
    x0, y0, x1, y1 = box
    rows = int((y1 - y0) / tile) + 1
    cols = int((x1 - x0) / tile) + 1
    for j in range(rows):
        shift = (j % 2) * tile * 0.5
        for i in range(-1, cols):
            cx = x0 + i * tile + shift + tile / 2
            cy = y0 + j * tile + tile / 2
            if inside and not inside(cx, cy):
                continue
            base = colour_at(cx, cy)
            if base is None:
                continue
            k = rnd.uniform(0.95, 1.04)
            colour = tuple(max(0, min(255, int(c * k + rnd.uniform(-3, 3)))) for c in base)
            half = tile / 2 - grout
            corners = []
            for dx, dy in ((-1, -1), (1, -1), (1, 1), (-1, 1)):
                corners.append(((cx + dx * half + rnd.uniform(-0.6, 0.6)) * S, (cy + dy * half + rnd.uniform(-0.6, 0.6)) * S))
            draw.polygon(corners, fill=colour)


def font(size, style):
    f = ImageFont.truetype(FONT, size * S)
    f.set_variation_by_name(style)
    return f


def text_block(image, right, centre_y, lines, colour=INK):
    """lines: [(text, size, style, gap_after)]; right-aligned at x=right (1x units)."""
    draw = ImageDraw.Draw(image)
    total = sum(size + gap for _, size, _, gap in lines)
    y = centre_y - total / 2
    for text, size, style, gap in lines:
        f = font(size, style)
        width = draw.textlength(text, font=f)
        draw.text((right * S - width, y * S), text, font=f, fill=colour)
        y += size + gap


TAGLINE = [("From the first idea", 40, "SemiBold", 4), ("to stable production.", 40, "SemiBold", 18),
           ("Building backends since 2014", 18, "Regular", 0)]

BACK = [(380, 260), (470, 175), (560, 230), (650, 150), (760, 240), (860, 160), (980, 250), (1080, 140),
        (1200, 235), (1300, 165), (1420, 245), (1500, 180), (1584, 230)]
FRONT = [(380, 300), (520, 225), (640, 290), (740, 235), (900, 300), (1010, 245), (1150, 305), (1270, 250),
         (1400, 300), (1584, 260)]
TREES = [(x, 366, h, h * 0.30) for x, h in ((440, 96), (474, 70), (690, 84), (722, 112), (756, 78), (1100, 90),
                                              (1134, 120), (1168, 82), (1450, 100), (1486, 74))]


def panel():
    """1. Full-width mosaic panel, no text."""
    image = Image.new("RGB", (W * S, H * S), PAPER)
    scene = landscape((1030, 150, 80), BACK, FRONT, TREES, 366)
    lay_tiles(image, scene, (0, 0, W, H), seed=3)
    image.save(OUT / "variant-panel.png")


def round_mosaic(image, cx, cy, r, tile=9, ring=3):
    """A round mosaic in a terracotta ring centred at (cx, cy). The scene is laid out for r=168 and scaled to r.
    Also used by branding/social-image/social_image.py."""
    k = r / 168
    back = [(cx - r, cy + 40 * k), (cx - 90 * k, cy - 40 * k), (cx - 20 * k, cy + 20 * k), (cx + 60 * k, cy - 60 * k),
            (cx + r, cy + 30 * k)]
    front = [(cx - r, cy + 80 * k), (cx - 60 * k, cy + 30 * k), (cx + 30 * k, cy + 75 * k), (cx + 110 * k, cy + 40 * k),
             (cx + r, cy + 85 * k)]
    trees = [(cx - 100 * k, cy + 118 * k, 62 * k, 20 * k), (cx - 74 * k, cy + 118 * k, 46 * k, 15 * k),
             (cx + 80 * k, cy + 118 * k, 56 * k, 18 * k)]
    scene = landscape((cx + 10 * k, cy - 40 * k, 62 * k), back, front, trees, cy + 118 * k)
    lay_tiles(image, scene, (cx - r, cy - r, cx + r, cy + r), tile=tile, seed=5,
              inside=lambda x, y: math.hypot(x - cx, y - cy) <= r - ring - 1)
    draw = ImageDraw.Draw(image)
    draw.ellipse(((cx - r) * S, (cy - r) * S, (cx + r) * S, (cy + r) * S), outline=TERRACOTTA, width=ring * S)


def medallion():
    """2. White space, a round mosaic medallion on the right, tagline next to it."""
    image = Image.new("RGB", (W * S, H * S), PAPER)
    cx, cy, r = 1330, 198, 168
    round_mosaic(image, cx, cy, r)
    text_block(image, cx - r - 56, cy, TAGLINE)
    image.save(OUT / "linkedin-cover.png")


def frieze():
    """3. Light background, a mosaic frieze along the bottom, tagline above it."""
    image = Image.new("RGB", (W * S, H * S), PAPER)
    top = 250
    back = [(0, 330), (200, 290), (330, 320), (520, 270), (700, 315), (860, 262), (1030, 312), (1180, 268),
            (1360, 318), (1480, 275), (1584, 300)]
    front = [(0, 360), (260, 318), (450, 352), (620, 312), (820, 356), (980, 318), (1200, 358), (1380, 320), (1584, 352)]
    trees = [(x, 372, h, h * 0.32) for x, h in ((560, 44), (580, 34), (900, 48), (922, 36), (1250, 46), (1272, 34))]

    def scene(x, y):
        if y < top:
            return None
        colour = landscape((1460, 284, 30), back, front, trees, 376)(x, y)
        return colour

    lay_tiles(image, scene, (0, top, W, H), tile=8, seed=7)
    draw = ImageDraw.Draw(image)
    draw.line((0, (top - 6) * S, W * S, (top - 6) * S), fill=TERRACOTTA, width=2 * S)
    text_block(image, 1496, 128, TAGLINE)
    image.save(OUT / "variant-frieze.png")


if __name__ == "__main__":
    import sys

    medallion()
    if "all" in sys.argv[1:]:
        panel()
        frieze()
    print("done")
