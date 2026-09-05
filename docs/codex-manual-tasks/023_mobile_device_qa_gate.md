# 023 — Mobile device QA gate

## Gate

Requires task 022 PASS.

## Goal

Validate the real Zombie Runner — Wrocław product on mobile, including a physical-device gate rather than browser emulation only.

## Scope

First run automated/browser validation:

- representative portrait viewports including 360×800, 390×844 and 540×960;
- touch/pointer start, jump, game-over and retry;
- at least 10 retry cycles;
- UI safe areas;
- no dev-mode leakage;
- export + runner regression PASS.

Then prepare/start LAN preview using the documented local workflow and record the exact URL/port.

### Physical-device requirement

A real phone on the same LAN must be used to verify at minimum:

- page loads;
- first tap/start works;
- jump feels responsive;
- game-over and retry work by touch;
- UI is readable/not clipped;
- orientation behavior is acceptable;
- audio behavior is acceptable if audio exists.

If the worker cannot access a physical phone, do **not** claim PASS. Return `OPERATOR_ACTION_REQUIRED` with concise exact manual test steps and STOP GOAL 004. After the operator supplies results, the task may be completed/re-run.

## Acceptance criteria

PASS only if both automated QA and a documented physical-phone pass succeed. Any reproducible product defect must be fixed and revalidated before PASS.

## Result

Create `023_mobile_device_qa_gate-RESULT.md` with automated results, physical device/browser details, LAN workflow, issues/fixes, limitations and commit SHA if changes are made.

## Chain behavior

If and only if RESULT status is exactly `PASS`, continue to task 024 in a fresh worker session. Any other status, including `OPERATOR_ACTION_REQUIRED`, means STOP GOAL 004.