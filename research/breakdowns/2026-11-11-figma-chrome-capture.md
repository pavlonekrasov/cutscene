# Figma: capture a site from Chrome

- **Video:** https://video.twimg.com/amplify_video/2110597008440606720/vid/avc1/1280x720/YaK74O-huCrl4l5o.mp4?tag=29
- **Found on:** https://x.com/figma/status/2110603044346052714
- **Maker:** Figma. **Kind:** launch film. **Posted:** 2026-10-15. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-figma-chrome-capture.json](../references/2026-11-11-figma-chrome-capture.json)

**Why it's here.** A 31 s workflow film: a live web page in Chrome on a green backdrop, a cut to a ×3 crop of the toolbar where the Figma extension sits, two status pills for the waits, then the same page as Figma layers, ending on one component selected with its name and size.

## 1. Describe

### Measured

31.17 s, 1280×720, 24 fps. Camera still 89% of the time. 22 shots, median 1 s. 21 cuts (15 dissolves); 12 moves.

Moves:

- 9.91 s pull ×0.868 (pan -0.3, 3.6%), 2–98% 330 ms, 10–90% 240 ms, peak 0.79, overshoot 20%
- 10.73 s pull ×0.828 (pan 10.7, 4.9%), 2–98% 420 ms, 10–90% 390 ms, peak 0.26, overshoot 6%
- 13.31 s pan ×1 (pan 0, 7.5%), 2–98% 260 ms, 10–90% 180 ms, peak 0.42, overshoot 2%
- 16.25 s pan ×1 (pan 0, 11.6%), 2–98% 240 ms, 10–90% 170 ms, peak 0.71, overshoot 24%
- 21.72 s pan ×1.006 (pan 6.5, 0%), 2–98% 180 ms, 10–90% 100 ms, peak 0.63, overshoot 28%
- 29.66 s pull ×0.874 (pan 0, 0.1%), 2–98% 150 ms, 10–90% 90 ms, peak 0.55, overshoot 36%
- (6 more under 150 ms, ×1.1 or 5% of the frame: blur, UI changes or tracker noise)

**What the instrument can read.** 24 fps. The moves are short reframes next to cuts; autofit skips all three. Cuts: 14 of 21 are dissolves of 0.2–2.1 s.

Autofit left out 3 moves with a cut too close.

### Shot list

| Time (s)    | Framing      | What happens                                                                                                                  | Out                |
| ----------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| 0.00–4.33   | wide         | the site in Chrome on green; the page scrolls, the cursor hovers listing cards                                                | dissolves          |
| 4.33–9.38   | toolbar crop | ×3 on the URL bar; the pointer travels right to the extension icon; the extension bar opens: 'Capture code', 'Capture design' | dissolves          |
| 9.38–11.25  | status       | 'Capturing…' pill at ×3; the page with the pill, wide                                                                         | dissolve           |
| 11.25–16.21 | into Figma   | an empty canvas; 'Importing project…'; a loading frame; the page lands as layers                                              | dissolves          |
| 16.21–23.63 | inspect      | the captured page with the selection toolbar; a menu; ×3 on the cards; 'FeatureCard' tag; 400 × 200                           | cuts and dissolves |
| 23.63–27.83 | payoff       | the FeatureCard alone, the pointer beside it                                                                                  | dissolve 2.1 s     |
| 27.83–31.17 | logo         | the Figma logo assembles on black                                                                                             | end                |

### By eye

- **Zoom:** wide window for the page; the URL bar and toolbar at about ×3; status pills at ×3; the final component at about ×4
- **Cards:** none until the end logo
- **Cursor:** the system pointer, enlarged by the crops so it is the subject in the toolbar shots
- **Frame:** a textured green backdrop around the browser; the Figma canvas on its own grey
- **Aspect:** 16:9, 1280×720, 24 fps
- **Sound:** an audio track with rhythmic onsets (not listened to)

## 2. Classify

Hand-edited workflow film for a capture tool: source (a site) → action (extension) → result (editable layers). Conventions: window on a brand backdrop, crop to the control, status shots, payoff on one component.

## 3. Diagnose

- The film cuts from the whole window to a ×3 crop of the toolbar. → Crop to region: the action happens in 5% of the window, so the crop gives it the frame.
- Both waits ('Capturing…', 'Importing project…') are a single shot of the status pill, under a second each. → Ellipsis (time compression): the wait becomes a beat, shown by its indicator.
- It ends on one component selected, with its name tag and dimensions. → Payoff on the smallest meaningful unit: the claim is 'real components', so the last shot is one.
- A textured, saturated green backdrop around a lime-and-plum site. → Figure-ground: the backdrop competes in hue and saturation with the content it frames.

## 4. Prescribe

- _new_: Cut a wait to one shot of its status indicator, then cut to the result. (ellipsis on act.wait (Part 2))
- _confirms_: Crop to region for actions in browser chrome or small controls. (camera framing (exists: act.focus))
- _confirms_: End on the isolated result. (camera / renderer (not built))

## 5. Critique

- **I like:** The status pills turn two waits into two beats of under a second each, so the film never shows loading.
- **I wish:** The green backdrop is as saturated as the page; a neutral or desaturated field would let the page lead.
- **I wonder:** Could act.wait mark a span as an ellipsis, so the reel cuts it down to the indicator that ends it?

## Not for us

- Browser extension chrome outside the page cutscene records.
