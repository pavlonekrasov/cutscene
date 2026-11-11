# Perplexity: hybrid agentic inference

- **Video:** https://video.twimg.com/amplify_video/2061861227383685120/vid/avc1/1280x720/MDVLXoE2luDeCMjK.mp4?tag=14
- **Found on:** https://x.com/perplexity_ai/status/2061861293569765847
- **Maker:** Perplexity. **Kind:** launch film. **Posted:** 2026-06-02. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-perplexity-hybrid.json](../references/2026-11-11-perplexity-hybrid.json)

**Why it's here.** A 60 s launch whose camera moves are the cleanest hand-keyed in-out curves in the set. A long typed prompt with bold keywords ('Re-underwrite', 'local LBO model', 'OCR'd') is followed by a 9.5 s transcript shot the camera pushes and pulls through. A burst of eight report pages at 0.3–1.4 s each follows, and a desktop notification says the deliverables are complete.

## 1. Describe

### Measured

59.77 s, 1280×720, 60 fps. Camera still 70% of the time. 30 shots, median 1.06 s. 29 cuts (17 dissolves); 29 moves.

Moves:

- 3.47 s pull ×0.881 (pan -4.6, 12.1%), 2–98% 310 ms, 10–90% 160 ms, peak 0.36
- 11.17 s pan ×1.009 (pan 0, 14%), 2–98% 800 ms, 10–90% 570 ms, peak 1, overshoot 17%
- 17.27 s push ×1.707 (pan -1.9, 21.4%), 2–98% 510 ms, 10–90% 290 ms, peak 0.48, overshoot 1%
- 20.82 s pull ×0.537 (pan -26.9, -10.2%), 2–98% 960 ms, 10–90% 510 ms, peak 0.48
- 25.33 s push ×1.978 (pan -0.1, -0.4%), 2–98% 1720 ms, 10–90% 890 ms, peak 0.52
- 28.85 s pan ×1.008 (pan 0, 5.2%), 2–98% 250 ms, 10–90% 60 ms, peak 0.13
- 31.09 s push ×1.224 (pan 5.2, -14.5%), 2–98% 1180 ms, 10–90% 550 ms, peak 0.58
- 36.51 s pull ×0.895 (pan 1.8, -0.6%), 2–98% 500 ms, 10–90% 470 ms, peak 0.07
- 49.71 s push ×1.472 (pan 15.4, 15.1%), 2–98% 1400 ms, 10–90% 260 ms, peak 0.09
- 53.30 s pan ×1.013 (pan 0, -12.7%), 2–98% 420 ms, 10–90% 290 ms, peak 0.99, overshoot 25%
- 54.49 s pull ×0.726 (pan 10.7, -0.3%), 2–98% 200 ms, 10–90% 160 ms, peak 0.14, overshoot 4%
- 54.91 s pull ×0.831 (pan 2.9, 0.1%), 2–98% 2310 ms, 10–90% 1380 ms, peak 0.01
- (17 more under 150 ms, ×1.1 or 5% of the frame: blur, UI changes or tracker noise)

**What the instrument can read.** 60 fps. Six keyed moves fit in-out quart or quint on linear scale, almost exactly: push ×1.76 in 0.88 s (rms 0.42%), pull ×0.54 in 1.42 s (0.56%), push ×1.97 in 2.34 s (0.57%), push ×1.22 in 1.69 s (0.34%), push ×1.53 in 0.79 s (1.34%). cutscene's curve fits each at 1.1–1.6% with shorter durations; one pan fits cutscene's own curve best (1.46 s, 4.1%).

### Curve fits

RMS error as % of the move's travel; the same fit recovers cutscene 0.3.0's own push at 0.16%.

| Move                | Best fit                                      | Next other curve                       | cutscene 0.3.0's curve |
| ------------------- | --------------------------------------------- | -------------------------------------- | ---------------------- |
| push ×1.76 at 17.27 | in-out-quart on linear scale, 884 ms (0.42%)  | spring ζ=0.8, ω 8.4/s, 444 ms (2.98%)  | 1.12% (740 ms)         |
| pull ×0.54 at 20.82 | in-out-quart on linear scale, 1418 ms (0.56%) | ease, 910 ms (2.39%)                   | 1.42% (1153 ms)        |
| push ×1.97 at 25.33 | in-out-quart on linear scale, 2344 ms (0.57%) | spring ζ=0.8, ω 3.1/s, 1214 ms (3.88%) | 1.64% (1963 ms)        |
| push ×1.22 at 31.09 | in-out-quint on linear scale, 1693 ms (0.34%) | spring ζ=0.8, ω 5.1/s, 734 ms (3.38%)  | 1.56% (1188 ms)        |
| push ×1.53 at 49.71 | in-out-quart, 785 ms (1.34%)                  | ease, 519 ms (2.37%)                   | 1.63% (638 ms)         |

Autofit left out 3 moves with a cut too close and 2 whose best fit was above 3% (the tracker, not a curve).

### Shot list

| Time (s)    | Framing    | What happens                                                                                                | Out                        |
| ----------- | ---------- | ----------------------------------------------------------------------------------------------------------- | -------------------------- |
| 0.00–3.30   | title      | 'Introducing hybrid agentic' builds, then 'inference on Computer'; a colour shimmer passes over it          | hard cuts, short dissolves |
| 3.30–12.00  | prompt     | 'I'm a PE associate on Project Falcon. Re-underwrite at a 1…' typed with bold keywords; the attachment menu | hard cuts                  |
| 12.00–15.05 | card       | 'Sensitive data stays local. Frontier power stays available.'                                               | short dissolve             |
| 15.05–24.50 | transcript | the agent's working text; the camera pushes ×1.76 to a line, then pulls ×0.54                               | hard cut                   |
| 24.50–37.30 | desktop    | the app on a Windows desktop; a ×1.97 push over 2.3 s; a PII detection table                                | hard cuts, dissolves       |
| 37.30–44.50 | burst      | eight report pages and tables, 0.3–1.4 s each                                                               | cuts and short dissolves   |
| 44.50–48.50 | cards      | 'Maximum token efficiency'; 'with local and server orchestration.'                                          | hard cut                   |
| 48.50–53.75 | payoff     | the desktop app; a notification: Project Falcon deliverables are complete; a push ×1.53                     | dissolve 1.15 s            |
| 53.75–59.77 | logo       | the Perplexity logo                                                                                         | end                        |

### By eye

- **Zoom:** the prompt at ×2; the transcript pushed ×1.8–2 to the active line; the report pages wide
- **Cards:** 'Introducing hybrid agentic inference on Computer', 'Sensitive data stays local. Frontier power stays available.', 'Maximum token efficiency', 'with local and server orchestration.'; logo
- **Cursor:** none
- **Frame:** cream for cards and prompt; a Windows desktop with a clouds wallpaper for the app
- **Aspect:** 16:9, 1280×720, 60 fps
- **Sound:** an audio track with rhythmic onsets (not listened to)

## 2. Classify

Hand-edited launch film for AI infrastructure: prompt → transcript → document → notification. Conventions: serif cards, a long typed prompt, keyed camera moves through text, a burst montage, a notification payoff.

## 3. Diagnose

- Keyed moves fit in-out quart/quint on linear scale at 0.3–0.6% rms, 0.8–2.3 s. → The hand-edited signature: symmetric ease-in-out between two keyframes, slower than cutscene 0.3.0 for the same distance.
- A burst of eight report pages at 0.3–1.4 s follows a 9.5 s transcript hold. → Contrast in rhythm: the burst says 'a lot was made' without asking the viewer to read it, and the change of pace marks the work finishing.
- The prompt bolds its key terms. → Typographic emphasis makes a 40-word prompt skimmable in the time it is on screen.
- The payoff is a desktop notification. → Payoff by outcome, as in Personal Computer.

## 4. Prescribe

- _confirms_: Hand-edited moves: in-out quart/quint on linear scale, 0.8–2.3 s, near-perfect fits. (camera curve and pace (Part 3))
- _new_: After a long hold on work in progress, cut a burst of 0.3–1.4 s shots over the result. (burst cut (Part 2))
- _confirms_: End on the app's own notification. (act.focus on the toast (exists))

## 5. Critique

- **I like:** The burst of report pages after the 9.5 s transcript changes pace exactly when the work is done.
- **I wish:** The 9.5 s transcript shot is small text throughout; the push and pull guide the eye, but the words stay unreadable.
- **I wonder:** Could a reel turn a long scroll over a result into a burst montage by sampling shots at 0.4 s?

## Not for us

- A Windows desktop and agent run time compressed by editing.
