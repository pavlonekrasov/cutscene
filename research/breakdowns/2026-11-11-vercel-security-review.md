# Vercel: security review

- **Video:** https://video.twimg.com/amplify_video/2117726065477156864/vid/avc1/1280x720/C4JUnmsPYikpIhK_.mp4?tag=16
- **Found on:** https://x.com/vercel/status/2117726156992753721
- **Maker:** Vercel. **Kind:** launch film. **Posted:** 2026-11-03. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-vercel-security-review.json](../references/2026-11-11-vercel-security-review.json)

**Why it's here.** A 25 s walkthrough with an automatic-zoom camera: it pushes ×1.65 to a vulnerability in the team list, pulls back as its detail page opens, pushes to the code and the 'Fix with Vercel Agent' button, then pulls back to the result. 7 shots, the longest a 9.4 s take where the camera does the editing. No cards, no logo.

## 1. Describe

### Measured

24.65 s, 1280×720, 60 fps. Camera still 81% of the time. 7 shots, median 2.17 s. 6 cuts (4 dissolves); 12 moves.

Moves:

- 0.58 s push ×1.643 (pan -19.3, -7.3%), 2–98% 740 ms, 10–90% 430 ms, peak 0.3, overshoot 1%
- 1.67 s pan ×1 (pan 0, -5.4%), 2–98% 370 ms, 10–90% 220 ms, peak 0.32
- 4.01 s pull ×0.843 (pan 23.7, 3.8%), 2–98% 630 ms, 10–90% 420 ms, peak 0.1
- 7.93 s pan ×1 (pan 0, -11.2%), 2–98% 220 ms, 10–90% 170 ms, peak 0.93, overshoot 15%
- 8.84 s push ×1.062 (pan 5.9, 1.8%), 2–98% 190 ms, 10–90% 130 ms, peak 0.92, overshoot 20%
- 9.09 s push ×1.291 (pan 22.5, 6.8%), 2–98% 600 ms, 10–90% 380 ms, peak 0.05
- 11.09 s pull ×0.802 (pan 13.3, -8.9%), 2–98% 740 ms, 10–90% 430 ms, peak 0.15, overshoot 1%
- 20.64 s pan ×0.925 (pan -45.3, 3.9%), 2–98% 780 ms, 10–90% 460 ms, peak 0.29
- (4 more under 150 ms, ×1.1 or 5% of the frame: blur, UI changes or tracker noise)

**What the instrument can read.** 60 fps. Four clean moves, all critically damped springs. Push ×1.65 (ζ 1, ω 8, 0.73 s, rms 1.3%). Push ×1.42 (ζ 1, ω 8.4, 0.69 s, 1.1%). Pull ×0.8 (ζ 1, ω 8.2, 0.71 s, 0.92%). Pan 45% (CSS ease 0.86 s, 1.0%, with a ζ 1 spring at 1.1%). cutscene 0.3.0 fits them at 2.5–4.3%.

### Curve fits

RMS error as % of the move's travel; the same fit recovers cutscene 0.3.0's own push at 0.16%.

| Move               | Best fit                            | Next other curve                    | cutscene 0.3.0's curve |
| ------------------ | ----------------------------------- | ----------------------------------- | ---------------------- |
| push ×1.65 at 0.58 | spring ζ=1, ω 8/s, 732 ms (1.32%)   | ease, 809 ms (1.53%)                | 2.71% (1024 ms)        |
| push ×1.42 at 9.09 | spring ζ=1, ω 8.4/s, 690 ms (1.06%) | ease, 785 ms (1.44%)                | 4.25% (740 ms)         |
| pull ×0.8 at 11.09 | spring ζ=1, ω 8.2/s, 710 ms (0.92%) | out-quint, 1188 ms (0.99%)          | 3.43% (938 ms)         |
| pan 45% at 20.64   | ease, 858 ms (1.03%)                | spring ζ=1, ω 7.5/s, 776 ms (1.14%) | 2.54% (1055 ms)        |

Autofit left out 2 moves with a cut too close.

### Shot list

| Time (s)    | Length (s) | Framing | What happens                                                                                         | Out                      |
| ----------- | ---------- | ------- | ---------------------------------------------------------------------------------------------------- | ------------------------ |
| 0.00–3.75   | 3.75       | list    | 'Team Vulnerabilities'; push ×1.65 to 'Comment previews execute untrusted HTML'                      | hard cut, short dissolve |
| 3.75–8.85   | 5.10       | detail  | the detail page opens; pull; Summary, Details, the vulnerable code; the suggested fix                | dissolves                |
| 8.85–18.20  | 9.35       | fix     | one take: push ×1.42 to the code and 'Fix with Vercel Agent', pull ×0.8; the agent's comment appears | hard cut                 |
| 18.20–24.65 | 6.45       | result  | the detail page, a pan across to the fix status                                                      | end                      |

### By eye

- **Zoom:** ×1 for the list and page; ×1.4–1.65 on the clicked row, the code and the agent button
- **Cards:** none
- **Cursor:** the system pointer
- **Frame:** the app full frame, dark
- **Aspect:** 16:9, 1280×720, 60 fps
- **Sound:** none: no audio track

### Frame-level beats

Read from 10-frame strips around 1 cut, 1 dissolve and 3 moves; 1 f = 16.7 ms at 60 fps. Dark UI at full frame: row text isn't readable in the strips.

- **The film opens already moving.** The push on the vulnerability list starts on frame 0 (0.58 s strip): the whole dashboard, sidebar included, is on screen for under 0.5 s before the table fills the frame at ×1.65. Travel is front-loaded: 4 of 10 columns do most of the scaling, the last 5 are nearly identical.
- **The severity dots are the only colour in the table.** A column of red dots at the left edge of each row, on grey text; after the push they sit about 8% in from the left edge.
- **The detail page arrives under a dissolve and keeps drifting.** At 5.92 s the page ('Comment previews execute untrusted HTML', Summary, a code block with one green line, the side panel with 'Fix with Vercel Agent') is complete and the frame is still creeping: about 1% of scale over 10 frames.
- **The push to the button pans as it scales.** From 9.09 s the frame moves right and in for 1.1 s: the heading leaves at the left, the side panel moves from the right third to the centre, and the white 'Fix with Vercel Agent' button ends at about 50% across, 85% down. The button is the brightest element in the frame for the whole move.
- **The pointer waits beside the button.** It is at rest about 5% left of the button through the move's last 4 columns; the click comes after the camera has stopped.
- **The agent's reply arrives as the frame pulls.** From 11.09 s a comment card fades in at the top right over about 4 columns (0.5 s) while the frame pulls ×0.8 to include it: UI and camera overlap here, both ending in the same column.
- **The comment grows a second panel on a cut-like change** (18.20 s): a block of text appears beside the side panel between two frames, with the frame still.

**Eye at the cuts.** List → detail: from the pushed row at about 35% × 40% to the heading at about 10% × 15%: 25% sideways, softened by the dissolve. Button → comment: 25% right and 60% up, inside one shot, led by the pull. The 1 measured cut is the comment panel changing in place.

## 2. Classify

Screen Studio-style recorded walkthrough with auto-zoom: list → detail → fix. Conventions: springy push to the click target, pull for context, a long take, no titles.

## 3. Diagnose

- Every move is a critically damped spring at ζ 1, ω ≈ 8, about 0.7 s. → The Screen Studio signature: front-loaded, no overshoot, the camera arriving before the click.
- Push to the target, then pull back as the page changes. → Zoom follows intent: close for the action, wide for its consequence.
- A 9.4 s take with three moves. → The camera edits inside one take, so the flow stays continuous.
- No title card and no logo. → Ends on the product; the post's text carries the name.

## 4. Prescribe

- _confirms_: Spring genre: ζ 1, about 0.7 s for pushes and pulls of ×1.4–1.65. (camera curve (Part 3))
- _confirms_: Push to the click target, pull back for the consequence. (act.focus / act.wide (exists))
- _contradicts_: End cards are nearly universal, but not here or in Stripe pay (n=2 of 50). (cards optional (skill))

## 5. Critique

- **I like:** The push before the click and the pull as the page opens make one take read as two shots.
- **I wish:** Without a title or end card, the feature's name exists only in the post's text.
- **I wonder:** Should cutscene's camera use a ζ 1 spring for continuous recordings and keep in-out for edited reels?
