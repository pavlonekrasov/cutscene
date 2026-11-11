# Dia: meeting tab groups

- **Video:** https://video.twimg.com/amplify_video/2011907892404789248/vid/avc1/1090x720/qKalX_NEhS_yRzqL.mp4?tag=21
- **Found on:** https://x.com/diabrowser/status/2011908234332844348
- **Maker:** The Browser Company (@diabrowser). **Kind:** launch film. **Posted:** 2026-01-15. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-dia-meeting-tabs.json](../references/2026-11-11-dia-meeting-tabs.json)

**Why it's here.** Framed tight on the window's top-left corner, the one region where the feature lives: the calendar event, 'Join', then a tab group named after the meeting gathers Meet, notes, Figma and Linear while the speaker floats picture-in-picture. 22.2 s.

## 1. Describe

### Measured

22.22 s, 1090×720, 60 fps. Camera still 95% of the time. 15 shots, median 0.99 s. 14 cuts (5 dissolves); 2 moves.

Moves:

- 1.38 s pan ×1.001 (pan 23.7, -2.5%), 2–98% 520 ms, 10–90% 330 ms, peak 0.2
- 2.68 s pull ×0.755 (pan -15, 3.3%), 2–98% 540 ms, 10–90% 340 ms, peak 0.19

**What the instrument can read.** Still 95%: one pull ×0.76 at 2.7 s; the rest is held framing and cuts.

### Curve fits

RMS error as % of the move's travel; the same fit recovers cutscene 0.3.0's own push at 0.16%.

| Move               | Best fit                              | Next other curve     | cutscene 0.3.0's curve |
| ------------------ | ------------------------------------- | -------------------- | ---------------------- |
| pull ×0.76 at 2.68 | spring ζ=0.9, ω 8.4/s, 556 ms (0.22%) | ease, 677 ms (0.49%) | 2.55% (809 ms)         |

Autofit left out 1 moves with a cut too close.

### Shot list

| Time (s)    | Framing     | What happens                                                                       | Out       |
| ----------- | ----------- | ---------------------------------------------------------------------------------- | --------- |
| 0.00–5.07   | corner crop | the Calendar tab; the 'Weekly Brand Jam' event; 'Join'                             | hard cuts |
| 5.07–9.97   | corner crop | Meet opens; the tab group forms; the speaker appears picture-in-picture            | hard cuts |
| 9.97–20.93  | corner crop | notes, a Figma file and Linear join the group; '10m left — Google Meet' in the tab | hard cuts |
| 20.93–22.22 | logo, URL   | Dia; 'diabrowser.com'                                                              | end       |

### By eye

- **Zoom:** the window's top-left quarter at ×2.5; the frame edge cuts through the page
- **Cards:** none in the flow; logo, a blur-morph to 'diabrowser.com' (1.6 s)
- **Cursor:** native pointer at ×2.5, so about 60 px
- **Frame:** the crop is the frame: no backdrop visible
- **Aspect:** 1090×720, 60 fps
- **Sound:** an audio track with rhythmic onsets (not listened to)

### Frame-level beats

- The pull at 2.7 s widens just enough to include the event's 'Join' button before it's pressed.

## 2. Classify

Hand-edited single-flow reel, cropped to a corner of the real window. Conventions: the frame cuts through the window, a large pointer, logo → URL end.

## 3. Diagnose

- The frame cuts through the window instead of showing it whole. → Crop to the region: when the feature lives in one corner, the corner is the shot.
- The pointer is ~60 px. → Pointer scale tracks frame scale, so the pointer stays visible on a phone.

## 4. Prescribe

- _confirms_: Crop to where the feature lives; a working zoom of ×2.5. (CAMERA.working)
- _confirms_: Camera holds; the flow plays inside one framing (rule 5). (hold)

## 5. Critique

- **I like:** Nothing outside the corner ever matters, so nothing outside it is shown.
- **I wish:** The tab group's name is the payoff but is small text in the sidebar; a push to it would land it.
- **I wonder:** Should cutscene's working zoom anchor to a corner region rather than centre on the target?
