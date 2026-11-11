# Notion: HTML block

- **Video:** https://video.twimg.com/amplify_video/2072353512512745472/vid/avc1/1280x720/RdwMxEtYRY7urifj.mp4?tag=28
- **Found on:** https://x.com/NotionHQ/status/2072354853821755822
- **Maker:** Notion. **Kind:** launch film. **Posted:** 2026-07-01. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-notion-html-block.json](../references/2026-11-11-notion-html-block.json)

**Why it's here.** A 68 s walkthrough with a follow camera. An HTML block in an onboarding page, then the main story: a 'History of Notion' page gets an interactive timeline. A teammate comments at ×3, 'This is great… but it's missing what happened in Kyoto!', the AI is asked to add it, and the timeline updates.

## 1. Describe

### Measured

67.57 s, 1280×720, 60 fps. Camera still 89% of the time. 29 shots, median 1.92 s. 28 cuts (12 dissolves); 21 moves.

Moves:

- 0.25 s pan ×1 (pan 0, 6.1%), 2–98% 340 ms, 10–90% 180 ms, peak 0.3
- 3.05 s pan ×1.003 (pan -0.1, 8.8%), 2–98% 160 ms, 10–90% 130 ms, peak 0.24
- 3.94 s push ×1.493 (pan -0.3, 12.8%), 2–98% 710 ms, 10–90% 370 ms, peak 0.52
- 7.04 s pan ×1 (pan 0, 13.8%), 2–98% 260 ms, 10–90% 200 ms, peak 0.65, overshoot 6%
- 7.64 s pan ×1 (pan 0, 7.8%), 2–98% 240 ms, 10–90% 230 ms, peak 0.18, overshoot 15%
- 7.94 s pan ×1 (pan 0, 11.1%), 2–98% 230 ms, 10–90% 200 ms, peak 0.18, overshoot 1%
- 21.55 s pan ×1 (pan 0, 10.7%), 2–98% 510 ms, 10–90% 310 ms, peak 0.17
- 28.82 s pan ×1 (pan 0, -29.6%), 2–98% 540 ms, 10–90% 300 ms, peak 0.29
- 34.36 s push ×3.322 (pan 41.2, -2.6%), 2–98% 630 ms, 10–90% 340 ms, peak 0.55
- 40.62 s pan ×0.999 (pan 0, 13.2%), 2–98% 340 ms, 10–90% 250 ms, peak 0.96, overshoot 10%
- 41.64 s pan ×0.971 (pan -0.6, 12%), 2–98% 290 ms, 10–90% 210 ms, peak 0.11
- 48.65 s pull ×0.505 (pan -31.8, -47.4%), 2–98% 480 ms, 10–90% 270 ms, peak 0.45
- 51.58 s pan ×0.867 (pan -20.9, -24.9%), 2–98% 510 ms, 10–90% 270 ms, peak 0.5
- 59.38 s pan ×0.999 (pan -0.7, -79.4%), 2–98% 900 ms, 10–90% 570 ms, peak 0.64
- 62.43 s pull ×0.769 (pan 0, 0.1%), 2–98% 530 ms, 10–90% 300 ms, peak 0.28
- (6 more under 150 ms, ×1.1 or 5% of the frame: blur, UI changes or tracker noise)

**What the instrument can read.** 60 fps. The big moves are hand-keyed in-out quart on linear scale. Push ×1.5 in 1.02 s (rms 0.49%), push ×3.3 in 0.91 s (0.45%), pull ×0.5 in 0.72 s (0.76%). Two small nudges fit a ζ 1 spring at 0.47 s (1.4–1.6%). cutscene 0.3.0 fits the big moves at 1.3–1.5%.

### Curve fits

RMS error as % of the move's travel; the same fit recovers cutscene 0.3.0's own push at 0.16%.

| Move                | Best fit                                      | Next other curve                      | cutscene 0.3.0's curve |
| ------------------- | --------------------------------------------- | ------------------------------------- | ---------------------- |
| push ×1.5 at 3.94   | in-out-quart on linear scale, 1024 ms (0.49%) | spring ζ=0.8, ω 7.1/s, 530 ms (3.06%) | 1.27% (858 ms)         |
| pan 9% at 21.55     | out-expo, 910 ms (0.86%)                      | spring ζ=1, ω 12.4/s, 470 ms (2.25%)  | 6.15% (475 ms)         |
| pan 30% at 28.82    | spring ζ=1, ω 12.4/s, 470 ms (1.36%)          | out-quint, 762 ms (1.57%)             | 2.68% (658 ms)         |
| push ×3.32 at 34.36 | in-out-quart on linear scale, 910 ms (0.45%)  | spring ζ=0.8, ω 7.7/s, 486 ms (3.18%) | 1.33% (762 ms)         |
| pull ×0.5 at 48.65  | in-out-quart on linear scale, 719 ms (0.76%)  | ease, 489 ms (2.05%)                  | 1.46% (620 ms)         |
| pan 79% at 59.38    | ease-in-out, 1024 ms (2.3%)                   | ease-out, 809 ms (3.87%)              | 2.53% (1377 ms)        |
| pull ×0.77 at 62.43 | spring ζ=1, ω 12.4/s, 470 ms (1.6%)           | out-quint, 809 ms (1.66%)             | 3.24% (638 ms)         |

Autofit left out 3 moves with a cut too close and 2 whose best fit was above 3% (the tracker, not a curve).

### Shot list

| Time (s)    | Framing  | What happens                                                                                                                                                      | Out       |
| ----------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| 0.00–2.85   | card     | 'Introducing HTML block'                                                                                                                                          | dissolve  |
| 2.85–10.45  | examples | an onboarding page with an HTML block; a globe widget                                                                                                             | dissolves |
| 10.45–21.52 | build    | 'History of Notion'; the slash menu, HTML; an HTML file uploaded; 'Generate an interactive timeline …' typed                                                      | dissolves |
| 21.52–36.98 | timeline | the interactive timeline in the page, explored with pushes                                                                                                        | hard cuts |
| 36.98–42.82 | comment  | ×3: two avatars; Sarah: 'This is great… but it's missing what happened in Kyoto!'; James: 'Oops! Let's fix that.'                                                 | hard cuts |
| 42.82–61.82 | fix      | ×3 on the AI prompt: 'Can you update the timeline so that includes what happened in Kyoto…'; the updated timeline, 'Notion rebuilds from scratch in Kyoto, Japan' | dissolves |
| 61.82–67.57 | close    | the globe; the Notion logo                                                                                                                                        | end       |

### By eye

- **Zoom:** working ≈ ×1.4–1.5; ×3 for the comments and the prompt
- **Cards:** 'Introducing HTML block'; the logo
- **Cursor:** an enlarged macOS arrow with motion blur
- **Frame:** the window on light grey
- **Aspect:** 16:9, 1280×720, 60 fps
- **Sound:** an audio track with rhythmic onsets (not listened to)

## 2. Classify

Walkthrough with a follow camera and chapter cuts, on light grey. Conventions: a title card, an enlarged pointer, ×3 crops for comments and prompts, a logo end card.

## 3. Diagnose

- Big moves fit in-out quart on linear scale at 0.7–1.0 s, small nudges a ζ 1 spring. → Two curves by move size: keyed in-out for reframes, a spring for nudges.
- A teammate's comment asks for Kyoto; the next scene adds it. → Motivated action: the second demo answers a request, so it reads as story, not repetition.
- Comments and the prompt at ×3. → Typing and reading close-ups: the words are the content.
- Seven seconds of side examples before the main story. → Delayed setup: the film's question arrives late.

## 4. Prescribe

- _confirms_: Hand-keyed in-out quart on linear scale for big reframes (0.7–1.0 s). (camera curve (Part 3))
- _new_: Motivate a scene with a comment or request shown at ×3; the next scene answers it. (reel script (skill))
- _new_: Pick the curve by move size: in-out for reframes, a ζ 1 spring for small nudges. (camera curve per move (Part 3))

## 5. Critique

- **I like:** Sarah's comment gives the AI edit a reason, so the second half is an answer, not a second demo.
- **I wish:** The onboarding and globe examples delay the main story by about 7 s.
- **I wonder:** Could a reel's camera choose its curve per move: in-out quart above ×1.3, a ζ 1 spring below?

## Not for us

- Collaborator comments from other accounts.
