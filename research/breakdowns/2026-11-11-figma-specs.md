# Figma: Specs

- **Video:** https://video.twimg.com/amplify_video/2110606045416660992/vid/avc1/1280x720/eMNekkqLEky0Sj4P.mp4?tag=29
- **Found on:** https://x.com/figma/status/2110606384761069955
- **Maker:** Figma. **Kind:** launch film. **Posted:** 2026-10-15. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-figma-specs.json](../references/2026-11-11-figma-specs.json)

**Why it's here.** A 41 s film that follows one document, a PRD for 'Bundled delivery at checkout', through its life: written with collaborators, filled from a data source by prompt, commented on, laid beside mobile designs, then handed to a coding agent as context. Named multiplayer cursors are in almost every shot.

## 1. Describe

### Measured

40.75 s, 1280×720, 24 fps. Camera still 89% of the time. 30 shots, median 1.17 s. 29 cuts (26 dissolves); 11 moves.

Moves:

- 2.40 s push ×1.065 (pan 1.9, 5.7%), 2–98% 170 ms, 10–90% 100 ms, peak 0.6, overshoot 32%
- 6.12 s pan ×0.907 (pan 0, 38.9%), 2–98% 1840 ms, 10–90% 1080 ms, peak 0.48, overshoot 1%
- 10.81 s pan ×1 (pan 0, 33.9%), 2–98% 500 ms, 10–90% 330 ms, peak 0.87, overshoot 15%
- 20.80 s pan ×0.999 (pan 0, -22.8%), 2–98% 270 ms, 10–90% 190 ms, peak 0.75, overshoot 17%
- 36.14 s pan ×1 (pan 0, 11%), 2–98% 180 ms, 10–90% 100 ms, peak 0.62, overshoot 32%
- (6 more under 150 ms, ×1.1 or 5% of the frame: blur, UI changes or tracker noise)

**What the instrument can read.** 24 fps. One long move, a 1.8 s scroll down the table (6.12), and a drag (20.80); both sit next to cuts. The one fit that runs is loose (rms 11%) and is not counted. Dissolves run up to 2.4 s.

Autofit left out 2 moves with a cut too close and 1 whose best fit was above 3% (the tracker, not a curve).

### Shot list

| Time (s)    | Length (s) | Framing          | What happens                                                                                                                                | Out                   |
| ----------- | ---------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| 0.00–0.92   | 0.92       | button           | 'Spec' on grey; the pointer hovers and it becomes '+ Spec'                                                                                  | dissolve              |
| 0.92–5.63   | 4.71       | document         | 'PRD: Bundled delivery at checkout' with two named cursors; a table forms; ×3 on the format bar; 'Pull data from Hex into this table' typed | dissolves             |
| 5.63–13.25  | 7.62       | fill             | the table fills with 30-day totals and scrolls; a flow diagram drops into the doc                                                           | dissolves             |
| 13.25–21.17 | 7.92       | comment, reorder | 'Proposed tracking framework' code block; '@Brendon Gonna move this code section to the end.' typed; the section is dragged down            | dissolves up to 2.4 s |
| 21.17–28.33 | 7.16       | canvas           | the spec beside mobile frames; collaborator cursors; 'Let's build this one'                                                                 | dissolves             |
| 28.33–36.42 | 8.09       | agent            | 'Create an implementation plan for this bundling feature' typed; the plan doc; the spec card dragged into an agent prompt; its link sent    | dissolves             |
| 36.42–40.75 | 4.33       | card, logo       | 'Structure your context. Ship your intent.'; the Figma logo                                                                                 | end                   |

### By eye

- **Zoom:** the 'Spec' button at ×4; prompts and comments at ×2–3; the document at reading size; the canvas wide
- **Cards:** 'Structure your context. Ship your intent.'; logo
- **Cursor:** an enlarged pointer, plus named collaborator cursors (Brendon, Gabriela, Yeojin)
- **Frame:** flat light grey; the app full frame
- **Aspect:** 16:9, 1280×720, 24 fps
- **Sound:** an audio track with rhythmic onsets (not listened to)

### Frame-level beats

Read from 10-frame strips around 3 cuts, 1 dissolve and 2 moves; 1 f = 41.7 ms at 24 fps.

- **The table fills left to right, row by row, as the frame scrolls.** Labels fade in first and each '30-day total' value follows about 2 frames later (6.12 s); the frame scrolls down at the same rate the rows fill, so the newest row sits in the middle third.
- **A scroll that ends on a heading at the left edge.** The pan at 10.81 s carries the flow diagram up and out and stops with 'Proposed tracking framework' at the top left, the pointer already beside it: the scroll's stopping point is the next action's target.
- **The comment types at about 1 character a frame** (24 a second) in a popover anchored above the code block (14.13 s); the pointer rests under the popover and doesn't move while it types.
- **A drag shown as a double exposure.** At 18.00 s the grab hand holds the heading; over 6 frames the section's ghost moves down the page while the old position fades, and both are on screen at once for about 4 frames. The 2.4 s dissolve the instrument reads is this drag.
- **A named cursor types its own speech bubble.** 'Let's build this one' appears in a blue bubble attached to a collaborator's cursor, 1–2 characters a frame, on the canvas beside the mobile frames (26.38 s): the collaborator is a character with a line.
- **The link pastes in as selected text**, a few characters a frame, in the agent's dark prompt (34.71 s); the outlined pointer waits below the line.

**Eye at the cuts.** The film dissolves between framings, so few cuts carry the eye. Where it does cut (14.13 s, into the comment), the heading stays at the top left and the popover opens within 10% of the pointer. All 3 measured 'cuts' are typing arriving, not edits.

## 2. Classify

Hand-edited feature film for a document product, told as one artefact's arc. Conventions: a hero button, typing close-ups, collaborator cursors, a two-line end card.

## 3. Diagnose

- The same PRD is on screen, or referenced, in every chapter. → Continuity of subject: the viewer follows one object across cuts, so each cut reads as 'the same doc, a step later'.
- Named collaborator cursors move in the background of most shots. → Secondary action: the cursors say 'multiplayer' without a shot of their own.
- Prompts and comments are typed at ×2–3. → Typing close-up: the words are the content, so they get the frame.
- Cross-dissolves of 1.5–2.4 s between 1 s shots. → Pacing mismatch: the transition is longer than the shots it joins, so the blend becomes the slowest thing on screen.

## 4. Prescribe

- _new_: Make one record the throughline of a multi-scene reel: every scene touches the same object. (reel script (skill))
- _confirms_: Typing close-ups at ×2–3. (act.type framing (exists))
- _adjusts_: Keep dissolves shorter than the shots they join. (transition ≤ shot length (Part 2))

## 5. Critique

- **I like:** The spec is the throughline, so a film about four tools reads as one story.
- **I wish:** The 2.4 s dissolves at 15.8, 18.0 and 21.2 s drag next to 1 s shots.
- **I wonder:** Could a reel script pass one record id through every scene, so the story is that record's life?

## Not for us

- Collaborator cursors from other people's sessions.
- An agent run across tools cutscene does not record.
