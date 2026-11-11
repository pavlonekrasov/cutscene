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

| Time (s)  | Length (s) | Framing                               | What happens                                                                                                                 | Out |
| --------- | ---------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | --- |
| 0.00–6.33 | 6.33       | wide → ×2.25 → wide (one take, loops) | right-click the logo, hover 'Copy logo as SVG', 'Download brand assets', 'Brand' (0.9–4.9), pull-out ×0.55 (5.3) to the hero | —   |

### By eye

- **Zoom:** working ×2.25 (a 3-item menu fills a third of the frame)
- **Cards:** none
- **Cursor:** enlarged pointer, hand on hover
- **Frame:** full-bleed page (no window)
- **Aspect:** ~1.41:1, 1016×720, 60 fps
- **Sound:** none

### Frame-level beats

- The push begins as the menu opens; blur covers the move, so the eye lands on a sharp menu.

Read from 10-frame strips around 2 cuts, 1 dissolve and 2 moves; 1 f = 16.7 ms at 60 fps.

- **The push is anchored at the logo.** In the 0.91 s push the page scales ×2.25 with the top-left corner nearly fixed: the Framer mark stays at about 5% × 10% while the headline 'The internet is your canvas' slides off to the lower right, smeared in columns 2–4. By column 5 only 'The' is left in frame, cropped at the bottom edge.
- **The menu fades in after the blur has cleared.** Columns 5–6 are sharp and empty under the logo; the menu's three rows come up from about 20% to full over columns 7–10 (about 0.35 s), its top-left corner at the logo. The pointer, a small arrow, is on the logo throughout.
- **The hovered row carries a lighter fill.** At 3.57 s 'Download brand assets' has a rounded highlight; the pointer, now a hand, moves down about 1% of the frame per frame and the highlight is on 'Brand' by column 5. The highlight changes between two frames, with no slide between rows.
- **The pointer leaves the menu before the pull.** At 4.67 s the hand drops below the last row and the highlight clears over 10 frames; the menu is still open and unlit when the pull begins.
- **The pull runs the push backwards with the menu still fading.** In the 1.32 s pull the first column shows the menu at about 30% brightness and half size; the headline is back, sharp, by column 4, and columns 5–9 are a settle of a few percent as the hero's gradient grows in at the bottom.
- **What stays in frame during the hold is a piece of the headline.** The cropped 'Th' at the lower right is about 20% of the frame: an unreadable fragment in white, the brightest thing on screen beside the menu.

**Eye at the cuts.** There are no edits; the film loops. Logo → menu: 0–10%, the menu opens where the pointer is. End → loop start: the pointer's last position (about 20% × 40%) to the logo (5% × 10%): 15% sideways, across the loop point. Both measured cuts are hover changes.

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
- **I wish:** The push covers ×2.25 in 0.41 s, about 25 frames: without the blur each frame would show the headline displaced by 3–4% of the frame, which reads as stepping. The blur hides that and also hides the page for 0.4 s.
- **I wonder:** Could cutscene set zoom depth from the target box's area?
