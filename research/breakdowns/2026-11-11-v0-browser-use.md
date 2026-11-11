# v0: Browser Use

- **Video:** https://video.twimg.com/amplify_video/2055402558727077888/vid/avc1/1280x720/VHukx9p-rKJCK4Os.mp4?tag=14
- **Found on:** https://x.com/v0/status/2055402612791669061
- **Maker:** v0 (Vercel). **Kind:** launch film. **Posted:** 2026-05-15. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-v0-browser-use.json](../references/2026-11-11-v0-browser-use.json)

**Why it's here.** A 54 s film of three prompts of rising difficulty: 'Build a SaaS app.', 'Clone vercel.com', 'Test this game and find bugs'. Each is followed by the agent's transcript, with its own browser screenshots inline as proof. The third ends on a bug found and documented, not a success.

## 1. Describe

### Measured

53.9 s, 1280×720, 30 fps. Camera still 74% of the time. 25 shots, median 1.37 s. 24 cuts (13 dissolves); 35 moves.

Moves:

- 6.43 s pan ×1 (pan 0, 6.7%), 2–98% 380 ms, 10–90% 250 ms, peak 0.26
- 8.30 s pan ×1 (pan 0, 7.6%), 2–98% 470 ms, 10–90% 300 ms, peak 0.2
- 9.37 s pan ×1 (pan 0, 13.1%), 2–98% 890 ms, 10–90% 750 ms, peak 0.11, overshoot 269%
- 11.84 s pan ×1 (pan 0, 13%), 2–98% 450 ms, 10–90% 300 ms, peak 0.21
- 13.24 s pan ×1 (pan 0, 6.6%), 2–98% 320 ms, 10–90% 230 ms, peak 0.3, overshoot 81%
- 13.64 s pan ×1 (pan 0, 6.5%), 2–98% 510 ms, 10–90% 230 ms, peak 0.57, overshoot 749%
- 14.44 s pan ×1.002 (pan 0, 53.2%), 2–98% 220 ms, 10–90% 180 ms, peak 0.44, overshoot 8%
- 15.70 s pan ×1 (pan 0, 13.2%), 2–98% 530 ms, 10–90% 300 ms, peak 0.18
- 22.84 s pan ×1.013 (pan -0.2, 35.4%), 2–98% 360 ms, 10–90% 270 ms, peak 0.18, overshoot 2%
- 23.97 s pan ×1 (pan 0, 7.6%), 2–98% 440 ms, 10–90% 300 ms, peak 0.22
- 25.04 s pan ×1.001 (pan 0, 6.7%), 2–98% 340 ms, 10–90% 230 ms, peak 0.29, overshoot 84%
- 25.63 s pan ×1 (pan 0, 6.4%), 2–98% 320 ms, 10–90% 230 ms, peak 0.31, overshoot 84%
- 26.06 s pan ×1 (pan 0, 6.5%), 2–98% 490 ms, 10–90% 230 ms, peak 0.56, overshoot 728%
- 26.84 s pan ×0.998 (pan 0, 72.7%), 2–98% 550 ms, 10–90% 360 ms, peak 0.18
- 28.10 s pan ×1.001 (pan 0, 7.6%), 2–98% 460 ms, 10–90% 300 ms, peak 0.21
- 29.17 s pan ×1.007 (pan 0, 13.2%), 2–98% 920 ms, 10–90% 760 ms, peak 0.75
- 31.64 s pan ×1.002 (pan 0, 7.6%), 2–98% 430 ms, 10–90% 300 ms, peak 0.22
- 39.67 s pan ×1.001 (pan 0, 37.4%), 2–98% 450 ms, 10–90% 300 ms, peak 0.14
- 40.80 s pan ×1.003 (pan 0, 6.9%), 2–98% 310 ms, 10–90% 230 ms, peak 0.31, overshoot 686%
- 41.40 s pan ×0.951 (pan 1.3, 73.9%), 2–98% 500 ms, 10–90% 340 ms, peak 0.19
- 42.67 s pan ×1.004 (pan 0, 7.6%), 2–98% 380 ms, 10–90% 290 ms, peak 0.25
- 43.74 s pan ×1.006 (pan 0, 6.8%), 2–98% 310 ms, 10–90% 240 ms, peak 0.31, overshoot 680%
- 44.34 s pan ×1 (pan 0, 72%), 2–98% 540 ms, 10–90% 360 ms, peak 0.18
- 45.60 s pan ×1 (pan 0, 7%), 2–98% 350 ms, 10–90% 280 ms, peak 0.27
- 46.67 s pan ×1 (pan 0, 6.6%), 2–98% 320 ms, 10–90% 230 ms, peak 0.31, overshoot 81%
- 47.07 s pan ×1 (pan 0, 6.6%), 2–98% 570 ms, 10–90% 260 ms, peak 0.52
- 48.17 s pan ×1.01 (pan -0.3, 13.1%), 2–98% 330 ms, 10–90% 230 ms, peak 0.2
- (8 more under 150 ms, ×1.1 or 5% of the frame: blur, UI changes or tracker noise)

**What the instrument can read.** 30 fps. The chat scrolls as messages arrive. Four large scrolls (72–74% of the frame) fit out-cubic at 0.68–0.70 s (rms 0.96–1.28%; cutscene 3.2–3.4%), and a short one fits out-cubic at 0.58 s (0.72%). A final pull to the logo fits easy ease (2.4%).

### Curve fits

RMS error as % of the move's travel; the same fit recovers cutscene 0.3.0's own push at 0.16%.

| Move              | Best fit                                    | Next other curve                                   | cutscene 0.3.0's curve |
| ----------------- | ------------------------------------------- | -------------------------------------------------- | ---------------------- |
| pan 13% at 15.70  | out-cubic, 584 ms (0.72%)                   | spring ζ=1, ω 11.3/s, 514 ms (1.2%)                | 3.52% (719 ms)         |
| pan 74% at 26.84  | out-cubic, 698 ms (0.98%)                   | spring ζ=1, ω 9.2/s, 632 ms (1.18%)                | 3.23% (858 ms)         |
| pan 73% at 41.40  | out-cubic, 677 ms (1.28%)                   | spring ζ=1, ω 9.8/s, 596 ms (1.62%)                | 3.4% (858 ms)          |
| pan 74% at 44.34  | out-cubic, 698 ms (0.96%)                   | spring ζ=1, ω 9.5/s, 614 ms (1.16%)                | 3.21% (858 ms)         |
| pan 830% at 48.17 | AE easy ease on linear scale, 884 ms (2.4%) | spring ζ=0.8 on linear scale, ω 5.4/s, 692 ms (5%) | 4.54% (1260 ms)        |

Autofit left out 2 moves with a cut too close and 4 whose best fit was above 3% (the tracker, not a curve).

### Shot list

| Time (s)    | Length (s) | Framing | What happens                                                                                                                                                 | Out                   |
| ----------- | ---------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------- |
| 0.00–1.83   | 1.83       | title   | 'Introducing v0 Browser Use'                                                                                                                                 | hard cuts             |
| 1.83–19.83  | 18.00      | task 1  | 'Build a SaaS ap…' typed; 'I'll build Glide…'; screenshots of sign-up, a sprint board, the mobile layout; 'Glide is functional'                              | dissolves             |
| 19.83–34.50 | 14.67      | task 2  | 'Clone vercel.com'; vercel.com opened; design tokens captured; 'the gradient triangle is missing'; fixed; 'Clone matches the original.'                      | cuts, short dissolves |
| 34.50–51.83 | 17.33      | task 3  | 'Test this game and find bugs'; geist-tetris opened; controls tested; GAME OVER; 'Logged reset bug'; 'All controls working. Reset bug found and documented.' | cuts                  |
| 51.83–53.90 | 2.07       | card    | 'Try it at v0.app'                                                                                                                                           | end                   |

### By eye

- **Zoom:** the chat column at about ×1.5, centred; screenshots inside it at reading size
- **Cards:** 'Introducing v0 Browser Use'; 'Try it at v0.app'
- **Cursor:** none
- **Frame:** pure black; the chat column alone
- **Aspect:** 16:9, 1280×720, 30 fps
- **Sound:** an audio track with rhythmic onsets (not listened to)

### Frame-level beats

Read from 10-frame strips around 7 cuts, 1 dissolve and 3 moves; 1 f = 33 ms at 30 fps. UI at about 60% of the frame on black, so small text isn't readable in the strips.

- **Each task starts with the same shot.** The composer with its typed task sits at the top ('Build a SaaS app', 3.60 s; 'Clone vercel.com', 21.53 s), fades out over about 6 frames, and the same text returns as a sent chip at the right 4 frames later (4.97 s). The repeat is the film's chapter marker; it needs no card.
- **The transcript grows downward and the frame follows.** 'Thought for 9s', the agent's first sentence, then checklist lines arrive one at a time, about 1 s apart (4.97–7.07 s); when the next item would leave the frame, the whole column moves up by one row over about 5 frames (the measured dissolve at 7.07 s is that step).
- **Screenshots enter as cards in the transcript**, about 40% of the column wide, and scroll through with it (15.70 s): the phone-width capture passes in 1 s while its caption line types beneath.
- **Before and after share a frame, then a cut removes the before.** In task 2 the original site's hero (a red, green and blue gradient) and the clone's empty hero are stacked in the transcript (26.84 s); the fixed clone then cuts in at the same place and size as the original was (31.17 s): the comparison is made by position.
- **The game is the only moving picture.** In task 3 the Tetris board plays inside its card (42.07 s) while the transcript holds; pieces move 2–3 frames a step.
- **The last line lands 5 frames before black** (51.83 s): 'All controls working. Reset bug found and documented.' then a cut to black and the end card.

**Eye at the cuts.** The transcript's left edge is at about 5% of the frame in every shot, and the newest line is always in the lower third: reading position is constant for 50 s. Task → task: the composer returns to the same top-left slot, 0%. 5 of 7 measured cuts are transcript lines arriving.

## 2. Classify

Hand-edited agent demo: a centred chat column on black, three escalating tasks, proof inline. Conventions: typed prompts, 'Thought for 9s', inline screenshots, 'Try it at v0.app'.

## 3. Diagnose

- Three tasks, each harder than the last; the third ends on a bug found. → Rule of three with escalation, and a credible ending: finding a flaw proves the tool looks.
- The agent's browser screenshots appear inside the transcript. → Proof in place: the film never leaves the chat, so there is one frame to read.
- Large scrolls fit out-cubic at 0.6–0.7 s. → A front-loaded scroll as content arrives: fast to the new message, a short settle.
- Transcript text is about 9 px at feed size. → Legibility: the screenshots carry the film; most of the text is texture.

## 4. Prescribe

- _new_: Three tasks of rising difficulty in one reel; end on the hardest. (reel script (skill))
- _adjusts_: Scroll a growing feed on out-cubic at about 0.6–0.7 s. (camera pan curve (Part 3))
- _confirms_: Prompt, then the artefact it produced. (reel script (skill))

## 5. Critique

- **I like:** Ending on 'Reset bug found and documented' is more convincing than a third success.
- **I wish:** Most transcript lines are unreadable at feed size; trimming them to the step headers would lose nothing.
- **I wonder:** Could the reel follow content arriving at the bottom of a feed with a scroll on out-cubic instead of a camera move?

## Not for us

- Agent run time compressed by editing.
