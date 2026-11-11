# Clerk: Logs

- **Video:** https://video.twimg.com/amplify_video/2052081488536240128/vid/avc1/1280x720/SQLcbt6JpxyxKg4t.mp4?tag=27
- **Found on:** https://x.com/clerk/status/2052081582450897315
- **Maker:** Clerk. **Kind:** launch film. **Posted:** 2026-05-06. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-clerk-logs.json](../references/2026-11-11-clerk-logs.json)

**Why it's here.** A slow camera glides across a tilted Logs table with a shallow focal plane, then a highlighted row ('payment_intent.succeeded') becomes the subject; three cards and a logo close it. 24.8 s.

## 1. Describe

### Measured

24.76 s, 1280×720, 59.9 fps. Camera still 43% of the time. 10 shots, median 1.62 s. 9 cuts (2 dissolves); 10 moves.

Moves:

- 1.10 s pan ×1.024 (pan 5.2, -0.1%), 2–98% 1270 ms, 10–90% 1130 ms, peak 0.91, overshoot 5%
- 5.25 s pan ×0.948 (pan 0.9, 24%), 2–98% 3940 ms, 10–90% 3270 ms, peak 0.35
- 9.36 s pan ×0.988 (pan 0.4, 5.1%), 2–98% 910 ms, 10–90% 770 ms, peak 0.8, overshoot 2%
- (7 more under 150 ms, ×1.1 or 5% of the frame: blur, UI changes or tracker noise)

**What the instrument can read.** The camera is a continuous 3D drift (still 43%): a pan of 24% over 3.9 s at 5.25 s is its longest move.

Autofit left out 1 moves with a cut too close.

### Shot list

| Time (s)    | Framing          | What happens                                                                       | Out       |
| ----------- | ---------------- | ---------------------------------------------------------------------------------- | --------- |
| 0.00–4.42   | macro nav        | 'Billing', 'Logs', 'Configure' at huge scale; the 'Logs' underline slides in       | dissolve  |
| 4.42–9.33   | tilted UI, drift | the Logs page with event filters, in perspective                                   | hard cut  |
| 9.33–12.91  | tilted table     | rows scroll past; one row highlights                                               | hard cuts |
| 12.91–20.64 | highlight, cards | 'payment_intent.succeeded' in lavender; 'Audit every action'; 'Now in Clerk: Logs' | hard cut  |
| 20.64–24.76 | logo             | Clerk on dark                                                                      | end       |

### By eye

- **Zoom:** the nav tabs fill the frame at the start (×5); the table at ×1.5–2 under a tilt
- **Cards:** 'Audit every action', 'Now in Clerk: Logs'; logo; ~1.5–4 s each
- **Cursor:** none
- **Frame:** full-bleed dark surface, focus falling off at the edges
- **Aspect:** 16:9, 60 fps
- **Sound:** an audio track with rhythmic onsets (not listened to)

### Frame-level beats

- The tab underline moves to 'Logs' in the first shot: the film starts on the navigation that leads to the feature.

## 2. Classify

Motion-designed reveal on a 3D-tilted surface of real UI. Conventions: depth of field, continuous drift, a highlight row, short end cards.

## 3. Diagnose

- Depth of field leaves one row sharp. → Selective focus as hierarchy, as in Dia's teaser.
- The camera never stops (still 43%). → Continuous drift suits a reveal with no action to read; it would fight a flow with clicks.

## 4. Prescribe

- _new_: Open on the navigation that leads to the feature (a tab underline moving to it). (reel structure)
- _confirms_: End on a claim card and a logo. (CARD)

## 5. Critique

- **I like:** The first shot answers 'where is this?' before anything else: a tab bar.
- **I wish:** No action happens; it shows a table exists, not what a developer does with it.
- **I wonder:** Does a slow drift across a static page (Ken Burns on UI) earn a place for cutscene's quiet beats?

## Not for us

- Perspective tilt and depth of field over real UI: legibility drops at the edges.
