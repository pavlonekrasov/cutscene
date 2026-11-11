# Sentry: React Native setup (tutorial)

- **Video:** https://video.twimg.com/ext_tw_video/1879270070742056961/pu/vid/avc1/1308x720/Hh9nXyTKYd7Rg-Bw.mp4?tag=12
- **Found on:** https://screen.studio (the showcase wall on the home page)
- **Maker:** Sentry, made with Screen Studio. **Kind:** tutorial: camera numbers only. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-sentry-react-native-setup.json](../references/2026-11-11-sentry-react-native-setup.json)

**Why it's here.** Not a showreel (a 2:56 talk-through with a webcam), but it repeats the same push and pull six times, so it pins down the tool's camera curve.

**What the instrument can read.** Good on the moves; IDE and simulator changes read as cuts.

## Measured

176.15 s, 1308×720, 60 fps. Camera still 92% of the time. 25 cut candidates; 23 moves.

Moves:

- 23.00 s push ×1.671 (pan 20.1, -2.1%), 2–98% 790 ms, 10–90% 470 ms, peak 0.1
- 30.44 s pull ×0.927 (pan -13.2, -0.5%), 2–98% 170 ms, 10–90% 140 ms, peak 0.84, overshoot 14%
- 30.94 s pull ×0.905 (pan -5.3, 0.5%), 2–98% 840 ms, 10–90% 480 ms, peak 0.03
- 35.64 s push ×1.68 (pan -0.1, -0.1%), 2–98% 890 ms, 10–90% 480 ms, peak 0.11
- 42.39 s pull ×0.597 (pan 0.1, 0.1%), 2–98% 930 ms, 10–90% 550 ms, peak 0.18
- 70.90 s push ×1.686 (pan -22.4, 7.1%), 2–98% 890 ms, 10–90% 490 ms, peak 0.09
- 95.47 s pull ×0.596 (pan 22.3, -7.4%), 2–98% 980 ms, 10–90% 570 ms, peak 0.16
- 117.87 s push ×1.501 (pan -15.6, 15.9%), 2–98% 830 ms, 10–90% 470 ms, peak 0.03
- 121.32 s pull ×0.591 (pan 21.6, -22%), 2–98% 1000 ms, 10–90% 590 ms, peak 0.13
- 128.17 s push ×1.675 (pan 7.8, 10.7%), 2–98% 860 ms, 10–90% 480 ms, peak 0.09
- 131.31 s pull ×0.596 (pan -7.8, -10.7%), 2–98% 970 ms, 10–90% 570 ms, peak 0.13
- 149.95 s pan ×0.957 (pan 1.4, 14.1%), 2–98% 640 ms, 10–90% 560 ms, peak 0.26, overshoot 2%
- 150.81 s pan ×1.004 (pan 0, 24.8%), 2–98% 180 ms, 10–90% 120 ms, peak 0.66
- 153.37 s pan ×1 (pan 0, 3.9%), 2–98% 210 ms, 10–90% 150 ms, peak 0.92, overshoot 20%
- 153.64 s pan ×1.004 (pan 0, 30.7%), 2–98% 650 ms, 10–90% 570 ms, peak 0.91, overshoot 1%
- 154.62 s pan ×1.007 (pan 0.1, 44.4%), 2–98% 310 ms, 10–90% 240 ms, peak 0.32, overshoot 2%
- 155.01 s push ×1.739 (pan -10.5, 12.3%), 2–98% 790 ms, 10–90% 460 ms, peak 0.07
- 156.29 s pan ×1.004 (pan 0, 3%), 2–98% 510 ms, 10–90% 360 ms, peak 0.54
- 164.39 s pull ×0.593 (pan 11.1, -69.1%), 2–98% 1150 ms, 10–90% 630 ms, peak 0.61
- (4 more under 150 ms: blur or UI changes, not camera moves)

Curve fits (RMS error as % of the move's travel; the same fit recovers cutscene 0.3.0's own push at 0.16%):

| Move                 | Best fit                                           | Next                                           | cutscene 0.3.0's curve |
| -------------------- | -------------------------------------------------- | ---------------------------------------------- | ---------------------- |
| push ×1.68 at 35.64  | out-quint 1351 ms (0.59%)                          | out-expo (0.69%); spring ζ 1, ω 7.2/s (0.92%)  | 3.65%                  |
| push ×1.68 at 128.17 | out-expo 1615 ms (0.67%)                           | out-quint (0.70%); spring ζ 1, ω 7.0/s (1.04%) | 4.17%                  |
| pull ×0.60 at 42.39  | spring ζ 1, ω 6.0/s, settles 98% in 0.97 s (0.30%) | spring ζ 1 on linear scale, ω 6.5/s (0.50%)    | 3.65%                  |

## Shot list

| Time (s)    | Framing       | What happens                                                                                                                 | Out |
| ----------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------- | --- |
| 0.00–176.15 | one long take | IDE and iOS simulator; pushes onto the simulator at 23.0, 35.6, 70.9, 117.9, 128.2, 155.0, each pulled back 2.3–23.7 s later | —   |

By eye:

- **Zoom:** working ×1.5–1.74
- **Cards:** none
- **Cursor:** enlarged pointer
- **Frame:** full screen with a webcam bubble, lower left
- **Aspect:** ~1.82:1, 1308×720, 60 fps
- **Sound:** voice

## Frame-level beats

- Six push-pull pairs, holds 2.3, 2.6, 5.9, 6.7, 8.6 and 23.7 s.

## What it teaches

- _contradicts_: Push and pull curves (as Pitch); n for the curve, not for showreel craft. (camera.ease)

## Not for us

- Its length, webcam and talk-through: a tutorial, not a reel.
