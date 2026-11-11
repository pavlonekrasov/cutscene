# Figma: vector editing

- **Video:** https://video.twimg.com/amplify_video/2018773922859319296/vid/avc1/1280x720/oFqrJytMuJC7rtTF.mp4?tag=21
- **Found on:** https://x.com/figma/status/2018778936482935124
- **Maker:** Figma. **Kind:** launch film. **Posted:** 2026-02-03. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-figma-vector.json](../references/2026-11-11-figma-vector.json)

**Why it's here.** A 31 s craft film on a full-bleed canvas: a red starburst on lime reshaped point by point, an app icon (an eye with a planet) edited, and letterforms 'Aa' outlined and bent. Each push settles before the pointer starts work, and long dissolves join successive states of the same shape.

## 1. Describe

### Measured

30.62 s, 1280×720, 24 fps. Camera still 84% of the time. 21 shots, median 0.96 s. 20 cuts (13 dissolves); 14 moves.

Moves:

- 0.48 s push ×1.643 (pan -6.8, 12.5%), 2–98% 910 ms, 10–90% 470 ms, peak 0.58
- 2.23 s push ×1.372 (pan -0.8, 0.5%), 2–98% 350 ms, 10–90% 170 ms, peak 0.43, overshoot 1%
- 10.30 s pull ×0.839 (pan 0.2, -0.2%), 2–98% 230 ms, 10–90% 190 ms, peak 0.68, overshoot 16%
- 10.97 s push ×1.19 (pan -0.2, 0.2%), 2–98% 260 ms, 10–90% 190 ms, peak 0.59, overshoot 4%
- 11.67 s pan ×0.955 (pan 18.2, 0.1%), 2–98% 160 ms, 10–90% 110 ms, peak 0.76, overshoot 47%
- 12.16 s push ×1.209 (pan 6.9, 1.7%), 2–98% 750 ms, 10–90% 330 ms, peak 1, overshoot 29%
- 13.12 s push ×1.125 (pan 0.6, 0.9%), 2–98% 460 ms, 10–90% 310 ms, peak 0.19
- 24.32 s push ×1.881 (pan 7.5, -0.2%), 2–98% 680 ms, 10–90% 360 ms, peak 0.38
- (6 more under 150 ms, ×1.1 or 5% of the frame: blur, UI changes or tracker noise)

**What the instrument can read.** 24 fps. Hand-keyed pushes. ×1.64 in 1.42 s, in-out quint on linear scale (rms 0.5%; cutscene 1.7%). ×1.35 in 0.44 s, in-out quart on linear scale (0.3%; cutscene 0.9%). ×1.84 in 0.72 s, cutscene 0.3.0's own curve on linear scale (2.3%).

### Curve fits

RMS error as % of the move's travel; the same fit recovers cutscene 0.3.0's own push at 0.16%.

| Move                | Best fit                                       | Next other curve                       | cutscene 0.3.0's curve |
| ------------------- | ---------------------------------------------- | -------------------------------------- | ---------------------- |
| push ×1.64 at 0.48  | in-out-quint on linear scale, 1418 ms (0.5%)   | spring ζ=0.8, ω 5.9/s, 634 ms (3.51%)  | 1.66% (1024 ms)        |
| push ×1.35 at 2.23  | in-out-quart on linear scale, 435 ms (0.3%)    | spring ζ=0.9, ω 21.1/s, 222 ms (2.41%) | 0.92% (375 ms)         |
| push ×1.84 at 24.32 | cutscene 0.3.0 on linear scale, 719 ms (2.26%) | ease, 602 ms (2.51%)                   | 2.32% (719 ms)         |

Autofit left out 3 moves with a cut too close.

### Shot list

| Time (s)    | Framing   | What happens                                                                   | Out                   |
| ----------- | --------- | ------------------------------------------------------------------------------ | --------------------- |
| 0.00–10.33  | starburst | a red starburst; points dragged; long dissolves (1.1–1.8 s) between its states | dissolves             |
| 10.33–14.71 | variants  | the starburst spins through variants in short cuts                             | short dissolves, cuts |
| 14.71–22.79 | icon      | an eye-and-planet icon; its shapes edited in an 8 s take                       | hard cut              |
| 22.79–30.62 | type      | 'Aa' outlined from a menu; the 'a' bent and rotated point by point             | cuts, short dissolves |

### By eye

- **Zoom:** pushes ×1.35–1.9 to the point being edited
- **Cards:** none in the edit; the post carries the name
- **Cursor:** the system pointer and enlarged resize cursors with direction arrows
- **Frame:** full-bleed lime canvas; a pink field for the icon
- **Aspect:** 16:9, 1280×720, 24 fps
- **Sound:** an audio track with rhythmic onsets (not listened to)

## 2. Classify

Hand-edited craft film, full-bleed canvas, three objects. Conventions: anticipation pushes, state-to-state dissolves, saturated art, enlarged resize cursors.

## 3. Diagnose

- Every push is finished before the pointer moves. → Anticipation: the frame is still when the work starts, so the edit is watched, not chased.
- Pushes fit in-out quint/quart on linear scale, rms 0.3–0.5%. → Hand-keyed symmetric easing, the hand-edited signature.
- Dissolves of 1.1–1.8 s join successive states of the same starburst. → A dissolve as time-lapse: the shape appears to evolve rather than cut.
- Shots shorten through the film (trend −0.87). → Acceleration toward the end, though the last edits pass in under a second.

## 4. Prescribe

- _confirms_: Anticipation: the camera settles before the action starts. (camera lead (Part 3))
- _new_: Dissolve between successive states of one object to show it evolving. (dissolve on a held locator (Part 2))
- _confirms_: Hand-keyed in-out quart/quint on linear scale. (camera curve (Part 3))

## 5. Critique

- **I like:** Every push ends before the pointer moves, so each edit is seen from a still frame.
- **I wish:** The final letterform edits pass at under a second each, too fast to follow the points.
- **I wonder:** Could a reel dissolve between two recorded states of the same locator's box to show an object evolving?

## Not for us

- A drawing canvas cutscene does not record as a web app.
