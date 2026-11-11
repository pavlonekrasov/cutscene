# Framer: the logo's brand menu

- **Video:** https://video.twimg.com/ext_tw_video/1760308415128371200/pu/vid/avc1/1016x720/y-KXeCti3eSww9Mk.mp4?tag=12
- **Found on:** https://screen.studio (the showcase wall on the home page)
- **Maker:** Framer, made with Screen Studio. **Kind:** showreel. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-framer-brand-menu.json](../references/2026-11-11-framer-brand-menu.json)

**Why it's here.** A deep, fast push (×2.25 in 0.41 s) from the hero headline into a small context menu, held while each item is hovered, then back out: a hidden detail made the subject.

## 1. Describe

### Measured

6.33 s, 1016×720, 60 fps. Camera still 63% of the time. 6 shots, median 1.1 s. 5 cuts (3 dissolves); 5 moves.

Moves:

- 0.42 s push ×2.245 (pan -26, -26.1%), 2–98% 410 ms, 10–90% 300 ms, peak 0.07
- 4.96 s pull ×0.609 (pan 32.3, 32.3%), 2–98% 230 ms, 10–90% 180 ms, peak 0.94, overshoot 9%
- 5.31 s pull ×0.553 (pan 42, 42%), 2–98% 820 ms, 10–90% 530 ms, peak 0.03
- (2 more under 150 ms, ×1.1 or 5% of the frame: blur, UI changes or tracker noise)

**What the instrument can read.** Heavy motion blur: blurred frames read as cut candidates and split the moves, so durations here are approximate.

### Shot list

| Time (s)  | Framing                               | What happens                                                                                                                 | Out |
| --------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | --- |
| 0.00–6.33 | wide → ×2.25 → wide (one take, loops) | right-click the logo, hover 'Copy logo as SVG', 'Download brand assets', 'Brand' (0.9–4.9), pull-out ×0.55 (5.3) to the hero | —   |

### By eye

- **Zoom:** working ×2.25 (a 3-item menu fills a third of the frame)
- **Cards:** none
- **Cursor:** enlarged pointer, hand on hover
- **Frame:** full-bleed page (no window)
- **Aspect:** ~1.41:1, 1016×720, 60 fps
- **Sound:** none

### Frame-level beats

- The push begins as the menu opens; blur covers the move, so the eye lands on a sharp menu.

## 2. Classify

Screen Studio clip: a deep fast push into a small menu. Conventions: full-bleed page, enlarged pointer, hover states.

## 3. Diagnose

- ×2.25 in 0.41 s into a three-item menu. → Zoom depth scales with the target: a small target gets a deep push.
- Held while each item is hovered. → The hover states are the content, so the frame waits for them.

## 4. Prescribe

- _adjusts_: Zoom depth scales with the target: ×2.25 for a small menu. (CAMERA.working, CAMERA.cutOver)
- _new_: Motion blur on fast camera moves. (renderer (not built))

## 5. Critique

- **I like:** A hidden menu becomes the subject because the push is sized to it.
- **I wish:** The 0.41 s push is fast enough to need motion blur to read as smooth.
- **I wonder:** Could cutscene set zoom depth from the target box's area?
