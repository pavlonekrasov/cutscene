# Showreel references (2026-11-09)

What top product reels on X do with the camera, speed and cards, measured before `cutscene reel` is
built. Stills stayed in scratch; nothing here reproduces a reel.

## How they were read

- **Mobbin:** the connection shows no saved items (All saved: 0 screens, 0 flows), and Mobbin's
  flows are still screenshots with no timing, so nothing there could be measured. One
  `search_flows` ("admin dashboard creating a report") confirmed it: stills only.
- **X:** Pavlo signed in to his own account in the built-in browser; read only (no likes, follows,
  replies or downloads). Searches: `"launch video"`, `"made with screen studio"`, product accounts
  (Cursor, Linear, Raycast, Vercel, Notion, Figma, v0, Dia, Attio, Framer) and designers (Emil
  Kowalski, Rauno Freiberg, Josh Puckett, shadcn, Benji Taylor), `filter:native_video`, 400+ likes.
- **Measuring:** a script in the page played each `<video>` (X's 1280×720 rendition) and compared
  consecutive frames at 192×108: a cut is a frame whose mean luma change is over 30/255; a camera
  move is a run of frames whose best-fit zoom and pan (coarse-to-fine search on a blurred image) is
  beyond noise. "Peak" is where the move's speed peaks, as a share of its length: 0.5 is a symmetric
  ease-in-out, near 0 an ease-out. Every number below was checked against a contact sheet of
  frames around it. Zoom levels are read off the frames (how much of the window shows).
- Rejected after a look: Cursor "Projects" (live action), Raycast Focus (a live-action film), Figma
  "Claude Code to Figma" (an interview). They're films, not UI reels.

## The reels

### 1. Cursor: side chats ([post](https://x.com/cursor_ai/status/2075686268113916023), 4.4K likes, 437K views)

Top-tier because one idea fills 17 s: a wide shot, a cut in to a single line of text where the
action happens (a selection), held while it happens, then a cut back out to show where it went.

| | |
| --- | --- |
| Length, shots | 17.2 s, 6 shots, 2.9 s average |
| Zoom | wide ≈ 1.0 (window ~70% of frame); detail ≈ 3–3.5× (one line of text fills the frame) |
| Moves | cut **into** a camera still settling: ×1.33 push decelerating over ~1.1 s (ease-out); pan following typed text, 31% of width in 1.03 s, peak 0.40 (ease-in-out); no overshoot |
| Speed | typing ≈ 17 chars/s (≈ 20 chars in 1.15 s); the selection drag plays at 1× |
| Cuts | hard cuts only, wide ↔ detail; framing changes by cut, not by a long move |
| Cards | white, small centred line, words appear one by one, the second phrase in grey; end card a logo, ~2.5 s (the logo spins: the one 3D touch) |
| Cursor | native macOS arrow and I-beam, native size |
| Frame | window on a painterly landscape backdrop; 16:9 |

### 2. Cursor: design mode Annotate ([post](https://x.com/cursor_ai/status/2115159585548021814), 4.1K likes)

Top-tier for its structure: a one-line chapter card names each feature, then the feature plays in a
single still shot. Easy to follow without sound.

| | |
| --- | --- |
| Length, shots | 43.6 s, 12 shots (6 cards + 6 UI), 3.6 s average |
| Zoom | each UI shot holds one framing: wide 1.0 or working ≈ 1.4 (window cropped by the frame edge) |
| Moves | none inside a shot; framing changes by cut |
| Cards | white, one centred line ("Leave comments for your agents"), written on word by word, ~2 s each; dark logo end card |
| Cursor | native arrow, native size |
| Frame | window on a blurred photographic backdrop; 16:9 |

### 3. Notion: HTML block ([post](https://x.com/NotionHQ/status/2072354853821755822), 4.7K likes, 1.5M views)

The Screen Studio grammar done well: one continuous take, the camera always where the pointer
works, and long reading moments held still.

| | |
| --- | --- |
| Length, shots | 67.6 s, one take, 0 cuts |
| Zoom | working ≈ 1.4–1.5; detail ≈ 3× once (a timeline label) |
| Moves | push-ins ×1.42 in 450–720 ms, ×1.48 in 400 ms; one fast ×2.5 in ~250 ms; pull-back ×0.57 in ~650 ms, peak 0.40, no reversal (no overshoot) |
| Scroll | the page scrolls inside a held zoom; in every measured move, zoom and scroll never overlap |
| Cards | logo end card on light grey |
| Cursor | enlarged macOS arrow, with motion blur on fast glides |
| Frame | window on light grey; 16:9 |

### 4. v0: Design Mode ([post](https://x.com/v0/status/1932892095565660490), 3.9K likes, 563K views)

| | |
| --- | --- |
| Length, shots | 24 s, one take (plus the end card) |
| Zoom | opens at detail ≈ 2.5× on the prompt, pulls back to wide; working ≈ 1.4 |
| Moves | pull-back ×0.46 in 500 ms; push-in ×1.43 in ~480 ms, peak 0.55 |
| Cuts | one dissolve between two pages mid-take |
| Cards | black logo on white, 3.5 s |
| Frame | full-bleed, no window; 16:9 |

### 5. Dia: Profiles ([post](https://x.com/diabrowser/status/2084286152580714862), 1.1K likes)

A hybrid (hands on a trackpad, then the UI); the UI half is the most consistent camera of the set.

| | |
| --- | --- |
| Length, shots | 39.7 s, 19 shots, 2.1 s average |
| Zoom | push-ins to 2.0 |
| Moves | five push-ins of ×2.0 in 467–567 ms, peak 0.36–0.42 (ease-in-out, slightly front-loaded) |
| Cards | a line of text over live footage; URL end card |
| Frame | 4:3 rendition (960×720) |

### 6. Figma: vector editing ([post](https://x.com/figma/status/2018778936482935124), 5.9K likes, 5M views)

Top-tier for anticipation: the camera pushes in and is still before the pointer starts to work.

| | |
| --- | --- |
| Length, shots | 30.7 s, 3 sections |
| Zoom | push-ins ×1.9–1.95 (to a detail) |
| Moves | 1.1–1.17 s, peak 0.50 (symmetric ease-in-out), settled before the edit starts; no overshoot (frames 0.3 s after are identical) |
| Cursor | native arrow, native size |
| Frame | full-bleed canvas; 16:9 |

### 7. Graphical, by Josh Puckett ([post](https://x.com/joshpuckett/status/2107175379903594714), 4.9K likes, 570K views)

| | |
| --- | --- |
| Length, shots | 39 s: 3.9 s intro, a ~20 s take, a 15 s end card |
| Moves | none: a still wide framing; the UI's own changes carry it |
| Cards | "Available Today" with orbiting icons, 15 s (long) |
| Frame | full-bleed; 16:9 |

### 8. shadcn: chat components ([post](https://x.com/shadcn/status/2070561306038653247), 6.5K likes, 958K views)

| | |
| --- | --- |
| Length, shots | 26 s, one take |
| Moves | one push-in ×1.38 at 1.1 s, 467 ms, peak 0.14 (ease-out), then a still working shot to the end |
| Cards | none |
| Sound | has an audio track (decoded bytes > 0; the others were read muted and not checked) |
| Frame | full-bleed white; 16:9 |

## What they share

- **Restraint.** No overshoot in any measured move. No tilt or spin on the UI (one spinning logo on
  an end card).
- **Two grammars.** One take with a follow camera (Notion, v0, shadcn, Graphical: 24–68 s, no
  cuts), or cuts between still or nearly still shots (Cursor ×2, Dia, Figma: 2.1–3.6 s average).
  The cut-based reels never make a long move: when the framing changes a lot, they cut.
- **Zoom.** Working ≈ 1.4 (shadcn 1.38, Cursor 1.4, Notion 1.4–1.5). Detail 2.0 (Dia, Figma), or
  3–3.5 for a single line of text (Cursor, Notion).
- **Moves.** Push-ins 400–570 ms (Dia ×5, Notion, v0, shadcn), Figma's 1.1 s the slow outlier.
  Pull-backs 500–650 ms. Ease-in-out with the speed peak at 0.36–0.5; an opening push may be an
  ease-out.
- **Anticipation.** The camera is still when the work starts (Figma, Notion).
- **Typing** reads at ≈ 17 chars/s (Cursor).
- **Cards.** One short line, small, centred, on white or the backdrop colour, revealed word by
  word. End cards are the logo, 2.5–3.5 s.
- **Cursor.** Native size in 7 of 8; enlarged with motion blur in Notion only.
- **Frame.** A window on a backdrop (Cursor ×2, Notion) or full-bleed (v0, Figma, Graphical,
  shadcn). 16:9 in 7 of 8.

## Proposed changes to the spec

1. **Typing at 2×, not 3–4×.** cutscene already types at ~18 chars/s (`perChar` 55 ms), the rate
   Cursor's reel shows; 3.5× would be ~60 chars/s, too fast to read. In-app waits stay at 3–4×.
   Both are settings in the reel file.
2. **Push-in 500 ms, not 700.** Measured push-ins cluster at 400–570 ms (Dia ×5, Notion, v0,
   shadcn); pull-back 600 ms stands. Both settings; tune by eye at 10% speed as the spec says.
3. **A big reframe is a cut.** Inside a flow, a change of framing larger than ×1.8 in zoom, or a
   pan across more than half the frame, cuts instead of moving (Cursor and Dia never make such a
   move). Between flows the spec's hard cut stands.
4. **Detail stays capped at 2.0.** References go to 3× for one line of text, but the sharpness rule
   (capture at 2z) would need 6× capture; 2.0 matches Dia and Figma. Once or twice per reel.
5. **Keep** the cards (backdrop colour, Inter, one line, ~1.5 s open, ~2 s close), cutscene's own
   cursor at its size (the zoom enlarges it), no motion blur, no dissolves outside cards.
