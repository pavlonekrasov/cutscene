# Render: a Hacker News agent (tutorial)

- **Video:** https://video.twimg.com/ext_tw_video/1879954446588809216/pu/vid/avc1/1280x720/h-q6JKJNnf9wlz51.mp4?tag=12
- **Found on:** https://screen.studio (the showcase wall on the home page)
- **Maker:** Render, made with Screen Studio. **Kind:** tutorial: camera numbers only. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-render-hn-agent-tutorial.json](../references/2026-11-11-render-hn-agent-tutorial.json)

**Why it's here.** A 48 s walk-through that ends on its payoff in another app (the agent's email), with pushes on each form field.

## 1. Describe

### Measured

48 s, 1280×720, 30 fps. Camera still 80% of the time. 10 shots, median 3.37 s. 9 cuts (0 dissolves); 16 moves.

Moves:

- 0.04 s push ×1.888 (pan -8.5, -12.2%), 2–98% 720 ms, 10–90% 400 ms, peak 0.12
- 5.02 s pull ×0.561 (pan 7.4, 10.6%), 2–98% 430 ms, 10–90% 330 ms, peak 0.43, overshoot 3%
- 6.74 s push ×1.471 (pan -0.1, 9.6%), 2–98% 650 ms, 10–90% 380 ms, peak 0.1
- 16.88 s pull ×0.509 (pan 0.1, -31.5%), 2–98% 710 ms, 10–90% 470 ms, peak 0.17, overshoot 2%
- 17.97 s push ×1.614 (pan 0, 5.2%), 2–98% 700 ms, 10–90% 390 ms, peak 0.09
- 20.81 s pan ×1.002 (pan -0.5, 30.4%), 2–98% 1450 ms, 10–90% 1080 ms, peak 0.46
- 26.95 s pan ×1.001 (pan 0.1, 35%), 2–98% 710 ms, 10–90% 590 ms, peak 0.16, overshoot 2%
- 32.88 s pan ×0.999 (pan -0.1, 19.2%), 2–98% 780 ms, 10–90% 450 ms, peak 0.15
- 35.50 s pan ×0.998 (pan 0, -25.6%), 2–98% 370 ms, 10–90% 250 ms, peak 0.18
- 37.41 s pan ×1 (pan 1.4, -9%), 2–98% 800 ms, 10–90% 460 ms, peak 0.15
- 41.33 s pull ×0.69 (pan -0.3, -17.4%), 2–98% 230 ms, 10–90% 180 ms, peak 0.59, overshoot 13%
- 41.95 s push ×1.685 (pan -0.3, -17%), 2–98% 730 ms, 10–90% 400 ms, peak 0.07
- 44.91 s pull ×0.759 (pan 15.7, 21.9%), 2–98% 810 ms, 10–90% 480 ms, peak 0.15
- (3 more under 150 ms, ×1.1 or 5% of the frame: blur, UI changes or tracker noise)

**What the instrument can read.** Good on the moves; page changes read as cuts.

### Curve fits

RMS error as % of the move's travel; the same fit recovers cutscene 0.3.0's own push at 0.16%.

| Move                | Best fit                 | Next other curve                               | cutscene 0.3.0's curve |
| ------------------- | ------------------------ | ---------------------------------------------- | ---------------------- |
| push ×1.77 at 17.97 | out-expo 1224 ms (1.01%) | out-quint (1.45%); spring ζ 1, ω 8.9/s (1.87%) | 4.29%                  |
| push ×1.75 at 41.95 | out-expo 1299 ms (2.25%) | spring ζ 1, ω 9.1/s (2.62%)                    | 5.16%                  |

### Shot list

| Time (s)   | Length (s) | Framing                  | What happens                                                                                            | Out |
| ---------- | ---------- | ------------------------ | ------------------------------------------------------------------------------------------------------- | --- |
| 0.00–48.00 | 48.00      | one take, then the inbox | push ×1.89 (0.04), add an interest, add a question, preview, then the agent's email in the inbox (44.6) | —   |

### By eye

- **Zoom:** working ×1.5–1.9
- **Cards:** none
- **Cursor:** enlarged pointer
- **Frame:** full macOS screen with the browser's chrome
- **Aspect:** 16:9, 1280×720, 30 fps
- **Sound:** none

### Frame-level beats

- The payoff (the email arriving) is the last shot, after a cut to another app.

Read from 10-frame strips around 8 cuts and 2 moves; 1 f = 33 ms at 30 fps. A form on a cream page with an orange header bar; body text is not readable in the strips.

- **The push crops the browser away in 2 columns.** From 0.04 s the window on its violet backdrop becomes the page alone by column 3 (about 0.3 s); the orange bar stays along the top edge as the only chrome. The pointer moves to the first input (about 20% × 25%) in the last 2 columns, and the input takes a blue focus ring.
- **Orange marks every primary action.** The header and the two 'Add' buttons at the right of each form row are the same orange; the rest is black text on cream. After the push the buttons sit at about 90% across.
- **The pull is used to show a row arriving.** At 5.02 s the frame pulls back to the whole window (done by column 6) as the new interest is added to the list: the row is about 2% of the frame at that size, so the pull shows that the page changed, not what changed.
- **The frequency menu opens under the pointer** (14.83 s): a 4-row dropdown at about 70% × 35%, with the blue selected field beside it; it opens between two frames, 4 frames after the pointer stops.
- **The preview is shown by scrolling to it, then pushing.** At 17.93 s the frame goes from the window to the page (columns 5–7); at 35.47 s the Preview block (a bordered box of numbered results) fills the frame with the pointer at its top; the text is about 5 px in the strip.
- **The app switch is a white flash.** At 41.63 s the form holds 5 frames, the frame is blank white for 1, then the inbox loads over the next 4: a browser tab change left as recorded.
- **The email opens in place** (44.63 s): the inbox list is replaced by the message between two frames; its subject line is at about 15% × 20%, where the list's first row was.

**Eye at the cuts.** Form → inbox: from the question row at about 40% × 40% to the inbox's unread row at about 30% × 35%: 10%, across one white frame. Inbox row → open email: within 10%. Inside the form the pointer leads every change. 2 of 8 measured cuts are true changes of place; 6 are form and page changes.

## 2. Classify

Tutorial walkthrough that ends on its payoff in another app.

## 3. Diagnose

- The last shot is the agent's email in the inbox. → End on the outcome where the user would see it.

## 4. Prescribe

- _confirms_: End on the result. (reel structure)

## 5. Critique

- **I like:** Ending in the inbox proves the agent ran.
- **I wish:** No establishing wide; it starts zoomed.
- **I wonder:** Could a multi-scene reel end in a second app's scene?

## Not for us

- Starting zoomed with no wide; the full macOS screen.
