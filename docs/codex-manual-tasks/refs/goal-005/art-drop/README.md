# Wrzut grafik — Zombie Survival Score (Wrocław)

**Tylko ten folder.** Wrzucasz tu PNG, nic nie szukaj w `tools/` ani w GDevelop.

Moodboardy (styl 1:1):

- `docs/codex-manual-tasks/refs/goal-005/moodboard-game-over-wroclaw.jpg`
- `docs/codex-manual-tasks/refs/goal-005/moodboard-ui-kit-plonku.jpg`

Brief: `games/zombie-runner/PLONKU-STYLE.md`  
Teksty PL (nie wymyślaj innych): `games/zombie-runner/COPY.md`

Gdy skończysz minimum albo pełny zestaw, napisz w chacie: **„wrzuciłem art-drop”**.

---

## 1. Co masz wygenerować?

Tak. Obrazy **Ty**. Agent ich nie maluje w tym tasku.

Gra to portrait **540×960**. Silnik (GDevelop) łyka **PNG**. SVG nie wrzucaj do tego folderu.

Dajesz **mastery 4×** (albo 2×, jeśli 4× boli). Agent przeskaluje do kolumny „W grze”.

---

## 2. Zasady twarde (inaczej się nie wklei)

| Zasada | Dokładnie |
| --- | --- |
| Format | PNG, 8-bit RGBA |
| Tło sprite’ów | **przezroczyste** (alpha). Nie magenta, nie czarny, nie szary checker |
| Tło city/bg | pełny kadr, bez dziur |
| Nazwa pliku | **dokładnie** jak w tabelach poniżej, małe litery, myślniki |
| Kierunek postaci i zagrożeń | profil, ruch **w prawo** |
| Ten sam kid wszędzie | skóra limonkowa, czarna czapka z **żółtą koroną**, czarny hoodie, **różowy / hot-pink plecak**, czarne buty, grube obrysy, sticker/comic, **nie gore** |
| Paleta | lime `#D7FF3F`, pink `#FF2D8B`, cyan `#00D9FF`, navy `#1A1D23`, off-white `#F4F4F1` |
| Tekst na świecie | **zakaz** (WROCŁAW na neonie w tle wolno) |
| Tekst na UI | lepiej **pusty przycisk**; modele psują `Ł` |
| Nie wrzucać | dinozaur, pustynia, „Made with GDevelop”, krew, logo obcych gier |

Jedna postać = jeden look. Zmienia się tylko poza (bieg / stanie / skok / padnięcie).

---

## 3. Gdzie wrzucić

Folder (ten sam, w którym jest ten README):

```text
docs/codex-manual-tasks/refs/goal-005/art-drop/
```

Ścieżka od korzenia repo `plonku-game-lab`.  
Nie wrzucaj do `games/zombie-runner/assets/wroclaw-v1/concept-masters/` (to cache packera, gitignore).  
Nie nadpisuj ręcznie `player/run_01.png` itd. — to zrobi agent.

---

## 4. Kolejność: najpierw MINIMUM, potem reszta

### MINIMUM (9 plików) — bez tego nie ma co pakować

Wygeneruj **te nazwy, te piksele**:

| # | Nazwa pliku (wrzut) | Master px | W grze px | Co narysować |
| --- | --- | ---: | ---: | --- |
| 1 | `bg.png` | **2560×1920** | 1280×960 | Nocny Wrocław: katedra (dwie wieże), wielki księżyc, rzeka, kamienice, most, neon. **Bez HUD, bez przycisków, bez wyniku.** Landscape. |
| 2 | `ground.png` | **256×256** | 64×64 | Kafelek brudnego betonu / krawężnik, **tile’uje się w poziomie**, mech, ewentualnie graffiti-czaszka. Bez postaci. |
| 3 | `runner-run-01.png` | **680×472** | 170×118 | Kid **biegnie w prawo**, pełna figura, stopy widoczne, przezroczyste tło. |
| 4 | `runner-idle-01.png` | **680×472** | 170×118 | Ten sam kid **stoi** (lekko, nie salut). |
| 5 | `runner-jump-01.png` | **680×472** | 170×118 | Ten sam kid **w powietrzu**, kolana, w prawo. |
| 6 | `runner-dead-01.png` | **680×472** | 170×118 | Padnięcie slapstick, **nie gore**. |
| 7 | `barricade.png` | **344×384** | 86×96 | Jersey barrier, paski czerwono-białe, brudny beton. Profil / 3/4. Przezroczyste tło. |
| 8 | `pigeon.png` | **512×264** | 128×66 | Gołąb w locie **w prawo**, ciemny, różowe oko / rim. Szeroki niski kadr. Przezroczyste tło. |
| 9 | `tram.png` | **640×160** | 160×40 | Tramwaj **niski i szeroki** (jak pasek). Okna w rzędzie, różowa poświata, sylwetki w oknach. Przezroczyste tło. |

`tram.png` **musi** być szeroki i niski. Slot kolizji w grze to **160×40**. Normalny tramwaj 16:9 tam zginie.

**Wariant B (tramwaj czytelny, zmienia hitbox):** zamiast 640×160 daj `tram-tall.png` **640×256**. Napisz w chacie „wariant B tramwaj”. Agent wtedy zmieni slot — to już gameplay.

### Jump button (mocno zalecany, 10. plik)

| Nazwa | Master px | W grze px | Co |
| --- | ---: | ---: | --- |
| `jump-button.png` | **512×512** | skalowane do ~170×170 na ekranie | Lime `#D7FF3F` kafelek, **różowy cień** przesunięty w dół/prawo, **czarna strzałka w górę** na środku. Tło przezroczyste. Bez tekstu. |

### PEŁNY zestaw (jak chcesz animację, nie kiwanie)

Te same wymiary **680×472**, przezroczyste tło, ten sam kid:

**Bieg (8 klatek)** — cykl, nogi naprzemiennie:

- `runner-run-01.png` … `runner-run-08.png`

**Idle (10 klatek)** — lekki oddech:

- `runner-idle-01.png` … `runner-idle-10.png`

**Skok (7 klatek)**:

- `runner-jump-01.png` … `runner-jump-07.png`

**Dead (8 klatek)**:

- `runner-dead-01.png` … `runner-dead-08.png`

Jeśli zrobisz tylko `*-01`, agent złoży fałszywy cykl z jednej klatki (gorzej).

### UI — opcjonalne (tekst i tak dociągniemy)

Jeśli malujesz UI: **zostaw puste miejsce na napisy** albo w ogóle bez liter.

| Nazwa | Master px | W grze px | Co |
| --- | ---: | ---: | --- |
| `ui-start-panel.png` | **1080×1240** | 540×620 | Góra: klimat miasta. Dół **pusty** (~180 px) pod dwa przyciski. |
| `ui-cta-start.png` | **920×176** | 460×88 | Pusty lime prostokąt + różowy cień. |
| `ui-cta-city.png` | **920×152** | 460×76 | Pusty navy + obrys cyan. |
| `ui-hud.png` | **1032×192** | 516×96 | Ramka na wynik z lewej, tag z prawej. Bez cyfr. |
| `ui-go-panel.png` | **984×840** | 492×420 | Panel game over, **dziura** na duży wynik. |
| `ui-cta-retry.png` | **920×168** | 460×84 | Pusty lime + różowy cień. |
| `logo.png` | **512×192** | 256×96 | Znak / kid, bez GDevelop. |

Pełny mockup telefonu (nie slot): `mockup-full.png` **1080×1920** (9:16) — tylko referencja, nie wpinamy 1:1.

---

## 5. Prompty do wklejenia (EN, + moodboard jako image prompt)

Dopisz zawsze: `transparent background, PNG, game sprite, no UI, no watermark`.

**Kid (dopisz pozę):**

```text
Same character every time: small cartoon zombie boy, lime-green skin, black baseball cap with gold crown icon, black hoodie tracksuit, hot pink backpack, black sneakers, thick comic outline, sticker illustration, funny not gory, full body, side view running to the RIGHT, mobile game sprite, transparent background, no scenery, no text
```

Idle: `standing idle, slight bounce, feet on ground`  
Jump: `jumping in the air, knees tucked, moving right`  
Dead: `slapstick tripped fall, no blood, no gore`

**Tło:**

```text
Night Wrocław Poland cityscape painting, Ostrów Tumski twin gothic cathedral spires, huge hazy yellow moon, Odra river reflections, neon pink WROCLAW sign on a roof, cyan and magenta windows, metal arch bridge, grainy cyber-grunge comic, no HUD no buttons no score, landscape 2560x1920
```

**Barykada / gołąb / tramwaj:** jak w tabeli + `match attached Plonku moodboard, transparent background`.

---

## 6. Checklista przed oddaniem

- [ ] Każdy plik ma **dokładną nazwę** z tabeli
- [ ] Pixel size mastera = kolumna Master (albo 2×: wtedy **połowa**, np. run 340×236 — napisz że to 2×)
- [ ] Sprite’y: checker przezroczystości, nie czarna dziura
- [ ] Kid wygląda tak samo na run/idle/jump/dead
- [ ] `tram.png` jest **640×160** (albo świadomy wariant B)
- [ ] Brak tekstu PL na sprite’ach świata
- [ ] Pliki leżą w `docs/codex-manual-tasks/refs/goal-005/art-drop/`
- [ ] W chacie: „wrzuciłem art-drop” + lista plików

---

## 7. Czego NIE robić

- Nie skaluj do 170×118 sam — daj duży master.
- Nie mieszaj 16:9 tramwaju do slotu 160×40.
- Nie startuj GOAL 006.
- Nie wrzucaj PSD/WebP jako jedynego formatu (PNG wymagane).

## 8. Co zrobi agent po wrzucie

Spakuje do:

`games/zombie-runner/assets/wroclaw-v1/`  
(`bg_far.png`, `player/run_01.png`, `hazard_*.png`, `ui/*.png`, …)

Potem export + regresja. Ty nic nie wpinasz w `zombie-runner.json`.
