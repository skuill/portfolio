"""Imports the bikepacking trips from the local trip archive into the site: npm run trips

The archive (one folder per trip with diary.md, tracks/ and photos/, see docs/bikepacking.md) is only on the author's
computer: its path comes from the TRIPS_ARCHIVE environment variable. The trips to import and their texts are in
scripts/trips.json. For every trip the script writes src/trips/<slug>/ (trip.json, route.json, photos/) and the page
bikepacking/<slug>/index.html. Needs Python 3.11+ with Pillow.
"""
import base64
import io
import json
import math
import os
import re
import shutil
import sys
import xml.etree.ElementTree as ET
from datetime import date, datetime
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
GPX = "{http://www.topografix.com/GPX/1/1}"
TPX = "{http://www.garmin.com/xmlschemas/TrackPointExtension/v2}"
PROFILE_POINTS = 160  # points of the elevation profile per day
LARGE, SMALL, PREVIEW = 1600, 480, 24
PHOTOS_PER_DAY = 8  # when a day has no selection, this many photos spread evenly over the day
TOLERANCE_M = 6  # how far the simplified route may stray from the recorded one
# Lines the watch app adds to every description; they are not part of the story.
NOISE = re.compile(r"^(\d+ Training Load|-- from COROS)\s*$", re.M)
# Strava writes a mention of another athlete as "[strava://athletes/<id>/<n>]Name": the site keeps only the name.
MENTION = re.compile(r"\[strava://[^\]]*\]")


def archive():
    path = os.environ.get("TRIPS_ARCHIVE")
    if not path or not Path(path).is_dir():
        sys.exit("Set TRIPS_ARCHIVE to the folder of the trip archive.")
    return Path(path)


def parse_diary(text, title_prefix):
    """The days of diary.md: number, date, title, km, climbing, moving time and the story."""
    days = []
    for block in re.split(r"\n(?=## Day \d+ · )", text)[1:]:
        block = block.split("\n## Trip report")[0]
        head, _, rest = block.partition("\n\n")
        number, when, name = re.match(r"## Day (\d+) · ([\d.]+) · (.+)", head).groups()
        meta, _, story = rest.partition("\n\n")
        km = float(re.search(r"([\d.,]+) km", meta).group(1).replace(",", ""))
        up = float(re.search(r"↑ ([\d,]+) m", meta).group(1).replace(",", ""))
        moving = re.search(r"moving (\d+:\d+)", meta).group(1)
        day, month, year = map(int, when.split("."))
        story = re.sub(r"\n{3,}", "\n\n", MENTION.sub("", NOISE.sub("", story))).strip()
        days.append({
            "number": int(number),
            "date": date(year, month, day).isoformat(),
            "title": re.sub(title_prefix, "", name).strip() if title_prefix else name,
            "km": round(km, 1),
            "up": round(up),
            "moving": moving,
            "story": [p.strip() for p in story.split("\n\n") if p.strip()],
        })
    return days


def parse_translation(text):
    """diary.en.md: the English title and story of every day it lists, by day number."""
    days = {}
    for block in re.split(r"\n(?=## Day \d+ · )", text)[1:]:
        head, _, story = block.partition("\n")
        number, title = re.match(r"## Day (\d+) · (.+)", head).groups()
        days[int(number)] = {"title": title.strip(), "story": [p.strip() for p in story.split("\n\n") if p.strip()]}
    return days


def parse_general(text, config):
    """The text about the whole trip from the archive's README.md, everything after its first "---" line, as blocks:
    {"h": heading}, {"p": paragraph}, {"ul": [items]} or {"ol": [items]}. Inline links and bold stay in markdown.
    config: "drop" lists headings whose sections are left out, "replace" pairs of [text, replacement]."""
    body = text.split("\n---\n", 1)[1]
    for old, new in config.get("replace", []):
        if old not in body:
            sys.exit(f"Not found in the general text: {old}")
        body = body.replace(old, new)
    sections = re.split(r"\n(?=## )", "\n" + body.strip())
    kept = [s.strip() for s in sections if s.strip() and s.strip().partition("\n")[0][3:].strip() not in config.get("drop", [])]
    blocks = []
    for group in "\n\n".join(kept).split("\n\n"):
        for line in group.strip().split("\n"):
            item = re.match(r"(- |\d+\. )(.*)", line)
            kind = ("ol" if item.group(1)[0].isdigit() else "ul") if item else None
            if line.startswith("## "):
                blocks.append({"h": line[3:].strip()})
            elif kind and blocks and kind in blocks[-1] and blocks[-1].get("open"):
                blocks[-1][kind].append(item.group(2).strip())
            elif kind:
                blocks.append({kind: [item.group(2).strip()], "open": True})
            elif blocks and "p" in blocks[-1] and blocks[-1].get("open"):
                blocks[-1]["p"] += " " + line.strip()
            else:
                blocks.append({"p": line.strip(), "open": True})
        for block in blocks:
            block.pop("open", None)
    return {"title": config["title"], "blocks": blocks}


def picked(selection, day_folder, all_photos):
    chosen = selection.get("days", {}).get(day_folder.name)
    if chosen:
        return [p for p in chosen if p in all_photos]
    if len(all_photos) <= PHOTOS_PER_DAY:
        return all_photos
    step = len(all_photos) / PHOTOS_PER_DAY
    return [all_photos[int(i * step)] for i in range(PHOTOS_PER_DAY)]


def save_photo(source, target_dir, name, reuse):
    image = ImageOps.exif_transpose(Image.open(source)).convert("RGB")
    sizes = {}
    for suffix, longest in (("", LARGE), ("-s", SMALL)):
        target = target_dir / f"{name}{suffix}.webp"
        copy = image.copy()
        copy.thumbnail((longest, longest), Image.LANCZOS)
        # Kept when made from the same photo at the same size; a new selection or a new size is encoded again.
        if not (reuse and target.exists() and Image.open(target).size == copy.size):
            copy.save(target, "WEBP", quality=72, method=4)
        sizes[suffix] = copy.size
    tiny = image.copy()
    tiny.thumbnail((PREVIEW, PREVIEW))
    buffer = io.BytesIO()
    tiny.save(buffer, "WEBP", quality=40)
    width, height = sizes[""]
    return {"name": name, "width": width, "height": height, "blur": "data:image/webp;base64," + base64.b64encode(buffer.getvalue()).decode()}


def track(path):
    """Points of a GPX track: lat, lon and, where recorded, elevation, time, temperature and heart rate."""
    points = []
    for p in ET.parse(path).getroot().iter(f"{GPX}trkpt"):
        value = lambda tag, ns=GPX: p.findtext(f".//{ns}{tag}")
        points.append({
            "lat": float(p.get("lat")),
            "lon": float(p.get("lon")),
            "ele": float(value("ele")) if value("ele") else None,
            "time": datetime.fromisoformat(value("time").replace("Z", "+00:00")) if value("time") else None,
            "temp": float(value("atemp", TPX)) if value("atemp", TPX) else None,
            "hr": int(value("hr", TPX)) if value("hr", TPX) else None,
        })
    return points


def distance_km(a, b):
    lat1, lon1, lat2, lon2 = map(math.radians, (a["lat"], a["lon"], b["lat"], b["lon"]))
    h = math.sin((lat2 - lat1) / 2) ** 2 + math.cos(lat1) * math.cos(lat2) * math.sin((lon2 - lon1) / 2) ** 2
    return 12742 * math.asin(math.sqrt(h))


def day_numbers(points, km, moving):
    """Statistics of a day from its track: time on the road, average speed, highest and lowest point,
    temperature, average heart rate and an elevation profile of [km, m] pairs."""
    stats = {}
    times = [p["time"] for p in points if p["time"]]
    if times:
        minutes = round((times[-1] - times[0]).total_seconds() / 60)
        stats["elapsed"] = f"{minutes // 60}:{minutes % 60:02d}"
    hours, mins = map(int, moving.split(":"))
    if hours or mins:
        stats["speed"] = round(km / (hours + mins / 60), 1)
    heights = [p["ele"] for p in points if p["ele"] is not None]
    if heights:
        stats["highest"], stats["lowest"] = round(max(heights)), round(min(heights))
    temps = [p["temp"] for p in points if p["temp"] is not None]
    if temps:
        stats["temp"] = [round(min(temps)), round(max(temps))]
    pulse = [p["hr"] for p in points if p["hr"]]
    if pulse:
        stats["hr"] = round(sum(pulse) / len(pulse))
    if heights:
        walked, profile = 0.0, []
        for i, p in enumerate(points):
            if i:
                walked += distance_km(points[i - 1], p)
            if p["ele"] is not None:
                profile.append((walked, p["ele"]))
        step = max(1, len(profile) // PROFILE_POINTS)
        sampled = profile[::step] + ([profile[-1]] if (len(profile) - 1) % step else [])
        stats["profile"] = [[round(k, 2), round(e)] for k, e in sampled]
    return stats


def simplify(points, tolerance_m):
    """Ramer-Douglas-Peucker on a local flat projection; keeps the shape within tolerance_m metres."""
    if len(points) < 3:
        return points
    lat0 = math.radians(sum(p[0] for p in points) / len(points))
    xy = [(math.radians(lon) * math.cos(lat0) * 6371000, math.radians(lat) * 6371000) for lat, lon in points]
    keep = [False] * len(points)
    keep[0] = keep[-1] = True
    stack = [(0, len(points) - 1)]
    while stack:
        first, last = stack.pop()
        (x1, y1), (x2, y2) = xy[first], xy[last]
        length = math.hypot(x2 - x1, y2 - y1) or 1e-9
        worst, index = 0.0, None
        for i in range(first + 1, last):
            x, y = xy[i]
            distance = abs((x2 - x1) * (y1 - y) - (x1 - x) * (y2 - y1)) / length
            if distance > worst:
                worst, index = distance, i
        if index is not None and worst > tolerance_m:
            keep[index] = True
            stack += [(first, index), (index, last)]
    return [p for p, k in zip(points, keep) if k]


def trim(points, start_km, end_km):
    """Drops the first and last kilometres, so a track that starts or ends at home does not show it."""
    def cut(pts, km):
        if km <= 0:
            return pts
        walked = 0.0
        for i in range(1, len(pts)):
            (a, b), (c, d) = pts[i - 1], pts[i]
            walked += math.hypot((d - b) * math.cos(math.radians(a)), c - a) * 111.32
            if walked >= km:
                return pts[i:]
        return []
    return cut(cut(points, start_km)[::-1], end_km)[::-1]


def page(trip, template):
    return (template
            .replace("{{title}}", trip["title"])
            .replace("{{description}}", trip["intro"])
            .replace("{{slug}}", trip["slug"]))


def main():
    source_root = archive()
    trips = json.loads((ROOT / "scripts" / "trips.json").read_text(encoding="utf-8"))
    template = (ROOT / "scripts" / "trip-page.html").read_text(encoding="utf-8")
    # npm run trips -- <slug> ...: only these trips; the list of all trips is written again either way.
    only = set(sys.argv[1:])
    for config in trips:
        if only and config["slug"] not in only:
            continue
        source = source_root / config["archive"]
        target = ROOT / "src" / "trips" / config["slug"]
        (target / "photos").mkdir(parents=True, exist_ok=True)
        written = set()
        # Which archive photo each site photo was made from: the same one under the same name is not encoded again.
        sources_file = target / "sources.json"
        old_sources = json.loads(sources_file.read_text(encoding="utf-8")) if sources_file.exists() else {}
        sources = {}
        days = parse_diary((source / "diary.md").read_text(encoding="utf-8"), config.get("dayTitlePrefix"))
        # A diary written in another language has its English days in diary.en.md: they replace the title and the story.
        english = source / "diary.en.md"
        if english.exists():
            for number, text in parse_translation(english.read_text(encoding="utf-8")).items():
                days[number - 1].update(text)
        selection_file = source / "selection.json"
        selection = json.loads(selection_file.read_text(encoding="utf-8")) if selection_file.exists() else {}
        day_folders = sorted((source / "photos").glob("day-*"))
        cover = None
        for day, folder in zip(days, day_folders):
            all_photos = sorted(p.name for p in folder.iterdir() if p.suffix.lower() in (".jpg", ".jpeg", ".png", ".webp"))
            day["photos"] = []
            for n, photo in enumerate(picked(selection, folder, all_photos), 1):
                name = f"d{day['number']:02d}-{n:02d}"
                origin = f"{folder.name}/{photo}"
                day["photos"].append(save_photo(folder / photo, target / "photos", name, old_sources.get(name) == origin))
                sources[name] = origin
                written.update({f"{name}.webp", f"{name}-s.webp"})
                if selection.get("cover") == f"{folder.name}/{photo}":
                    cover = name
        # A cover that is not one of the day photos, such as the picture already shown on the main page.
        cover_photo = None
        if config.get("coverImage"):
            cover_photo = save_photo(ROOT / config["coverImage"], target / "photos", "cover", old_sources.get("cover") == config["coverImage"])
            cover = "cover"
            sources["cover"] = config["coverImage"]
            written.update({"cover.webp", "cover-s.webp"})
        sources_file.write_text(json.dumps(sources, indent=1) + "\n", encoding="utf-8")
        for stale in (target / "photos").glob("*.webp"):
            if stale.name not in written:
                stale.unlink()
        route = []
        for day in days:
            gpx = source / "tracks" / f"day-{day['number']:02d}_{day['date']}.gpx"
            points = track(gpx) if gpx.exists() else []
            day.update(day_numbers(points, day["km"], day["moving"]))
            coordinates = [(p["lat"], p["lon"]) for p in points]
            route.append([[round(lon, 5), round(lat, 5)] for lat, lon in simplify(coordinates, TOLERANCE_M)])
        if route:
            first = next(i for i, r in enumerate(route) if r)
            last = max(i for i, r in enumerate(route) if r)
            route[first] = [[lon, lat] for lat, lon in trim([(b, a) for a, b in route[first]], config.get("trimStartKm", 0), 0)]
            route[last] = [[lon, lat] for lat, lon in trim([(b, a) for a, b in route[last]], 0, config.get("trimEndKm", 0))]
        data = {
            "slug": config["slug"],
            "title": config["title"],
            "intro": config["intro"],
            "start": days[0]["date"],
            "end": days[-1]["date"],
            "km": math.floor(sum(d["km"] for d in days) + 0.5),
            "up": sum(d["up"] for d in days),
            "cover": cover or next(d["photos"][0]["name"] for d in days if d["photos"]),
            "links": config.get("links", []),
            "days": days,
        }
        if cover_photo:
            data["coverPhoto"] = cover_photo
        if config.get("general"):
            data["general"] = parse_general((source / "README.md").read_text(encoding="utf-8"), config["general"])
        shutil.copyfile(target / "photos" / f"{data['cover']}-s.webp", target / "cover.webp")
        (target / "trip.json").write_text(json.dumps(data, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
        (target / "route.json").write_text(json.dumps(route, separators=(",", ":")) + "\n", encoding="utf-8")
        page_dir = ROOT / "bikepacking" / config["slug"]
        page_dir.mkdir(parents=True, exist_ok=True)
        (page_dir / "index.html").write_text(page(config, template), encoding="utf-8")
        size = sum(f.stat().st_size for f in target.rglob("*") if f.is_file()) / 2**20
        points = sum(len(r) for r in route)
        print(f"{config['slug']}: {len(days)} days, {sum(len(d['photos']) for d in days)} photos, {points} route points, {size:.1f} MB")

    write_index()


def write_index():
    """A small list of all imported trips for the list page, so it does not load every trip."""
    entries = []
    for file in sorted((ROOT / "src" / "trips").glob("*/trip.json")):
        trip = json.loads(file.read_text(encoding="utf-8"))
        cover = trip.get("coverPhoto") or next(p for d in trip["days"] for p in d["photos"] if p["name"] == trip["cover"])
        entries.append({k: trip[k] for k in ("slug", "title", "intro", "start", "end", "km", "up")} | {"days": len(trip["days"]), "cover": cover})
    entries.sort(key=lambda e: e["start"], reverse=True)
    (ROOT / "src" / "trips" / "index.json").write_text(json.dumps(entries, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")


main()
