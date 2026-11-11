# Cursor: Cursor Router

- **Video:** https://video.twimg.com/amplify_video/2079993297507164160/vid/avc1/1280x720/94JHNIseZJdC0FR6.mp4?tag=29
- **Found on:** https://x.com/cursor_ai/status/2079993729532989500
- **Maker:** Cursor. **Kind:** launch film. **Posted:** 2026-07-22. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-cursor-router.json](../references/2026-11-11-cursor-router.json)

**Why it's here.** A pricing claim proven with a diagram, not a screen: a coloured task chip ('Build a new UI', 'Hard debug', 'Run tests') flows through 'Router' to the model it picks, then a cost table ends on the router's $1.38. 21.9 s.

## 1. Describe

### Measured

21.9 s, 1280×720, 30 fps. Camera still 88% of the time. 9 shots, median 2.3 s. 8 cuts (3 dissolves); 7 moves.

Moves:

- 6.18 s pan ×1 (pan 0, 6.9%), 2–98% 160 ms, 10–90% 120 ms, peak 1, overshoot 38%
- 7.97 s pan ×1 (pan 15.1, 0%), 2–98% 560 ms, 10–90% 370 ms, peak 0.29
- 11.86 s pan ×1.02 (pan -0.1, 8.4%), 2–98% 400 ms, 10–90% 220 ms, peak 0.92, overshoot 29%
- 12.36 s pan ×1 (pan 0, 9.1%), 2–98% 480 ms, 10–90% 270 ms, peak 0.01
- 15.09 s pan ×0.956 (pan 11.8, -0.5%), 2–98% 300 ms, 10–90% 140 ms, peak 0.94, overshoot 48%
- 18.82 s pull ×0.897 (pan 0, 0.1%), 2–98% 350 ms, 10–90% 220 ms, peak 0.99, overshoot 33%
- (1 more under 150 ms, ×1.1 or 5% of the frame: blur, UI changes or tracker noise)

**What the instrument can read.** No camera moves; the short 'moves' are chips sliding along the diagram.

### Curve fits

RMS error as % of the move's travel; the same fit recovers cutscene 0.3.0's own push at 0.16%.

| Move             | Best fit                     | Next other curve                     | cutscene 0.3.0's curve |
| ---------------- | ---------------------------- | ------------------------------------ | ---------------------- |
| pan 15% at 7.97  | ease, 698 ms (0.34%)         | spring ζ=0.9, ω 8/s, 590 ms (0.49%)  | 2.48% (858 ms)         |
| pan 6% at 12.36  | out-expo, 910 ms (2.56%)     | spring ζ=1, ω 13.2/s, 442 ms (3.74%) | 6.87% (489 ms)         |
| pan 16% at 15.09 | in-out-quint, 567 ms (2.49%) | spring ζ=1, ω 23.1/s, 252 ms (4.5%)  | 3.68% (386 ms)         |

Autofit left out 1 whose best fit was above 3% (the tracker, not a curve).

### Shot list

| Time (s)    | Framing            | What happens                                                           | Out       |
| ----------- | ------------------ | ---------------------------------------------------------------------- | --------- |
| 0.00–3.83   | claim card         | 'Frontier intelligence at 60% lower cost'                              | hard cut  |
| 3.83–7.60   | control            | the 'Auto' dropdown with 'Optimize for: Intelligence / Balance / Cost' | hard cut  |
| 7.60–16.93  | diagram ×3         | task chip → Router → model, in three colours                           | hard cuts |
| 16.93–21.90 | table, cards, logo | 'Cost per commit'; 'Cursor Router'; availability; logo                 | end       |

### By eye

- **Zoom:** the dropdown at ×2; diagrams centred
- **Cards:** 'Frontier intelligence at 60% lower cost' (3.8 s, orange '60%'); 'Cost per commit' with a table; 'Cursor Router'; 'Now available for Teams and Enterprises'; logo
- **Cursor:** none
- **Frame:** white and light grey, no window
- **Aspect:** 16:9, 30 fps
- **Sound:** silent (an audio track at −91 dB)

### Frame-level beats

- Each diagram reuses the same layout with a new colour, so the viewer only reads what changed.

## 2. Classify

Graphics-led film around one real control (the router's dropdown). Conventions: claim card with a coloured figure, a flow diagram in three variations, a comparison table, a name card.

## 3. Diagnose

- Three diagrams differ only in colour and labels. → Constancy: hold the layout still so the change is the only information.
- The number is coloured in the claim and again in the table. → One accent colour tracks the claim through the film.

## 4. Prescribe

- _new_: Repeat a shot's layout and change one thing, so the change is the message. (reel structure)

## 5. Critique

- **I like:** The claim, the mechanism and the proof each get one shot type.
- **I wish:** Only the dropdown is real UI; the rest is a slide deck.
- **I wonder:** Could cutscene card a scene's measured number (a timing, a count) the way this cards cost?

## Not for us

- Diagram graphics: cutscene films the app, it doesn't draw explainers.
