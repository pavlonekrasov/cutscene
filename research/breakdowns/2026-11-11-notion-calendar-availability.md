# Notion Calendar: sharing availability

- **Video:** https://video.twimg.com/ext_tw_video/1864761742334558209/pu/vid/avc1/1280x720/dH1TP0eqh37bOLkS.mp4?tag=12
- **Found on:** https://screen.studio (the showcase wall on the home page)
- **Maker:** Notion, made with Screen Studio. **Kind:** showreel. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-notion-calendar-availability.json](../references/2026-11-11-notion-calendar-availability.json)

**Why it's here.** Holds one zoom for 15 s and follows the work with slow, even pans rather than reframing: the calmest camera in the set, ending wide on 'Snippet copied to clipboard'.

## 1. Describe

### Measured

17.29 s, 1280×720, 24 fps. Camera still 77% of the time. 7 shots, median 2.42 s. 6 cuts (1 dissolves); 5 moves.

Moves:

- 0.35 s push ×1.398 (pan 1.1, 2%), 2–98% 890 ms, 10–90% 510 ms, peak 0.17
- 4.44 s pan ×1 (pan 2.4, -7.5%), 2–98% 450 ms, 10–90% 340 ms, peak 0.41, overshoot 4%
- 9.15 s pan ×0.999 (pan 0, 17.2%), 2–98% 880 ms, 10–90% 520 ms, peak 0.16
- 14.28 s pan ×1 (pan 0, -16.8%), 2–98% 880 ms, 10–90% 520 ms, peak 0.21
- 16.24 s pull ×0.719 (pan -5.6, 11.2%), 2–98% 820 ms, 10–90% 520 ms, peak 0.22

**What the instrument can read.** Good.

### Curve fits

RMS error as % of the move's travel; the same fit recovers cutscene 0.3.0's own push at 0.16%.

| Move                     | Best fit                                           | Next other curve                            | cutscene 0.3.0's curve |
| ------------------------ | -------------------------------------------------- | ------------------------------------------- | ---------------------- |
| push ×1.40 at 0.35       | out-quint 1406 ms (0.40%)                          | spring ζ 1, ω 7.0/s, settles 0.83 s (0.80%) | 4.48%                  |
| follow-pan 17.2% at 9.15 | spring ζ 1, ω 6.6/s, settles 98% in 0.88 s (0.43%) | out-quint 1463 ms (0.67%)                   | 4.59%                  |

### Shot list

| Time (s)   | Length (s) | Framing                        | What happens                                                                                                                                             | Out |
| ---------- | ---------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| 0.00–17.29 | 17.29      | wide → ×1.40 → wide (one take) | push (0.35), drag out a slot, the availability panel, recurrence menu (12 s), follow-pans (9.15 down 17%, 14.28 up 17%), pull ×0.72 (16.24) to the toast | —   |

### By eye

- **Zoom:** working ×1.40
- **Cards:** none
- **Cursor:** enlarged pointer
- **Frame:** window on a light grey backdrop
- **Aspect:** 16:9, 1280×720, 24 fps
- **Sound:** none

### Frame-level beats

- The establishing wide is only 0.35 s: the window is already familiar from the first frame.

Read from 10-frame strips around 5 cuts, 1 dissolve and 2 moves; 1 f = 41.7 ms at 24 fps.

- **The push ends by column 3.** The window on its grey backdrop (2 columns) fills the frame by about 0.45 s; the pointer stays at about 50% × 70% of the frame through the move, so the push reads as the window coming to the pointer.
- **A dragged slot is the one saturated block.** The new availability slot is drawn in orange-red at about 35% × 80% (4.44 s), against pale peach events; it is about 5% of the frame wide.
- **The pan follows the pointer across the frame.** In the 4.44 s pan (1.1 s) the pointer travels from the slot (40% × 85%) up to the side panel (90% × 25%), and the frame shifts about 17% with it; a dark menu opens under the pointer in column 8, after the frame has stopped. The pointer is motion-blurred in columns 3–5.
- **Dark menus on a white app.** Both menus (6.67 and 10.50 s) are near-black panels about 12% of the frame wide: the highest-contrast element when open. Each opens between two frames and closes between two frames (7.21, 12.92 s); the measured cuts are these.
- **The pointer's travel inside a menu is under 5% of the frame**, at about 1 row every 3 frames.
- **The panel's content changes after each menu closes**: a paragraph and a blue button appear at the top right (6.67 s), a field row at the bottom (12.92 s). The change is next to the menu that caused it, within 10%.
- **The last press is at the top right corner** (15.71 s): the pointer rests on the blue button at about 95% × 12% for 10 frames; the pull starts 0.5 s later.

**Eye at the cuts.** There are no edits. Slot → panel: 50% across and 60% up, led by the pointer over 1.1 s. Menu → result: within 10%. All 5 measured cuts are menus opening or closing.

## 2. Classify

Screen Studio clip that holds one zoom and follows with slow pans. Conventions: window on light grey, an end on the success message.

## 3. Diagnose

- One zoom for 15 s; pans as a ζ 1 spring, ω 6.6/s. → Continuity: following at the push's own pace keeps orientation.
- It ends wide on 'Snippet copied to clipboard'. → End on the outcome.

## 4. Prescribe

- _contradicts_: Follow-pans: critically damped spring, ω ~6.6/s. (camera.ease, CAMERA.pan)
- _confirms_: End wide on the result. (reel structure)

## 5. Critique

- **I like:** The calmest camera in the set: nothing reframes that doesn't have to.
- **I wish:** The success message is small in the wide end frame.
- **I wonder:** Could the end frame push slightly toward the toast instead of pulling fully wide?
