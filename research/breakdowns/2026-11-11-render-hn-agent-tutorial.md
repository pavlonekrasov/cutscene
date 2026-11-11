# Render: a Hacker News agent (tutorial)

- **Video:** https://video.twimg.com/ext_tw_video/1879954446588809216/pu/vid/avc1/1280x720/h-q6JKJNnf9wlz51.mp4?tag=12
- **Found on:** https://screen.studio (the showcase wall on the home page)
- **Maker:** Render, made with Screen Studio. **Kind:** tutorial: camera numbers only. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-render-hn-agent-tutorial.json](../references/2026-11-11-render-hn-agent-tutorial.json)

**Why it's here.** A 48 s walk-through that ends on its payoff in another app (the agent's email), with pushes on each form field.

**What the instrument can read.** Good on the moves; page changes read as cuts.

## Measured

48 s, 1280×720, 30 fps. Camera still 80% of the time. 9 cut candidates; 16 moves.

Moves:

- 0.04 s push ×1.888 (pan -8.5, -12.2%), 2–98% 720 ms, 10–90% 400 ms, peak 0.12
- 5.02 s pull ×0.561 (pan 7.4, 10.6%), 2–98% 430 ms, 10–90% 330 ms, peak 0.43, overshoot 3%
- 5.57 s pull ×0.933 (pan 1.4, 2%), 2–98% 590 ms, 10–90% 360 ms, peak 0.11, overshoot 2%
- 6.74 s push ×1.471 (pan -0.1, 9.6%), 2–98% 650 ms, 10–90% 380 ms, peak 0.1
- 16.88 s pull ×0.509 (pan 0.1, -31.5%), 2–98% 710 ms, 10–90% 470 ms, peak 0.17, overshoot 2%
- 17.97 s push ×1.614 (pan 0, 5.2%), 2–98% 700 ms, 10–90% 390 ms, peak 0.09
- 20.81 s pan ×1.002 (pan -0.5, 30.4%), 2–98% 1450 ms, 10–90% 1080 ms, peak 0.46
- 26.95 s pan ×1.001 (pan 0.1, 35%), 2–98% 710 ms, 10–90% 590 ms, peak 0.16, overshoot 2%
- 32.88 s pan ×0.999 (pan -0.1, 19.2%), 2–98% 780 ms, 10–90% 450 ms, peak 0.15
- 35.50 s pan ×0.998 (pan 0, -25.6%), 2–98% 370 ms, 10–90% 250 ms, peak 0.18
- 37.41 s pan ×1 (pan 1.4, -9%), 2–98% 800 ms, 10–90% 460 ms, peak 0.15
- 41.33 s pull ×0.69 (pan -0.3, -17.4%), 2–98% 230 ms, 10–90% 180 ms, peak 0.59, overshoot 13%
- 41.95 s push ×1.685 (pan -0.3, -17%), 2–98% 730 ms, 10–90% 400 ms, peak 0.07
- 44.91 s pull ×0.759 (pan 15.7, 21.9%), 2–98% 810 ms, 10–90% 480 ms, peak 0.15
- (2 more under 150 ms: blur or UI changes, not camera moves)

Curve fits (RMS error as % of the move's travel; the same fit recovers cutscene 0.3.0's own push at 0.16%):

| Move                | Best fit                 | Next                                           | cutscene 0.3.0's curve |
| ------------------- | ------------------------ | ---------------------------------------------- | ---------------------- |
| push ×1.77 at 17.97 | out-expo 1224 ms (1.01%) | out-quint (1.45%); spring ζ 1, ω 8.9/s (1.87%) | 4.29%                  |
| push ×1.75 at 41.95 | out-expo 1299 ms (2.25%) | spring ζ 1, ω 9.1/s (2.62%)                    | 5.16%                  |

## Shot list

| Time (s)   | Framing                  | What happens                                                                                            | Out |
| ---------- | ------------------------ | ------------------------------------------------------------------------------------------------------- | --- |
| 0.00–48.00 | one take, then the inbox | push ×1.89 (0.04), add an interest, add a question, preview, then the agent's email in the inbox (44.6) | —   |

By eye:

- **Zoom:** working ×1.5–1.9
- **Cards:** none
- **Cursor:** enlarged pointer
- **Frame:** full macOS screen with the browser's chrome
- **Aspect:** 16:9, 1280×720, 30 fps
- **Sound:** none

## Frame-level beats

- The payoff (the email arriving) is the last shot, after a cut to another app.

## Why it works

- Ending on the outcome in the place the user would see it.

## What it teaches

- _confirms_: End on the result. (reel structure)

## Not for us

- Starting zoomed with no wide; the full macOS screen.
