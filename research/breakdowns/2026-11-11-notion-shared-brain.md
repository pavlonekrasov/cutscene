# Notion: one shared brain for every agent

- **Video:** https://video.twimg.com/amplify_video/2118056468381679616/vid/avc1/1280x720/lx90JRrEcjcIhzvG.mp4?tag=29
- **Found on:** https://x.com/notionhq/status/2118059335930744999
- **Maker:** Notion. **Kind:** launch film. **Posted:** 2026-11-04. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-notion-shared-brain.json](../references/2026-11-11-notion-shared-brain.json)

**Why it's here.** A 36 s film that draws a system out of real screens: a terminal agent, a Notion 'Memories' page and a phone chat side by side, joined by arrows. The terminal saves a memory, the Notion page updates, and the phone's agent uses it. Each chapter opens on a claim card on warm white.

## 1. Describe

### Measured

36.46 s, 1280×720, 24 fps. Camera still 91% of the time. 16 shots, median 2.25 s. 15 cuts (8 dissolves); 9 moves.

Moves:

- 22.47 s pull ×0.934 (pan -6.6, -0.5%), 2–98% 260 ms, 10–90% 180 ms, peak 0.74, overshoot 24%
- 26.05 s push ×1.077 (pan 6.5, 0.1%), 2–98% 430 ms, 10–90% 170 ms, peak 0.84, overshoot 24%
- 28.30 s pan ×1 (pan 0, 14.8%), 2–98% 270 ms, 10–90% 180 ms, peak 0.75, overshoot 22%
- 31.60 s pan ×1.027 (pan 9.1, 0%), 2–98% 420 ms, 10–90% 160 ms, peak 0.66
- (5 more under 150 ms, ×1.1 or 5% of the frame: blur, UI changes or tracker noise)

**What the instrument can read.** 24 fps, still 91%, 16 shots at a 2.25 s median: held frames for reading. The one clean fit (31.60, out-expo, rms 2.8%) is the logo sliding in, not a camera move.

### Curve fits

RMS error as % of the move's travel; the same fit recovers cutscene 0.3.0's own push at 0.16%.

| Move            | Best fit                 | Next other curve             | cutscene 0.3.0's curve |
| --------------- | ------------------------ | ---------------------------- | ---------------------- |
| pan 9% at 31.60 | out-expo, 375 ms (2.75%) | in-out-quint, 448 ms (3.21%) | 4.01% (305 ms)         |

Autofit left out 1 whose best fit was above 3% (the tracker, not a curve).

### Shot list

| Time (s)    | Length (s) | Framing         | What happens                                                                                                                                    | Out                  |
| ----------- | ---------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| 0.00–2.42   | 2.42       | card            | 'One s…' builds to 'One shared brain for every agent'                                                                                           | dissolve             |
| 2.42–4.75   | 2.33       | system          | terminal, phone and Notion Memories in one frame, arrows from both to the page                                                                  | dissolve             |
| 4.75–7.42   | 2.67       | card            | 'Save your memories and skills to Notion'                                                                                                       | hard cut             |
| 7.42–16.00  | 8.58       | terminal → page | the terminal agent saves a preference; 'Let's also push the website launch to next Friday' typed; the Memories page gains the entry beside it   | hard cuts, dissolves |
| 16.00–18.42 | 2.42       | card            | 'Bring them with you to any agent'                                                                                                              | hard cut             |
| 18.42–31.25 | 12.83      | page → phone    | 'Can you write a website project update for t…' typed on the phone; Memories with an arrow to the phone; the phone's answer uses the saved date | dissolves            |
| 31.25–36.46 | 5.21       | logo            | the Notion logo, held 5.2 s                                                                                                                     | end                  |

### By eye

- **Zoom:** the three surfaces at about ×0.5 each in the three-up; the terminal and the phone alone at ×1–1.5
- **Cards:** 'One shared brain for every agent', 'Save your memories and skills to Notion', 'Bring them with you to any agent'; logo
- **Cursor:** none; typing carets
- **Frame:** warm off-white; windows with soft shadows; drawn arrows between them
- **Aspect:** 16:9, 1280×720, 24 fps
- **Sound:** an audio track with rhythmic onsets (not listened to)

### Frame-level beats

Read from 10-frame strips around 7 cuts, 1 dissolve and 1 move; 1 f = 41.7 ms at 24 fps.

- **The system shot holds for 2.3 s with only its arrows alive** (3.29–4.75 s): the terminal (top left), the phone (bottom left) and the Memories page (right) sit in one frame; arrows from the two agents to the page are the only thing that changes.
- **Card → the same layout, closer.** At 7.42 s 'Save your memories and skills to Notion' cuts on frame 0 to the terminal at the left with the Memories page at the right edge, both larger than in the system shot and in the same left/right order. The map shot taught where things are; the close shot keeps them there.
- **The terminal types while the page waits.** In three consecutive 'cuts' (9.38, 10.71, 11.88 s) the frame is locked and only the terminal's text advances a block at a time; the page at the right gains its entry after the last one. The measured cuts are the agent's output, not edits.
- **Card → phone, rising.** At 18.42 s 'Bring them with you to any agent' cuts to the phone, which slides up about 10% over 5 frames with its composer below; the device enters already moving.
- **Phone → logo on frame 0, then the wordmark slides out.** The mark is centred at 31.25 s; about 0.4 s later it moves left about 4% as 'Notion' fades in to its right (31.60 s), and the lockup holds for 5 s.

**Eye at the cuts.** Card → terminal (7.42 s): from the centre to the terminal at about 40%, 10%. Card → phone (18.42 s): centre to centre, 0%. Phone → logo (31.25 s): 0%. Inside the paired shot the eye crosses about 45% from terminal to page, by an arrow drawn on screen rather than by a cut. 3 of 7 measured cuts are true edits, all on the measured frame.

## 2. Classify

Hand-edited feature film for a cross-tool feature. Conventions: claim cards, a multi-surface composition with connectors, typed prompts, a long logo hold.

## 3. Diagnose

- Three real surfaces share one frame, joined by arrows. → A system diagram made of the product's own UI: juxtaposition plus connectors shows the data flow without narration.
- Shots hold 2.25 s at the median; still 91%. → Reading time: terminal text needs a held frame to be read at all.
- The memory saved in the terminal is the one the phone's answer uses. → Setup and payoff across surfaces: the proof is the same fact arriving elsewhere.
- Terminal text is set small in the three-up. → Legibility: the composition favours the diagram over the words in it.

## 4. Prescribe

- _confirms_: Two or three surfaces side by side for parallel action (Cursor, Family, Figma, Notion). (split frame (Part 2))
- _new_: Draw a connector between two framed surfaces when the story is data moving between them. (renderer annotation (not built))
- _confirms_: Close the loop: the fact saved in one scene is used in the next. (reel script (skill))

## 5. Critique

- **I like:** The arrows between three real screens draw the architecture with nothing but the product's UI.
- **I wish:** The terminal is too small in the three-up to read the memory being saved; a cut to it at ×1.5 comes only later.
- **I wonder:** Could a reel compose two scenes recorded separately into one frame with a connector between them?

## Not for us

- A terminal agent and a phone app outside the app under test.
