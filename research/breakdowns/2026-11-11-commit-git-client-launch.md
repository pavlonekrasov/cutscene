# Commit (Tailwind CSS): launch page

- **Video:** https://video.twimg.com/ext_tw_video/1646487353135906816/pu/vid/1106x720/faB-HNWFtxAUZFX_.mp4?tag=12
- **Found on:** https://screen.studio (the showcase wall on the home page)
- **Maker:** Tailwind CSS, made with Screen Studio. **Kind:** showreel. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-commit-git-client-launch.json](../references/2026-11-11-commit-git-client-launch.json)

**Why it's here.** A launch page read like a document: a typographic open, then one long reading-speed scroll down the changelog with deep pushes into the screenshot.

## 1. Describe

### Measured

30.58 s, 1106×720, 60 fps. Camera still 56% of the time. 5 shots, median 5.4 s. 4 cuts (2 dissolves); 10 moves.

Moves:

- 0.04 s pull ×0.258 (pan 110.6, 98.6%), 2–98% 1130 ms, 10–90% 700 ms, peak 0.2
- 2.82 s push ×1.962 (pan 65.5, 107.6%), 2–98% 2220 ms, 10–90% 1830 ms, peak 0.02
- 5.46 s pan ×1 (pan 0, 403.9%), 2–98% 4730 ms, 10–90% 4190 ms, peak 0.04
- 11.41 s pull ×0.65 (pan -21, -79.8%), 2–98% 640 ms, 10–90% 590 ms, peak 0.04, overshoot 1%
- 12.67 s push ×3.467 (pan 30.9, -28.8%), 2–98% 780 ms, 10–90% 430 ms, peak 0.08
- 15.13 s pan ×0.716 (pan -205.5, 143.8%), 2–98% 1920 ms, 10–90% 1510 ms, peak 0.78
- 22.39 s push ×1.406 (pan -2.1, 23.3%), 2–98% 860 ms, 10–90% 490 ms, peak 0.11
- 27.85 s pull ×0.276 (pan 96.5, -64.3%), 2–98% 1120 ms, 10–90% 690 ms, peak 0.19
- (2 more under 150 ms, ×1.1 or 5% of the frame: blur, UI changes or tracker noise)

**What the instrument can read.** The long scroll fits no ease (it runs at a steady reading speed); motion blur splits the fast moves.

### Shot list

| Time (s)   | Framing                          | What happens                                                                                                                                                                 | Out |
| ---------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| 0.00–30.58 | title, then one take of the page | title open (0–1), wide page, slow push ×1.96 over 2.2 s, scroll 4 screens in 4.7 s (5.46), push ×3.47 into the screenshot (12.67), pull to the wide page with the panel open | —   |

### By eye

- **Zoom:** ×1.4–3.5
- **Cards:** an animated title open ('Commit', 'Open-source Git client') with motion blur
- **Cursor:** enlarged pointer
- **Frame:** window on a magenta wallpaper
- **Aspect:** ~1.54:1, 1106×720, 60 fps
- **Sound:** none

### Frame-level beats

- The reading scroll covers 4 screen heights in 4.7 s, about 0.85 screens a second.

## 2. Classify

Screen Studio launch page read like a document: a typographic open, then a long scroll. Conventions: animated title, reading-speed scroll, deep pushes.

## 3. Diagnose

- A steady scroll at about 0.85 screens/s, not eased. → Linear motion for constant activity: a scroll at reading speed reads as reading.
- Text flies in with motion blur at the open. → Template motion: blur on type costs legibility for energy.

## 4. Prescribe

- _new_: A long scroll runs at a steady reading speed (~0.85 screens/s), not eased. (act.scroll pace (not proposed))

## 5. Critique

- **I like:** The steady scroll makes a changelog feel read, not presented.
- **I wish:** The blurred fly-in title is hard to read and looks like a preset.
- **I wonder:** Should long scrolls in cutscene be linear at reading speed instead of eased?

## Not for us

- Text flying in with motion blur: hard to read and a template look.
