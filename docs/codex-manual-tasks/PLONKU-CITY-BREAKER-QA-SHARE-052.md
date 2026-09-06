# TASK 052 — CITY BREAKER 2012 mobile / regression / result-share QA

## Goal
Run final product QA on CITY BREAKER 2012 before packaging it for Plonku integration review.

## Required QA matrix
Test at minimum:
- desktop landscape preview,
- 1024-width browser,
- 390px portrait mobile,
- 320px portrait mobile.

Physical phone is preferred if available. If not available, report browser emulation honestly and do not claim a physical-device test.

## Required work
1. Validate full loop:
   - load,
   - hook/start,
   - play,
   - generated board visible,
   - game over / clear,
   - result,
   - retry.
2. Validate pointer/touch input and that browser scrolling/selection does not steal active gameplay input in intended embed mode.
3. Validate at least 3 materially different fixtures on mobile.
4. Check:
   - no horizontal overflow,
   - no clipped HUD,
   - safe areas,
   - readable longest copy,
   - acceptable load/export size,
   - no default GDevelop/template watermark regressions,
   - audio behavior after user gesture if audio exists,
   - mute control if the product includes sound.
5. Validate result/share framing:
   - selected profile/city identifier is shown,
   - score/performance is shown,
   - data-generated-level explanation is concise,
   - share copy does not claim causal truth or historical 2012 data,
   - fallback copy works if native share is unavailable.
6. Run regression against neutral Breakout generator tests and existing game-lab packaging/export tools.
7. Capture screenshots/evidence for 1440, 1024, 390 and 320 where tooling allows.

## Acceptance gates
PASS only if:
- full run loop works at all required widths,
- touch input is reliable,
- at least 3 profiles show distinct board topology,
- result/share copy is safe and understandable,
- neutral generator regression remains green,
- no major visual clipping/overflow exists.

## Out of scope
- VGE website wrapper,
- production deployment,
- analytics integration.

## Chain
Exact `PASS` → task 053.
Any other status → STOP.
