# Cursor: side chats

- **Video:** https://video.twimg.com/amplify_video/2075655402469957632/vid/avc1/1280x720/ls3CnGpgxGpO8fYU.mp4?tag=28
- **Found on:** https://x.com/cursor_ai/status/2075686268113916023
- **Maker:** Cursor. **Kind:** launch film. **Posted:** 2026-07-10. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-cursor-side-chats.json](../references/2026-11-11-cursor-side-chats.json)

**Why it's here.** One idea in 17 s, told by cuts. A wide shot of the window on a painterly backdrop. A cut to one line of text at ×3.5 where two words are selected and 'Add to Side Chat' appears. A cut back wide as the side chat opens, then a cut in to its input as a question is typed.

## 1. Describe

### Measured

17.13 s, 1280×720, 30 fps. Camera still 89% of the time. 10 shots, median 1.9 s. 9 cuts (3 dissolves); 5 moves.

Moves:

- 2.76 s push ×1.217 (pan -0.2, -0.1%), 2–98% 460 ms, 10–90% 250 ms, peak 0.01
- 5.67 s pan ×1 (pan 5, 0%), 2–98% 200 ms, 10–90% 130 ms, peak 0.98, overshoot 56%
- 7.06 s pan ×1 (pan 34.3, 0%), 2–98% 940 ms, 10–90% 500 ms, peak 0.47
- 10.48 s pan ×1 (pan 6.2, 0%), 2–98% 220 ms, 10–90% 140 ms, peak 0.98, overshoot 67%
- (1 more under 150 ms, ×1.1 or 5% of the frame: blur, UI changes or tracker noise)

**What the instrument can read.** 30 fps. The clean fit is the pan that follows the typed question: 34% of the width in 1.34 s, in-out quart (rms 0.97%; cutscene 0.3.0 1.55%).

### Curve fits

RMS error as % of the move's travel; the same fit recovers cutscene 0.3.0's own push at 0.16%.

| Move            | Best fit                      | Next other curve     | cutscene 0.3.0's curve |
| --------------- | ----------------------------- | -------------------- | ---------------------- |
| pan 34% at 7.06 | in-out-quart, 1337 ms (0.97%) | ease, 884 ms (2.65%) | 1.55% (1119 ms)        |

Autofit left out 1 moves with a cut too close.

### Shot list

| Time (s)    | Framing    | What happens                                                                                                               | Out            |
| ----------- | ---------- | -------------------------------------------------------------------------------------------------------------------------- | -------------- |
| 0.00–2.73   | wide       | the agent chat in the window on the landscape                                                                              | hard cut       |
| 2.73–5.63   | detail     | ×3.5 on 'to see how cohorts and job roles are wired'; the two words selected in orange; 'Add to Side Chat'                 | hard cuts      |
| 5.63–6.83   | wide       | the side chat opens at the right of the window                                                                             | hard cut       |
| 6.83–8.73   | detail     | ×3 on the side chat input: the 'job roles' chip, 'what kind of data do we have on' typed, the frame panning with the caret | short dissolve |
| 8.73–10.77  | wide       | the side chat answers                                                                                                      | hard cut       |
| 10.77–17.13 | card, logo | 'Side Chats Available Now'; the logo spins                                                                                 | end            |

### By eye

- **Zoom:** wide ≈ 1.0 (the window about 70% of the frame); detail ≈ ×3–3.5 (one line fills the frame)
- **Cards:** 'Side Chats Available Now' (second phrase grey); the logo
- **Cursor:** native macOS I-beam and hand, native size
- **Frame:** a painterly landscape backdrop
- **Aspect:** 16:9, 1280×720, 30 fps
- **Sound:** silent (an audio track at −91 dB)

## 2. Classify

Hand-edited feature film in the cut-not-move grammar: wide ↔ detail by hard cut. Conventions: a window on a backdrop, a single-line detail shot, a two-tone card, a spinning logo.

## 3. Diagnose

- Framing changes only by cut: wide, ×3.5, wide, ×3, wide. → Cut-not-move: a big change of scale is a cut, so no frame is spent travelling.
- The selection happens at ×3.5, where a word is a few hundred pixels wide. → Legibility at the point of action: the detail shot is sized to the smallest thing that must be read.
- The frame pans with the caret at 34% of the width in 1.34 s. → A caret-follow pan on an in-out curve keeps the newest characters in frame at reading pace.
- The card's second phrase is grey. → Two-tone type: the name in full weight, the status quieter.

## 4. Prescribe

- _confirms_: Cut between wide and detail instead of moving. (big reframe is a cut (exists))
- _confirms_: Typing close-up with a pan that follows the caret. (act.type framing (exists))
- _new_: Two-tone cards: the name in full weight, the rest grey (Cursor, v0). (cards (not built))

## 5. Critique

- **I like:** The cut to one line makes a two-word selection the entire subject of the frame.
- **I wish:** In the wide shots the window is small against a busy painting, and the side chat is hard to find.
- **I wonder:** Could act.select cut to ×3 on the selection's line and cut back wide when a panel opens?

## Not for us

- A painted backdrop.
