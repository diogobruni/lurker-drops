"""Generate the Lurker Drops toolbar icons (active/inactive states)."""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "icons"
OUT.mkdir(parents=True, exist_ok=True)

SIZE = 512
CENTER = SIZE // 2


def gradient(top: tuple[int, int, int], bottom: tuple[int, int, int]) -> Image.Image:
    image = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    pixels = image.load()
    for y in range(SIZE):
        t = y / (SIZE - 1)
        color = tuple(round(top[i] * (1 - t) + bottom[i] * t) for i in range(3))
        for x in range(SIZE):
            pixels[x, y] = (*color, 255)
    return image


def rounded_mask(radius: int) -> Image.Image:
    mask = Image.new("L", (SIZE, SIZE), 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle((0, 0, SIZE - 1, SIZE - 1), radius=radius, fill=255)
    return mask


def eye_polygon(cy: int = 250, rx: int = 168, depth: int = 96) -> list[tuple[float, float]]:
    points: list[tuple[float, float]] = []
    steps = 140
    for i in range(steps + 1):
        x = CENTER - rx + (2 * rx) * i / steps
        t = (x - CENTER) / rx
        curve = depth * (1 - t * t)
        points.append((x, cy - curve))
    for i in range(steps + 1):
        x = CENTER + rx - (2 * rx) * i / steps
        t = (x - CENTER) / rx
        curve = depth * (1 - t * t)
        points.append((x, cy + curve))
    return points


def build(active: bool) -> Image.Image:
    base = gradient((39, 30, 61), (12, 11, 22)) if active else gradient((32, 32, 36), (13, 13, 16))

    glow = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    glow_draw.ellipse((118, 118, 394, 404), fill=(124, 58, 237, 90 if active else 40))
    glow = glow.filter(ImageFilter.GaussianBlur(70))
    base.alpha_composite(glow)

    base.putalpha(rounded_mask(128))

    draw = ImageDraw.Draw(base)
    if active:
        eye_color = (243, 232, 255, 255)
        pupil_color = (91, 33, 182, 255)
        rim_color = (167, 139, 250, 150)
    else:
        eye_color = (174, 174, 188, 255)
        pupil_color = (63, 63, 70, 255)
        rim_color = (113, 113, 122, 110)

    # Soft eye outline for contrast on both light and dark toolbars.
    outline = eye_polygon()
    draw.polygon(outline, fill=rim_color)

    inset_eye = [(CENTER + (x - CENTER) * 0.9, 250 + (y - 250) * 0.82) for x, y in outline]
    draw.polygon(inset_eye, fill=eye_color)

    # Pupil and highlight.
    draw.ellipse((CENTER - 57, 198, CENTER + 57, 312), fill=pupil_color)
    draw.ellipse((CENTER - 19, 224, CENTER + 13, 256), fill=(255, 255, 255, 230))

    if active:
        # Live status light.
        draw.ellipse((330, 330, 450, 450), fill=(9, 9, 12, 255))
        draw.ellipse((344, 344, 436, 436), fill=(52, 211, 153, 255))
        draw.ellipse((358, 358, 398, 398), fill=(167, 243, 208, 255))

    return base


def main() -> None:
    for active in (False, True):
        master = build(active)
        prefix = "active" if active else "inactive"
        for size in (16, 32, 48, 128):
            master.resize((size, size), Image.Resampling.LANCZOS).save(
                OUT / f"{prefix}-{size}.png"
            )
    print(f"Wrote icons to {OUT}")


if __name__ == "__main__":
    main()
