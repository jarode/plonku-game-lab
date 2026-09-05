# 033A — Operator: wygeneruj grafiki slotów Plonku

## Dla kogo

To zadanie jest dla **Ciebie (operator)**, nie dla agenta. Agent **nie** generuje tu obrazów i **nie** startuje GOAL 006 / 034.

Pełna instrukcja (wymiary, nazwy plików, prompty, folder wrzutu) jest w jednym miejscu:

**`docs/codex-manual-tasks/refs/goal-005/art-drop/README.md`**

Tam wrzucasz gotowe PNG. Nie szukaj nic indziej.

## Gate

GOAL 005 / 033 PASS. Moodboardy już w repo.

## Goal

Dostarczyć master-PNG zgodne z moodboardami i **dokładnymi rozmiarami slotów** GDevelop, żeby agent mógł je spakować do `games/zombie-runner/assets/wroclaw-v1/` bez zgadywania.

## Po wrzucie (agent, osobna sesja)

1. Skopiować drop → packer.
2. `python tools/build-plonku-art.py` (albo zaktualizować packer pod nazwy z README).
3. `node tools/runner-regression.mjs --game games/zombie-runner --viewport 360x800`
4. RESULT tego taska.

Nie zmieniać kolizji/skoku, chyba że operator wybrał w README wariant **tramwaj większy hitbox**.

## Result

`033A_operator_generate_plonku_slot_art-RESULT.md`

## Chain

To **nie** jest 034. Po wrzucie i packu: STOP, chyba że operator każe iść dalej.
