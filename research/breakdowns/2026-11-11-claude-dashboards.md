# Claude: Dashboards and Motion

- **Video:** https://video.twimg.com/amplify_video/2108268464544661507/vid/avc1/1280x720/unw6qBZGIFRFTtql.mp4?tag=29
- **Found on:** https://x.com/claudeai/status/2108271552991252810
- **Maker:** Anthropic (@claudeai). **Kind:** launch film. **Posted:** 2026-10-08. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-claude-dashboards.json](../references/2026-11-11-claude-dashboards.json)

**Why it's here.** The film is its own demo: a dashboard becomes an isometric city of bike docks, and a comment in the player ('Hold on the empty dock a beat longer') directs the motion we're watching. The end card is edited live in a text toolbar. 81.6 s.

## 1. Describe

### Measured

81.58 s, 1280×720, 24 fps. Camera still 82% of the time. 48 shots, median 1.38 s. 47 cuts (28 dissolves); 28 moves.

Moves:

- 6.92 s pan ×1 (pan -9.6, 0%), 2–98% 420 ms, 10–90% 220 ms, peak 0.58, overshoot 2%
- 14.61 s pan ×0.999 (pan -9.8, 0%), 2–98% 610 ms, 10–90% 300 ms, peak 0.22
- 23.58 s pan ×1 (pan 0, 16.4%), 2–98% 600 ms, 10–90% 410 ms, peak 0.15
- 26.84 s pan ×1.053 (pan -13.4, 0%), 2–98% 240 ms, 10–90% 210 ms, peak 0.84, overshoot 26%
- 27.20 s pan ×1.008 (pan -7.1, 0%), 2–98% 480 ms, 10–90% 330 ms, peak 0.01
- 29.74 s push ×1.073 (pan 1.1, 6.9%), 2–98% 960 ms, 10–90% 270 ms, peak 0.97, overshoot 34%
- 30.83 s pan ×0.999 (pan 0, 7.7%), 2–98% 1020 ms, 10–90% 600 ms, peak 0.08
- 34.44 s pan ×1.001 (pan 0, 55.6%), 2–98% 1120 ms, 10–90% 670 ms, peak 0.28
- 38.32 s push ×1.495 (pan -13.2, -4.2%), 2–98% 710 ms, 10–90% 380 ms, peak 0.37
- 42.33 s push ×1.178 (pan 0.3, 0.3%), 2–98% 1050 ms, 10–90% 820 ms, peak 0.08, overshoot 2%
- 43.76 s pan ×0.995 (pan -16.1, 12%), 2–98% 290 ms, 10–90% 200 ms, peak 0.26, overshoot 2%
- 45.17 s pull ×0.831 (pan 0, 0%), 2–98% 610 ms, 10–90% 410 ms, peak 0.14
- 47.56 s push ×1.699 (pan 2.7, 0.1%), 2–98% 1700 ms, 10–90% 1390 ms, peak 0.04, overshoot 3%
- 59.33 s pan ×1 (pan -6.8, 0%), 2–98% 240 ms, 10–90% 190 ms, peak 0.03, overshoot 6%
- 61.34 s pan ×1 (pan 12.4, -1.2%), 2–98% 330 ms, 10–90% 230 ms, peak 0.99, overshoot 44%
- 61.83 s pan ×1 (pan 19.2, 0%), 2–98% 520 ms, 10–90% 350 ms, peak 0.17
- 64.24 s pull ×0.887 (pan -3.9, 9%), 2–98% 580 ms, 10–90% 360 ms, peak 0.95, overshoot 16%
- 67.88 s pull ×0.945 (pan 0.2, -5%), 2–98% 180 ms, 10–90% 150 ms, peak 0.44, overshoot 37%
- 74.68 s pan ×0.979 (pan 5.6, -0.1%), 2–98% 190 ms, 10–90% 160 ms, peak 0.61, overshoot 17%
- (9 more under 150 ms, ×1.1 or 5% of the frame: blur, UI changes or tracker noise)

**What the instrument can read.** Pushes of ×1.5 and ×1.7 (38.3 s, 47.6 s) are camera moves inside the generated animation; most short 'moves' are UI panels sliding.

### Curve fits

RMS error as % of the move's travel; the same fit recovers cutscene 0.3.0's own push at 0.16%.

| Move                | Best fit                      | Next other curve                     | cutscene 0.3.0's curve |
| ------------------- | ----------------------------- | ------------------------------------ | ---------------------- |
| pan 56% at 34.44    | ease, 1260 ms (1.1%)          | spring ζ=1, ω 5.3/s, 1108 ms (1.16%) | 2.83% (1550 ms)        |
| push ×1.49 at 38.32 | in-out-quart, 1024 ms (1.61%) | ease, 698 ms (1.71%)                 | 1.77% (858 ms)         |
| pan 17% at 61.83    | out-quint, 995 ms (2.57%)     | spring ζ=1, ω 10.4/s, 560 ms (3.31%) | 7.08% (584 ms)         |

Autofit left out 7 moves with a cut too close and 3 whose best fit was above 3% (the tracker, not a curve).

### Shot list

| Time (s)    | Length (s) | Framing             | What happens                                                                                                 | Out                 |
| ----------- | ---------- | ------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------- |
| 0.00–5.71   | 5.71       | full-frame artifact | an isometric city with bike-dock markers and a '6:10 am' clock, pulling out to a player window               | dissolves           |
| 5.71–18.04  | 12.33      | player window       | a presenter; comment threads appear beside the video ('Nate', 'Design', '17')                                | hard cuts           |
| 22.75–30.58 | 7.83       | logo row, dashboard | connector icons (AWS, Salesforce, Snowflake…) settle in a row; a 'System overview' dashboard                 | dissolves           |
| 39.67–53.04 | 13.37      | dashboard → city    | a scatter becomes a 3D city grid ('Projecting dashboard coordinates into a 3D city grid'); push ×1.7 into it | dissolves 0.7–0.9 s |
| 53.04–69.46 | 16.42      | artifact, comments  | the city at 6:10, 6:15, 6:55 am; a comment: 'Hold on the empty dock a beat longer'; the edit lands           | dissolves           |
| 69.46–77.00 | 7.54       | export              | an 'Export' button; app icons orbit it                                                                       | hard cuts           |
| 77.00–81.58 | 4.58       | end cards           | 'Claude makes it.' → selected → 'Claude makes it. You steer it.'; logo                                       | end                 |

### By eye

- **Zoom:** the player window at ~60% of the frame, then full-frame artifact shots; pushes into the city ×1.5–1.7
- **Cards:** the title inside the artifact ('Introducing Claude Dashboards and Claude Motion'); end card 'Claude makes it.' → 'You steer it.' built by selecting and typing; logo
- **Cursor:** large macOS pointer, used on Export and the end card's text
- **Frame:** warm off-white canvas; windows float with soft shadows
- **Aspect:** 16:9, 24 fps
- **Sound:** voice-over and music

### Frame-level beats

Read from 10-frame strips around 8 cuts, 1 dissolve and 3 moves; 1 f = 41.7 ms at 24 fps.

- **The comment asking to 'hold a beat longer'** is followed by the shot that holds: the direction and its result share one cut.
- **Most 'cuts' are the UI talking.** At 11.33 s the highlight steps from 'Claude Dashboards' to 'Claude Motion' in the title; at 16.38 and 18.04 s comment cards pop in beside the presenter within 2 frames; at 39.67 s the request ('turn this into an animation for all hands…') streams in word by word. The frame never moves while text arrives.
- **Scroll, then push, then speak.** The dashboard scrolls up 34.44 s to bring the station scatter in; the push at 38.32 s (×1.7) settles before the comment popover opens on the map, about 70% into the strip.
- **A clock as the cut.** In the city shot (53.04 s) nothing dissolves: the '6:15 am' label flips to '6:20 am' on one frame while the city holds. Time passes by changing one label, not by cutting.
- **Panels move in 2 frames.** The comment panel slides out of frame in 2 frames (61.75 s), and 'Show all comments' opens its panel on the frame after the press (63.54 s): the product's own panels are near-instant while the camera is slow.

**Eye at the cuts.** The film has few true hard cuts: of 8 measured, 6 are in-UI changes. Where the comment box opens (57.25 s), it opens at the dock the pointer is on, so the eye doesn't travel.

## 2. Classify

Motion-designed product film with a meta frame (the video plays inside the product's own player). Conventions: the artifact as hero, comments as direction, connector logo row, a two-beat end card.

## 3. Diagnose

- Comments in the margin say what the next shot should do. → Show the cause next to the effect: the instruction and its result are on screen together, so the edit reads as obeying it.
- The end card is typed and selected like the product's own text. → The medium is the message: even the sign-off is made in the tool.
- Most cuts are dissolves (24 of 47). → Crossfades keep one continuous world across a long film; hard cuts are saved for the export beat.

## 4. Prescribe

- _new_: Direction notes ('hold a beat longer') are how a motion edit is briefed; cutscene's scene hints (`act.focus`, `act.wide`) are the same idea in code. (act.focus / act.wide)
- _confirms_: End on a claim card, then the logo. (CARD)
- _confirms_: Pushes of ×1.5–1.7 for a working shot. (CAMERA.working)

## 5. Critique

- **I like:** The artifact is the hero; the presenter is shown small, inside a player, so the product never gives up the frame.
- **I wish:** At 81 s it explains rather than shows: the voice-over carries ideas the picture already proved.
- **I wonder:** Could a cutscene reel take its hints as plain-language notes on marks ('hold here a beat') and turn them into holds and pushes?

## Not for us

- Voice-over and a presenter: cutscene has no narrator.
