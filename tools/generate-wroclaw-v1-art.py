#!/usr/bin/env python3
"""Original Wrocław v1 cut-out sprites for Zombie Runner. No third-party art."""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "games" / "zombie-runner" / "assets" / "wroclaw-v1"

OUTLINE = (26, 21, 16, 255)
SKIN = (143, 191, 122, 255)
HOOD = (45, 58, 78, 255)
HOOD_DARK = (32, 42, 58, 255)
BRICK = (184, 74, 58, 255)
BRICK_DARK = (132, 48, 40, 255)
TEAL = (42, 95, 110, 255)
SKY = (232, 184, 109, 255)
SKY_TOP = (62, 78, 118, 255)
COBBLE = (92, 83, 72, 255)
COBBLE_LIGHT = (120, 110, 96, 255)
SIGN = (240, 228, 200, 255)
ACCENT = (232, 184, 109, 255)


def new_canvas(w: int, h: int) -> tuple[Image.Image, ImageDraw.ImageDraw]:
    im = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    return im, ImageDraw.Draw(im)


def oval(d: ImageDraw.ImageDraw, box, fill, outline=OUTLINE, width=3):
    d.ellipse(box, fill=fill, outline=outline, width=width)


def rect(d: ImageDraw.ImageDraw, box, fill, outline=OUTLINE, width=3):
    d.rounded_rectangle(box, radius=6, fill=fill, outline=outline, width=width)


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
    # legs
    rect(d, [ox + 58 + leg, oy + 78, ox + 78 + leg, oy + 112], HOOD_DARK)
    rect(d, [ox + 86 - leg, oy + 78, ox + 106 - leg, oy + 112], HOOD_DARK)
    # body hoodie
    rect(d, [ox + 52, oy + 38 + bob, ox + 118, oy + 88 + bob], HOOD)
    # torn hem
    d.polygon(
        [(ox + 118, oy + 70 + bob), (ox + 132, oy + 78 + bob), (ox + 118, oy + 86 + bob)],
        fill=HOOD,
        outline=OUTLINE,
    )
    # head
    oval(d, [ox + 60, oy + 8 + bob, ox + 112, oy + 58 + bob], SKIN)
    # hood
    d.pieslice([ox + 56, oy + 4 + bob, ox + 116, oy + 48 + bob], 200, 340, fill=HOOD, outline=OUTLINE)
    # eye
    oval(d, [ox + 86, oy + 24 + bob, ox + 100, oy + 38 + bob], SIGN, width=2)
    oval(d, [ox + 90, oy + 28 + bob, ox + 96, oy + 34 + bob], OUTLINE, width=1)
    # crooked extra eye (slapstick, not gore)
    oval(d, [ox + 72, oy + 26 + bob, ox + 82, oy + 36 + bob], (90, 140, 80, 255), width=2)


def make_player_frame(mode: str, i: int, n: int) -> Image.Image:
    im, d = new_canvas(170, 118)
    draw_zombie(d, 4, 2, i, mode)
    return im


def make_bollard() -> Image.Image:
    im, d = new_canvas(86, 96)
    rect(d, [28, 18, 58, 90], COBBLE)
    oval(d, [22, 8, 64, 36], BRICK)
    rect(d, [18, 86, 68, 94], COBBLE_LIGHT)
    return im


def make_overhead() -> Image.Image:
    im, d = new_canvas(128, 66)
    rect(d, [8, 8, 120, 22], HOOD_DARK)
    rect(d, [40, 20, 88, 58], SIGN)
    d.rectangle([48, 28, 80, 36], fill=BRICK)
    d.rectangle([52, 42, 76, 48], fill=TEAL)
    return im


def make_wreck() -> Image.Image:
    im, d = new_canvas(160, 40)
    rect(d, [6, 14, 154, 36], HOOD_DARK)
    oval(d, [12, 6, 40, 34], COBBLE)
    oval(d, [120, 6, 148, 34], COBBLE)
    rect(d, [44, 8, 110, 22], BRICK)
    return im


def make_ground() -> Image.Image:
    im, d = new_canvas(64, 64)
    d.rectangle([0, 0, 63, 63], fill=COBBLE, outline=OUTLINE)
    for y in range(0, 64, 16):
        for x in range(0, 64, 16):
            off = 8 if (y // 16) % 2 else 0
            d.rounded_rectangle(
                [x + off - 8, y + 2, x + off + 6, y + 14],
                radius=3,
                fill=COBBLE_LIGHT,
                outline=BRICK_DARK,
            )
    return im


def make_bg() -> Image.Image:
    im, d = new_canvas(1280, 960)
    for y in range(960):
        t = y / 959
        col = tuple(int(SKY_TOP[i] * (1 - t) + SKY[i] * t) for i in range(3)) + (255,)
        d.line([(0, y), (1279, y)], fill=col)
    d.rectangle([0, 620, 1279, 959], fill=TEAL)
    d.polygon([(0, 640), (200, 600), (420, 648), (0, 700)], fill=(36, 82, 96, 255))
    # kamienice + spires
    blocks = [(40, 380, 180, 640), (200, 340, 360, 640), (380, 400, 520, 640), (900, 360, 1080, 640), (1100, 400, 1260, 640)]
    for b in blocks:
        d.rectangle(b, fill=BRICK, outline=OUTLINE, width=4)
        for wy in range(b[1] + 20, b[3] - 30, 36):
            for wx in range(b[0] + 16, b[2] - 16, 28):
                d.rectangle([wx, wy, wx + 14, wy + 18], fill=SKY_TOP)
    # twin spires
    d.polygon([(640, 220), (700, 420), (580, 420)], fill=BRICK_DARK, outline=OUTLINE)
    d.polygon([(740, 200), (800, 420), (680, 420)], fill=BRICK, outline=OUTLINE)
    d.rectangle([620, 420, 820, 640], fill=BRICK_DARK, outline=OUTLINE, width=4)
    return im


def make_button() -> Image.Image:
    im, d = new_canvas(960, 250)
    d.rounded_rectangle([80, 30, 880, 220], radius=80, fill=BRICK, outline=OUTLINE, width=8)
    d.rounded_rectangle([120, 55, 840, 195], radius=64, fill=ACCENT, outline=HOOD_DARK, width=6)
    d.polygon([(430, 70), (560, 125), (430, 180)], fill=HOOD)
    return im


def make_logo() -> Image.Image:
    im, d = new_canvas(256, 96)
    oval(d, [8, 20, 56, 76], SKIN)
    d.rectangle([48, 40, 248, 80], fill=HOOD)
    d.rectangle([64, 16, 232, 48], fill=BRICK)
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
