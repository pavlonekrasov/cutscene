# Framer is now in Cursor

- **Video:** https://video.twimg.com/amplify_video/2115464907366006784/vid/avc1/1280x720/Z3PGoYZH-YlS8TvA.mp4?tag=16
- **Found on:** https://x.com/framer/status/2115464952857395698
- **Maker:** Framer. **Kind:** launch film. **Posted:** 2026-10-28. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-framer-in-cursor.json](../references/2026-11-11-framer-in-cursor.json)

**Why it's here.** A 16 s partnership launch that starts in live action, overhead hands typing on a laptop, and dissolves into the prompt being typed on screen. A slow pull then frames the prompt's panel, and the result is a CMS table updating row by row. 8 shots, still only 39%.

## 1. Describe

### Measured

15.96 s, 1280×720, 24 fps. Camera still 39% of the time. 8 shots, median 2.08 s. 7 cuts (6 dissolves); 6 moves.

Moves:

- 2.84 s pull ×0.832 (pan 0, 0%), 2–98% 440 ms, 10–90% 370 ms, peak 0.17, overshoot 8%
- 3.45 s pull ×0.611 (pan 0.1, 0.2%), 2–98% 1760 ms, 10–90% 1470 ms, peak 0.03, overshoot 2%
- 5.77 s pull ×0.092 (pan 1.3, 23.3%), 2–98% 3220 ms, 10–90% 2490 ms, peak 0.02
- 9.98 s pull ×0.392 (pan 0.3, 0.5%), 2–98% 3630 ms, 10–90% 2910 ms, peak 0.02
- (2 more under 150 ms, ×1.1 or 5% of the frame: blur, UI changes or tracker noise)

**What the instrument can read.** 24 fps. The clean fit is the pull from the typed prompt back to its panel: ×0.58 over 2.3 s, ease-out (rms 1.7%; cutscene's in-out 11.8%). The other long moves cross dissolves.

### Curve fits

RMS error as % of the move's travel; the same fit recovers cutscene 0.3.0's own push at 0.16%.

| Move               | Best fit                 | Next other curve              | cutscene 0.3.0's curve |
| ------------------ | ------------------------ | ----------------------------- | ---------------------- |
| pull ×0.58 at 3.45 | ease-out, 2276 ms (1.7%) | AE easy ease, 2145 ms (5.23%) | 11.84% (2145 ms)       |

Autofit left out 3 moves with a cut too close.

### Shot list

| Time (s)    | Length (s) | Framing     | What happens                                                                                         | Out                        |
| ----------- | ---------- | ----------- | ---------------------------------------------------------------------------------------------------- | -------------------------- |
| 0.00–1.83   | 1.83       | live action | overhead: hands typing on a laptop keyboard                                                          | dissolves of 1.5 and 1.0 s |
| 1.83–5.33   | 3.50       | prompt      | 'Update Fr…' typed at ×3; pull back over 2.3 s as it completes: 'Update Framer CMS with the latest…' | dissolve                   |
| 5.33–9.25   | 3.92       | result      | a CMS table, rows highlighting in blue as the agent updates them; the agent panel at right           | dissolve                   |
| 9.25–13.88  | 4.63       | card        | 'Framer is now in Cursor'                                                                            | hard cut                   |
| 13.88–15.96 | 2.08       | lockup      | Cursor × Framer                                                                                      | end                        |

### By eye

- **Zoom:** the prompt at about ×3, then pulled to ×1.7; the result table wide
- **Cards:** 'Framer is now in Cursor'; the Cursor × Framer lockup
- **Cursor:** none; the typing caret only
- **Frame:** black; the app dark
- **Aspect:** 16:9, 1280×720, 24 fps
- **Sound:** an audio track with rhythmic onsets (not listened to)

### Frame-level beats

Read from 10-frame strips around 1 cut, 1 dissolve and 1 move; 1 f = 41.7 ms at 24 fps.

- **The UI is superimposed on the hands before the cut away.** During the dissolve at 1.83 s the composer's 'Auto' model chip and the top bar ('main', 'Cloud') sit over the overhead shot of the keyboard for about 10 frames, drifting left: for 0.4 s the hands are typing 'into' the interface.
- **The pull runs while the prompt types.** From 3.45 s the frame pulls ×0.58 over 2.3 s and the prompt gains about one word per strip column ('Update Framer CMS with' → '… the latest launch from…'). The typing sets the pace of the camera: the move ends when the sentence does.
- **A motion-blurred insert ends the shot.** In the last 2 frames a large blurred word sweeps in from the left over the prompt (the transition to the result), the only blur in the film.
- **Card → lockup on frame 0** (13.88 s): 'Framer is now in Cursor' cuts to the two marks with '×' between them, centred, no build.

**Eye at the cuts.** Card → lockup: 0% (both centred). Hands → prompt: the hands sit at the centre and the prompt's text begins at about 40%, inside 10%, across a 1.5 s dissolve. The film has one true hard cut; it lands on the measured frame.

## 2. Classify

Hybrid launch film (live action into screen) for an integration. Conventions: hands on keys, a typed prompt, one result shot, a card, an 'A × B' lockup.

## 3. Diagnose

- Hands typing dissolve into text arriving in the prompt. → Match on action: the typing carries across the cut, so the on-screen text reads as typed by a person.
- The pull from the prompt runs 2.3 s with an ease-out curve. → Out-family deceleration on a reveal: the frame opens fast and settles, which reads as a camera, not a UI transition.
- Rows highlight one after another in the result. → A batch change shown as a sweep (stagger), so 'many rows updated' is seen, not stated.
- The card holds 4.6 s, over a quarter of the film. → The partnership is the news, so the card gets the longest hold.

## 4. Prescribe

- _adjusts_: A reveal pull can run 2–2.3 s on an out curve. (camera pull curve (Part 3))
- _confirms_: Typing close-up at ×3, then pull to context once the line is complete. (act.type framing (exists))
- _new_: Hand typing over to the screen: a key-cap or keyboard insert that cuts to the text arriving. (act.press overlay (not built))

## 5. Critique

- **I like:** Cutting from hands to the prompt carries the typing across the cut, so the prompt is read as something a person just typed, not text that was already there.
- **I wish:** The result shot is dark and small; the rows changing are hard to read at feed size.
- **I wonder:** Could act.type open on a key-cap overlay that hands off to the on-screen text in one cut?

## Not for us

- Live-action footage of hands.
