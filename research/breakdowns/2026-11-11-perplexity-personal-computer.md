# Perplexity: Personal Computer

- **Video:** https://video.twimg.com/amplify_video/2052445271385346048/vid/avc1/1280x720/SAQbpccIjPV5PTPr.mp4?tag=14
- **Found on:** https://x.com/perplexity_ai/status/2052445405754040816
- **Maker:** Perplexity. **Kind:** launch film. **Posted:** 2026-05-07. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-perplexity-personal-computer.json](../references/2026-11-11-perplexity-personal-computer.json)

**Why it's here.** A 42 s launch mixing the product with rendered hardware. Serif cards carry inline icons ('Personal Computer [icon] is now available … on [Mac] Mac'). A prompt bar sits on a desktop wallpaper, a phone rises over 'Remotely operate from your iPhone' and types 'Take care of my to-do list in Notes', a Mac mini sits on a desk, and the payoff is a lock-screen notification: the to-do list is complete.

## 1. Describe

### Measured

42.32 s, 1280×720, 60 fps. Camera still 52% of the time. 23 shots, median 1.28 s. 22 cuts (12 dissolves); 31 moves.

Moves:

- 5.89 s pan ×0.998 (pan 12.4, 0%), 2–98% 840 ms, 10–90% 670 ms, peak 0.03
- 7.39 s pull ×0.481 (pan 0.5, -3.7%), 2–98% 580 ms, 10–90% 380 ms, peak 0.62, overshoot 2%
- 15.06 s push ×1.491 (pan 21.1, 29.1%), 2–98% 760 ms, 10–90% 580 ms, peak 0.86, overshoot 3%
- 16.25 s push ×1.071 (pan 3.7, 5%), 2–98% 190 ms, 10–90% 160 ms, peak 0.16, overshoot 6%
- 17.97 s pull ×0.911 (pan -5.5, -7.4%), 2–98% 430 ms, 10–90% 310 ms, peak 0.97, overshoot 7%
- 18.72 s pull ×0.592 (pan -44.8, -61.4%), 2–98% 1060 ms, 10–90% 750 ms, peak 0.3
- 20.36 s push ×3.991 (pan -14.9, -8.1%), 2–98% 2100 ms, 10–90% 1520 ms, peak 0.74, overshoot 8%
- 24.51 s pan ×1.002 (pan 0, 64.1%), 2–98% 2610 ms, 10–90% 2300 ms, peak 0.08
- 27.86 s pan ×0.99 (pan -0.8, 78.5%), 2–98% 780 ms, 10–90% 570 ms, peak 0.99, overshoot 5%
- 28.82 s pan ×0.997 (pan 0, 100.6%), 2–98% 1050 ms, 10–90% 420 ms, peak 0.07
- 31.54 s pan ×0.974 (pan 0, 101.7%), 2–98% 950 ms, 10–90% 570 ms, peak 0.9, overshoot 4%
- 36.53 s pull ×0.453 (pan 25.5, 0.9%), 2–98% 1570 ms, 10–90% 670 ms, peak 0.06
- (19 more under 150 ms, ×1.1 or 5% of the frame: blur, UI changes or tracker noise)

**What the instrument can read.** 60 fps. Two large pans (70–89% of the frame, the phone sliding) fit in-out quart and cutscene 0.3.0's own curve at 1.0–1.6 s (rms 3.7–5.0%). A short pull fits easy ease (3.5%). The ×4 push into the display (20.36) sits against a cut.

Autofit left out 7 moves with a cut too close and 4 whose best fit was above 3% (the tracker, not a curve).

### Shot list

| Time (s)    | Framing     | What happens                                                                                                                      | Out       |
| ----------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------- | --------- |
| 0.00–4.83   | cards       | 'Personal Computer [icon] is now available'; 'to all Pro and Max subscribers on [Mac] Mac' builds                                 | hard cuts |
| 4.83–7.95   | desktop     | 'Do anything…' on the wallpaper expands to 'secure access to local files, native Mac apps' with app tiles                         | dissolve  |
| 7.95–15.80  | phone       | 'Remotely operate from your iPhone' over a blurred desk; a phone rises over the card; 'Take care of my to-do list in Notes' typed | dissolves |
| 15.80–23.30 | hardware    | a Mac mini on a desk; a display with the app; a push in                                                                           | dissolves |
| 23.30–28.68 | work        | 'Taking care of To-do list'; tasks stream: 'Fetching Shopify product inventory', 'Calling product update tool'                    | hard cuts |
| 28.68–32.53 | payoff      | a lock screen at 7:00: 'Your to-do list is complete'                                                                              | hard cut  |
| 32.53–42.32 | cards, logo | 'Download the new Perplexity Mac app …'; the logo                                                                                 | end       |

### By eye

- **Zoom:** the prompt bar at ×2 on the wallpaper; the phone at full height; the display pushed to ×4
- **Cards:** 'Personal Computer is now available', 'to all Pro and Max subscribers on Mac', 'Remotely operate from your iPhone', 'Download the new Perplexity Mac app to get Personal Computer'; logo
- **Cursor:** none; the phone keyboard
- **Frame:** cream for cards; a green-dune wallpaper; a rendered desk
- **Aspect:** 16:9, 1280×720, 60 fps
- **Sound:** an audio track with rhythmic onsets (not listened to)

## 2. Classify

Hand-edited launch film with 3D-rendered devices around real UI. Conventions: build cards with inline icons, devices entering over their claim, a notification as the payoff.

## 3. Diagnose

- Card copy carries inline product and OS icons. → Icon as word: the card and the product share glyphs, so the claim is partly picture.
- The phone rises over its own claim card. → Claim and proof in one shot: the device enters on top of the sentence that introduces it.
- The last product shot is a lock-screen notification reporting the result. → Payoff by outcome: the OS reports the task done, so the work itself never has to be shown.
- Large device slides fit in-out quart and cutscene's own curve. → Moving A→B on screen takes the in-out family (the easing flowchart), matching cutscene 0.3.0.

## 4. Prescribe

- _new_: End the product story on the app's own toast or notification reporting the outcome, held at ×2. (act.focus on the toast (exists))
- _confirms_: Inline UI or icons inside card copy (Cursor Origin). (cards (not built))
- _confirms_: cutscene 0.3.0's in-out curve fits large on-screen slides. (camera curve (exists))

## 5. Critique

- **I like:** The lock-screen notification closes the loop the prompt opened without showing any of the work.
- **I wish:** The rendered Mac mini adds 2.5 s of product photography that says nothing about the feature.
- **I wonder:** Could a reel find the app's own success toast and end on it automatically?

## Not for us

- Rendered hardware and desk.
- A phone keyboard outside the app.
