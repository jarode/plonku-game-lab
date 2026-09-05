#!/usr/bin/env python3
"""Original Wrocław v1 sprites — Plonku neon-editorial pass (GOAL 005 / 031)."""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "games" / "zombie-runner" / "assets" / "wroclaw-v1"

OUTLINE = (12, 14, 18, 255)
SKIN = (110, 168, 92, 255)
HOOD = (22, 24, 30, 255)
HOOD_DARK = (14, 16, 20, 255)
PINK = (255, 45, 139, 255)
LIME = (215, 255, 63, 255)
CYAN = (0, 217, 255, 255)
NAVY = (26, 29, 35, 255)
MOON = (232, 184, 109, 255)
CONCRETE = (48, 52, 60, 255)
CONCRETE_L = (72, 76, 84, 255)
STRIPE_R = (196, 48, 48, 255)
OFF = (244, 244, 241, 255)


def new_canvas(w: int, h: int) -> tuple[Image.Image, ImageDraw.ImageDraw]:
    im = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    return im, ImageDraw.Draw(im)


def oval(d: ImageDraw.ImageDraw, box, fill, outline=OUTLINE, width=3):
    d.ellipse(box, fill=fill, outline=outline, width=width)


def rect(d: ImageDraw.ImageDraw, box, fill, outline=OUTLINE, width=3):
    d.rectangle(box, fill=fill, outline=outline, width=width)


def draw_zombie(d: ImageDraw.ImageDraw, ox: int, oy: int, phase: int, mode: str) -> None:
    bob = (phase % 4) * 2
    if mode == "jump":
        oy -= 18
        bob = -6
    if mode == "dead":
        oy += 22
        ox += 8
    leg = 6 if phase % 2 == 0 else -6
    if mode == "idle":
        leg = (phase % 3) - 1
    rect(d, [ox + 58 + leg, oy + 78, ox + 78 + leg, oy + 112], HOOD_DARK)
    rect(d, [ox + 86 - leg, oy + 78, ox + 106 - leg, oy + 112], HOOD_DARK)
    # pink backpack
    rect(d, [ox + 42, oy + 44 + bob, ox + 58, oy + 86 + bob], PINK)
    rect(d, [ox + 52, oy + 38 + bob, ox + 118, oy + 88 + bob], HOOD)
    oval(d, [ox + 60, oy + 10 + bob, ox + 112, oy + 58 + bob], SKIN)
    # cap
    d.rectangle([ox + 58, oy + 8 + bob, ox + 114, oy + 24 + bob], fill=HOOD, outline=OUTLINE)
    d.polygon(
        [(ox + 78, oy + 4 + bob), (ox + 94, oy + 4 + bob), (ox + 86, oy + 16 + bob)],
        fill=MOON,
        outline=OUTLINE,
    )
    oval(d, [ox + 86, oy + 26 + bob, ox + 100, oy + 40 + bob], CYAN, width=2)
    oval(d, [ox + 90, oy + 30 + bob, ox + 96, oy + 36 + bob], OUTLINE, width=1)
    oval(d, [ox + 70, oy + 28 + bob, ox + 80, oy + 38 + bob], LIME, width=2)


def make_player_frame(mode: str, i: int, n: int) -> Image.Image:
    im, d = new_canvas(170, 118)
    draw_zombie(d, 4, 2, i, mode)
    return im


def make_bollard() -> Image.Image:
    """Jersey barricade — same 86x96 box."""
    im, d = new_canvas(86, 96)
    rect(d, [8, 28, 78, 90], CONCRETE)
    d.rectangle([8, 40, 78, 52], fill=STRIPE_R)
    d.rectangle([8, 52, 78, 64], fill=OFF)
    d.rectangle([8, 64, 78, 76], fill=STRIPE_R)
    rect(d, [18, 16, 68, 32], CONCRETE_L)
    d.rectangle([12, 86, 74, 94], fill=HOOD_DARK)
    return im


def make_overhead() -> Image.Image:
    """Infected pigeon — same 128x66 box."""
    im, d = new_canvas(128, 66)
    d.polygon([(18, 36), (70, 18), (110, 28), (96, 48), (40, 50)], fill=HOOD, outline=OUTLINE)
    d.polygon([(70, 18), (118, 8), (108, 28)], fill=PINK, outline=OUTLINE)
    oval(d, [96, 20, 118, 42], HOOD)
    oval(d, [108, 26, 114, 32], LIME, width=1)
    d.polygon([(118, 30), (126, 28), (118, 36)], fill=MOON)
    d.line([(40, 50), (32, 62)], fill=OUTLINE, width=3)
    d.line([(56, 50), (52, 62)], fill=OUTLINE, width=3)
    return im


def make_wreck() -> Image.Image:
    """Tram silhouette — same 160x40 box."""
    im, d = new_canvas(160, 40)
    rect(d, [6, 8, 154, 36], HOOD)
    d.rectangle([20, 12, 48, 26], fill=CYAN)
    d.rectangle([56, 12, 84, 26], fill=PINK)
    d.rectangle([92, 12, 120, 26], fill=CYAN)
    oval(d, [18, 26, 36, 38], CONCRETE)
    oval(d, [124, 26, 142, 38], CONCRETE)
    d.rectangle([130, 4, 150, 12], fill=LIME)
    return im


def make_ground() -> Image.Image:
    im, d = new_canvas(64, 64)
    d.rectangle([0, 0, 63, 63], fill=CONCRETE, outline=OUTLINE)
    for y in range(0, 64, 16):
        for x in range(0, 64, 16):
            off = 8 if (y // 16) % 2 else 0
            d.rectangle([x + off - 6, y + 2, x + off + 8, y + 12], fill=CONCRETE_L, outline=HOOD_DARK)
    d.ellipse([40, 44, 58, 58], outline=LIME, width=2)
    return im


def make_bg() -> Image.Image:
    im, d = new_canvas(1280, 960)
    for y in range(960):
        t = y / 959
        r = int(18 * (1 - t) + 40 * t)
        g = int(12 * (1 - t) + 22 * t)
        b = int(28 * (1 - t) + 48 * t)
        d.line([(0, y), (1279, y)], fill=(r, g, b, 255))
    oval(d, [920, 40, 1140, 260], MOON)
    d.rectangle([0, 640, 1279, 959], fill=(20, 36, 48, 255))
    d.polygon([(0, 660), (280, 620), (520, 668), (0, 720)], fill=(12, 48, 58, 255))
    blocks = [
        (40, 380, 180, 640),
        (200, 300, 360, 640),
        (380, 400, 520, 640),
        (860, 340, 1040, 640),
        (1080, 400, 1260, 640),
    ]
    for b in blocks:
        d.rectangle(b, fill=HOOD, outline=OUTLINE, width=3)
        for wy in range(b[1] + 20, b[3] - 30, 36):
            for wx in range(b[0] + 16, b[2] - 16, 28):
                col = CYAN if (wx + wy) % 56 < 28 else PINK
                d.rectangle([wx, wy, wx + 14, wy + 18], fill=col)
    d.polygon([(600, 180), (670, 420), (540, 420)], fill=HOOD_DARK, outline=CYAN, width=3)
    d.polygon([(710, 160), (790, 420), (640, 420)], fill=HOOD, outline=PINK, width=3)
    d.rectangle([580, 420, 820, 640], fill=HOOD_DARK, outline=OUTLINE, width=3)
    d.rectangle([80, 240, 220, 280], fill=PINK)
    d.rectangle([40, 200, 90, 248], fill=LIME)
    try:
        from PIL import ImageFont

        font = ImageFont.truetype(r"C:\Windows\Fonts\arialbd.ttf", 28)
        d.text((88, 246), "WROCŁAW", font=font, fill=OFF)
        d.text((48, 430), "TU TEŻ SĄ DANE", font=font, fill=CYAN)
    except Exception:
        pass
    return im


def make_button() -> Image.Image:
    im, d = new_canvas(960, 250)
    d.rectangle([80, 40, 880, 230], fill=PINK)
    d.rectangle([80, 24, 880, 214], fill=LIME)
    d.polygon([(430, 64), (560, 119), (430, 174)], fill=HOOD)
    return im


def make_logo() -> Image.Image:
    im, d = new_canvas(256, 96)
    rect(d, [8, 16, 248, 80], NAVY, LIME, 4)
    d.rectangle([16, 24, 72, 72], fill=PINK)
    d.rectangle([80, 32, 232, 64], fill=CYAN)
    return im


def save(im: Image.Image, rel: str) -> None:
    path = OUT / rel
    path.parent.mkdir(parents=True, exist_ok=True)
    im.save(path, "PNG")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for i in range(1, 11):
        save(make_player_frame("idle", i, 10), f"player/idle_{i:02d}.png")
    for i in range(1, 9):
        save(make_player_frame("run", i, 8), f"player/run_{i:02d}.png")
    for i in range(1, 8):
        save(make_player_frame("jump", i, 7), f"player/jump_{i:02d}.png")
    for i in range(1, 9):
        save(make_player_frame("dead", i, 8), f"player/dead_{i:02d}.png")
    save(make_bollard(), "hazard_bollard.png")
    save(make_overhead(), "hazard_overhead.png")
    save(make_wreck(), "hazard_wreck.png")
    save(make_bg(), "bg_far.png")
    save(make_ground(), "ground.png")
    save(make_button(), "jump_button.png")
    save(make_logo(), "logo.png")
    print("Wrote", OUT)


if __name__ == "__main__":
    main()
