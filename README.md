# Lumora · لومورا

A Persian, mobile-friendly creature-catching browser game with six original guardians and camera-based AR.

## بازی

در بیشهٔ زمرد دنبال نگهبانان نور بگرد، گوی شکار را به بالا بکش و مجموعه‌ات را تکامل بده. با ۳ شکار، تالاب مهتاب و با ۶ شکار، درهٔ سپیده باز می‌شود.

- Six original animated creatures, including rare and legendary guardians.
- Timed capture rings, swipe throws, light lures and capture effects.
- Collection, evolution, XP, levels, quests and rewards.
- Three illustrated biomes and a no-camera mode.
- Persian RTL interface, responsive layout, sound and haptic feedback.
- Progress stored locally in the browser with `localStorage`.

## Camera AR

Select **فعال‌سازی AR** and allow the camera. Use HTTPS (or localhost). A rear-facing mobile camera is preferred. Where available and permitted, device orientation moves the creature on screen.

This version renders articulated 3D guardians with Three.js. On immersive-AR compatible devices, WebXR hit testing places the walking guardian on a detected surface. Other devices use a camera-overlay fallback. It does not use GPS spawning or a real-world map. Physical WebXR surface placement still requires on-device validation. The radar and weather are decorative game elements. Camera video is not recorded or uploaded. Physical mobile camera behavior has not yet been verified on-device. Stand in a safe place while playing.

## Run locally

No build tools or package installation are required:

```sh
python3 -m http.server 8080
```

Open `http://localhost:8080`. Camera access from a phone over a LAN generally requires HTTPS.

## Deploy with GitHub Pages

In **Settings → Pages**, select **Deploy from a branch**, branch **main**, folder **/ (root)**. Save and wait for deployment.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Game interface and dialogs |
| `style.css` | Responsive Persian RTL layout |
| `game.js` | Canvas artwork, gameplay, persistence, camera and audio |

The game uses vanilla JavaScript, Canvas 2D backgrounds and procedural Three.js models. Three.js 0.170.0 loads from jsDelivr. The optional Vazirmatn font is fetched from Google Fonts, with local font fallbacks.

## Validation

JavaScript syntax validation passed. Capture, inventory, rewards, persistence and drawing logic were checked with a Node simulation. Browser checks covered onboarding, successful capture, collection display, insufficient evolution currency and locked biome controls.
