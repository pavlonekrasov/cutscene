# Cursor: the Cursor SDK

- **Video:** https://video.twimg.com/amplify_video/2049499813679403008/vid/avc1/1280x720/omgPVzLcUmiuzYSN.mp4?tag=21
- **Found on:** https://x.com/cursor_ai/status/2049499866217185492
- **Maker:** Cursor. **Kind:** launch film. **Posted:** 2026-04-29. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-cursor-sdk.json](../references/2026-11-11-cursor-sdk.json)

**Why it's here.** A code film with one idea per shot: an import line types at huge scale, the file grows, then the editor splits so the script and its terminal run side by side, and the agent's output scrolls in. 35 s.

## 1. Describe

### Measured

35.03 s, 1280×720, 30 fps. Camera still 89% of the time. 12 shots, median 2.43 s. 11 cuts (1 dissolves); 7 moves.

Moves:

- 3.62 s pan ×1 (pan 0, 196.4%), 2–98% 1100 ms, 10–90% 690 ms, peak 0.53
- 5.53 s pull ×0.363 (pan 94.1, -93.6%), 2–98% 740 ms, 10–90% 510 ms, peak 0.14
- 16.34 s push ×1.5 (pan -17, -10.7%), 2–98% 380 ms, 10–90% 250 ms, peak 0.16
- 20.32 s pull ×0.513 (pan 51.3, 32.4%), 2–98% 620 ms, 10–90% 390 ms, peak 0.57
- (3 more under 150 ms, ×1.1 or 5% of the frame: blur, UI changes or tracker noise)

**What the instrument can read.** Two clean cuts-with-moves: a pull ×0.36 at 5.5 s (from the import line to the whole file) and a push ×1.5 at 16.3 s. The 196% 'pan' at 3.6 s is the file scrolling.

### Curve fits

RMS error as % of the move's travel; the same fit recovers cutscene 0.3.0's own push at 0.16%.

| Move                | Best fit                                              | Next other curve                                      | cutscene 0.3.0's curve |
| ------------------- | ----------------------------------------------------- | ----------------------------------------------------- | ---------------------- |
| pan 196% at 3.62    | cutscene 0.3.0, 1644 ms (0.49%)                       | spring ζ=0.8, ω 3.6/s, 1048 ms (2.38%)                | 0.49% (1644 ms)        |
| pull ×0.36 at 5.53  | spring ζ=0.9 on linear scale, ω 6.3/s, 748 ms (0.51%) | ease, 995 ms (0.92%)                                  | 2.61% (1223 ms)        |
| pull ×0.51 at 20.32 | cutscene 0.3.0 on linear scale, 910 ms (0.5%)         | spring ζ=0.8 on linear scale, ω 6.9/s, 546 ms (1.94%) | 0.68% (938 ms)         |

Autofit left out 1 moves with a cut too close.

### Shot list

| Time (s)    | Framing             | What happens                                                             | Out             |
| ----------- | ------------------- | ------------------------------------------------------------------------ | --------------- |
| 0.10–2.87   | detail ×4           | 'import { Agent } from "@cursor/sdk"' types                              | hard cut        |
| 2.87–11.80  | detail → pull ×0.36 | Agent.create({...}) fills in; the camera pulls to the whole file         | hard cut        |
| 11.80–19.27 | split               | the file left; 'bun run ./cursor-agent.ts' runs right; tool calls stream | dissolve 0.33 s |
| 19.27–30.87 | detail, split       | the config switches to cloud; push ×1.5; the run repeats with a repo     | hard cuts       |
| 30.87–35.03 | cards               | 'Cursor SDK'; logo                                                       | end             |

### By eye

- **Zoom:** the import line at ×4; the file at ×1.5; the split at ×1
- **Cards:** 'Cursor SDK' (2 s), logo on black (2.2 s)
- **Cursor:** an I-beam in the editor
- **Frame:** full-bleed editor, cream background; terminal on black at the right
- **Aspect:** 16:9, 30 fps
- **Sound:** silent (an audio track at −91 dB)

### Frame-level beats

- The pull starts after the import line is complete, so the line stays legible until it's part of the file.

## 2. Classify

Hand-edited code film on a light editor theme. Conventions: typing close-up, a scale-down to context, split screen (code | output), a product-name card.

## 3. Diagnose

- Input and output are side by side. → Cause and effect in one frame: the script and what it does share the screen, no cut between them.
- Typing at ×4, then a pull to context. → Push to act, pull to see, run on code.

## 4. Prescribe

- _new_: Split screen: the input on one side, its result on the other. (parallel action (Part 2))
- _confirms_: Typing close-up, then pull to context. (camera)

## 5. Critique

- **I like:** Nothing in the film is not code or its output; developers can read every line.
- **I wish:** The terminal half is small and fast; its result ('Added check-links.ts…') is hard to read before the cut.
- **I wonder:** Split screen is parallel action without a second take: could cutscene show a scene's two windows (editor, browser) side by side?
