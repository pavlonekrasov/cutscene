# Linear: code reviews (coming soon)

- **Video:** https://video.twimg.com/amplify_video/2013642911011749889/vid/avc1/960x720/isaXnHl2x8NLwbmP.mp4?tag=21
- **Found on:** https://x.com/linear/status/2013643099147248054
- **Maker:** Linear. **Kind:** launch film. **Posted:** 2026-01-20. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-linear-reviews.json](../references/2026-11-11-linear-reviews.json)

**Why it's here.** A 25 s teaser with no product UI: code drawn as glowing mono text on a 3D plane, the camera drifting over it while red markers flag lines, green ones replace them and a 'Merge' button lights. Then a glowing serif pun card, 'Think diff', and 'Code reviews: available soon in Linear'.

## 1. Describe

### Measured

25.42 s, 960×720, 60 fps. Camera still 59% of the time. 22 shots, median 1.05 s. 21 cuts (7 dissolves); 19 moves.

Moves:

- 1.01 s pull ×0.894 (pan 0, 3.3%), 2–98% 1330 ms, 10–90% 1100 ms, peak 0.65, overshoot 2%
- 4.08 s pan ×0.986 (pan 1.3, 5.2%), 2–98% 1320 ms, 10–90% 1100 ms, peak 0.97, overshoot 1%
- 6.74 s pan ×1 (pan 1.4, 5.4%), 2–98% 960 ms, 10–90% 800 ms, peak 0.61, overshoot 2%
- 12.00 s pull ×0.824 (pan 0, -0.2%), 2–98% 700 ms, 10–90% 570 ms, peak 0.05, overshoot 2%
- 20.35 s pull ×0.427 (pan 0.4, -0.4%), 2–98% 710 ms, 10–90% 610 ms, peak 0.2, overshoot 7%
- (14 more under 150 ms, ×1.1 or 5% of the frame: blur, UI changes or tracker noise)

**What the instrument can read.** 4:3 (960×720), 60 fps. The camera drifts in 1.0–1.3 s moves with almost no overshoot, but on a perspective plane the tracker's zoom is unreliable; autofit skips the two it finds.

Autofit left out 2 moves with a cut too close.

### Shot list

| Time (s)    | Length (s) | Framing       | What happens                                                               | Out             |
| ----------- | ---------- | ------------- | -------------------------------------------------------------------------- | --------------- |
| 0.00–5.47   | 5.47       | code, removed | mono code on a tilted plane; red markers appear in the gutter beside lines | hard cuts       |
| 5.47–8.68   | 3.21       | code, flagged | a wider plane; red rows across a function                                  | hard cuts       |
| 8.68–12.75  | 4.07       | code, fixed   | green rows replace the red; a glowing 'Merge' button                       | short dissolves |
| 12.75–16.92 | 4.17       | pun card      | 'Think diff' in a glowing serif, fading through blur                       | dissolves       |
| 16.92–22.28 | 5.36       | title         | 'Code reviews' / 'Available soon in Linear'                                | dissolve        |
| 22.28–25.42 | 3.14       | logo          | the Linear mark, then the wordmark                                         | end             |

### By eye

- **Zoom:** code lines filling the frame at a steep angle; the camera drifts along them
- **Cards:** 'Think diff'; 'Code reviews' / 'Available soon in Linear'; logo
- **Cursor:** none
- **Frame:** black void; code glows with bloom
- **Aspect:** 4:3, 960×720, 60 fps
- **Sound:** an audio track with rhythmic onsets (not listened to)

### Frame-level beats

Read from 10-frame strips around 7 cuts, 1 dissolve and 2 moves; 1 f = 16.7 ms at 60 fps. The film is 4:3.

- **One line, then the file.** The film opens at macro scale on a single red-marked line ('declare func…', line 3) and pulls back over 1.8 s (1.01 s) until dozens of lines on a steeper plane fill the frame. The first 2.4 s teach what a red marker is on one line before showing many.
- **Cut from flat to steep.** At 2.42 s the near-flat macro cuts, on frame 0, to a plane tilted about 30° with several red rows: the angle change and the scale change happen in the cut, not in a move.
- **Red exits, green enters, in one pan.** The pan at 4.08 s travels down the plane for 1.8 s and its last column lands on the first green rows: the colour change is placed at the end of a move, so the move has an arrival.
- **Green holds in a near-locked frame** (6.23–7.75 s): the same three green rows sit in place for about 1.5 s with a drift of under 1% per 10 frames, the longest rest in the code section.
- **The 'Merge' button is revealed by a cut to a lower angle** (7.75 s): the plane tips further back and the glowing button sits at the bottom centre, the only saturated blue in the frame.
- **The subtitle types under a fixed title.** 'Code reviews' holds while 'Available soon in Linear' types beneath it, about 1 character per 2 frames (16.92–18.02 s). Both measured 'cuts' in the card are that typing.

**Eye at the cuts.** Macro → steep plane (2.42 s): the red marker moves from about 25% to about 30% of the width, inside 10%. Green rows → 'Merge' (7.75 s): from about 45% × 50% to 50% × 80%; sideways travel under 10%. The red and green rows act as the eye's anchor across every cut in the code section. 4 of 7 measured cuts are true edits.

## 2. Classify

Abstract motion-graphics teaser for an unreleased feature. Conventions: perspective code planes, diff colours as story, a pun title card, 'available soon'.

## 3. Diagnose

- Red gutter markers, then green rows, then a lit 'Merge'. → Semantic colour as narrative: the diff's own red/green code tells problem → fix → merge with no copy.
- Static code on a tilted plane with a slow drifting camera. → Parallax and depth create motion when the subject itself doesn't move.
- The pun card fades through blur over about 4 s. → Pacing: the slowest moment in the film is the line of copy, not the product.
- Half the film (12.7 s) is cards and logo. → A teaser's job is the name and the date; the picture is mood.

## 4. Prescribe

- _new_: Lay a frame on a slightly tilted plane for an opening or closing shot. (renderer tilt (not built))
- _new_: Use the product's own semantic colours (diff red/green, status colours) as the story's beats. (reel script (skill))

## 5. Critique

- **I like:** The red and green line markers tell before and after without a word of copy.
- **I wish:** 'Think diff' takes about 4 s to blur away, longer than any code shot.
- **I wonder:** Could the reel renderer tilt a recorded frame a few degrees for the opening shot, as this does with code?

## Not for us

- Rendered 3D code, not a recording.
- No product UI.
