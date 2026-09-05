#!/usr/bin/env python3
"""Pack concept-master paintings into GDevelop slot PNGs + SVG UI sources.

Masters live in games/zombie-runner/assets/wroclaw-v1/concept-masters/
Outputs overwrite wroclaw-v1 slot files and ui/*.png plus svg/*.svg
"""
from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / "games" / "zombie-runner" / "assets" / "wroclaw-v1"
DROP = ROOT / "docs" / "codex-manual-tasks" / "refs" / "goal-005" / "art-drop"
MASTERS = BASE / "concept-masters"
SVG = BASE / "svg"
UI = BASE / "ui"

DROP_FILES = {
    "bg": "bg.png",
    "ground": "ground.png",
    "run": "runner-run-01.png",
    "idle": "runner-idle-01.png",
    "jump": "runner-jump-01.png",
    "dead": "runner-dead-01.png",
    "barricade": "barricade.png",
    "pigeon": "pigeon.png",
    "tram": "tram.png",
    "jump_button": "jump-button.png",
}

LIME = (215, 255, 63, 255)
PINK = (255, 45, 139, 255)
CYAN = (0, 217, 255, 255)
NAVY = (26, 29, 35, 255)
OFF = (244, 244, 241, 255)
INK = (12, 14, 18, 255)


def font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    for p in (
        Path(r"C:\Windows\Fonts\arialbd.ttf"),
        Path(r"C:\Windows\Fonts\arial.ttf"),
    ):
        if p.exists():
            return ImageFont.truetype(str(p), size)
    return ImageFont.load_default()


def load(name: str) -> Image.Image:
    drop = DROP / name
    if drop.exists():
        return Image.open(drop).convert("RGBA")
    path = MASTERS / name
    if not path.exists():
        raise FileNotFoundError(drop if DROP.exists() else path)
    return Image.open(path).convert("RGBA")


def has_real_alpha(im: Image.Image) -> bool:
    if "A" not in im.getbands():
        return False
    lo, hi = im.getchannel("A").getextrema()
    return lo < 250 and hi > 0


def sprite(im: Image.Image, w: int, h: int, anchor: str = "bottom") -> Image.Image:
    im = im.convert("RGBA")
    if not has_real_alpha(im):
        im = flood_cut(im)
    return fit(trim(im), w, h, anchor)


def flood_cut(im: Image.Image, chroma_dist: float = 75.0, dark: int = 28) -> Image.Image:
    """Remove magenta key and similar corner backgrounds."""
    im = im.copy()
    w, h = im.size
    px = im.load()
    seeds = [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1), (w // 2, 0), (0, h // 2)]
    seen = set()
    stack = []
    for x, y in seeds:
        r, g, b, a = px[x, y]
        mag = math.hypot(r - 255, g - 0, b - 255)
        if mag < chroma_dist + 40 or (r + g + b) / 3 < dark + 18:
            stack.append((x, y))
            seen.add((x, y))
    while stack:
        x, y = stack.pop()
        r, g, b, a = px[x, y]
        mag = math.hypot(r - 255, g - 0, b - 255)
        luma = (r + g + b) / 3
        if mag < chroma_dist or luma < dark:
            px[x, y] = (0, 0, 0, 0)
            for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
                if 0 <= nx < w and 0 <= ny < h and (nx, ny) not in seen:
                    seen.add((nx, ny))
                    stack.append((nx, ny))
    # residual magenta
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            if math.hypot(r - 255, g - 0, b - 255) < 55:
                px[x, y] = (0, 0, 0, 0)
    return im


def trim(im: Image.Image, pad: int = 4) -> Image.Image:
    bbox = im.getbbox()
    if not bbox:
        return im
    x0, y0, x1, y1 = bbox
    x0 = max(0, x0 - pad)
    y0 = max(0, y0 - pad)
    x1 = min(im.width, x1 + pad)
    y1 = min(im.height, y1 + pad)
    return im.crop((x0, y0, x1, y1))


def fit(im: Image.Image, w: int, h: int, anchor: str = "bottom") -> Image.Image:
    canvas = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    if im.width == 0 or im.height == 0:
        return canvas
    scale = min(w / im.width, h / im.height)
    nw, nh = max(1, int(im.width * scale)), max(1, int(im.height * scale))
    scaled = im.resize((nw, nh), Image.Resampling.LANCZOS)
    x = (w - nw) // 2
    y = h - nh if anchor == "bottom" else (h - nh) // 2
    if anchor == "top":
        y = 0
    canvas.paste(scaled, (x, y), scaled)
    return canvas


def bob(im: Image.Image, dy: int) -> Image.Image:
    canvas = Image.new("RGBA", im.size, (0, 0, 0, 0))
    canvas.paste(im, (0, dy), im)
    return canvas


def save(im: Image.Image, rel: str) -> None:
    path = BASE / rel
    path.parent.mkdir(parents=True, exist_ok=True)
    im.save(path, "PNG", optimize=True)
    print("wrote", path.relative_to(ROOT), im.size)


def pack_world() -> None:
    bg = load(DROP_FILES["bg"]).convert("RGB")
    bg = ImageOps.fit(bg, (1280, 960), Image.Resampling.LANCZOS)
    save(bg.convert("RGBA"), "bg_far.png")

    ground = load(DROP_FILES["ground"])
    g = ImageOps.fit(ground.convert("RGB"), (64, 64), Image.Resampling.LANCZOS)
    save(g.convert("RGBA"), "ground.png")

    run = sprite(load(DROP_FILES["run"]), 170, 118)
    idle = sprite(load(DROP_FILES["idle"]), 170, 118)
    jump = sprite(load(DROP_FILES["jump"]), 170, 118, "center")
    dead = sprite(load(DROP_FILES["dead"]), 170, 118)

    for i in range(1, 11):
        save(bob(idle, (i % 4) - 1), f"player/idle_{i:02d}.png")
    for i in range(1, 9):
        dy = 0 if i % 2 else 3
        frame = bob(run, dy)
        save(frame, f"player/run_{i:02d}.png")
    for i in range(1, 8):
        save(bob(jump, -2 if i % 2 else 0), f"player/jump_{i:02d}.png")
    for i in range(1, 9):
        save(bob(dead, i % 2), f"player/dead_{i:02d}.png")

    save(sprite(load(DROP_FILES["barricade"]), 86, 96), "hazard_bollard.png")
    save(sprite(load(DROP_FILES["pigeon"]), 128, 66, "center"), "hazard_overhead.png")
    save(sprite(load(DROP_FILES["tram"]), 160, 40, "center"), "hazard_wreck.png")
    save(sprite(load(DROP_FILES["jump_button"]), 960, 250, "center"), "jump_button.png")
    save(fit(trim(run), 256, 96, "center"), "logo.png")


def grain(im: Image.Image, amount: int = 16) -> Image.Image:
    w, h = im.size
    n = Image.new("L", (w, h))
    n.putdata([((i * 47 + j * 13) % 256) for j in range(h) for i in range(w)])
    n = n.filter(ImageFilter.GaussianBlur(0.6))
    overlay = Image.merge("RGBA", (n, n, n, n.point(lambda p: amount)))
    return Image.alpha_composite(im.convert("RGBA"), overlay)


def draw_tag(d: ImageDraw.ImageDraw, xy, text, fill, fg, size=18):
    x, y = xy
    f = font(size)
    bbox = d.textbbox((0, 0), text, font=f)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    d.rectangle([x, y, x + tw + 20, y + th + 12], fill=fill)
    d.text((x + 10, y + 4), text, font=f, fill=fg)


def pack_ui() -> None:
    UI.mkdir(parents=True, exist_ok=True)
    SVG.mkdir(parents=True, exist_ok=True)
    city = ImageOps.fit(load(DROP_FILES["bg"]).convert("RGB"), (540, 960), Image.Resampling.LANCZOS).convert("RGBA")
    shade = Image.new("RGBA", (540, 960), (10, 12, 18, 110))
    start = Image.alpha_composite(city, shade)
    start = grain(start, 14)
    d = ImageDraw.Draw(start)
    d.text((28, 36), "PLONKU  /  SCORE", font=font(16), fill=CYAN)
    d.text((24, 72), "Zombie", font=font(42), fill=OFF)
    d.text((24, 118), "Survival", font=font(42), fill=LIME)
    d.text((24, 164), "Score", font=font(42), fill=PINK)
    draw_tag(d, (24, 228), "WROCŁAW", PINK, OFF, 20)
    d.text((24, 280), "PRZETRWAJ WROCŁAW!", font=font(22), fill=PINK)
    d.text((24, 318), "Oparte na klimacie miasta. Zombie też.", font=font(16), fill=CYAN)
    d.text((24, 348), "JAK TO DZIAŁA?  ·  jeden kciuk, skok, wynik", font=font(15), fill=OFF)
    d.text((24, 560), "51.1079° N, 17.0385° E", font=font(14), fill=CYAN)
    d.text((24, 586), "DANE TWORZĄ LEPSZE MIASTA —", font=font(14), fill=OFF)
    start.crop((0, 0, 540, 620)).save(UI / "start_panel.png")

    def cta(w, h, fill, shadow, label, ink=INK):
        im = Image.new("RGBA", (w, h), (0, 0, 0, 0))
        d = ImageDraw.Draw(im)
        d.rectangle([0, 8, w - 8, h - 1], fill=shadow)
        d.rectangle([0, 0, w - 8, h - 9], fill=fill)
        d.text((22, 18), label, font=font(24), fill=ink)
        return im

    cta(460, 88, LIME, PINK, "ROZPOCZNIJ GRĘ   →").save(UI / "cta_start.png")
    city_btn = Image.new("RGBA", (460, 76), (0, 0, 0, 0))
    d = ImageDraw.Draw(city_btn)
    d.rectangle([0, 0, 459, 75], outline=CYAN, width=3, fill=(26, 29, 35, 220))
    d.text((22, 22), "WYBIERZ MIASTO", font=font(22), fill=OFF)
    city_btn.save(UI / "cta_city.png")

    hud = Image.new("RGBA", (516, 96), (0, 0, 0, 0))
    d = ImageDraw.Draw(hud)
    d.rectangle([0, 8, 300, 88], fill=(26, 29, 35, 210), outline=LIME, width=3)
    d.text((14, 14), "WYNIK", font=font(14), fill=LIME)
    draw_tag(d, (318, 18), "WROCŁAW", PINK, OFF, 16)
    draw_tag(d, (318, 54), "FAKTY", CYAN, INK, 14)
    hud.save(UI / "hud_bar.png")

    go = Image.new("RGBA", (492, 420), (18, 20, 26, 230))
    go = grain(go, 12)
    d = ImageDraw.Draw(go)
    d.rectangle([0, 0, 491, 419], outline=LIME, width=4)
    d.text((24, 18), "PLONKU DLA CIEKAWYCH —", font=font(13), fill=CYAN)
    d.text((24, 48), "KONIEC", font=font(44), fill=OFF)
    d.text((24, 98), "GRY", font=font(44), fill=PINK)
    d.text((24, 160), "TWÓJ WYNIK", font=font(18), fill=OFF)
    d.text((24, 280), "Wrocław nie śpi. Ty możesz wrócić.", font=font(16), fill=CYAN)
    d.text((24, 360), "51.1079° N, 17.0385° E", font=font(13), fill=CYAN)
    go.save(UI / "go_panel.png")
    cta(460, 84, LIME, PINK, "SPRÓBUJ JESZCZE   ↺").save(UI / "cta_retry.png")

    (SVG / "README.md").write_text(
        "# Plonku SVG sources\n\nUI chrome is authored as SVG here and rasterized to `../ui/`.\n"
        "World paintings: `docs/codex-manual-tasks/refs/goal-005/art-drop/` then pack to slot PNGs.\n"
        "GDevelop sprites remain PNG; rebuild: `python tools/build-plonku-art.py`\n",
        encoding="utf-8",
    )
    write_ui_svgs()


def write_ui_svgs() -> None:
    (SVG / "cta-start.svg").write_text(
        """<svg xmlns="http://www.w3.org/2000/svg" width="460" height="88" viewBox="0 0 460 88">
  <rect x="0" y="8" width="452" height="80" fill="#FF2D8B"/>
  <rect x="0" y="0" width="452" height="80" fill="#D7FF3F"/>
  <text x="22" y="52" font-family="Arial Black, Arial, sans-serif" font-size="26" font-weight="700" fill="#0C0E12">ROZPOCZNIJ GRĘ →</text>
</svg>
""",
        encoding="utf-8",
    )
    (SVG / "cta-city.svg").write_text(
        """<svg xmlns="http://www.w3.org/2000/svg" width="460" height="76" viewBox="0 0 460 76">
  <rect x="1.5" y="1.5" width="457" height="73" fill="#1A1D23" fill-opacity="0.86" stroke="#00D9FF" stroke-width="3"/>
  <text x="22" y="48" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="#F4F4F1">WYBIERZ MIASTO</text>
</svg>
""",
        encoding="utf-8",
    )
    (SVG / "cta-retry.svg").write_text(
        """<svg xmlns="http://www.w3.org/2000/svg" width="460" height="84" viewBox="0 0 460 84">
  <rect x="0" y="8" width="452" height="76" fill="#FF2D8B"/>
  <rect x="0" y="0" width="452" height="76" fill="#D7FF3F"/>
  <text x="22" y="48" font-family="Arial Black, Arial, sans-serif" font-size="24" font-weight="700" fill="#0C0E12">SPRÓBUJ JESZCZE ↺</text>
</svg>
""",
        encoding="utf-8",
    )


def main() -> None:
    pack_world()
    pack_ui()


if __name__ == "__main__":
    main()
