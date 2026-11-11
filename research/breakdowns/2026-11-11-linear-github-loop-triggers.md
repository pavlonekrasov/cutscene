# Linear: GitHub loop triggers

- **Video:** https://webassets.linear.app/files/ornj730p/production/9e1278d821662e7bea1b814dc3cbb89f28671943.mp4
- **Found on:** https://linear.app/changelog
- **Maker:** Linear (motion-designed, not a screen recording). **Kind:** showreel. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-linear-github-loop-triggers.json](../references/2026-11-11-linear-github-loop-triggers.json)

**Why it's here.** Restraint: the UI is rebuilt at about 2.5× its size on a near-black canvas and the camera never moves; every motion is the product's own (typing, posting, scrolling), and each new line gets 1.6–2.0 s to be read before anything else moves.

## 1. Describe

### Measured

29.67 s, 1920×1080, 60 fps. Camera still 93% of the time. 15 shots, median 2.22 s. 14 cuts (4 dissolves); 6 moves.

Moves:

- 12.15 s pan ×0.997 (pan 0, 43.6%), 2–98% 440 ms, 10–90% 280 ms, peak 0.5
- 14.50 s pan ×0.945 (pan 1.3, 53%), 2–98% 440 ms, 10–90% 290 ms, peak 0.49
- 17.11 s pan ×1.002 (pan 0, 41.9%), 2–98% 320 ms, 10–90% 220 ms, peak 0.71, overshoot 5%
- (3 more under 150 ms, ×1.1 or 5% of the frame: blur, UI changes or tracker noise)

**What the instrument can read.** Cut candidates over-count: a message appearing or the composer growing reads as a cut. The scrolls bring in new content and the title exits fade and blur, so neither fits a camera model.

### Shot list

| Time (s)    | Length (s) | Framing                            | What happens                                                                                                                                                                                                                                   | Out                    |
| ----------- | ---------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| 0.00–0.32   | 0.32       | fade in from black                 | —                                                                                                                                                                                                                                              | fade                   |
| 0.32–7.78   | 7.46       | the Slack composer, centred, ~2.5× | a three-line prompt typed; the box grows a line at a time and stays centred (the candidate at 3.43 is that growth, not an edit)                                                                                                                | 5-frame crossfade      |
| 7.78–19.87  | 12.09      | the thread, ~2.5×                  | the post lands (7.78); Linear's reply (10.12); scroll 44% of the height in 440 ms, peak 0.50 (12.15); a merge message (12.93); scroll 53%, 440 ms (14.50); another (15.15); scroll 42%, 320 ms, 5% overshoot (17.11); a third fades in (17.47) | fade to black, ~0.65 s |
| 20.52–23.45 | 2.93       | card                               | 'GitHub loop triggers'; leaves by scaling to ×0.95 and fading, 400 ms, speed peak 0.92                                                                                                                                                         | hard                   |
| 23.45–25.45 | 2.00       | card                               | 'Now available'; leaves the same way, 450 ms                                                                                                                                                                                                   | hard                   |
| 25.45–29.67 | 4.22       | logo card                          | held 4.2 s                                                                                                                                                                                                                                     | end                    |

### By eye

- **Zoom:** one UI fragment at a time, about 2.5× native size; the composer spans ~85% of the frame width
- **Cards:** 3: 'GitHub loop triggers' 2.0 s, 'Now available' 1.4 s, the Linear logo 4.2 s (14% of the runtime); white type centred on near-black
- **Cursor:** none; typing shows by its caret
- **Frame:** full-bleed near-black canvas, no window chrome
- **Aspect:** 16:9, 1920×1080, 60 fps
- **Sound:** an audio track with sparse onsets (11 in 30 s); 2 of 14 cuts within 50 ms of its beat grid (chance 16%); the logo cut lands 34 ms from an onset

### Frame-level beats

- Each new message lands, then the thread scrolls 1.6–2.0 s later (10.12 → 12.15, 12.93 → 14.50, 15.15 → 17.11): the new line is read before the frame moves.
- Scrolls are symmetric (speed peak 0.49–0.50); card exits accelerate away (peak 0.70–0.92). Arrival and departure get different curves.
- Product story 0–19.9 s (67%), black gap 0.65 s, cards 20.5–29.7 s (31%).

Read again from 10-frame strips around 7 cuts, 1 dissolve and 2 moves; 1 f = 16.7 ms at 60 fps.

- **Typing is a character every 1–2 frames.** In the 3.43 s strip the second line gains 3 characters in 10 frames ('Check the lin' → 'Check the linked'): about 20–30 characters a second, faster than a hand, and the composer's height changes between two frames with no animation.
- **A reply fades in from 30% to full over about 8 frames** (10.12 s): avatar, name and text together, in the place it will stay. It doesn't slide.
- **The scroll and the next message overlap by half.** In the 12.15 s move (0.94 s) the thread travels up in the first 5 columns; the new message's card is already fading in beneath it from column 6, before the scroll has stopped. Old content leaves the top at full brightness: nothing dims to make room.
- **The scroll puts the new message in the lower half.** After each scroll the newest card's top edge is at about 50% of the height, with the previous message above it for context: the frame always holds one read message and one new one.
- **Cards fade, they never cut on.** 'GitHub loop triggers' loses about 60% of its brightness across the 10 frames before 22.55 s; 'Now available' is at full brightness for 10 frames at 23.45 s and dims over the 10 before 24.88 s; the logo comes up from 20% to full in 5 frames (25.45 s), mark and wordmark together.

**Eye at the cuts.** Composer → thread: the prompt's first line is at about 12% × 40% in both, 0–5%, across a 5-frame crossfade. Thread → card: from the left-aligned message (about 15%) to centred type (about 45%): 30%, across a 0.65 s fade to black. Card → card → logo: all centred, 0%. 3 of 7 measured cuts are true edits (the three cards); the rest are messages arriving.

## 2. Classify

Motion-designed changelog film with the UI rebuilt as a mock-up. Conventions: one fragment at a time at reading size, a locked frame, claim and logo cards on near-black.

## 3. Diagnose

- The UI is rebuilt at about ×2.5 and the frame never moves (still 93%). → Legibility by scale, not zoom: the fragment is the frame, so text is readable with no camera.
- Each new message gets 1.6–2.0 s before the thread scrolls. → Read time before motion: nothing moves while something is still being read.
- Scrolls peak at 0.50; card exits peak at 0.70–0.92. → Arrival and departure get different curves: symmetric for moves on screen, ease-in for exits.

## 4. Prescribe

- _new_: Lock the camera while the app's own content moves (typing, posting, scrolling): still 93% of the time. (camera: no push while a scene's content changes in place)
- _new_: Give new content 1.6–2.0 s to be read before the next motion. (hold)
- _new_: End on a claim card (1.4–2.0 s) and a logo card (4.2 s); cards leave by scaling to ×0.95 and fading, accelerating out over ~0.4 s. (CARD.close, CARD.leave)

## 5. Critique

- **I like:** Every motion is information arriving, so the eye never has to choose between the camera and the content.
- **I wish:** The logo card holds 4.2 s, 14% of the runtime, longer than any product beat.
- **I wonder:** Could cutscene hold a scene's camera until new text has had its reading time, then move?

## Not for us

- Rebuilding the UI as a motion-design mock-up. cutscene records the real app, and a faked UI is exactly what it exists to avoid.
