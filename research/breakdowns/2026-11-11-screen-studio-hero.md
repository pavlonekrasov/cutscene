# Screen Studio: home page hero

- **Video:** https://screen.studio/landing/hero/hero-recording.mp4
- **Found on:** https://screen.studio (the showcase wall on the home page)
- **Maker:** Screen Studio (the tool's own demo). **Kind:** showreel. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-screen-studio-hero.json](../references/2026-11-11-screen-studio-hero.json)

**Why it's here.** The tool's own statement of its look: webcam bubble, word-by-word captions, motion blur on every move, a window on a dark wallpaper.

## 1. Describe

### Measured

5.55 s, 1920×1080, 60 fps. Camera still 92% of the time. 6 shots, median 1.1 s. 5 cuts (4 dissolves); 5 moves.

**What the instrument can read.** Motion blur on every move: cut candidates and moves are both unreliable.

### Shot list

| Time (s)  | Length (s) | Framing  | What happens                                                                                                   | Out |
| --------- | ---------- | -------- | -------------------------------------------------------------------------------------------------------------- | --- |
| 0.00–5.55 | 5.55       | one take | Google Sheets: select a column, Format → Number → Accounting, the column reformats; pushes and pulls with blur | —   |

### By eye

- **Zoom:** ×1.5–2
- **Cards:** none; captions word by word at the bottom centre
- **Cursor:** enlarged pointer
- **Frame:** window on a dark wallpaper; a rounded-square webcam bubble, lower left
- **Aspect:** 16:9, 1920×1080, 60 fps
- **Sound:** none in this file

### Frame-level beats

Read from 10-frame strips around 1 cut and 1 dissolve; 1 f = 16.7 ms at 60 fps. A 5.6 s loop, so two strips cover a third of it.

- **A submenu opens between two frames and the caption changes 2 frames later.** At 2.45 s the Format menu's 'Number' submenu appears at the right of the pointer in column 6, and the caption at the bottom centre goes from 'your numbers' to 'your numbers and' in column 8: UI and caption are offset by about 33 ms, not synchronised.
- **The caption adds a word at a time in a fixed pill.** White type on a black rounded box, about 12% of the frame wide, at 50% × 88%; the box widens to the right as words are added and its left edge stays put.
- **The pointer turns to a hand over the menu item** (3.55 s, column 4) and stays on 'Accounting' for 3 frames before the press.
- **The push starts on the press and smears the whole frame.** From column 7 of the 3.55 s strip the spreadsheet scales up with heavy blur: about 15% of scale in 4 frames. The menu is still open in the blur, so the result (the column reformatting) is first seen sharp, after the move.
- **The presenter's camera tile stays put through the push**, at the bottom left, about 20% of the frame wide: it is outside the camera's transform, and it covers the first three rows of the sheet.

**Eye at the cuts.** There are no edits. Menu → submenu: about 10% right. Submenu → reformatted column: about 15% right, carried by the push. The 1 measured cut is the submenu opening.

## 2. Classify

Screen Studio's own hero clip: its signature look. Conventions: webcam bubble, word-by-word captions, motion blur on moves.

## 3. Diagnose

- Captions word by word at the bottom centre. → Captions carry narration for muted autoplay.
- Motion blur on every camera move. → Blur smooths fast moves at the cost of legibility in motion.

## 4. Prescribe

- _new_: Motion blur on camera moves (Screen Studio's default). (renderer (not built))

## 5. Critique

- **I like:** Captions make the clip work with the sound off.
- **I wish:** The webcam bubble and blur are a recognisable template look.
- **I wonder:** Could cutscene's caption track take word timings from a scene's script?

## Not for us

- The webcam bubble (cutscene has no camera feed) and spoken captions (no narration).
