# Notion: setting a priority on a board

- **Video:** https://video.twimg.com/ext_tw_video/1882057099418476544/pu/vid/avc1/1280x720/adiuHrc53Fu2hqt5.mp4?tag=12
- **Found on:** https://screen.studio (the showcase wall on the home page)
- **Maker:** Notion, made with Screen Studio. **Kind:** showreel. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-notion-board-priority.json](../references/2026-11-11-notion-board-priority.json)

**Why it's here.** A shallow push (×1.24) and follow-pans that keep each card in the middle as the pointer works across the board; it ends wide on the List view.

## 1. Describe

### Measured

12.87 s, 1280×720, 24 fps. Camera still 63% of the time. 9 shots, median 1.71 s. 8 cuts (5 dissolves); 7 moves.

Moves:

- 0.63 s pan ×1 (pan 0, 9.9%), 2–98% 280 ms, 10–90% 220 ms, peak 0.87, overshoot 25%
- 1.04 s pan ×1.001 (pan 0, 6.7%), 2–98% 360 ms, 10–90% 290 ms, peak 0.23
- 2.80 s push ×1.24 (pan -1.9, 6.6%), 2–98% 310 ms, 10–90% 250 ms, peak 0.25, overshoot 6%
- 5.80 s pan ×1 (pan 4.5, -12%), 2–98% 850 ms, 10–90% 490 ms, peak 0.09
- 9.00 s pan ×1 (pan -6.7, -12.6%), 2–98% 1160 ms, 10–90% 830 ms, peak 0.15
- 11.45 s pull ×0.715 (pan 4.5, 15.9%), 2–98% 920 ms, 10–90% 550 ms, peak 0.19
- (1 more under 150 ms, ×1.1 or 5% of the frame: blur, UI changes or tracker noise)

**What the instrument can read.** Good on the pans; the dropdown opening reads as a cut candidate.

### Curve fits

RMS error as % of the move's travel; the same fit recovers cutscene 0.3.0's own push at 0.16%.

| Move                     | Best fit                                   | Next other curve                            | cutscene 0.3.0's curve |
| ------------------------ | ------------------------------------------ | ------------------------------------------- | ---------------------- |
| follow-pan 13.7% at 5.80 | out-quint (0.22,1,0.36,1), 1351 ms (0.29%) | spring ζ 1, ω 7.2/s, settles 0.81 s (1.26%) | 7.48%                  |

### Shot list

| Time (s)   | Length (s) | Framing                        | What happens                                                                                                                                                | Out |
| ---------- | ---------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| 0.00–12.87 | 12.87      | wide → ×1.24 → wide (one take) | pan down to the board (0.63), push (2.80), set 'Medium' from the priority menu (3.0–4.0), follow-pans (5.80, 9.00), pull-out ×0.72 to the List view (11.45) | —   |

### By eye

- **Zoom:** working ×1.24, the shallowest in the set
- **Cards:** none
- **Cursor:** enlarged pointer
- **Frame:** window on a light grey backdrop
- **Aspect:** 16:9, 1280×720, 24 fps
- **Sound:** none

### Frame-level beats

- Each follow-pan starts as the pointer heads for the next card and settles before it arrives.

Read from 10-frame strips around 2 cuts, 1 dissolve and 2 moves; 1 f = 41.7 ms at 24 fps.

- **The opening pan grows the window as it moves.** In the first 0.5 s the window goes from about 70% of the frame, with the page's cover image at the top, to full width with the board's three columns in view; the grey backdrop is gone by column 3. The pointer is in the frame from the first column, at about 55% × 40%.
- **The push follows the pointer down and left.** From 2.80 s the pointer travels to the first column's card (about 30% × 65%) and the frame scales ×1.24 around it over about 1.2 s; a small dark tooltip appears beside the pointer at column 2, before the push has ended.
- **The menu opens under the pointer after the camera has stopped**, and the choice is 2 rows down: the pointer moves about 5% of the frame to reach it.
- **The changed card is tinted.** After the choice the first column's card carries a blue wash (4.83 s) for at least 10 frames, where the neighbouring columns stay white and yellow: the result is marked by colour, in place, without a camera move.
- **The measured cuts are in-UI changes**: the menu closing (4.83 s), a second card taking a grey hover wash across 5 frames (7.29 s), and its property chip changing (8.25 s). Each is under 5% of the frame.
- **The pointer is about 4% of the frame high**: an enlarged black arrow with a white edge, legible in every 176 px strip cell.

**Eye at the cuts.** There are no edits; the film is one take. Card 1 → card 2: about 25% right, led by the pointer, with a follow-pan of a few percent. All 2 measured cuts are UI changes.

## 2. Classify

Screen Studio clip with a shallow zoom and follow-pans. Conventions: window on light grey, enlarged pointer, end wide.

## 3. Diagnose

- Working zoom ×1.24 with pans that keep the card centred. → At shallow zoom, following beats reframing: the context stays in frame.
- Follow-pans fit out-quint at 1.35 s. → Front-loaded pans read as the camera catching up with the pointer.

## 4. Prescribe

- _contradicts_: Follow-pans use the same front-loaded curve as the pushes. (camera.ease)
- _confirms_: End wide on the result. (reel structure)

## 5. Critique

- **I like:** The shallow zoom keeps the whole board readable while the pans follow the work.
- **I wish:** At ×1.24 the priority labels stay small; the change is seen more than read.
- **I wonder:** Is there a zoom below which cutscene should pan instead of reframing?
