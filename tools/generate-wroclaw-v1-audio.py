#!/usr/bin/env python3
"""Original Wrocław SFX/music (procedural PCM). No sampled third-party audio."""
from __future__ import annotations

import math
import struct
import wave
from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / "games" / "zombie-runner" / "assets" / "wroclaw-v1" / "audio"
RATE = 22050


def write_wav(path: Path, samples: list[float]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with wave.open(str(path), "w") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(RATE)
        frames = b"".join(struct.pack("<h", max(-32767, min(32767, int(s * 32767)))) for s in samples)
        w.writeframes(frames)


def tone(freq: float, dur: float, amp: float = 0.22, decay: bool = True) -> list[float]:
    n = int(RATE * dur)
    out = []
    for i in range(n):
        t = i / RATE
        env = math.exp(-t * 8) if decay else 1.0
        out.append(amp * env * math.sin(2 * math.pi * freq * t))
    return out


def jump() -> list[float]:
    return tone(520, 0.09, 0.28) + tone(780, 0.08, 0.22)


def death() -> list[float]:
    return tone(180, 0.18, 0.3) + tone(90, 0.22, 0.22)


def loop() -> list[float]:
    notes = [196, 233, 262, 294, 262, 233]
    seq: list[float] = []
    for f in notes:
        seq.extend(tone(f, 0.28, 0.08, decay=False))
        seq.extend([0.0] * int(RATE * 0.04))
    return seq


def main() -> None:
    write_wav(OUT / "jump.wav", jump())
    write_wav(OUT / "death.wav", death())
    write_wav(OUT / "dusk_loop.wav", loop())
    write_wav(OUT / "silence.wav", [0.0] * int(RATE * 0.4))
    print("Wrote", OUT)


if __name__ == "__main__":
    main()
