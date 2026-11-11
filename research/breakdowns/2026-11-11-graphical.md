# Graphical, by Josh Puckett

- **Video:** https://video.twimg.com/amplify_video/2107171184890806272/vid/avc1/1280x720/g28loRkOwJMo0OYL.mp4?tag=29
- **Found on:** https://x.com/joshpuckett/status/2107175379903594714
- **Maker:** Josh Puckett. **Kind:** launch film. **Posted:** 2026-10-05. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-graphical.json](../references/2026-11-11-graphical.json)

**Why it's here.** A 39 s film for a theming tool, with no camera movement. A bento grid of components fills the frame and re-themes live, in green, purple and red, as one colour slider in a Theme panel is dragged. A slider component is then restyled from its own panel. It ends on 'Available Today' with orbiting icons, held 15 s.

## 1. Describe

### Measured

38.95 s, 1280×720, 60 fps. Camera still 100% of the time. 29 shots, median 0.98 s. 28 cuts (8 dissolves); 2 moves.

**What the instrument can read.** 60 fps, still 100%, no moves. The end card's orbiting icons make the tracker see a cut every second; those are not real cuts.

### Shot list

| Time (s)    | Length (s) | Framing   | What happens                                                                       | Out                        |
| ----------- | ---------- | --------- | ---------------------------------------------------------------------------------- | -------------------------- |
| 0.00–5.18   | 5.18       | grid      | a bento grid of components in green, then purple, then red                         | dissolves                  |
| 5.18–14.20  | 9.02       | theme     | the dark Theme panel at right; the colour slider dragged; the whole grid re-themes | hard cuts, short dissolves |
| 14.20–23.72 | 9.52       | component | a Volume slider; its Thumb panel; the thumb and track restyled                     | hard cuts                  |
| 23.72–38.95 | 15.23      | card      | 'Available Today' with icons orbiting                                              | end                        |

### By eye

- **Zoom:** wide ×1, the grid filling the frame
- **Cards:** 'Available Today' with orbiting icons (15 s)
- **Cursor:** the system pointer
- **Frame:** full-bleed, light
- **Aspect:** 16:9, 1280×720, 60 fps
- **Sound:** none: no audio track

### Frame-level beats

Read from 10-frame strips around 6 cuts and 1 dissolve; 1 f = 16.7 ms at 60 fps.

- **A theme change fades tile by tile.** At 2.68 s the bento grid's lower row loses its ink over about 6 frames while the top row holds; the new theme then comes up in the same tiles. The grid's geometry never changes, so the eye compares colour and type only.
- **A label grows in place, live.** In the component shot (17.47 s) the 'Volume' label above the slider scales up over 10 frames as its size is dragged in the dark panel at the right; the label in the second tile grows with it. Control and result share one locked frame, about 60% of the width apart.
- **The end card is 15 s of one orbit.** From 23.72 s 'Available Today' sits centred with about twelve component icons circling it at a few degrees a second; all five 'cuts' measured after 26.78 s are the orbit, not edits. The card is 39% of the film.
- **No pointer is visible in the strips.** Changes happen to the panel's values and to the component at once; the hand is implied.

**Eye at the cuts.** No true hard cut with clear picture on both sides was found after the theme sequence: the film is locked frames joined by fades. Inside a shot the eye travels from the panel (right, about 85%) to the component (left, about 25–45%) and back, by reading, not by cutting.

## 2. Classify

Product film for a design tool: one control, a frame-wide consequence. Conventions: purpose-built showcase content, a locked frame, a long animated end card.

## 3. Diagnose

- One slider re-themes the whole grid. → Cause and effect at scale: a small input, a frame-wide output, which is the product's claim made visible.
- No camera movement. → Locked frame: when the whole surface changes, any move would compete with it.
- The grid is purpose-built to show many component types at once. → Showcase content: the demo's data is designed to make the change legible.
- The end card is 15 s, 38% of the runtime. → Pacing: the longest beat is the one with the least information.

## 4. Prescribe

- _confirms_: When an action changes the whole surface, hold wide (Family dark mode, Graphical). (act.wide (exists))
- _new_: Seed the demo with content designed to show the change (many component types, a full grid). (scene fixtures (skill))

## 5. Critique

- **I like:** Dragging one slider re-themes forty components at once: the claim, visible in a second.
- **I wish:** The 15 s end card is over a third of the film.
- **I wonder:** Could a reel detect a surface-wide change (most pixels changing) and hold wide instead of zooming?

## Not for us

- An animated end card with orbiting icons.
