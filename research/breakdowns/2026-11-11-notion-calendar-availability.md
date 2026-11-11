# Notion Calendar: sharing availability

- **Video:** https://video.twimg.com/ext_tw_video/1864761742334558209/pu/vid/avc1/1280x720/dH1TP0eqh37bOLkS.mp4?tag=12
- **Found on:** https://screen.studio (the showcase wall on the home page)
- **Maker:** Notion, made with Screen Studio. **Kind:** showreel. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-notion-calendar-availability.json](../references/2026-11-11-notion-calendar-availability.json)

**Why it's here.** Holds one zoom for 15 s and follows the work with slow, even pans rather than reframing: the calmest camera in the set, ending wide on 'Snippet copied to clipboard'.

**What the instrument can read.** Good.

## Measured

17.29 s, 1280×720, 24 fps. Camera still 77% of the time. 6 cut candidates; 5 moves.

Moves:

- 0.35 s push ×1.398 (pan 1.1, 2%), 2–98% 890 ms, 10–90% 510 ms, peak 0.17
- 4.44 s pan ×1 (pan 2.4, -7.5%), 2–98% 450 ms, 10–90% 340 ms, peak 0.41, overshoot 4%
- 9.15 s pan ×0.999 (pan 0, 17.2%), 2–98% 880 ms, 10–90% 520 ms, peak 0.16
- 14.28 s pan ×1 (pan 0, -16.8%), 2–98% 880 ms, 10–90% 520 ms, peak 0.21
- 16.24 s pull ×0.719 (pan -5.6, 11.2%), 2–98% 820 ms, 10–90% 520 ms, peak 0.22

Curve fits (RMS error as % of the move's travel; the same fit recovers cutscene 0.3.0's own push at 0.16%):

| Move                     | Best fit                                           | Next                                        | cutscene 0.3.0's curve |
| ------------------------ | -------------------------------------------------- | ------------------------------------------- | ---------------------- |
| push ×1.40 at 0.35       | out-quint 1406 ms (0.40%)                          | spring ζ 1, ω 7.0/s, settles 0.83 s (0.80%) | 4.48%                  |
| follow-pan 17.2% at 9.15 | spring ζ 1, ω 6.6/s, settles 98% in 0.88 s (0.43%) | out-quint 1463 ms (0.67%)                   | 4.59%                  |

## Shot list

| Time (s)   | Framing                        | What happens                                                                                                                                             | Out |
| ---------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| 0.00–17.29 | wide → ×1.40 → wide (one take) | push (0.35), drag out a slot, the availability panel, recurrence menu (12 s), follow-pans (9.15 down 17%, 14.28 up 17%), pull ×0.72 (16.24) to the toast | —   |

By eye:

- **Zoom:** working ×1.40
- **Cards:** none
- **Cursor:** enlarged pointer
- **Frame:** window on a light grey backdrop
- **Aspect:** 16:9, 1280×720, 24 fps
- **Sound:** none

## Frame-level beats

- The establishing wide is only 0.35 s: the window is already familiar from the first frame.

## Why it works

- Pans at the push's own pace keep the viewer oriented while the zoom stays in.

## What it teaches

- _contradicts_: Follow-pans: critically damped spring, ω ~6.6/s. (camera.ease, CAMERA.pan)
- _confirms_: End wide on the result. (reel structure)
