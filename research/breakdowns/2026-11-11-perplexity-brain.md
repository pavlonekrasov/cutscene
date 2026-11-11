# Perplexity: Brain for Computer

- **Video:** https://video.twimg.com/amplify_video/2067642061399150593/vid/avc1/1280x720/xdr_B1jnx42MOD6q.mp4?tag=14
- **Found on:** https://x.com/perplexity_ai/status/2067642139014742348
- **Maker:** Perplexity. **Kind:** launch film. **Posted:** 2026-06-18. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-perplexity-brain.json](../references/2026-11-11-perplexity-brain.json)

**Why it's here.** A 66 s explainer launch, the slowest film in the set (3.4 s median shot). Bokeh particles resolve into a node graph and a cloud of dots, which gives a memory feature a shape. Between them, full-sentence serif cards on cream and a few UI shots: a prompt, a drafted launch plan, the plan's text and the 'Workstreams / Entities' it drew on.

## 1. Describe

### Measured

66.43 s, 1280×720, 30 fps. Camera still 65% of the time. 21 shots, median 3.4 s. 20 cuts (15 dissolves); 28 moves.

Moves:

- 5.53 s pull ×0.796 (pan -1.6, 8.1%), 2–98% 2450 ms, 10–90% 1860 ms, peak 0.08, overshoot 3%
- 9.41 s pull ×0.494 (pan -6.9, -5.2%), 2–98% 1800 ms, 10–90% 1320 ms, peak 0.92, overshoot 2%
- 11.88 s pull ×0.722 (pan 0.4, 0.3%), 2–98% 3780 ms, 10–90% 3620 ms, peak 0.01, overshoot 5%
- 16.56 s pull ×0.001 (pan -1038.8, 595.7%), 2–98% 1430 ms, 10–90% 640 ms, peak 0.63, overshoot 1%
- 19.47 s pan ×0.999 (pan 0, 14.2%), 2–98% 410 ms, 10–90% 290 ms, peak 0.16
- 22.26 s pan ×1.002 (pan 0, -39.4%), 2–98% 340 ms, 10–90% 240 ms, peak 0.99, overshoot 34%
- 24.80 s pull ×0.836 (pan 0.3, 0%), 2–98% 320 ms, 10–90% 230 ms, peak 0.2
- 28.42 s pan ×0.992 (pan -0.1, 10.1%), 2–98% 150 ms, 10–90% 100 ms, peak 0.99, overshoot 51%
- 28.94 s pan ×1 (pan 0, 6.3%), 2–98% 850 ms, 10–90% 740 ms, peak 0.78
- 31.14 s pan ×1 (pan 0, 7.8%), 2–98% 410 ms, 10–90% 250 ms, peak 0.47
- 32.38 s pan ×1 (pan 0, 5.2%), 2–98% 400 ms, 10–90% 220 ms, peak 0.56
- 36.46 s pan ×0.955 (pan 0.5, 37.2%), 2–98% 630 ms, 10–90% 430 ms, peak 0.27
- 39.79 s push ×2.89 (pan -3.7, -14.2%), 2–98% 660 ms, 10–90% 360 ms, peak 0.21
- 43.03 s pan ×1 (pan 0, 8.3%), 2–98% 460 ms, 10–90% 310 ms, peak 0.15
- 45.33 s pan ×0.997 (pan 0, 6.6%), 2–98% 270 ms, 10–90% 190 ms, peak 0.88, overshoot 29%
- 48.41 s push ×2.469 (pan 73, -7.9%), 2–98% 4250 ms, 10–90% 3410 ms, peak 0.03, overshoot 2%
- 56.42 s pull ×0.891 (pan -2.8, 0.4%), 2–98% 860 ms, 10–90% 100 ms, peak 0.64
- 58.70 s pull ×0.888 (pan -3.1, 3.6%), 2–98% 190 ms, 10–90% 70 ms, peak 0.89, overshoot 26%
- 62.27 s pull ×0.817 (pan 3.6, 0.1%), 2–98% 1380 ms, 10–90% 920 ms, peak 0.04, overshoot 3%
- (9 more under 150 ms, ×1.1 or 5% of the frame: blur, UI changes or tracker noise)

**What the instrument can read.** 30 fps. Two slow pulls fit cleanly: ×0.79 over 2.8 s, ease-out (rms 1.1%; cutscene 11.3%); ×0.49 over 2.3 s, easy ease on linear scale (1.3%). A short scroll fits a ζ 0.8 spring at 0.39 s (1.1%). The opening is one 4.2 s dissolve.

### Curve fits

RMS error as % of the move's travel; the same fit recovers cutscene 0.3.0's own push at 0.16%.

| Move               | Best fit                                      | Next other curve              | cutscene 0.3.0's curve |
| ------------------ | --------------------------------------------- | ----------------------------- | ---------------------- |
| pull ×0.79 at 5.53 | ease-out, 2799 ms (1.1%)                      | AE easy ease, 2487 ms (5.58%) | 11.33% (2487 ms)       |
| pull ×0.49 at 9.41 | AE easy ease on linear scale, 2276 ms (1.34%) | ease-out, 2083 ms (4.45%)     | 4.47% (2969 ms)        |
| pan 30% at 36.46   | spring ζ=0.8, ω 9.5/s, 394 ms (1.1%)          | ease, 504 ms (1.16%)          | 2.32% (638 ms)         |

Autofit left out 5 moves with a cut too close and 4 whose best fit was above 3% (the tracker, not a curve).

### Shot list

| Time (s)    | Framing     | What happens                                                                                                                                                 | Out             |
| ----------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------- |
| 0.00–5.47   | title       | bokeh particles; 'Introducing Brain for Perplexity Computer'; a 2.8 s pull                                                                                   | dissolve 4.2 s  |
| 5.47–15.73  | graph       | a node graph ('Product Marketing' …) pulls back; dots scatter; 'Brain builds a context graph from your sessions, sources, and connections.'                  | hard cuts       |
| 15.73–24.57 | memory      | a dot cloud with a pointer; a 'Messaging' doc; 'New tasks start with full context from Brain.'                                                               | short dissolves |
| 24.57–42.80 | task        | 'Pick up the launch plan and get it ready for…' typed; 'Drafting launch plan PDF'; 'Launch plan is done and ready for review'; the plan's text scrolls       | short dissolves |
| 42.80–58.97 | traceable   | 'Every entry is readable, searchable, and traceable.'; 'Workstreams / Entities: Acme Corp' with a 4 s push; a graph with 'Repeated tasks are more efficient' | short dissolves |
| 58.97–66.43 | cards, logo | 'Available in Research Preview'; the logo                                                                                                                    | end             |

### By eye

- **Zoom:** UI shown at reading size, centred on cream; graphs wide
- **Cards:** 7: 'Introducing Brain for Perplexity Computer', 'Brain builds a context graph …', 'New tasks start with full context from Brain.', 'Every entry is readable, searchable, and traceable.', 'Repeated tasks are more efficient', 'Available in Research Preview'; logo
- **Cursor:** a pointer in the dot cloud
- **Frame:** cream; dark only for the opening particles
- **Aspect:** 16:9, 1280×720, 30 fps
- **Sound:** an audio track with rhythmic onsets (not listened to)

## 2. Classify

Slow explainer-style launch film for an invisible feature (memory). Conventions: abstract particle and graph visuals, sentence cards, sparse UI, 'Available in Research Preview'.

## 3. Diagnose

- Particles resolve into a node graph and a dot cloud. → Diagrammatic metaphor for an invisible feature: memory is given a shape (n=2 with Linear releases).
- Cards are full sentences of 6–12 words, each held about 0.33 s per word. → Reading-time holds: the hold scales with word count, which sets the film's slow pace.
- Median shot 3.4 s; a 4.2 s opening dissolve; 66 s. → Pacing for explanation, not momentum: the film behaves like a narrated slide deck without the narration.
- Slow pulls of 2.3–2.8 s fit ease-out and easy ease cleanly. → Long settles match the calm register; the camera never hurries.

## 4. Prescribe

- _new_: Hold a card for its reading time: about 0.3 s per word plus 0.5 s, not a fixed hold. (cards (not built))
- _adjusts_: Slow reveal pulls of 2–3 s (Linear releases, Framer, Brain). (camera pull curve (Part 3))

## 5. Critique

- **I like:** The dot cloud that resolves into a graph gives 'memory' a picture the UI alone could not.
- **I wish:** Full-sentence cards and 3.4 s shots make 66 s read as a slide deck; half the cards could be cut.
- **I wonder:** Could cutscene's card timing default to word count × 0.3 s, clamped to 1.2–3.5 s?

## Not for us

- Particle and graph animation.
