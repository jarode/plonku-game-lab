# Mobile preview

Portrait target is **540×960 (9:16)**. `adaptWidth` scales to the device width.

## Fastest local phone test

1. Export: `node tools/gdevelop-web-export.mjs`
2. Serve on the LAN: `node tools/preview-lan.mjs`
3. On a phone on the **same Wi-Fi**, open the printed `http://<pc-lan-ip>:8765/`
4. Windows Firewall: allow inbound TCP **8765** if the phone cannot connect.
5. This is not a public deploy.

Dev tools: add `?dev=1`.

## Desktop / emulator viewports used in task 007

| Viewport | Notes |
| --- | --- |
| 390×844 | iPhone-class 9:16-ish |
| 360×800 | common Android |
| 412×915 | large Android |
| 540×960 | design resolution |

Keyboard Space remains for desktop.
