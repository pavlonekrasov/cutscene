# Arc: Tidy Tabs

- **Video:** https://video.twimg.com/ext_tw_video/1755252559692853249/pu/vid/avc1/1280x720/Hr1q8TgUdgmwTdsq.mp4?tag=12
- **Found on:** https://x.com/browsercompany/status/1755252656078024976
- **Maker:** The Browser Company. **Kind:** launch film. **Posted:** 2024-02-07. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-arc-tidy-tabs.json](../references/2026-11-11-arc-tidy-tabs.json)

**Why it's here.** One sentence is split across cards ('Don't worry' … 'Tab' … 'Tidy Tabs') with the proof between them, and the UI is cropped to the one component that changes, the sidebar, at about ×2.5. 20.5 s.

## 1. Describe

### Measured

20.52 s, 1280×720, 30 fps. Camera still 70% of the time. 18 shots, median 1.17 s. 17 cuts (3 dissolves); 7 moves.

Moves:

- 1.36 s pan ×1 (pan 0, 20.3%), 2–98% 1180 ms, 10–90% 980 ms, peak 0.49, overshoot 3%
- 2.70 s pan ×1 (pan 0, 27.3%), 2–98% 1570 ms, 10–90% 1290 ms, peak 0.36, overshoot 2%
- 6.25 s pull ×0.446 (pan 16.5, 84.8%), 2–98% 1110 ms, 10–90% 910 ms, peak 0.95
- (4 more under 150 ms, ×1.1 or 5% of the frame: blur, UI changes or tracker noise)

**What the instrument can read.** The camera barely moves; what moves is a crop. The one pull (×0.45 at 6.25 s) reveals the page beside the sidebar.

### Curve fits

RMS error as % of the move's travel; the same fit recovers cutscene 0.3.0's own push at 0.16%.

| Move               | Best fit                                      | Next other curve                                     | cutscene 0.3.0's curve |
| ------------------ | --------------------------------------------- | ---------------------------------------------------- | ---------------------- |
| pull ×0.45 at 6.25 | AE easy ease on linear scale, 1505 ms (2.21%) | spring ζ=0.8 on linear scale, ω 3/s, 1250 ms (4.63%) | 4.13% (2209 ms)        |

Autofit left out 2 moves with a cut too close.

### Shot list

| Time (s)    | Framing                               | What happens                                                                                  | Out                            |
| ----------- | ------------------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------ |
| 0.10–1.30   | card                                  | 'Don't worry'                                                                                 | hard cut                       |
| 1.30–3.94   | detail: the sidebar on a forest photo | an untidy tab list; the list scrolls 20–27%                                                   | dissolve 0.47 s                |
| 3.94–5.54   | card                                  | 'Tab'                                                                                         | hard cut                       |
| 5.54–8.54   | detail → pull ×0.45                   | the list, then the page beside it                                                             | hard cut                       |
| 8.54–9.68   | card                                  | 'Tidy Tabs'                                                                                   | hard cut                       |
| 9.68–14.88  | detail, five shots                    | the broom 'Clear' control is pressed; tabs regroup under titled headings, across three themes | hard cuts, two short dissolves |
| 14.88–16.05 | card                                  | 'Now available in Arc'                                                                        | hard cut                       |
| 16.05–20.52 | detail, logo, URL                     | one last tidy on a mint theme; the Arc logo; 'arc.net'                                        | end                            |

### By eye

- **Zoom:** the sidebar alone fills half the frame (about ×2.5 its size in a full window); one pull-back to sidebar plus page
- **Cards:** 5, bold white on Arc blue: 'Don't worry', 'Tab', 'Tidy Tabs', 'Now available in Arc', 'arc.net'; plus the logo; each 1.1–1.8 s
- **Cursor:** native macOS pointer at the enlarged scale
- **Frame:** the sidebar crop sits on a full-bleed photo (forest, clouds, salmon), the user's Arc theme
- **Aspect:** 16:9, 30 fps
- **Sound:** an audio track with rhythmic onsets (not listened to)

### Frame-level beats

- Cards and UI alternate at ~1.2 s each (median shot 1.17 s); the press on 'Clear' lands in the first frames of its shot, so the regrouping fills the rest of it.

## 2. Classify

Hand-edited feature reel of real UI, cropped to a component and set on photo backdrops (Arc's themes). Conventions: brand-colour cards, cut-not-move, a URL end card.

## 3. Diagnose

- Only the sidebar is on screen when it's the subject. → Crop to the component: the frame holds exactly the element that changes, so nothing competes for attention.
- The sentence 'Don't worry … Tab … Tidy Tabs' is interrupted by its own evidence. → Call and response: claim, proof, claim, proof keeps the viewer reading the UI as the answer to the card.
- Each theme change happens at a cut. → Continuity by component: the sidebar keeps its position across the cut while the backdrop changes, so the cut reads as the same object in a new context (a match cut on position).

## 4. Prescribe

- _new_: Crop to the component: frame one element's box at large scale instead of pushing into the whole window. (camera: focus a locator's box)
- _confirms_: Hand-edited reels reframe by cutting, not by moving. (CAMERA.cutOver)
- _new_: A sentence split across cards, interleaved with UI. (cards)

## 5. Critique

- **I like:** Every UI shot answers the card before it; nothing is shown that the copy didn't promise.
- **I wish:** The crop hides the page, so it's never clear which tab the user is on when the sidebar tidies.
- **I wonder:** Would a match cut on the sidebar (same box, new theme) work as cutscene's transition between two scenes of one app?

## Not for us

- Photo theme backdrops are Arc's own brand; cutscene's backdrop stays the app's neutral.
