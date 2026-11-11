# Pitch: styling a slide's bullets

- **Video:** https://video.twimg.com/ext_tw_video/1748333695126126593/pu/vid/avc1/1280x720/84p2CIC7kZa9Ldq5.mp4?tag=12
- **Found on:** https://screen.studio (the showcase wall on the home page)
- **Maker:** Pitch, made with Screen Studio. **Kind:** showreel. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-pitch-bullet-colour.json](../references/2026-11-11-pitch-bullet-colour.json)

**Why it's here.** One push, one long hold, one pull: ×1.99 into the text panel, 8 s of work while zoomed, then out to the finished slide.

## 1. Describe

### Measured

11.6 s, 1280×720, 30 fps. Camera still 85% of the time. 5 shots, median 2.13 s. 4 cuts (2 dissolves); 2 moves.

Moves:

- 0.81 s push ×1.988 (pan 16.9, -4.1%), 2–98% 760 ms, 10–90% 450 ms, peak 0.16
- 9.74 s pull ×0.5 (pan -34.1, 8.2%), 2–98% 990 ms, 10–90% 580 ms, peak 0.16

**What the instrument can read.** Good. Motion blur on both moves makes the tracker see two dissolve candidates during the push.

### Curve fits

RMS error as % of the move's travel; the same fit recovers cutscene 0.3.0's own push at 0.16%.

| Move               | Best fit                                           | Next other curve                                                                         | cutscene 0.3.0's curve |
| ------------------ | -------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------- |
| push ×1.98 at 0.81 | out-quint 1224 ms (0.49%)                          | spring ζ 1 on linear scale, ω 7.0/s, settles 0.83 s (0.54%); spring ζ 1, ω 7.9/s (0.92%) | 4.55%                  |
| pull ×0.50 at 9.74 | spring ζ 1, ω 5.7/s, settles 98% in 1.03 s (0.26%) | spring ζ 0.9, ω 5.0/s (0.73%)                                                            | 3.92%                  |

### Shot list

| Time (s)   | Length (s) | Framing                        | What happens                                                                                                                               | Out |
| ---------- | ---------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | --- |
| 0.00–11.60 | 11.60      | wide → ×1.99 → wide (one take) | push to the text panel (0.81), bullet colour picked from the style colours (4–8 s), pull-out ×0.50 (9.74) to the slide with orange bullets | —   |

### By eye

- **Zoom:** working ×1.99 (the text panel and its options fill the frame)
- **Cards:** none
- **Cursor:** enlarged pointer
- **Frame:** window on a violet backdrop
- **Aspect:** 16:9, 1280×720, 30 fps
- **Sound:** none

### Frame-level beats

- The push starts 0.8 s in, after the wide has been seen; the hold lasts 8.2 s; the pull starts as the last colour is set.

Read from 10-frame strips around 2 cuts, 1 dissolve and 2 moves; 1 f = 33 ms at 30 fps.

- **The push lands in 3 columns and settles for 7.** In the 1.2 s push the window goes from about 80% of the frame to the working framing by column 3 (about 0.35 s), with the slide's image smeared at the left edge; columns 4–10 move by under 3%. The framing it stops on holds both things the task needs: the selected text box at the left and the text panel at the right.
- **The pointer is already in the panel when the push starts**, at about 60% × 45%, and drifts down to the bullet controls (about 45% × 75%) as the frame settles: pointer and camera overlap for about 0.5 s.
- **The colour row opens under the pointer** (6.47 s): six swatches in a row at the panel's lower half, the pointer on the fourth; nothing else in the frame changes for 10 frames.
- **The result is a small change at the far side of the frame.** At 8.60 s the pointer is back over the slide's list, and the cut-like change is the panel swapping from Text to Slide options with the list's selection box gone: the bullets' new colour is about 1% of the frame at this size.
- **The pull makes the result readable by context, not size.** In the 9.74 s pull the first column still shows the heading 'Capabilities' at about 30% of the frame wide; by column 5 the whole window is back with the violet backdrop, and the slide's bullets are about 3 px each. The pull is front-loaded like the push: columns 6–10 are a settle.

**Eye at the cuts.** There are no edits. Panel → slide: the eye crosses about 35% of the frame from the swatches to the list, led by the pointer travelling back. Both measured cuts are panel changes.

## 2. Classify

Screen Studio clip: one push, one long hold, one pull. Conventions: window on violet, enlarged pointer.

## 3. Diagnose

- ×1.99 in, held 8 s, out. → One zoom per task: the frame does not change while the work does.
- Push out-quint 1.2 s; pull a ζ 1 spring settling in 1.0 s. → Out-family arrival and a critically damped departure: no symmetric ease.

## 4. Prescribe

- _contradicts_: Pull-out: a critically damped spring, ω 5.7/s, settling in ~1.0 s. (camera.ease, CAMERA.pull)
- _adjusts_: Working zoom ×1.99, against cutscene's ×1.5. (CAMERA.working)
- _confirms_: End wide on the result. (reel structure)

## 5. Critique

- **I like:** Holding the zoom for the whole job means the panel never leaves the frame.
- **I wish:** Eight seconds at one framing with small option changes is long without a cut.
- **I wonder:** Could cutscene default to one push per task and one pull at its end?
