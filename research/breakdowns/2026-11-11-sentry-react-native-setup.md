# Sentry: React Native setup (tutorial)

- **Video:** https://video.twimg.com/ext_tw_video/1879270070742056961/pu/vid/avc1/1308x720/Hh9nXyTKYd7Rg-Bw.mp4?tag=12
- **Found on:** https://screen.studio (the showcase wall on the home page)
- **Maker:** Sentry, made with Screen Studio. **Kind:** tutorial: camera numbers only. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-sentry-react-native-setup.json](../references/2026-11-11-sentry-react-native-setup.json)

**Why it's here.** Not a showreel (a 2:56 talk-through with a webcam), but it repeats the same push and pull six times, so it pins down the tool's camera curve.

## 1. Describe

### Measured

176.15 s, 1308×720, 60 fps. Camera still 92% of the time. 26 shots, median 3.09 s. 25 cuts (10 dissolves); 23 moves.

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
- 153.64 s pan ×1.004 (pan 0, 30.7%), 2–98% 650 ms, 10–90% 570 ms, peak 0.91, overshoot 1%
- 154.62 s pan ×1.007 (pan 0.1, 44.4%), 2–98% 310 ms, 10–90% 240 ms, peak 0.32, overshoot 2%
- 155.01 s push ×1.739 (pan -10.5, 12.3%), 2–98% 790 ms, 10–90% 460 ms, peak 0.07
- 164.39 s pull ×0.593 (pan 11.1, -69.1%), 2–98% 1150 ms, 10–90% 630 ms, peak 0.61
- (6 more under 150 ms, ×1.1 or 5% of the frame: blur, UI changes or tracker noise)

**What the instrument can read.** Good on the moves; IDE and simulator changes read as cuts.

### Curve fits

RMS error as % of the move's travel; the same fit recovers cutscene 0.3.0's own push at 0.16%.

| Move                 | Best fit                                           | Next other curve                               | cutscene 0.3.0's curve |
| -------------------- | -------------------------------------------------- | ---------------------------------------------- | ---------------------- |
| push ×1.68 at 35.64  | out-quint 1351 ms (0.59%)                          | out-expo (0.69%); spring ζ 1, ω 7.2/s (0.92%)  | 3.65%                  |
| push ×1.68 at 128.17 | out-expo 1615 ms (0.67%)                           | out-quint (0.70%); spring ζ 1, ω 7.0/s (1.04%) | 4.17%                  |
| pull ×0.60 at 42.39  | spring ζ 1, ω 6.0/s, settles 98% in 0.97 s (0.30%) | spring ζ 1 on linear scale, ω 6.5/s (0.50%)    | 3.65%                  |

### Shot list

| Time (s)    | Length (s) | Framing       | What happens                                                                                                                 | Out |
| ----------- | ---------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------- | --- |
| 0.00–176.15 | 176.15     | one long take | IDE and iOS simulator; pushes onto the simulator at 23.0, 35.6, 70.9, 117.9, 128.2, 155.0, each pulled back 2.3–23.7 s later | —   |

### By eye

- **Zoom:** working ×1.5–1.74
- **Cards:** none
- **Cursor:** enlarged pointer
- **Frame:** full screen with a webcam bubble, lower left
- **Aspect:** ~1.82:1, 1308×720, 60 fps
- **Sound:** voice

### Frame-level beats

- Six push-pull pairs, holds 2.3, 2.6, 5.9, 6.7, 8.6 and 23.7 s.

Read from 10-frame strips around 7 cuts, 1 dissolve and 2 moves; 1 f = 16.7 ms at 60 fps. A 3-minute tutorial with a presenter tile at the bottom left.

- **The push goes to the simulator at the frame's right edge.** In the 1.29 s push (23.00 s) the IDE's file tree and code slide off to the left and the phone, purple, grows from about 5% to 9% of the frame wide; it is done by column 4 (about 0.5 s). The phone ends at about 85% across: the push keeps it off-centre, with dark editor filling the other 75%.
- **The app is the only saturated object.** A purple phone screen on a near-black editor: the eye has one target in the frame whatever the framing.
- **The tap's result is a screen change inside the phone** (24.40 s): purple hero to a white list between two frames, the pointer on the phone. The measured cut is this.
- **The pull returns to the same wide** (30.94 s, 1.34 s): done by column 3, then a settle. The pointer stays over the phone.
- **Editor events are the other cuts.** A dark panel with a blue and yellow header opens over the code (35.58 s) and closes (40.85 s); a selection highlights three lines in blue (90.02 s). Each changes under 30% of the frame, with the frame still.
- **The app switch is a hard cut from dark to white** (97.90 s): the editor is replaced by Sentry's dashboard, white, between two frames. The presenter tile and the macOS dock stay in the same places: they are the continuity.
- **Loading is left in** (105.88 s): the issue list is replaced by an empty grey page with a spinner for at least 6 frames.
- **The replay is shown inside the dashboard** (126.12 s): the app's purple screen appears as a tile at about 25% of the frame wide, left of centre, and its content changes as the replay plays; at 165.13 s a grey timeline bar with a purple marker spans the top of the page.

**Eye at the cuts.** There are no camera edits in the product section; the app switch at 97.90 s is the one true cut. Editor → dashboard: from the code column (about 35%) to the dashboard's table (about 50%): 15%, with a full flip of background brightness. Phone → replay tile: the same purple screen moves from 85% across (the simulator) to 40% (the replay): the product's own image is the link between the two apps. 1 of 7 measured cuts is a true edit.

## 2. Classify

Tutorial recorded in Screen Studio; kept for its repeated camera curve, not its craft.

## 3. Diagnose

- The same push and pull recur six times. → Repetition pins down the tool's curve: out-quint/out-expo pushes, ζ 1 spring pulls.

## 4. Prescribe

- _contradicts_: Push and pull curves (as Pitch); n for the curve, not for showreel craft. (camera.ease)

## 5. Critique

- **I like:** Six repetitions of one move make the curve measurable.
- **I wish:** As a film it is a tutorial: long, narrated, webcam.
- **I wonder:** Are Screen Studio's defaults the same across every clip on its wall?

## Not for us

- Its length, webcam and talk-through: a tutorial, not a reel.
