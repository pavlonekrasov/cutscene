# Glaze by Raycast

- **Video:** https://video.twimg.com/amplify_video/2029165436160315393/vid/avc1/1280x720/YVILv516dZtUYz_t.mp4?tag=21
- **Found on:** https://x.com/raycast/status/2029180822838759703
- **Maker:** Raycast. **Kind:** launch film. **Posted:** 2026-03-04. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-raycast-glaze.json](../references/2026-11-11-raycast-glaze.json)

**Why it's here.** A 56 s launch for an AI app builder. Each generated app floats as a single window on black satin: a photo library, a synthesiser, a timer, a launch dashboard, a webcam that turns its user into an avatar. Each new app's icon drops into the Dock, and the film gathers every app it made into one frame before 'Desktop apps, reimagined by you.'

## 1. Describe

### Measured

56.43 s, 1280×720, 30 fps. Camera still 86% of the time. 41 shots, median 1.1 s. 40 cuts (17 dissolves); 14 moves.

Moves:

- 6.94 s pan ×1 (pan -17.5, 15.1%), 2–98% 1660 ms, 10–90% 1030 ms, peak 0.98, overshoot 14%
- 40.09 s pan ×1 (pan 16.8, 0%), 2–98% 210 ms, 10–90% 140 ms, peak 1, overshoot 42%
- 41.64 s pan ×1 (pan 6.7, 0%), 2–98% 170 ms, 10–90% 120 ms, peak 0.98, overshoot 51%
- 42.27 s pan ×1 (pan 5.7, 0%), 2–98% 280 ms, 10–90% 230 ms, peak 0.23, overshoot 5%
- 43.21 s push ×1.35 (pan -4.9, 2%), 2–98% 690 ms, 10–90% 180 ms, peak 0.22, overshoot 12%
- 45.28 s pull ×0.162 (pan -34.1, -272.1%), 2–98% 1130 ms, 10–90% 810 ms, peak 0.14
- 54.37 s pull ×0.883 (pan 2.3, -0.7%), 2–98% 220 ms, 10–90% 30 ms, peak 0.46
- (7 more under 150 ms, ×1.1 or 5% of the frame: blur, UI changes or tracker noise)

**What the instrument can read.** 30 fps, still 86%, 41 shots at a 1.1 s median. The clean fit is a pull from the Dock out to the full desktop: ×0.15 over 1.1 s, ease-out (rms 1.1%; cutscene 3.4%). A slow 2 s pan fits loosely (6.9%).

### Curve fits

RMS error as % of the move's travel; the same fit recovers cutscene 0.3.0's own push at 0.16%.

| Move                | Best fit                  | Next other curve                       | cutscene 0.3.0's curve |
| ------------------- | ------------------------- | -------------------------------------- | ---------------------- |
| pull ×0.15 at 45.28 | ease-out, 1087 ms (1.11%) | spring ζ=0.8, ω 3.2/s, 1180 ms (1.45%) | 3.37% (1796 ms)        |

Autofit left out 2 moves with a cut too close and 1 whose best fit was above 3% (the tracker, not a curve).

### Shot list

| Time (s)    | Framing        | What happens                                                                                                                           | Out                  |
| ----------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| 0.00–10.43  | prompt         | satin; a new window, 'What would you like to build?'; 'Wha…' typed at ×3; 'Okay, let's start building your app.'; 'Preparing project…' | hard cuts, dissolve  |
| 10.43–17.77 | library        | 'My Library'; the Dock, a new red icon lands in it; a media library app                                                                | dissolves            |
| 17.77–28.63 | apps           | a synthesiser; a timer controller; a launch dashboard                                                                                  | hard cuts, dissolves |
| 28.63–37.90 | webcam         | a publish dialog; a webcam app, a man waves; he becomes a 3D avatar, then a chef                                                       | hard cuts            |
| 37.90–46.37 | publish, store | 'Publish Pixel? Team Store / Public Store' → Publishing; a store of apps; the Dock fills; a pull from the Dock to the desktop          | dissolves            |
| 46.37–51.77 | gathering      | every app made so far tiled on one desktop                                                                                             | cuts                 |
| 51.77–56.43 | cards          | 'Desktop apps, reimagined by you.'; the Glaze logo                                                                                     | end                  |

### By eye

- **Zoom:** the prompt at ×3; each app window at ×1–1.5 alone on the backdrop; the Dock at ×3
- **Cards:** 'Desktop apps, reimagined by you.'; 'glaze — By Raycast'
- **Cursor:** the system pointer
- **Frame:** black satin; windows float with soft shadows
- **Aspect:** 16:9, 1280×720, 30 fps
- **Sound:** an audio track with rhythmic onsets (not listened to)

## 2. Classify

Hand-edited launch film for a generative product. Conventions: a typed prompt, generated artefacts one by one, the OS's own affordances (the Dock, a publish dialog, a store), a gathering collage, a tagline card.

## 3. Diagnose

- Each app floats alone; then all of them share one frame. → Gathering shot as payoff: the collage recaps the montage and turns a list of demos into a body of work.
- New icons land in the Dock. → The OS's own affordance proves the claim ('real desktop apps') without a card.
- A person on a webcam, then turned into an avatar. → A human face holds attention, and placing it mid-film resets interest in a 56 s piece.
- Shots lengthen through the film (trend −0.32). → Rhythm: no build toward the end, so the gathering shot has to supply the climax alone.

## 4. Prescribe

- _new_: End a multi-scene reel on a gathering shot: every scene's final frame tiled into one frame. (renderer grid end (not built))
- _confirms_: Isolate the window on a backdrop. (camera / renderer (not built))
- _adjusts_: A very large reveal pull (×0.15) can run 1.1 s on ease-out. (camera pull curve (Part 3))

## 5. Critique

- **I like:** The gathering shot of every app made so far is the film's argument in one frame.
- **I wish:** The middle runs app after app at one pace; cutting two would let the gathering arrive sooner.
- **I wonder:** Could a reel end on a grid of each scene's last recorded frame?

## Not for us

- A webcam feed and avatar generation.
- Photographed fabric backdrop.
