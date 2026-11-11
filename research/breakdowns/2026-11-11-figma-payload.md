# Figma Make: Payload backend

- **Video:** https://video.twimg.com/amplify_video/2110609643273883648/vid/avc1/1280x720/c3JXR0Htx09pu38a.mp4?tag=29
- **Found on:** https://x.com/figma/status/2110610071424291119
- **Maker:** Figma. **Kind:** launch film. **Posted:** 2026-10-15. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-figma-payload.json](../references/2026-11-11-figma-payload.json)

**Why it's here.** A 40 s workflow film for a backend in a site builder. Its centre is a split frame: a CMS form on the right, the card it feeds on the left, the card's title changing letter by letter as the form is typed. A generated sign-up form then takes an entry ('Grace'), and her row turns up in the Users table at the end.

## 1. Describe

### Measured

39.71 s, 1280×720, 24 fps. Camera still 83% of the time. 28 shots, median 1.33 s. 27 cuts (19 dissolves); 19 moves.

Moves:

- 6.58 s pan ×1.01 (pan 0, 12.8%), 2–98% 320 ms, 10–90% 190 ms, peak 0.79, overshoot 21%
- 7.14 s pan ×0.995 (pan 2.7, 5.9%), 2–98% 330 ms, 10–90% 260 ms, peak 0.33, overshoot 9%
- 21.72 s push ×1.106 (pan 0, 0%), 2–98% 740 ms, 10–90% 340 ms, peak 0.15
- 23.83 s push ×1.7 (pan -11.9, 63.7%), 2–98% 500 ms, 10–90% 250 ms, peak 0.93, overshoot 21%
- 25.73 s pull ×0.789 (pan 2, 19.5%), 2–98% 420 ms, 10–90% 390 ms, peak 0.84, overshoot 9%
- 32.09 s pull ×0.792 (pan 1.7, 25.3%), 2–98% 730 ms, 10–90% 700 ms, peak 0.11, overshoot 9%
- 32.98 s pull ×0.62 (pan 2.8, -8.3%), 2–98% 1100 ms, 10–90% 660 ms, peak 0.1
- (12 more under 150 ms, ×1.1 or 5% of the frame: blur, UI changes or tracker noise)

**What the instrument can read.** 24 fps. The clean fit is the closing pull from Grace's row to the full table: ×0.68 over 1.7 s, out-quint (rms 2.2%; cutscene's in-out 8.2%). The push into the send button (23.83, ×1.7) sits against a cut.

### Curve fits

RMS error as % of the move's travel; the same fit recovers cutscene 0.3.0's own push at 0.16%.

| Move                | Best fit                   | Next other curve                     | cutscene 0.3.0's curve |
| ------------------- | -------------------------- | ------------------------------------ | ---------------------- |
| pull ×0.68 at 32.98 | out-quint, 1744 ms (2.24%) | spring ζ=1, ω 5.6/s, 1044 ms (2.56%) | 8.16% (858 ms)         |

Autofit left out 3 moves with a cut too close and 1 whose best fit was above 3% (the tracker, not a curve).

### Shot list

| Time (s)    | Length (s) | Framing        | What happens                                                                                                                                                                 | Out       |
| ----------- | ---------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| 0.00–7.50   | 7.50       | prompt         | a site on the Make canvas; a region selected; 'What do you want to make?'; the 'Store data and manage users' card, Create                                                    | dissolves |
| 7.50–10.00  | 2.50       | card           | 'Build with real data and content' on black                                                                                                                                  | hard cut  |
| 10.00–14.75 | 4.75       | navigation     | the site with chat; ×4 on the tabs, Content clicked; Collections; Posts; a post editor                                                                                       | cuts      |
| 14.75–20.17 | 5.42       | split frame    | form right, card left: 'Turn pre-loved finds into sales' (Vintage, Decor), 'Deals on electron…' (Tech), 'The Y2K nostalgia edi…' (Trends), each typed while the card updates | cuts      |
| 20.17–30.71 | 10.54      | generated form | the blog panel; 'Create a stylized, multi-step, sign-up form for buyers' typed; a skeleton; the form modal on the site                                                       | dissolves |
| 30.71–35.00 | 4.29       | payoff         | the form filled; 'Create your account →' at ×4; 'Grace grace@pickup.com'; pull back to the Users table                                                                       | cuts      |
| 35.00–39.71 | 4.71       | card, logo     | 'Your full-stack framework'; the Figma logo                                                                                                                                  | end       |

### By eye

- **Zoom:** the 'Browser / Files / Content' tabs at ×4; the split frame at ×2; 'Create your account' at ×4
- **Cards:** 'Build with real data and content' (2.5 s, mid-film); 'Your full-stack framework'; logo
- **Cursor:** an enlarged pointer
- **Frame:** a pink-violet gradient behind the app
- **Aspect:** 16:9, 1280×720, 24 fps
- **Sound:** an audio track with rhythmic onsets (not listened to)

### Frame-level beats

Read from 10-frame strips around 6 cuts, 1 dissolve and 1 move; 1 f = 41.7 ms at 24 fps.

- **Hover, press, cut.** The pointer reaches 'Posts' and the tile turns grey 3 frames later (12.88 s); 5 frames after the press the post editor is on screen, complete, on frame 0 (13.67 s). The navigation costs under 1 s and shows no loading state.
- **The split frame updates on the same frame as the keystroke.** In 'form right, card left' (15.63 s) the Title field gains a character every 1–2 frames ('Turn' → 'Turn p' → 'Turn pre-loved f') and the card's title on the left shows the same string on the same frame. The image on the card pops in 3 frames after typing starts. Cause and effect are 0 frames apart.
- **A tag is the second proof.** 'Vintage ×' appears in the Tags field and the card's tag chip follows (16.21 s) while the title keeps typing: two fields, each mirrored, in under 1 s.
- **The prompt types alone on white** at ×4, 1–2 characters a frame, the line wrapping in place (22.75 s); no window, no backdrop.
- **The payoff pull starts on the row.** At 32.92 s the frame opens on 'Grace grace@pickup.com' at about ×4, holds 4 frames, then pulls to the Users table and on to the whole window on its pink backdrop over about 2.2 s (×0.2 in all). The row stays visible for the entire move; the pull answers 'where did the entry go'.
- **Card → logo on a hard cut** (36.75 s): 'Your full-stack framework' cuts to the mark's first shape, and coloured tiles add 2–3 frames apart.

**Eye at the cuts.** Collections → editor (13.67 s): the pointer holds its place across the cut (about 45% × 60%), 0%. Editor → split frame (15.63 s): to the Title field at about 60%, 15%. Prompt → next shot and card → logo: centred, under 10%. The instrument places all 6 hard cuts on the right frame.

## 2. Classify

Hand-edited workflow film: prompt → backend → content editing → generated UI → data. Conventions: prompt typing, a ×4 crop on navigation, split-frame cause and effect, a closing loop.

## 3. Diagnose

- The form and the card it feeds share one frame; the card changes as each letter lands. → Juxtaposition of cause and effect: input and output together make the binding visible without a cut.
- Data entered at 31 s ('Grace') appears in the Users table at 33 s. → Setup and payoff: the film closes the loop it opened, which proves the backend is real.
- A ×4 crop on the 'Content' tab before the CMS. → Wayfinding: show where the feature lives before what it does.
- The closing pull is ×0.68 over 1.7 s with an out-quint curve. → Out-family deceleration for a reveal: fast start, long settle, the table arriving rather than travelling.

## 4. Prescribe

- _new_: Show input and output in one frame: the field being typed beside the element it changes. (split frame (Part 2); confirms parallel action)
- _new_: Close the loop: data entered in one scene appears in the next. (reel script (skill))
- _confirms_: Open on the navigation to the feature. (reel script (skill))
- _adjusts_: A reveal pull can take the out family at 1.5–1.8 s. (camera pull curve (Part 3))

## 5. Critique

- **I like:** The split-frame typing makes 'CMS fields bind to components' visible in three seconds.
- **I wish:** The 2.5 s black card at 7.5 s stops the film just after it starts.
- **I wonder:** Could a reel lay two crops of one recording side by side (the input's box and the output's box) as a split frame, with no second take?

## Not for us

- Prompt generation time compressed by editing.
