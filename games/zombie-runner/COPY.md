# Plonku copy — Zombie Runner (GOAL 005–006)

Polish is player-facing. English in this file is for implementers only.

Naming lock: `games/zombie-runner/NAMING.md` → **Zombie Survival Score / WROCŁAW**. Score label is `WYNIK`, not the city.

## Tone

Short. Tag-like. City as character. Retry is invitation, not an error. No gore jokes. No “Game Over, tap space”.

## In-game now (`runner.json` → HUD)

| Slot | PL |
| --- | --- |
| Title | Zombie Survival Score |
| Start helper | Przetrwaj Wrocław. Wynik = sekundy w mieście. |
| Score prefix | WYNIK |
| Score meaning | Integer **seconds** survived this run. Arcade clock, not live open data. |
| Game over title | KONIEC GRY |
| Game over retry | Spróbuj jeszcze |
| Mute (desktop) | U wycisza |

## For screens 028–030 (do not invent alternatives)

| Slot | PL |
| --- | --- |
| Primary start | ROZPOCZNIJ GRĘ |
| Secondary start / GO | WYBIERZ MIASTO |
| Optional | JAK TO DZIAŁA? |
| City tag | WROCŁAW |
| Experiment line | Oparte na klimacie miasta. Zombie też. |
| GO micro | Wrocław nie śpi. Ty możesz wrócić. |
| Alt micro | Więcej danych. Dłuższe życie. |
| Choose city (disabled OK) | Wkrótce więcej miast |

## Do not use

Tap to retry, Press any key, GAME OVER - tap or Space, Made with GDevelop as a slogan.
