# Perplexity: Personal Finance on Computer

- **Video:** https://video.twimg.com/amplify_video/2042256874465378304/vid/avc1/1280x720/GS-zu4-wteQ2kjwb.mp4?tag=14
- **Found on:** https://x.com/perplexity_ai/status/2042256932397019368
- **Maker:** Perplexity. **Kind:** launch film. **Posted:** 2026-04-09. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-perplexity-finance.json](../references/2026-11-11-perplexity-finance.json)

**Why it's here.** A 63 s launch: a serif card ringed by bank logos, a ×4 crop of 'Connect Accounts — Secured by Plaid' as it is clicked, then a budgeting prompt typed on cream and three generated finance tools (a spending heatmap, a debt payoff tool, a dark budget dashboard), ending on 'All your finances in one place'.

## 1. Describe

### Measured

63.33 s, 1280×720, 30 fps. Camera still 70% of the time. 35 shots, median 1.33 s. 34 cuts (22 dissolves); 31 moves.

Moves:

- 4.71 s pull ×0.891 (pan -0.1, 0.2%), 2–98% 770 ms, 10–90% 630 ms, peak 0.11
- 8.10 s push ×1.983 (pan -0.1, -0.1%), 2–98% 890 ms, 10–90% 570 ms, peak 0.07
- 13.50 s push ×2.38 (pan 0, 0.2%), 2–98% 250 ms, 10–90% 190 ms, peak 0.26, overshoot 4%
- 22.01 s push ×1.445 (pan -2.6, 54.4%), 2–98% 1250 ms, 10–90% 630 ms, peak 0.23
- 24.84 s pan ×1 (pan 0, 12.6%), 2–98% 200 ms, 10–90% 140 ms, peak 1, overshoot 37%
- 25.95 s pan ×1.026 (pan -0.7, 8.6%), 2–98% 1520 ms, 10–90% 900 ms, peak 0.03, overshoot 5%
- 27.99 s pan ×0.97 (pan 0.1, 31.1%), 2–98% 370 ms, 10–90% 250 ms, peak 0.91, overshoot 22%
- 28.90 s pan ×0.921 (pan 0.2, 71.4%), 2–98% 410 ms, 10–90% 340 ms, peak 0.15, overshoot 4%
- 29.50 s push ×1.092 (pan 0, 12.7%), 2–98% 480 ms, 10–90% 310 ms, peak 0.14
- 30.79 s push ×1.337 (pan 0, -1.2%), 2–98% 970 ms, 10–90% 670 ms, peak 0.08, overshoot 2%
- 31.94 s push ×1.579 (pan 7.1, -12.9%), 2–98% 800 ms, 10–90% 540 ms, peak 0.41
- 34.39 s pan ×1 (pan -44.7, 56.7%), 2–98% 990 ms, 10–90% 600 ms, peak 0.49
- 39.35 s pan ×1.001 (pan 0, 18.9%), 2–98% 260 ms, 10–90% 180 ms, peak 0.99, overshoot 34%
- 39.77 s pull ×0.851 (pan 0.5, -0.3%), 2–98% 780 ms, 10–90% 400 ms, peak 0.09, overshoot 6%
- 46.33 s pan ×1 (pan 0, -33.2%), 2–98% 370 ms, 10–90% 260 ms, peak 1, overshoot 28%
- 46.81 s pan ×0.931 (pan -1.3, -74.9%), 2–98% 390 ms, 10–90% 260 ms, peak 0.32
- 51.49 s pan ×1.001 (pan 26.5, 0%), 2–98% 240 ms, 10–90% 170 ms, peak 1, overshoot 31%
- 52.67 s pan ×1 (pan 0, 11%), 2–98% 820 ms, 10–90% 580 ms, peak 0.07, overshoot 4%
- 56.72 s pan ×0.998 (pan 0, 46.4%), 2–98% 370 ms, 10–90% 270 ms, peak 0.58
- 59.04 s pull ×0.817 (pan 3.6, 0.1%), 2–98% 1380 ms, 10–90% 920 ms, peak 0.04, overshoot 3%
- (11 more under 150 ms, ×1.1 or 5% of the frame: blur, UI changes or tracker noise)

**What the instrument can read.** Three slow scrolls fit cleanly on out curves. Down an agent answer: 2.8 s out-expo (rms 2.0%; cutscene 9.4%). Down the final app: 1.26 s out-cubic (1.65%). A pull from a prompt: 1.55 s out-expo (3.5%). The push into the heatmap (22.01, ×1.68) fits a critically damped spring and in-out quart about equally (3.1–3.2%).

### Curve fits

RMS error as % of the move's travel; the same fit recovers cutscene 0.3.0's own push at 0.16%.

| Move             | Best fit                   | Next other curve                     | cutscene 0.3.0's curve |
| ---------------- | -------------------------- | ------------------------------------ | ---------------------- |
| pan 18% at 25.95 | out-expo, 2799 ms (2.03%)  | spring ζ=1, ω 4.2/s, 1404 ms (3.14%) | 9.39% (910 ms)         |
| pan 15% at 52.67 | out-cubic, 1260 ms (1.65%) | spring ζ=1, ω 5.3/s, 1108 ms (2.4%)  | 9.25% (858 ms)         |

Autofit left out 9 moves with a cut too close and 8 whose best fit was above 3% (the tracker, not a curve).

### Shot list

| Time (s)    | Length (s) | Framing       | What happens                                                                                                                         | Out             |
| ----------- | ---------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------ | --------------- |
| 0.00–6.63   | 6.63       | cards         | 'Introducing Personal Finance on Computer'; the Plaid claim ringed by bank logos                                                     | dissolves       |
| 6.63–13.77  | 7.14       | connect       | the 'Connect Accounts' button pushes from small to ×4, clicked; 'Secured by Plaid'; the Perplexity mark joins the Plaid mark by dots | dissolves       |
| 13.77–17.03 | 3.26       | collage       | a grid of dark finance dashboards                                                                                                    | hard cut        |
| 17.03–25.10 | 8.07       | prompt        | 'Computer' picked from a menu; 'Build a personalized budgeting tool that tracks…' typed and sent; the plan streams                   | hard cuts       |
| 25.10–39.67 | 14.57      | tool 1        | the answer scrolls; a spending heatmap with a tooltip; a category breakdown                                                          | short dissolves |
| 39.67–52.47 | 12.80      | tools 2 and 3 | 'Perfect, now pull my loans and debt…'; a debt payoff tool; a dark budget dashboard                                                  | cuts            |
| 52.47–57.93 | 5.46       | card over app | 'All your finances in one place' above a finance app window that scrolls                                                             | dissolves       |
| 57.93–63.33 | 5.40       | logo          | the Perplexity logo                                                                                                                  | end             |

### By eye

- **Zoom:** 'Connect Accounts' at ×4; the prompt box at ×2; generated apps from ×1 to ×2
- **Cards:** 'Introducing Personal Finance on Computer', 'Connect your bank accounts, credit cards, and loans to Computer with Plaid.', 'All your finances in one place'; logo
- **Cursor:** the system pointer
- **Frame:** cream for cards and prompts; the generated apps light or dark
- **Aspect:** 16:9, 1280×720, 30 fps
- **Sound:** an audio track with rhythmic onsets (not listened to)

### Frame-level beats

Read from 10-frame strips around 7 cuts, 1 dissolve and 2 moves; 1 f = 33 ms at 30 fps.

- **The title writes on, letter by letter, out of grey.** 'Personal Finance' gains about one letter per frame (0.67 s), each arriving at low contrast and darkening over the next 3 frames; the small 'Introducing' above it is already set. The whole title then fades to a blank field over 6 frames (3.20 s) and the field holds empty for 4 more.
- **The pointer arrives on a held button.** 'Connect Accounts' with 'Secured by PLAID' beneath it sits centred and still (9.40 s) while the pointer travels up from the lower right to the button over about 10 frames, on a curved path. The button is at about ×4 its real size, so the pointer's target is half the frame wide.
- **A collage assembles outward from one tile.** At 13.77 s a single dark dashboard is centred; over 10 frames it shrinks about 30% while eleven more tiles slide in from every edge with motion blur, ending as a grid. The first tile never leaves the centre.
- **The prompt types in three measured 'cuts'** (18.97, 20.23, 21.90 s): the composer's box grows a line at a time and the frame holds; bold keywords arrive already bold. After the send (21.90 s) the composer fades out over 8 frames with the pointer still on the send button.
- **The plan streams top-down while the frame scrolls** (25.95 s): one checklist line per 2–3 frames.
- **A tab change swaps charts in place.** At 44.67 s the donut and stacked bars are replaced by a table on frame 0; the window's chrome and sidebar hold.
- **The card types above the app.** 'All your finances in one place' builds a word per strip column while the app window rises from the bottom edge beneath it (52.67 s): text and proof arrive in the same shot.

**Eye at the cuts.** Titles, the button, the collage's first tile and the composer are all centred: under 10% at each change. The streamed plan starts at the left margin (about 8% across), a 40% jump from the centred composer; the composer's fade-out softens it. 4 of 7 measured cuts are typing or tab changes.

## 2. Classify

Hand-edited launch film for an AI feature: connect → prompt → generated tools. Conventions: serif cards, a partner logo wall, a crop on the call to action, typed prompts, generated apps, a collage.

## 3. Diagnose

- The 'Connect Accounts' button is cropped to ×4 with 'Secured by Plaid' beneath it as it is clicked. → Isolate the call to action: the trust claim lands at the moment of the action it covers.
- Bank logos orbit the opening claim card. → A logo wall as social proof, placed before the product is shown.
- Long answers scroll on out curves over 1.3–2.8 s. → Reading-pace scroll: a fast start and a long settle leaves the final lines still to read.
- Three generated tools in a row, each a minute's worth of output. → Diminishing returns: the third tool repeats the second's point (prompt → app).

## 4. Prescribe

- _adjusts_: Scroll long text on an out curve over 1.3–2.8 s, longer for more text. (camera pan curve (Part 3))
- _confirms_: Isolate the call to action at ×4 as it is clicked. (act.focus (exists))
- _confirms_: Prompt typed, then the artefact it produced. (reel script (skill))

## 5. Critique

- **I like:** The ×4 click on 'Connect Accounts', with 'Secured by Plaid' beneath it, makes the trust claim at the moment of action.
- **I wish:** At 63 s the third tool repeats the second; ending after the debt tool would lose nothing.
- **I wonder:** Could the reel set scroll duration from the scrolled distance, so long answers move at reading pace?

## Not for us

- Partner logos.
- Generated apps whose build time is cut out.
