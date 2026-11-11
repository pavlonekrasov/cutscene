# Supabase: SQL to REST translator

- **Video:** https://video.twimg.com/ext_tw_video/1881805222571347968/pu/vid/avc1/1280x720/kwg_gEOUPoJ7zx8K.mp4?tag=12
- **Found on:** https://screen.studio (the showcase wall on the home page)
- **Maker:** Supabase, made with Screen Studio. **Kind:** showreel. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-supabase-sql-to-rest.json](../references/2026-11-11-supabase-sql-to-rest.json)

**Why it's here.** Push to type, pull to see: each query is typed at about 3× (legible at phone size) and then the camera pulls back so the translated output and the input read together.

## 1. Describe

### Measured

35 s, 1280×720, 30 fps. Camera still 71% of the time. 10 shots, median 2.5 s. 9 cuts (3 dissolves); 14 moves.

Moves:

- 0.14 s push ×2.704 (pan -10.8, -4%), 2–98% 270 ms, 10–90% 200 ms, peak 0.47, overshoot 3%
- 4.01 s pan ×1.146 (pan 46.3, -1.4%), 2–98% 1700 ms, 10–90% 1190 ms, peak 0.64
- 9.57 s pull ×0.552 (pan -37.8, 9.7%), 2–98% 960 ms, 10–90% 570 ms, peak 0.17
- 11.21 s push ×2.384 (pan -32.1, -16.5%), 2–98% 820 ms, 10–90% 460 ms, peak 0.15
- 14.00 s pull ×0.453 (pan 37.8, 18%), 2–98% 990 ms, 10–90% 590 ms, peak 0.16
- 17.91 s push ×2.139 (pan -34.3, -13.6%), 2–98% 860 ms, 10–90% 450 ms, peak 0.14
- 20.37 s pan ×1.009 (pan 34, 4%), 2–98% 810 ms, 10–90% 470 ms, peak 0.08
- 22.54 s pan ×0.989 (pan -13.8, -0.9%), 2–98% 790 ms, 10–90% 460 ms, peak 0.08
- 23.89 s pull ×0.721 (pan 20, 6.6%), 2–98% 270 ms, 10–90% 210 ms, peak 0.65, overshoot 12%
- 24.27 s pull ×0.825 (pan 10.6, 3.4%), 2–98% 830 ms, 10–90% 480 ms, peak 0.08
- 29.85 s push ×1.616 (pan 24.7, 0.3%), 2–98% 830 ms, 10–90% 470 ms, peak 0.14
- 32.81 s pull ×0.304 (pan -24.8, -1.3%), 2–98% 1030 ms, 10–90% 620 ms, peak 0.19
- (2 more under 150 ms, ×1.1 or 5% of the frame: blur, UI changes or tracker noise)

**What the instrument can read.** Good; the first push (0.14 s, ×2.70, 0.27 s) is blurred and approximate.

### Curve fits

RMS error as % of the move's travel; the same fit recovers cutscene 0.3.0's own push at 0.16%.

| Move                | Best fit                                           | Next other curve                                                         | cutscene 0.3.0's curve |
| ------------------- | -------------------------------------------------- | ------------------------------------------------------------------------ | ---------------------- |
| push ×2.39 at 11.21 | out-expo 1492 ms (0.43%)                           | spring ζ 1 on linear scale, ω 6.8/s (0.70%); spring ζ 1, ω 7.6/s (1.20%) | 3.91%                  |
| push ×2.13 at 17.91 | out-quint 1273 ms (0.58%)                          | spring ζ 1, ω 7.9/s (1.00%)                                              | 3.68%                  |
| pull ×0.46 at 14.0  | spring ζ 1, ω 5.7/s, settles 98% in 1.03 s (0.15%) | spring ζ 1 on linear scale, ω 6.2/s (0.46%)                              | 3.89%                  |

### Shot list

| Time (s)   | Framing  | What happens                                                                                                                                                                                                      | Out |
| ---------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| 0.00–35.00 | one take | push ×2.70 into the SQL input (0.14), type, pan 46% to the output (4.01), pull ×0.55 (9.57), push ×2.38 (11.21), type 'where', pull ×0.46 (14.0), push ×2.14 (17.91), pans, pull ×0.30 to the full window (32.81) | —   |

### By eye

- **Zoom:** working ×2.1–2.7, the deepest regular zoom in the set (code at ~3× its size)
- **Cards:** none
- **Cursor:** enlarged I-beam and pointer
- **Frame:** window on a landscape photo backdrop
- **Aspect:** 16:9, 1280×720, 30 fps
- **Sound:** audio track (voice-over or music, not listened to)

### Frame-level beats

- Holds of 1.97 s and 2.13 s on the shortest push-pull pairs: just long enough to read one typed line.

## 2. Classify

Screen Studio clip for a code tool: deep pushes to type, pulls to compare. Conventions: window on a photo, enlarged I-beam.

## 3. Diagnose

- Queries are typed at ×2.1–2.7. → Typing close-up: code at about ×3 stays legible on a phone.
- Pull back so the input and the translated output share a frame. → Cause and effect in one frame.
- Reframes of ×2.4–3.3 move rather than cut. → Screen Studio moves where a hand edit would cut.

## 4. Prescribe

- _contradicts_: Push and pull curves (as Pitch). (camera.ease)
- _adjusts_: Working zoom ×2.1–2.7 for typing. (CAMERA.working)
- _contradicts_: Reframes of ×2.4–3.3 move instead of cutting. (CAMERA.cutOver (×1.8))

## 5. Critique

- **I like:** Push to type, pull to compare: the input and its translation read together.
- **I wish:** The landscape photo behind the window competes with the code.
- **I wonder:** Could act.type always push to ×2.5 and pull back once output appears?

## Not for us

- The landscape photo backdrop.
