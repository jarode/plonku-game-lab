#!/usr/bin/env python3
"""Plonku neon-editorial UI sprites for Zombie Runner (GOAL 005 / 028–030)."""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "games" / "zombie-runner" / "assets" / "wroclaw-v1" / "ui"

LIME = (215, 255, 63, 255)
PINK = (255, 45, 139, 255)
CYAN = (0, 217, 255, 255)
NAVY = (26, 29, 35, 255)
NAVY_A = (26, 29, 35, 210)
OFF = (244, 244, 241, 255)
INK = (10, 12, 16, 255)


def font_path() -> Path | None:
    candidates = [
        Path(r"C:\Windows\Fonts\arialbd.ttf"),
        Path(r"C:\Windows\Fonts\arial.ttf"),
        ROOT / "templates" / "runner-v1" / "assets" / "Nathaniel-19.otf",
        Path("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"),
    ]
    for p in candidates:
        if p.exists():
            return p
    return None


FONT_FILE = font_path()


def fnt(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    if FONT_FILE:
        return ImageFont.truetype(str(FONT_FILE), size)
    return ImageFont.load_default()


def canvas(w: int, h: int, fill=(0, 0, 0, 0)) -> tuple[Image.Image, ImageDraw.ImageDraw]:
    im = Image.new("RGBA", (w, h), fill)
    return im, ImageDraw.Draw(im)


def grain(im: Image.Image, amount: int = 22) -> Image.Image:
    w, h = im.size
    try:
        n = Image.effect_noise((w, h), 48).convert("L")
    except Exception:
        n = Image.new("L", (w, h))
        n.putdata([(i * 37 + j * 17) % 256 for j in range(h) for i in range(w)])
    n = n.point(lambda p: max(0, min(255, int((p - 128) * amount / 40 + 128))))
    overlay = Image.merge("RGBA", (n, n, n, n.point(lambda p: 28)))
    return Image.alpha_composite(im.convert("RGBA"), overlay)


def frame(d: ImageDraw.ImageDraw, box, fill, outline, width=4):
    d.rectangle(box, fill=fill, outline=outline, width=width)
    x0, y0, x1, y1 = box
    tick = 10
    d.line([(x0, y0 + tick), (x0, y0), (x0 + tick, y0)], fill=outline, width=width)
    d.line([(x1 - tick, y0), (x1, y0), (x1, y0 + tick)], fill=outline, width=width)
    d.line([(x0, y1 - tick), (x0, y1), (x0 + tick, y1)], fill=outline, width=width)
    d.line([(x1 - tick, y1), (x1, y1), (x1, y1 - tick)], fill=outline, width=width)


def tag(d: ImageDraw.ImageDraw, xy, text, fill, fg=INK, size=18):
    x, y = xy
    font = fnt(size)
    bbox = d.textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    pad_x, pad_y = 10, 6
    d.rectangle([x, y, x + tw + pad_x * 2, y + th + pad_y * 2], fill=fill)
    d.text((x + pad_x, y + pad_y - 2), text, font=font, fill=fg)


def make_start() -> Image.Image:
    im, d = canvas(540, 620, (26, 29, 35, 168))
    im = grain(im, 18)
    d = ImageDraw.Draw(im)
    d.text((28, 28), "PLONKU  /  DANE PUBLICZNE", font=fnt(16), fill=CYAN)
    d.text((28, 72), "ZOMBIE", font=fnt(54), fill=OFF)
    d.text((28, 128), "SURVIVAL", font=fnt(54), fill=LIME)
    d.text((28, 184), "SCORE", font=fnt(54), fill=PINK)
    tag(d, (28, 258), "WROCŁAW", PINK, OFF, 20)
    tag(d, (168, 258), "EKSPERYMENT", CYAN, INK, 16)
    d.text((28, 318), "Przetrwaj miasto.", font=fnt(26), fill=OFF)
    d.text((28, 356), "Ten Wrocław nie śpi.", font=fnt(22), fill=(200, 200, 196, 255))
    d.text((28, 420), "Oparte na klimacie miasta. Zombie też.", font=fnt(16), fill=CYAN)
    d.text((28, 456), "JAK TO DZIAŁA?  ·  jeden kciuk, skok, wynik", font=fnt(15), fill=OFF)
    d.text((28, 560), "51.1079° N, 17.0385° E", font=fnt(14), fill=CYAN)
    d.text((28, 586), "PLONKU LAB  ·  dane + miasto + zombie", font=fnt(14), fill=(180, 180, 176, 255))
    return im


def make_cta_primary() -> Image.Image:
    im, d = canvas(460, 88)
    d.rectangle([0, 8, 452, 87], fill=PINK)
    d.rectangle([0, 0, 452, 80], fill=LIME)
    d.text((24, 22), "ROZPOCZNIJ GRĘ   →", font=fnt(26), fill=INK)
    return im


def make_cta_city() -> Image.Image:
    im, d = canvas(460, 76)
    frame(d, [0, 0, 459, 75], NAVY_A, CYAN, 3)
    d.text((24, 22), "WYBIERZ MIASTO", font=fnt(22), fill=OFF)
    d.text((280, 26), "WKROTCE", font=fnt(14), fill=CYAN)
    return im


def make_hud() -> Image.Image:
    im, d = canvas(516, 96, (0, 0, 0, 0))
    frame(d, [0, 8, 300, 88], NAVY_A, LIME, 3)
    d.text((14, 14), "WYNIK", font=fnt(14), fill=LIME)
    tag(d, [318, 18], "WROCŁAW", PINK, OFF, 16)
    tag(d, [318, 54], "FAKTY", CYAN, INK, 14)
    return im


def make_go_panel() -> Image.Image:
    im, d = canvas(492, 420, (0, 0, 0, 0))
    im = grain(im.convert("RGBA"), 12)
    d = ImageDraw.Draw(im)
    frame(d, [0, 0, 491, 419], NAVY_A, LIME, 4)
    d.text((24, 18), "PLONKU DLA CIEKAWYCH —", font=fnt(13), fill=CYAN)
    d.text((24, 48), "KONIEC", font=fnt(42), fill=OFF)
    d.text((24, 96), "GRY", font=fnt(42), fill=PINK)
    d.text((24, 160), "TWÓJ WYNIK", font=fnt(18), fill=OFF)
    d.text((24, 280), "Wrocław nie śpi. Ty możesz wrócić.", font=fnt(16), fill=CYAN)
    d.text((24, 312), "Więcej danych. Dłuższe życie.", font=fnt(14), fill=(180, 180, 176, 255))
    d.text((24, 360), "51.1079° N, 17.0385° E", font=fnt(13), fill=CYAN)
    d.text((24, 386), "DANE TWORZĄ LEPSZE MIASTA —", font=fnt(13), fill=OFF)
    return im


def make_retry() -> Image.Image:
    im, d = canvas(460, 84)
    d.rectangle([0, 8, 452, 83], fill=PINK)
    d.rectangle([0, 0, 452, 76], fill=LIME)
    d.text((24, 20), "SPRÓBUJ JESZCZE   ↺", font=fnt(24), fill=INK)
    return im


def save(im: Image.Image, name: str) -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    path = OUT / name
    im.save(path, "PNG")
    print("wrote", path)


def main() -> None:
    save(make_start(), "start_panel.png")
    save(make_cta_primary(), "cta_start.png")
    save(make_cta_city(), "cta_city.png")
    save(make_hud(), "hud_bar.png")
    save(make_go_panel(), "go_panel.png")
    save(make_retry(), "cta_retry.png")


if __name__ == "__main__":
    main()
