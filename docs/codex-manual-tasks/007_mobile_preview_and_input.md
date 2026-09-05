# 007 — Mobile preview and input hardening

## Gate

Requires task 006 PASS.

## Goal

Make mobile testing fast and reliable, with portrait-first layout and touch controls treated as first-class behavior.

## Scope

1. Validate the game at representative portrait mobile resolutions, including a 9:16 target.
2. Ensure touch jump input is responsive and does not conflict with UI controls.
3. Ensure gameplay-critical UI remains readable and inside safe areas.
4. Document the fastest supported workflow to preview/test the local build on a phone on the same network or via another low-friction local method.
5. Fix layout/input problems found during validation.
6. Preserve keyboard controls for desktop testing.

## Constraints

- No public deployment is required.
- Do not add analytics, ads, login, or platform SDKs.
- Avoid device-specific hacks unless documented and necessary.

## Acceptance criteria

PASS only if the game is playable in portrait orientation on representative mobile viewport sizes, touch input works reliably, critical UI is not clipped/covered, desktop controls remain functional, and the phone-preview workflow is documented truthfully.

## Result

Create `007_mobile_preview_and_input-RESULT.md` with tested viewports/devices or emulation, issues fixed, preview workflow, limitations, and commit SHA.

## Chain behavior

When executed under `GOAL-001_zombie_runner_mvp.md`, push implementation + RESULT, then inspect the RESULT status. Continue to task 008 only when status is exactly `PASS`. For any other status, STOP and do not start task 008.
