# v0: Design Mode

- **Video:** https://video.twimg.com/amplify_video/1932892033020235776/vid/avc1/1280x720/5QnuxWnSlv0672PH.mp4?tag=14
- **Found on:** https://x.com/v0/status/1932892095565660490
- **Maker:** v0 (Vercel). **Kind:** launch film. **Posted:** 2025-06-11. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-v0-design-mode.json](../references/2026-11-11-v0-design-mode.json)

**Why it's here.** A 24 s near-single take. It opens at ×2.5 on the prompt ('Help me create a product page for my small business that sells plants…'), pulls back to the generated 'Bring Nature Home' page, and shows Design Mode changing the type directly while the page updates.

## 1. Describe

### Measured

23.97 s, 1280×720, 60 fps. Camera still 80% of the time. 13 shots, median 0.98 s. 12 cuts (6 dissolves); 13 moves.

Moves:

- 4.03 s pull ×0.807 (pan -2, -0.2%), 2–98% 320 ms, 10–90% 220 ms, peak 0.49, overshoot 7%
- 4.81 s pull ×0.43 (pan 0.3, 3.3%), 2–98% 350 ms, 10–90% 230 ms, peak 0.67
- 5.85 s pan ×1.09 (pan -75.1, -46.2%), 2–98% 1130 ms, 10–90% 800 ms, peak 0.16
- 9.64 s pull ×0.844 (pan 8.6, 8.4%), 2–98% 550 ms, 10–90% 210 ms, peak 0.56
- 17.05 s pull ×0.503 (pan 2, -4%), 2–98% 1030 ms, 10–90% 280 ms, peak 0.22, overshoot 1%
- (8 more under 150 ms, ×1.1 or 5% of the frame: blur, UI changes or tracker noise)

**What the instrument can read.** 60 fps. Pull ×0.45 from the prompt in 0.35 s, ease-in-out on linear scale (rms 1.0%; cutscene 0.3.0 1.2%). Pull ×0.84 in 0.62 s, in-out quint on linear scale (1.6%). A slow pan fits loosely (8%).

### Curve fits

RMS error as % of the move's travel; the same fit recovers cutscene 0.3.0's own push at 0.16%.

| Move               | Best fit                                     | Next other curve                                       | cutscene 0.3.0's curve |
| ------------------ | -------------------------------------------- | ------------------------------------------------------ | ---------------------- |
| pull ×0.45 at 4.81 | ease-in-out on linear scale, 353 ms (1.02%)  | spring ζ=0.8 on linear scale, ω 13.5/s, 276 ms (2.54%) | 1.2% (475 ms)          |
| pull ×0.84 at 9.64 | in-out-quint on linear scale, 620 ms (1.58%) | ease, 343 ms (3.41%)                                   | 2.69% (410 ms)         |

Autofit left out 1 moves with a cut too close and 2 whose best fit was above 3% (the tracker, not a curve).

### Shot list

| Time (s)    | Length (s) | Framing | What happens                                                                | Out            |
| ----------- | ---------- | ------- | --------------------------------------------------------------------------- | -------------- |
| 0.00–0.88   | 0.88       | card    | 'Introducing v0 Design mode'                                                | dissolve       |
| 0.88–4.77   | 3.89       | prompt  | ×2.5 on the prompt; v0 replies; pull ×0.45                                  | hard cuts      |
| 4.77–7.38   | 2.61       | result  | the generated 'Bring Nature Home' page                                      | short dissolve |
| 7.38–16.87  | 9.49       | edit    | Design Mode: the typography panel; the font changes and the heading updates | short dissolve |
| 16.87–20.05 | 3.18       | final   | the finished page with its plant image; pull ×0.5                           | dissolves      |
| 20.05–23.97 | 3.92       | logo    | the v0 mark                                                                 | end            |

### By eye

- **Zoom:** opens at ×2.5 on the prompt; working ≈ ×1.4; wide for the result
- **Cards:** 'Introducing v0 Design mode'; the logo
- **Cursor:** the system pointer
- **Frame:** full-bleed white, no window
- **Aspect:** 16:9, 1280×720, 60 fps
- **Sound:** none: no audio track

### Frame-level beats

Read from 10-frame strips around 3 cuts, 1 dissolve and 2 moves; 1 f = 16.7 ms at 60 fps.

- **The prompt holds with an attachment chip as its only colour.** At 3.02 s the composer at ×2.5 sits still; the green logo chips at its top left are the one saturated element. Nothing moves for 10 frames.
- **The result arrives by pulling out of it.** From 4.81 s the frame starts inside the generated page at about ×4, blurred, with 'Nature Home' filling the width, and pulls ×0.45 to the whole page in about 0.9 s; the picture sharpens as the scale drops, and most of the travel is in the first half. The reveal is a move, not a cut: the page is read heading first, then layout.
- **The panel opens as the frame pulls.** From 9.64 s the Design Mode panel slides in at the left while the frame pulls back just enough to fit panel and page together (about ×0.85); the typography controls fill in over the next 4 columns and a dropdown opens last, under the pointer. Camera and UI finish within 2–3 frames of each other.
- **The heading re-renders in place** as the font changes; the page doesn't reflow around it in the strip.
- **The final frame holds with a brand-coloured pointer** (18.07 s): a blue arrow rests below the heading for 10 frames or more while the page is still.
- **The logo draws itself and undraws itself.** The v0 mark's strokes complete over about 10 frames (20.70 s) and thin out again at the end (23.18 s).

**Eye at the cuts.** Prompt → result: the pull starts on the heading at about 35% × 30%, where the prompt's text was (about 40% × 45%): inside 10%. Page → logo: from the pointer at about 45% to the centre, 5%. All 3 measured cuts are the logo's strokes; the film's reframes are all moves or dissolves.

## 2. Classify

Short walkthrough, full-bleed: prompt → generated page → direct edit. Conventions: a title card, an opening detail on the input, a reveal pull, a logo end card.

## 3. Diagnose

- Opens at ×2.5 on the prompt, then pulls back as the page appears. → Open on the input, reveal the output: the request is legible before its result.
- The pull fits cutscene 0.3.0's curve almost as well as the best fit. → A short in-out pull matches cutscene's default.
- The design panel is at ×1 during the 9.5 s edit. → Legibility: the edit is read from the page changing, not the panel.

## 4. Prescribe

- _confirms_: Open on the input at ×2.5, pull back to the output. (act.type then act.wide (exists))
- _confirms_: cutscene 0.3.0's in-out curve for short pulls. (camera curve (exists))

## 5. Critique

- **I like:** Opening on the prompt at ×2.5 makes the request readable before the page appears.
- **I wish:** The design panel's controls stay small; a cut to ×2 on the font picker would show the edit at its source.
- **I wonder:** Could a scene that starts with typing open at ×2.5 on the input by default?
