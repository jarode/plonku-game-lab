# 058 — CITY BREAKER start / generation / result UI

## Goal
Make the non-gameplay states feel like part of the same Plonku product instead of generic menus.

## Required states
1. Start / ready state.
2. Short city-data generation sequence.
3. Life lost / retry state.
4. Final result/share-ready state.

## Generation sequence
Use a fast, original pseudo-utility flow such as:
- `ANALIZUJĘ DANE...`
- `BUDUJĘ LEVEL...`
- `<CITY>.DATA GOTOWE`

Keep it short enough not to hurt replay speed.

## Result framing
Result should show:
- city/profile,
- score/performance,
- compact factor legend,
- playful Plonku commentary,
- share-ready composition.

Do not make causal/forecast claims about real cities.

## Visual language
Same shell, typography, data-cell vocabulary, colors and retro-digital texture from 055–057.

## Preserve
No movement tuning yet. Retry logic and board determinism remain unchanged.

## Evidence
Capture each required state at portrait mobile plus one desktop result frame.

## Acceptance
PASS only if start→generation→play→result feels like one authored Plonku experience.

Next on exact PASS: 059.
