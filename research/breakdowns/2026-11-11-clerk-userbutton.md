# Clerk: the new <UserButton />

- **Video:** https://video.twimg.com/amplify_video/2115855434531905536/vid/avc1/1280x720/hE5kCjiBWKtwHzXG.mp4?tag=16
- **Found on:** https://x.com/clerk/status/2115855475975868764
- **Maker:** Clerk. **Kind:** launch film. **Posted:** 2026-10-29. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-clerk-userbutton.json](../references/2026-11-11-clerk-userbutton.json)

**Why it's here.** A single dropdown filmed like a product shot: a 3D app icon turns into the logo, then a macro camera travels down the open menu ('Clerk' account, 'Acme', '+ Add Organization', 'Settings') at a steep angle before one flat, legible frame of the whole menu. 32.9 s.

## 1. Describe

### Measured

32.9 s, 1280×720, 59.9 fps. Camera still 48% of the time. 13 shots, median 1.84 s. 12 cuts (4 dissolves); 20 moves.

Moves:

- 1.09 s pan ×0.984 (pan 1.7, -5.4%), 2–98% 210 ms, 10–90% 180 ms, peak 0.7, overshoot 10%
- 1.36 s pan ×1.005 (pan 3.4, -9.2%), 2–98% 290 ms, 10–90% 230 ms, peak 0.72, overshoot 5%
- 10.50 s pull ×0.913 (pan 4.6, 7.6%), 2–98% 160 ms, 10–90% 130 ms, peak 0.26, overshoot 10%
- 10.72 s pull ×0.807 (pan 11.9, 17.7%), 2–98% 560 ms, 10–90% 440 ms, peak 0.07, overshoot 2%
- 11.35 s pull ×0.954 (pan 4.4, 3.5%), 2–98% 1540 ms, 10–90% 1250 ms, peak 0.02
- 13.18 s pan ×1.076 (pan 15.4, 34.3%), 2–98% 3670 ms, 10–90% 2840 ms, peak 0.51
- 17.11 s pan ×0.85 (pan 26.5, 81.6%), 2–98% 4710 ms, 10–90% 3880 ms, peak 0.09
- (13 more under 150 ms, ×1.1 or 5% of the frame: blur, UI changes or tracker noise)

**What the instrument can read.** Long, slow camera travels over the tilted menu (pans of 34% over 3.7 s and 82% over 4.7 s); the instrument reads the tilt as small zoom changes.

Autofit left out 2 moves with a cut too close and 2 whose best fit was above 3% (the tracker, not a curve).

### Shot list

| Time (s)    | Length (s) | Framing             | What happens                                                                                      | Out                  |
| ----------- | ---------- | ------------------- | ------------------------------------------------------------------------------------------------- | -------------------- |
| 0.00–8.14   | 8.14       | 3D object           | violet slabs fold into the Clerk app icon                                                         | dissolves 0.3, 2.3 s |
| 8.14–11.29  | 3.15       | logo                | the icon shrinks to a small mark                                                                  | dissolve             |
| 11.29–25.98 | 14.69      | macro travel        | the camera slides along the tilted menu: account, organizations, '+ Add Organization', 'Settings' | hard cuts            |
| 25.98–32.90 | 6.92       | flat menu, end card | the whole menu, flat; then 'Components 2.0 / <UserButton />' and the logo                         | end                  |

### By eye

- **Zoom:** macro: one menu row fills the frame; one flat frame of the whole menu at ~×2
- **Cards:** 'Components 2.0 / <UserButton />' with the logo (6.9 s)
- **Cursor:** none
- **Frame:** near-black with a violet glow
- **Aspect:** 16:9, 60 fps
- **Sound:** an audio track with rhythmic onsets (not listened to)

### Frame-level beats

Read from 10-frame strips around 7 cuts, 1 dissolve and 2 moves; 1 f = 16.7 ms at 59.94 fps.

- **The flat frame of the whole menu comes after the macro travel**, so the viewer has read each row before seeing them together.
- **Scale cuts on a fixed centre.** The icon cuts from full size to a small mark at 6.01 s (about ×6), then back up to about ×1.5 at 8.14 s, each on one frame and on the same centre: a match cut on position used as a zoom.
- **Macro drifts are slow and short.** The pulls at 10.72 and 11.35 s move a row's width over 1–2 s; each macro shot holds one row ('Clerk ⌄', 'cameron@clerk.com', 'Acme', 'Settings') in focus and cuts before the next row arrives.
- **Each macro cut jumps rows, not travels.** At 13.01 and 17.00 s the next row is on screen on frame 0 or −1, at the same tilt: the edit does the scrolling.
- **The flat frame is small.** At 21.97 s the macro cuts straight to the whole menu at about 15% of the frame width, in a violet glow, then (25.98 s) to the centred 'Components 2.0 / <UserButton />' card.

**Eye at the cuts.** Icon → mark → icon: 0% (same centre). Macro row → macro row: within about 10% (rows enter at the same tilt and place). Macro → flat menu (21.97 s): from the left half to the centre, about 20%. 4 of 7 measured 'cuts' are true edits; the instrument places half of them one frame late.

## 2. Classify

## 2. Classify

3D product-shot film of one component. Conventions: a hero object (the icon), macro travel over a tilted surface, a flat 'beauty' frame, a component-name end card.

## 3. Diagnose

- Macro rows first, the whole menu last. → Detail before overview: each row is read at a legible size, then the overview confirms the structure.
- Travel speed is slow (82% of the frame over 4.7 s). → Slow lateral moves keep text readable while the camera moves; a fast pan would smear it.

## 4. Prescribe

- _new_: End on one flat, still frame of the whole component after detail shots. (reel structure)
- _adjusts_: When text must stay readable while the camera travels, the move is slow: here 3.7–4.7 s for 34–82% of the frame. (CAMERA.pan)

## 5. Critique

- **I like:** Giving a dropdown a hero object's treatment makes a small component feel like a launch.
- **I wish:** Eight seconds of abstract icon before any UI; no one clicks the menu.
- **I wonder:** Is there a cutscene beat for 'the component, flat and still' after a flow, a held detail card?

## Not for us

- 3D tilts and a rendered app icon: not the real app.
