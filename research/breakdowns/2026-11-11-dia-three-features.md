# Dia: three new features

- **Video:** https://video.twimg.com/amplify_video/1983922228224794624/vid/avc1/1112x720/3CyTUUBq-AUYLqal.mp4?tag=21
- **Found on:** https://x.com/diabrowser/status/1983922792648118382
- **Maker:** The Browser Company (@diabrowser). **Kind:** launch film. **Posted:** 2025-10-30. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-dia-three-features.json](../references/2026-11-11-dia-three-features.json)

**Why it's here.** The film's structure is typed into the product: Dia's command bar spells '3 small things to help solve your tab problems', numbered mono cards introduce each one, and every keyboard shortcut appears as large key caps in the corner while it's pressed. 48.4 s.

## 1. Describe

### Measured

48.42 s, 1112×720, 24 fps. Camera still 81% of the time. 36 shots, median 1.13 s. 35 cuts (10 dissolves); 11 moves.

**What the instrument can read.** No camera moves at all (still 81%); every reframe is a cut.

### Shot list

| Time (s)    | Length (s) | Framing            | What happens                                                                             | Out                        |
| ----------- | ---------- | ------------------ | ---------------------------------------------------------------------------------------- | -------------------------- |
| 0.00–7.96   | 7.96       | command bar ×2     | '3 small things' types with live suggestions; '…to help solve your tab problems'         | hard cuts                  |
| 7.96–9.63   | 1.67       | Dock               | Dia's icon in the Dock                                                                   | hard cut                   |
| 9.63–17.25  | 7.62       | chapter 1          | card; a screenplay in Focus mode, ⌘ S key caps; a football stream                        | dissolves                  |
| 17.25–26.42 | 9.17       | chapter 2          | card; a Meet call floats as picture-in-picture over a doc                                | hard cuts                  |
| 26.42–45.46 | 19.04      | chapter 3          | card; Settings → Shortcuts; ⌘⇧A and ^C pressed, each shown as key caps while tabs switch | hard cuts, short dissolves |
| 45.46–48.42 | 2.96       | closing card, logo | 'make a big difference.'; Dia                                                            | end                        |

### By eye

- **Zoom:** the command bar at ×2; feature shots show the whole window at ×1 on a lavender wallpaper
- **Cards:** 4 mono cards on black: '1. Focus in with ⌘+S', '2. Keep meetings in view with GMeet PiP', '3. Go fast with custom shortcuts', 'make a big difference.'; logo 2.9 s
- **Cursor:** native macOS pointer at window scale
- **Frame:** full windows on a soft lavender wallpaper; key caps (⌘, ⇧, A, ^, C) as white rounded squares, top-right
- **Aspect:** 1112×720, 24 fps
- **Sound:** an audio track with rhythmic onsets (not listened to)

### Frame-level beats

Read from 10-frame strips around 7 cuts and 1 dissolve; 1 f = 41.7 ms at 24 fps.

- **Key caps appear on the frame the shortcut fires** and stay until its effect has landed (about 0.6–1 s).
- **Chapter cards are one mono line, complete on frame 0.** '1. Focus in with ⌘S', '2. Keep meetings in view with GMeet PiP', '3. Go fast with custom shortcuts': white on black, centred, about 1.7 s each (9.63, 17.25, 24.63 s). No build, no fade.
- **Card → screen on a hard cut, wide first.** After each card the whole screen appears at ×1 on frame 0 (9.63 → 11.3 s), then the next cut goes in; the order is always card, wide, detail.
- **A cut-in of about ×2 on the same page.** At 13.08 s (read as a dissolve) the screenplay page at ×1 becomes the same page at ×2 on one frame, with the text's left edge kept at the same place in the frame: a jump in scale on a held anchor.
- **The settings row highlights on the frame after the press.** At 29.63 s the pointer is on 'Search Tabs…' for 4 frames; the row turns blue on frame 0 and the recorder field opens beside it on the same frame. The UI's own state change is the cut point.
- **The closing card finishes the opening sentence.** 'make a big difference.' holds 5 frames to the cut, then the logo on frame 0 (45.46 s).

**Eye at the cuts.** Card → wide screen: centre to centre, 0–5%. Wide → cut-in (13.08 s): under 10% (anchored on the text's left edge). Card → logo: 0%. The fixed order of card, wide, detail keeps every cut in the film inside 10%. All 6 hard cuts land on the measured frame.

## 2. Classify

Hand-edited feature list of real UI in full windows on a wallpaper. Conventions: typed premise, numbered chapter cards, key-cap overlays, a closing line and logo.

## 3. Diagnose

- Shortcuts are drawn as key caps in the corner. → Make the invisible input visible: a keyboard action has no pointer to follow, so the film draws the keys.
- The premise is typed into the product's own command bar. → The medium carries the message, as in Claude's end card.
- Numbered chapter cards. → Signposting: the viewer knows how many beats are left, which buys patience for a 48 s film.

## 4. Prescribe

- _new_: Key-cap overlay for keyboard shortcuts, shown while they're pressed. (act.press overlay (not built))
- _new_: Numbered chapter cards for a feature list. (cards)
- _confirms_: Reframe by cutting; camera locked. (CAMERA.cutOver)

## 5. Critique

- **I like:** The key caps make a keyboard-first product filmable; nothing else in the set solves that.
- **I wish:** Full windows at ×1 leave the feature small; Focus mode's change is hard to see at phone size.
- **I wonder:** cutscene's `act.press` already knows the keys: drawing them as caps is a small overlay change.
