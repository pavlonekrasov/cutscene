# Vercel toolbar (Lee Robinson, tutorial)

- **Video:** https://video.twimg.com/ext_tw_video/1724535034051166208/pu/vid/avc1/1004x720/kW6mFKx56oREgiok.mp4?tag=14
- **Found on:** https://screen.studio (the showcase wall on the home page)
- **Maker:** Lee Robinson (Vercel), made with Screen Studio. **Kind:** tutorial: camera numbers only. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-vercel-toolbar-tutorial.json](../references/2026-11-11-vercel-toolbar-tutorial.json)

**Why it's here.** A 1:47 talk-through; kept for its frame (gradient backdrop, webcam bubble, word-highlighted captions), not as a reel model.

## 1. Describe

### Measured

106.57 s, 1004×720, 30 fps. Camera still 92% of the time. 27 shots, median 3.24 s. 26 cuts (20 dissolves); 21 moves.

Moves:

- 20.70 s push ×1.118 (pan 1, 4.1%), 2–98% 800 ms, 10–90% 470 ms, peak 0.08
- 28.01 s pan ×0.999 (pan -3.5, -13.9%), 2–98% 830 ms, 10–90% 490 ms, peak 0.07
- 32.30 s pull ×0.556 (pan 1.9, 2.4%), 2–98% 540 ms, 10–90% 400 ms, peak 0.3, overshoot 2%
- 39.37 s push ×1.086 (pan 1.3, 6.1%), 2–98% 460 ms, 10–90% 420 ms, peak 0.94, overshoot 25%
- 40.24 s pan ×1.003 (pan -1.4, 6.9%), 2–98% 370 ms, 10–90% 290 ms, peak 0.17, overshoot 2%
- 74.94 s push ×1.978 (pan 0.3, -0.1%), 2–98% 860 ms, 10–90% 480 ms, peak 0.15
- 82.14 s pull ×0.575 (pan -0.3, 0.1%), 2–98% 480 ms, 10–90% 370 ms, peak 0.34, overshoot 3%
- 102.51 s pull ×0.845 (pan 5.4, -1.5%), 2–98% 150 ms, 10–90% 110 ms, peak 0.79, overshoot 29%
- (13 more under 150 ms, ×1.1 or 5% of the frame: blur, UI changes or tracker noise)

**What the instrument can read.** Blurred moves split; page changes read as cuts.

### Shot list

| Time (s)    | Length (s) | Framing       | What happens                                                           | Out |
| ----------- | ---------- | ------------- | ---------------------------------------------------------------------- | --- |
| 0.00–106.57 | 106.57     | one long take | the docs, the toolbar's menu, layout shifts, code samples, a blog post | —   |

### By eye

- **Zoom:** ×1.1–2.0
- **Cards:** none; captions with the current word highlighted
- **Cursor:** enlarged pointer, hand on hover
- **Frame:** window on a teal-to-pink gradient, webcam bubble lower right
- **Aspect:** ~1.39:1, 1004×720, 30 fps
- **Sound:** voice

### Frame-level beats

Read from 10-frame strips around 6 cuts, 1 dissolve and 2 moves; 1 f = 33 ms at 30 fps. A square-ish frame: a browser window on a mint-to-magenta gradient, a presenter tile at the bottom right, captions at the bottom centre.

- **Page navigation is the cut.** At 16.37 s the docs home is replaced by 'Projects and deployments' between two frames, with the window, the tile and the caption in the same places. 4 of the 6 measured cuts are page loads like this one (16.37, 73.00, 86.03, 90.47 s).
- **The push drops the window frame.** From 20.70 s the page fills the frame edge to edge (done by column 3, about 0.4 s): the gradient and the browser chrome are gone, and body text goes from about 3 px to 7 px in the strip. The toolbar, a dark pill at the bottom centre, stays in frame at about 50% × 88%, directly above the caption.
- **The toolbar's menu is shown at about ×2.** At 28.01 s the command list fills the frame, one row about 6% of the height, with a blue dot marking the hovered row; the hand moves down one row in about 6 frames and the highlight follows between two frames.
- **The caption highlights the spoken word.** A black pill at the bottom centre holds 3–5 words with the current one in white and the rest grey; it changes every 0.3–0.5 s and never moves. It overlaps the toolbar's lower edge in the pushed framings.
- **A dissolve joins two zoom levels of the same page** (62.20 s): the close framing of the docs heading drifts right by about 3% over 10 frames as it dissolves.
- **Layout shifts are drawn on the page.** At 79.87 s a pink block covers the code sample's first lines at about 30% of the frame wide, then clears between two frames: the tool's own overlay is the highlight, and the frame is already pushed in on it.
- **The presenter tile is outside the camera**: bottom right, about 20% of the frame wide, the same size in every framing, covering the page's lower right corner.

**Eye at the cuts.** Page → page: headings land at about 25% × 35% each time, 0–5%. Toolbar → menu: the menu opens above the toolbar, within 15%. Caption: 0%, fixed for 107 s. None of the 6 measured cuts is a camera edit.

## 2. Classify

Narrated tutorial; kept for its frame, not as a reel model.

## 3. Diagnose

- Captions highlight the current word. → Karaoke captions track the narration word by word.

## 4. Prescribe

- _confirms_: A page navigation inside a held frame needs no camera cut: the window, caption and pointer stay put while the content changes. (camera lock (exists: act.wide))
- _new_: A caption line that marks the current word, fixed at the bottom centre. (renderer caption (not built); needs word timings)
- _adjusts_: Keep overlays (captions, any picture-in-picture) clear of the control being shown: here the caption overlaps the toolbar it describes. (renderer caption placement (not built))

## 5. Critique

- **I like:** The highlighted word keeps the viewer's place in the narration.
- **I wish:** 1:47 long, narrated: a tutorial, not a reel.
- **I wonder:** Could a reel caption highlight words in time with a voice-over?

## Not for us

- Webcam and narration captions.
