# Dia: Profiles

- **Video:** https://video.twimg.com/amplify_video/2084285876897529856/vid/avc1/960x720/wgueyUbRd1SMlGMG.mp4?tag=29
- **Found on:** https://x.com/diabrowser/status/2084286152580714862
- **Maker:** The Browser Company. **Kind:** launch film. **Posted:** 2026-08-03. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-dia-profiles.json](../references/2026-11-11-dia-profiles.json)

**Why it's here.** A 40 s hybrid. Live-action macro of a laptop: a finger swipes on a trackpad that glows from within ('All it takes is a swipe.'). It cuts to the browser in the next profile, each with its own colour (green, lavender, pink) and its own chat ('Catch me up on the homepage redesign', 'What are the invoicing instructions for Pretzel Logic Foods?'). 'Swipe away.' closes it.

## 1. Describe

### Measured

39.67 s, 960×720, 30 fps. Camera still 89% of the time. 29 shots, median 1.43 s. 28 cuts (15 dissolves); 14 moves.

Moves:

- 1.38 s pull ×0.855 (pan 3.1, 24.5%), 2–98% 670 ms, 10–90% 580 ms, peak 0.12, overshoot 7%
- 7.93 s push ×1.225 (pan 2.9, -0.7%), 2–98% 310 ms, 10–90% 190 ms, peak 0.02
- 13.63 s push ×1.13 (pan 1.9, -0.4%), 2–98% 260 ms, 10–90% 180 ms, peak 0.01
- 18.80 s push ×1.237 (pan 9.1, 7.8%), 2–98% 270 ms, 10–90% 190 ms, peak 0.99, overshoot 44%
- 19.16 s push ×1.132 (pan 5.3, 4.5%), 2–98% 270 ms, 10–90% 180 ms, peak 0.02
- 24.12 s push ×1.12 (pan 1.7, 5.6%), 2–98% 150 ms, 10–90% 110 ms, peak 0.97, overshoot 57%
- 25.56 s pan ×1.004 (pan 0, 16.5%), 2–98% 430 ms, 10–90% 220 ms, peak 0.41
- 27.37 s push ×1.473 (pan 9.4, 3.7%), 2–98% 250 ms, 10–90% 200 ms, peak 0.63, overshoot 11%
- 31.99 s push ×1.226 (pan 2.9, -0.7%), 2–98% 310 ms, 10–90% 190 ms, peak 0.02
- (5 more under 150 ms, ×1.1 or 5% of the frame: blur, UI changes or tracker noise)

**What the instrument can read.** 4:3 (960×720), 30 fps. The UI pushes are short (0.27–0.68 s). One pan fits in-out quint at 0.68 s (rms 1.65%; cutscene 2.1%), the others loosely (3–3.5%).

### Curve fits

RMS error as % of the move's travel; the same fit recovers cutscene 0.3.0's own push at 0.16%.

| Move                | Best fit                     | Next other curve                     | cutscene 0.3.0's curve |
| ------------------- | ---------------------------- | ------------------------------------ | ---------------------- |
| pan 18% at 25.56    | in-out-quint, 677 ms (1.65%) | spring ζ=1, ω 17.2/s, 338 ms (1.89%) | 2.09% (461 ms)         |
| push ×1.41 at 27.37 | AE easy ease, 271 ms (2.97%) | ease-out, 234 ms (3.66%)             | 3.82% (386 ms)         |

Autofit left out 2 moves with a cut too close and 2 whose best fit was above 3% (the tracker, not a curve).

### Shot list

| Time (s)    | Framing           | What happens                                                                                                                    | Out       |
| ----------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------- | --------- |
| 0.00–7.33   | live              | a laptop keyboard, a hand, the trackpad; the screen with profiles; 'Profiles make context switching easy.'                      | dissolves |
| 7.33–13.50  | swipe → work      | the glowing trackpad, 'All it takes is a swipe.'; the browser in the green Work profile; 'Catch me up on the homepage redesign' | hard cuts |
| 13.50–23.03 | swipe → freelance | the trackpad; the Freelance profile; 'What are the invoicing instructions…'; a report                                           | dissolves |
| 23.03–35.20 | swipe → personal  | the trackpad; the pink Personal profile; mail and a question                                                                    | dissolves |
| 35.20–39.67 | close             | hands swipe, 'Swipe away.'; diabrowser.com                                                                                      | end       |

### By eye

- **Zoom:** the browser at ×1 on a photo backdrop; pushes to about ×1.4–2.0 on the chat
- **Cards:** 'Profiles make context switching easy.', 'All it takes is a swipe.', 'Swipe away.'; diabrowser.com
- **Cursor:** none; a finger on the trackpad
- **Frame:** live macro shots; UI on a bokeh-green photo backdrop
- **Aspect:** 4:3, 960×720, 30 fps
- **Sound:** an audio track with rhythmic onsets (not listened to)

## 2. Classify

Hybrid launch film: a physical gesture in live action, its consequence in the UI. Conventions: a glowing trackpad, cards over footage, a colour per profile, a URL end card.

## 3. Diagnose

- Each swipe on the trackpad cuts to the UI in the next profile. → Match on action across media: the physical gesture is the cause, the UI the effect.
- Each profile has its own colour theme. → Colour as chapter marker (with Family Ethereum).
- The trackpad glows from within. → Making an invisible gesture visible: the hero is the input, not the screen.
- UI shots sit small on a bokeh photo. → Figure-ground: the profile's contents read mostly as colour.

## 4. Prescribe

- _confirms_: Colour as chapter marker per scene. (renderer backdrop per scene (not built))
- _confirms_: Match on action from input to result (Framer, Dia). (act.press overlay (not built))

## 5. Critique

- **I like:** The glowing trackpad turns a two-finger swipe, normally invisible, into the hero.
- **I wish:** The UI is small on the photo backdrop, so each profile reads as a colour more than as content.
- **I wonder:** Could a reel tint each scene's backdrop from the app's own theme colour in that scene?

## Not for us

- Live-action hands and a lit trackpad.
