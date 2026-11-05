# Lumora · لومورا

Persian creature-catching web game with a world-space WebXR combat mode.

Play: https://mhr05121384.github.io/lumora-ar-hunt/

## Version 4: spatial hunt

- 24 procedural animated 3D creatures per wave, six species, 2–5 hit points.
- Creatures walk within a detected horizontal plane polygon when available, or a bounded 0.85 m radius floor arena.
- Hit-test placement requires 18 stable frames; world transforms are independent of camera orientation. Optional XR anchors refine the fixed placement.
- Tracking loss hides and pauses creatures. Reference-space reset without an anchor requires fresh placement.
- Center-screen raycast shooting, flight response after hits, weapon heat/cooldown, next waves and saved collection rewards.
- Optional CPU depth sensing masks virtual creatures behind real foreground surfaces and blocks shots through those surfaces. Missing sensor data is clearly indicated and never simulated.
- Standalone 3D practice arena for WebGL browsers without immersive AR. Practice is explicitly not world-tracked.
- Original 2D collection, evolution and biome game remains available.

## Start

Serve these static files over HTTPS, or localhost for development. Open **ورود به AR فضایی**, grant AR permission, scan a well-lit textured floor, wait for the green placement ring, and press the placement button. Aim the center reticle and press **شلیک نور**.

Immersive AR requires WebXR hit-test and DOM overlay support. Anchors, plane detection and CPU depth are optional device/browser capabilities; there is no guarantee that every phone exposes them. Depth sensing does not provide full room navigation or obstacle avoidance: creatures stay on the selected floor region, but do not plan routes around furniture. World tracking may drift in poor lighting or textureless spaces. Session placement is not persisted across sessions. Camera/depth data are processed locally; no frames are uploaded.

Three.js 0.170.0 is vendored locally under the MIT license. The WebXRManager GPU depth path is gated on `session.depthUsage === "gpu-optimized"` and an available binding, so CPU depth sessions reach the application frame callback. Progress is stored in localStorage in the current browser.

## Validation

Run `node --test arena-core.test.mjs` for floor-boundary simulation with 24 creatures, stable placement gating, damage/death behavior and depth-aware hit blocking. JavaScript syntax checks also pass. The cloud preview browser disables WebGL, so rendering, depth alignment and physical camera motion have **not** been verified on an AR-capable phone. These require on-device validation.

Manual device checks: place a wave, rotate 90 degrees and return; walk slowly around the arena; obscure a creature with a real object while depth is active; interrupt tracking and recover; finish all creatures and start another wave; exit and re-enter AR.

API references: [WebXR depth sensing](https://immersive-web.github.io/depth-sensing/), [hit-test anchors](https://developer.mozilla.org/en-US/docs/Web/API/XRHitTestResult/createAnchor).

## Deploy

GitHub Pages serves the repository root from `main`. No build step, credentials or server required.

## Version 5: scan freeze fix

Fixed an engine/application depth-mode mismatch which could throw before the first application XR frame. CPU depth buffers are read only after placement, bounded to 1M pixels and isolated from the main loop. A frame watchdog reports FRAME_TIMEOUT after 8 seconds of a visible session without frames; application exceptions end AR with a visible code. Null hit poses are ignored. Physical-device reproduction remains unverified.
