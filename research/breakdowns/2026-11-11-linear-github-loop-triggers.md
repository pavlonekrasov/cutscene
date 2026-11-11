# Linear: GitHub loop triggers

- **Video:** https://webassets.linear.app/files/ornj730p/production/9e1278d821662e7bea1b814dc3cbb89f28671943.mp4
- **Found on:** https://linear.app/changelog
- **Maker:** Linear (motion-designed, not a screen recording). **Kind:** showreel. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-linear-github-loop-triggers.json](../references/2026-11-11-linear-github-loop-triggers.json)

**Why it's here.** Restraint: the UI is rebuilt at about 2.5× its size on a near-black canvas and the camera never moves; every motion is the product's own (typing, posting, scrolling), and each new line gets 1.6–2.0 s to be read before anything else moves.

**What the instrument can read.** Cut candidates over-count: a message appearing or the composer growing reads as a cut. The scrolls bring in new content and the title exits fade and blur, so neither fits a camera model.

## Measured

29.67 s, 1920×1080, 60 fps. Camera still 93% of the time. 14 cut candidates; 6 moves.

Moves:

- 12.15 s pan ×0.997 (pan 0, 43.6%), 2–98% 440 ms, 10–90% 280 ms, peak 0.5
- 14.50 s pan ×0.945 (pan 1.3, 53%), 2–98% 440 ms, 10–90% 290 ms, peak 0.49
- 17.11 s pan ×1.002 (pan 0, 41.9%), 2–98% 320 ms, 10–90% 220 ms, peak 0.71, overshoot 5%
- 22.10 s pull ×0.953 (pan 0, 0.1%), 2–98% 400 ms, 10–90% 260 ms, peak 0.92
- 24.40 s pull ×0.945 (pan -0.1, 0.1%), 2–98% 450 ms, 10–90% 250 ms, peak 0.7, overshoot 9%
- (1 more under 150 ms: blur or UI changes, not camera moves)

## Shot list

| Time (s)    | Framing                            | What happens                                                                                                                                                                                                                                   | Out                    |
| ----------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| 0.00–0.32   | fade in from black                 | —                                                                                                                                                                                                                                              | fade                   |
| 0.32–7.78   | the Slack composer, centred, ~2.5× | a three-line prompt typed; the box grows a line at a time and stays centred (the candidate at 3.43 is that growth, not an edit)                                                                                                                | 5-frame crossfade      |
| 7.78–19.87  | the thread, ~2.5×                  | the post lands (7.78); Linear's reply (10.12); scroll 44% of the height in 440 ms, peak 0.50 (12.15); a merge message (12.93); scroll 53%, 440 ms (14.50); another (15.15); scroll 42%, 320 ms, 5% overshoot (17.11); a third fades in (17.47) | fade to black, ~0.65 s |
| 20.52–23.45 | card                               | 'GitHub loop triggers'; leaves by scaling to ×0.95 and fading, 400 ms, speed peak 0.92                                                                                                                                                         | hard                   |
| 23.45–25.45 | card                               | 'Now available'; leaves the same way, 450 ms                                                                                                                                                                                                   | hard                   |
| 25.45–29.67 | logo card                          | held 4.2 s                                                                                                                                                                                                                                     | end                    |

By eye:

- **Zoom:** one UI fragment at a time, about 2.5× native size; the composer spans ~85% of the frame width
- **Cards:** 3: 'GitHub loop triggers' 2.0 s, 'Now available' 1.4 s, the Linear logo 4.2 s (14% of the runtime); white type centred on near-black
- **Cursor:** none; typing shows by its caret
- **Frame:** full-bleed near-black canvas, no window chrome
- **Aspect:** 16:9, 1920×1080, 60 fps
- **Sound:** an audio track with sparse onsets (11 in 30 s); 2 of 14 cuts within 50 ms of its beat grid (chance 16%); the logo cut lands 34 ms from an onset

## Frame-level beats

- Each new message lands, then the thread scrolls 1.6–2.0 s later (10.12 → 12.15, 12.93 → 14.50, 15.15 → 17.11): the new line is read before the frame moves.
- Scrolls are symmetric (speed peak 0.49–0.50); card exits accelerate away (peak 0.70–0.92). Arrival and departure get different curves.
- Product story 0–19.9 s (67%), black gap 0.65 s, cards 20.5–29.7 s (31%).

## Why it works

- One element at a time at reading size: the UI is the frame, so no zoom is needed to make text legible.
- A locked camera keeps the eye on the text; the only motion is information arriving.
- Read time is built in before each move, so nothing moves while something is still being read.

## What it teaches

- _new_: Lock the camera while the app's own content moves (typing, posting, scrolling): still 93% of the time. (camera: no push while a scene's content changes in place)
- _new_: Give new content 1.6–2.0 s to be read before the next motion. (hold)
- _new_: End on a claim card (1.4–2.0 s) and a logo card (4.2 s); cards leave by scaling to ×0.95 and fading, accelerating out over ~0.4 s. (CARD.close, CARD.leave)

## Not for us

- Rebuilding the UI as a motion-design mock-up. cutscene records the real app, and a faked UI is exactly what it exists to avoid.
