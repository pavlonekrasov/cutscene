# Linear: releases

- **Video:** https://video.twimg.com/amplify_video/2049896952377094144/vid/avc1/1440x720/YPuIkjY2BtHLZGO1.mp4?tag=27
- **Found on:** https://x.com/linear/status/2049897250449391850
- **Maker:** Linear. **Kind:** launch film. **Posted:** 2026-04-30. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-linear-releases.json](../references/2026-11-11-linear-releases.json)

**Why it's here.** A 30 s motion piece where the feature's data structure is the picture: dozens of branches labelled with issue ids converge on one point, the release, on a tilted plane under a slowly drifting camera. Stacked release panels follow, and the copy types on with a block cursor: 'PLAN AND TRACK RELEASES', 'RELEASES', 'AVAILABLE NOW'.

## 1. Describe

### Measured

30 s, 1440×720, 60 fps. Camera still 36% of the time. 19 shots, median 1.16 s. 18 cuts (2 dissolves); 15 moves.

Moves:

- 0.08 s push ×1.04 (pan 5.6, -1%), 2–98% 1680 ms, 10–90% 1510 ms, peak 1, overshoot 10%
- 2.05 s push ×1.061 (pan 5.4, -1%), 2–98% 1350 ms, 10–90% 1130 ms, peak 0.89
- 6.65 s pan ×1.009 (pan 6.3, 0%), 2–98% 1580 ms, 10–90% 1320 ms, peak 0.94, overshoot 1%
- 11.31 s push ×1.06 (pan 3.7, 4%), 2–98% 210 ms, 10–90% 170 ms, peak 0.3, overshoot 7%
- 11.90 s pan ×1.02 (pan 4.7, -5.6%), 2–98% 300 ms, 10–90% 250 ms, peak 0.73, overshoot 2%
- 12.28 s pan ×1.008 (pan 3.7, -4.2%), 2–98% 430 ms, 10–90% 340 ms, peak 0.44, overshoot 3%
- 12.79 s pull ×0.86 (pan 7.6, -3%), 2–98% 2200 ms, 10–90% 1430 ms, peak 0.14
- 15.68 s pull ×0.667 (pan -5.8, -27.8%), 2–98% 5880 ms, 10–90% 4910 ms, peak 0.1
- 24.70 s pan ×1.033 (pan -9.8, 0.1%), 2–98% 590 ms, 10–90% 510 ms, peak 0.08, overshoot 3%
- (6 more under 150 ms, ×1.1 or 5% of the frame: blur, UI changes or tracker noise)

**What the instrument can read.** 2:1 (1440×720), 60 fps, still only 36%: the camera almost never stops. The clean fit is a pull over the stacked panels: ×0.86 over 2.7 s, out-cubic (rms 1.6%; cutscene 10.7%). The 6 s pull at 15.68 fits loosely (17%) and isn't counted.

### Curve fits

RMS error as % of the move's travel; the same fit recovers cutscene 0.3.0's own push at 0.16%.

| Move                | Best fit                   | Next other curve                                   | cutscene 0.3.0's curve |
| ------------------- | -------------------------- | -------------------------------------------------- | ---------------------- |
| pull ×0.86 at 12.79 | out-cubic, 2717 ms (1.62%) | spring ζ=1 on linear scale, ω 3/s, 1944 ms (3.44%) | 10.65% (1644 ms)       |

Autofit left out 2 whose best fit was above 3% (the tracker, not a curve).

### Shot list

| Time (s)    | Length (s) | Framing    | What happens                                                                                 | Out                   |
| ----------- | ---------- | ---------- | -------------------------------------------------------------------------------------------- | --------------------- |
| 0.00–9.07   | 9.07       | graph      | branches labelled MOB-…, ENG-… drift and converge on one point; the camera tracks along them | hard cuts             |
| 9.07–11.12  | 2.05       | card       | 'PLAN AND TRACK RELEASES' in mono                                                            | dissolve              |
| 11.12–15.57 | 4.45       | panels     | release panels stacked in perspective; a 2.7 s pull over them                                | short dissolves, cuts |
| 15.57–21.73 | 6.16       | graph      | the graph again, a 6 s pull                                                                  | hard cut              |
| 21.73–26.50 | 4.77       | typewriter | 'RELEASES' and 'AVAILABLE NOW' typed with a block cursor                                     | hard cuts             |
| 26.50–30.00 | 3.50       | logo       | the Linear mark and wordmark                                                                 | end                   |

### By eye

- **Zoom:** the graph close at a steep angle, then wider as the branches converge
- **Cards:** 'PLAN AND TRACK RELEASES', 'RE█' → 'RELEASES█', 'A█' → 'AVAILABLE NOW█'; logo
- **Cursor:** none; a block cursor in the type
- **Frame:** black void, grey lines
- **Aspect:** 2:1, 1440×720, 60 fps
- **Sound:** an audio track with rhythmic onsets (not listened to)

### Frame-level beats

Read from 10-frame strips around 7 cuts, 1 dissolve and 1 move; 1 f = 16.7 ms at 60 fps. Low-contrast 3D, so only framing changes are countable.

- **Three measured cuts are one drifting shot.** At 1.98 and 3.52 s the branch graph is the same framing 10 frames either side; the camera tracks along it by under 0.5% of the frame per frame. The instrument reads drift over thin bright lines as cuts.
- **Close → wide on a hard cut, same subject.** At 4.68 s the graph at full frame cuts on frame 0 to the same graph laid on a tilted plane at about a third of the size, with a title row above it: the cut is the step back.
- **The card is still on screen as the panels fade up.** 'PLAN AND TRACK RELEASES' dims over 10 frames while the stacked panels rise underneath it (11.12 s); for about 6 frames both are legible. The dissolve is long enough to read as a superimposition.
- **A 2.7 s pull over three stacked panels** (12.79 s) at near-constant speed: no visible ease at either end within the strip. Each panel is offset up and right of the last, so the pull reads along a diagonal.
- **Panels → graph → black → caret.** At 15.57 s the panels cut to a macro of the branches; at 21.73 s the plane cuts to black and a block caret appears 2 frames later, before any letter: the typewriter card starts with its cursor.

**Eye at the cuts.** Graph close → wide (4.68 s): the convergence point moves from about 70% to about 45% of the width, 25%. Plane → caret (21.73 s): to the centre, about 10%. 4 of 7 measured cuts are true edits.

## 2. Classify

Abstract motion-graphics launch: a diagrammatic metaphor drawn from the product's data, no UI chrome. Conventions: a converging graph, perspective planes, typewriter mono copy.

## 3. Diagnose

- Issue-labelled branches converge on a single point. → Diagrammatic metaphor: the picture is the feature's own model (many issues → one release).
- The camera moves for 64% of the runtime, in 2–6 s pulls with out curves. → A continuous synthetic camera sets a calm, long-breath pace; out-cubic settles read as arrival.
- Copy types on letter by letter behind a block cursor. → Typewriter reveal in the voice of a terminal; reading speed is set by the type rate.

## 4. Prescribe

- _adjusts_: Slow reveal pulls of 2–3 s on out curves (with Framer 2.3 s and Figma Payload 1.7 s). (camera pull curve (Part 3))
- _new_: Typewriter cards with a block cursor. (cards (not built))
- _confirms_: Tilted plane (Linear ×3). (renderer tilt (not built))

## 5. Critique

- **I like:** The converging branches say 'many issues become one release' before a word is shown.
- **I wish:** The issue labels are 10–12 px at feed size, so the graph reads as texture, not data.
- **I wonder:** Could cutscene's cards type on at a character rate tied to the reel's tempo?

## Not for us

- A drawn graph, not the product UI.
