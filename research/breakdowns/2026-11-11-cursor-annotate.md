# Cursor: Annotate (design mode)

- **Video:** https://video.twimg.com/amplify_video/2115159554040504320/vid/avc1/1280x720/GuPJK_rCwUlPsrBU.mp4?tag=16
- **Found on:** https://x.com/cursor_ai/status/2115159585548021814
- **Maker:** Cursor. **Kind:** launch film. **Posted:** 2026-10-27. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-cursor-annotate.json](../references/2026-11-11-cursor-annotate.json)

**Why it's here.** A 44 s chaptered film. A one-line card names each feature ('Open your app in the browser', 'Leave comments for your agents', 'Dial in your styles, live', 'Sketch what you want to build', 'Check responsiveness across every screen size'), then one or two locked shots of the window show it. The camera never moves.

## 1. Describe

### Measured

43.57 s, 1280×720, 30 fps. Camera still 100% of the time. 29 shots, median 1.6 s. 28 cuts (5 dissolves); 1 moves.

**What the instrument can read.** 30 fps, still 100%, no moves: every framing change is a cut.

### Shot list

| Time (s)    | Framing    | What happens                                                                               | Out       |
| ----------- | ---------- | ------------------------------------------------------------------------------------------ | --------- |
| 0.00–5.90   | cards      | 'New in Cursor / Annotate'; 'Open your app in' → '… the browser'                           | hard cuts |
| 5.90–8.93   | browser    | localhost typed; the Lumen site loads; the Annotate button                                 | hard cuts |
| 8.93–15.57  | comment    | 'Leave comments for your agents'; the headline selected; a comment typed; sent             | hard cuts |
| 15.57–22.53 | styles     | 'Dial in your styles, live'; a style panel on the button; its colour changes               | hard cuts |
| 22.53–33.23 | sketch     | 'Sketch what you want to build'; a box drawn in red; the agent builds a newsletter section | hard cuts |
| 33.23–40.57 | responsive | 'Check responsiveness across every screen size'; a device list; the page at phone width    | dissolves |
| 40.57–43.57 | logo       | the Cursor logo on black                                                                   | end       |

### By eye

- **Zoom:** wide 1.0, or working ≈ ×1.4 with the window cropped by the frame edge
- **Cards:** 6: 'New in Cursor / Annotate' and five feature lines, each built word by word; the logo
- **Cursor:** native arrow, native size
- **Frame:** a blurred photographic backdrop (teal and orange)
- **Aspect:** 16:9, 1280×720, 30 fps
- **Sound:** none: no audio track

## 2. Classify

Hand-edited chaptered feature film, locked frame. Conventions: card → proof per feature, word-by-word card builds, a window cropped by the frame edge on a blurred backdrop.

## 3. Diagnose

- Five chapters, each a card then one or two locked shots. → Chunking: one claim and one proof per chapter keeps five features distinct.
- Card text builds word by word. → Stagger as pacing: the build sets reading speed.
- No camera movement in 44 s. → Locked frame: the UI's own changes (a panel, a sketch, a resize) are the only motion.
- Every chapter has the same rhythm (card ~2 s, shots ~4 s). → Rhythm without development: nothing builds toward the end.

## 4. Prescribe

- _confirms_: Card → proof per chapter. (cards (not built))
- _confirms_: Cut-not-move; lock the frame when the UI moves. (camera off per scene (exists: act.wide))
- _confirms_: Working zoom ≈ 1.4 with the window cropped by the frame edge. (working zoom (exists))

## 5. Critique

- **I like:** Five features in 44 s stay distinct because each gets its own card.
- **I wish:** Every chapter keeps the same pace; shortening the later ones would give the film a build.
- **I wonder:** Could a reel generate a chapter card from each scene's title and cut straight to a locked working shot?

## Not for us

- A blurred photo backdrop.
