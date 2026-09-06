"""Original CITY BREAKER 2012 cell/paddle/ball/skyline sprites. Not Kenney."""
from pathlib import Path
from PIL import Image, ImageDraw

OUT = Path(__file__).resolve().parents[1] / "games/breakout-lab/assets/citybrk-2012"
OUT.mkdir(parents=True, exist_ok=True)

NAVY = (10, 16, 32, 255)
LIME = (200, 255, 0, 255)
PINK = (255, 45, 149, 255)
CYAN = (0, 229, 255, 255)
GDATA = (61, 255, 154, 255)
INK = (7, 11, 20, 255)
WHITE = (240, 255, 220, 255)


def cell(family, hp, hit=False):
    w, h = 160, 40
    im = Image.new("RGBA", (w, h), INK)
    d = ImageDraw.Draw(im)
    pal = {"gestosc": LIME, "zielen": GDATA, "zabudowa": CYAN, "podmioty": PINK}[family]
    d.rectangle([0, 0, w - 1, h - 1], fill=(pal[0], pal[1], pal[2], 40), outline=pal, width=2)
    if family == "gestosc":
        for x in range(6, w - 22, 8):
            d.rectangle([x, 6, x + 5, h - 7], fill=pal)
    elif family == "zielen":
        for x in range(10, w - 28, 28):
            d.polygon([(x, h - 7), (x + 10, 6), (x + 20, h - 7)], fill=pal)
    elif family == "zabudowa":
        for y in range(6, h - 8, 10):
            for x in range(8, w - 24, 16):
                d.rectangle([x, y, x + 10, y + 7], fill=NAVY, outline=pal, width=2)
    else:
        pts = [(12, 22), (40, 10), (72, 28), (104, 8), (130, 20)]
        d.line(pts, fill=pal, width=3)
        for p in pts:
            d.ellipse([p[0] - 4, p[1] - 4, p[0] + 4, p[1] + 4], fill=WHITE, outline=pal)
    for i in range(hp):
        d.rectangle([w - 16, 6 + i * 10, w - 6, 13 + i * 10], fill=pal)
    mark = {"gestosc": "G", "zielen": "Z", "zabudowa": "B", "podmioty": "P"}[family]
    d.rectangle([4, h - 14, 18, h - 4], fill=INK, outline=pal)
    d.text((6, h - 13), mark, fill=pal)
    if hit:
        d.rectangle([2, 2, w - 3, h - 3], outline=WHITE, width=2)
        d.line([(8, 8), (28, 28)], fill=WHITE, width=2)
    return im


def main():
    for fam in ("gestosc", "zielen", "zabudowa", "podmioty"):
        for hp in (1, 2, 3):
            cell(fam, hp).save(OUT / f"cell-{fam}-{hp}.png")
        cell(fam, 2, hit=True).save(OUT / f"cell-{fam}-hit.png")
    pad = Image.new("RGBA", (220, 28), (0, 0, 0, 0))
    d = ImageDraw.Draw(pad)
    d.rectangle([0, 4, 219, 23], fill=CYAN, outline=LIME, width=2)
    d.rectangle([8, 8, 211, 19], fill=NAVY)
    d.rectangle([90, 6, 130, 21], fill=PINK)
    pad.save(OUT / "paddle.png")
    ball = Image.new("RGBA", (28, 28), (0, 0, 0, 0))
    d = ImageDraw.Draw(ball)
    d.ellipse([0, 0, 27, 27], fill=LIME, outline=PINK, width=2)
    d.ellipse([7, 5, 14, 12], fill=WHITE)
    ball.save(OUT / "ball.png")
    sky = Image.new("RGBA", (960, 140), (0, 0, 0, 0))
    d = ImageDraw.Draw(sky)
    h = 140
    boxes = [
        (0, 80, 50, h),
        (48, 45, 110, h),
        (108, 62, 170, h),
        (165, 28, 240, h),
        (235, 70, 290, h),
        (285, 50, 380, h),
        (375, 18, 460, h),
        (455, 55, 520, h),
        (515, 36, 610, h),
        (605, 72, 670, h),
        (665, 48, 740, h),
        (735, 64, 820, h),
        (815, 30, 900, h),
        (895, 58, 960, h),
    ]
    for b in boxes:
        d.rectangle(b, fill=(8, 14, 28, 230), outline=CYAN)
        d.rectangle([b[0] + 6, b[1] + 10, b[0] + 14, b[1] + 18], outline=GDATA)
    sky.save(OUT / "skyline.png")
    print("wrote", OUT)


if __name__ == "__main__":
    main()
