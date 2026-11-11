# Linear: the agent

- **Video:** https://video.twimg.com/amplify_video/2036825218757636096/vid/avc1/1440x720/Ijz_u1rHDb1bI62j.mp4?tag=21
- **Found on:** https://x.com/linear/status/2036825558084878467
- **Maker:** Linear. **Kind:** launch film. **Posted:** 2026-03-25. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-linear-agent.json](../references/2026-11-11-linear-agent.json)

**Why it's here.** A 55 s film of the real Linear app laid on a tilted plane in a black void, a vignette lighting only where the agent works. Queries are typed into 'Ask Linear', answers stream in as issue lists, a refactor plan is written into a doc with a table and a diagram, and it closes on 'Linear. At your command.'

## 1. Describe

### Measured

54.85 s, 1440×720, 60 fps. Camera still 61% of the time. 25 shots, median 1.9 s. 24 cuts (4 dissolves); 19 moves.

Moves:

- 0.06 s pan ×1.01 (pan 5.2, 0.3%), 2–98% 1860 ms, 10–90% 1540 ms, peak 0.6
- 4.96 s push ×1.293 (pan 8.1, -0.7%), 2–98% 1020 ms, 10–90% 300 ms, peak 0.09
- 24.02 s pan ×0.991 (pan 4.3, 7.1%), 2–98% 1200 ms, 10–90% 1030 ms, peak 0.84, overshoot 18%
- 26.35 s pull ×0.895 (pan 6.6, 7.5%), 2–98% 1800 ms, 10–90% 1400 ms, peak 0.87, overshoot 2%
- 28.25 s pull ×0.909 (pan 5.3, 5.8%), 2–98% 1410 ms, 10–90% 1160 ms, peak 0.8
- 35.25 s pan ×0.957 (pan 0.1, 11.5%), 2–98% 710 ms, 10–90% 380 ms, peak 0.86
- 41.24 s pan ×0.971 (pan -13.3, 41%), 2–98% 700 ms, 10–90% 430 ms, peak 0.55
- 47.43 s pan ×0.947 (pan 16.2, 0%), 2–98% 1090 ms, 10–90% 630 ms, peak 0.08
- (11 more under 150 ms, ×1.1 or 5% of the frame: blur, UI changes or tracker noise)

**What the instrument can read.** 2:1 (1440×720), 60 fps. Three moves fit cleanly. A 1.9 s pan on ease-out (rms 2.4%; cutscene 10.9%). A 0.9 s pan on in-out quart, where cutscene's own curve fits equally (3.8%). A 1.85 s text drift on out-expo (2.0%).

### Curve fits

RMS error as % of the move's travel; the same fit recovers cutscene 0.3.0's own push at 0.16%.

| Move             | Best fit                  | Next other curve                   | cutscene 0.3.0's curve |
| ---------------- | ------------------------- | ---------------------------------- | ---------------------- |
| pan 9% at 24.02  | ease-out, 1906 ms (2.38%) | AE easy ease, 1796 ms (3.98%)      | 10.9% (1850 ms)        |
| pan 14% at 47.43 | out-expo, 1850 ms (1.96%) | spring ζ=1, ω 5.9/s, 984 ms (3.5%) | 10.33% (620 ms)        |

Autofit left out 2 moves with a cut too close and 2 whose best fit was above 3% (the tracker, not a curve).

### Shot list

| Time (s)    | Framing      | What happens                                                                                                     | Out             |
| ----------- | ------------ | ---------------------------------------------------------------------------------------------------------------- | --------------- |
| 0.00–4.87   | app, wide    | the Linear app tilted, a push toward 'Project spec'; a fade through an empty plane                               | hard cuts       |
| 4.87–11.25  | query        | 'Find issues …' typed in the Ask Linear bar, on the plane                                                        | hard cut        |
| 11.25–20.65 | answer       | 'I found 13 bug issues …'; an issue list streams in with status icons                                            | hard cuts       |
| 20.65–23.97 | plan prompt  | 'Make a plan to refactor data loading to be optimistic' sent; 'Project spec'; 'Optimistic loading'               | hard cuts       |
| 23.97–35.07 | doc          | 'Optimistic loading refactor' being written; an 'At a glance' table; a flow diagram                              | hard cuts       |
| 35.07–45.10 | back to chat | the doc beside related issues; 'I created the PRD around the issues you surfaced.'; 'What can I help with next?' | short dissolves |
| 45.10–54.85 | cards, logo  | 'Linear' glowing; 'Linear. At your command.' drifting; the mark                                                  | end             |

### By eye

- **Zoom:** the prompt bar and answers at about ×2 on the tilted plane; the whole app at ×1 for context
- **Cards:** 'Linear' (glow), 'Linear. At your command.'; logo
- **Cursor:** none; the typing caret
- **Frame:** black void; the UI on a tilted plane with a vignette to black at the edges
- **Aspect:** 2:1, 1440×720, 60 fps
- **Sound:** an audio track with rhythmic onsets (not listened to)

## 2. Classify

Hand-edited product film with a synthetic 3D camera over real UI. Conventions: perspective UI, a spotlight vignette, typed prompts, streamed answers, a tagline card.

## 3. Diagnose

- The real UI sits on a tilted plane; the camera drifts in 0.9–1.9 s moves. → Perspective gives flat UI depth; slow out-family drifts read as a camera settling.
- A vignette falls to black around the active region. → Focal point by luminance: light only what matters instead of cropping to it.
- The conversation's turns set the cut order: prompt, answer, artefact. → The dialogue is the edit: each cut answers the previous shot's question.
- Grey text on dark at an angle, 55 s long, 1.9 s median shots. → Legibility: contrast and angle push most body text below reading size at feed scale.

## 4. Prescribe

- _new_: A spotlight vignette that follows the active region, instead of a crop. (renderer vignette (not built))
- _confirms_: Lay the frame on a tilted plane (Linear ×3). (renderer tilt (not built))
- _adjusts_: Drift moves at 1.8–1.9 s on out curves. (camera pace (Part 3))
- _confirms_: cutscene 0.3.0's in-out curve matches a hand-made 0.9 s pan here (3.8% each). (camera curve (exists))

## 5. Critique

- **I like:** The vignette sends the eye to where the agent is working without changing the framing.
- **I wish:** Low contrast and the tilt put most of the answer text below reading size.
- **I wonder:** Could a reel open with the first frame tilted a few degrees and let it settle flat as the scene starts?

## Not for us

- A 3D compositor's camera on a rendered plane.
