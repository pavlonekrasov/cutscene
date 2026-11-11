# Cursor: Origin (code hosting)

- **Video:** https://video.twimg.com/amplify_video/2089397451237036032/vid/avc1/1280x720/NELTlGKos4P8-JKi.mp4?tag=29
- **Found on:** https://x.com/cursor_ai/status/2089399057659596847
- **Maker:** Cursor. **Kind:** launch film. **Posted:** 2026-08-17. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-cursor-origin.json](../references/2026-11-11-cursor-origin.json)

**Why it's here.** Kinetic type and real UI are one sentence: 'Create a repo and start a [+ New]' ends on the real button, which the cursor then presses; each step of the flow (create, sync, review, merge, CI, deploy) gets one shot. 30.9 s.

## 1. Describe

### Measured

30.9 s, 1280×720, 30 fps. Camera still 79% of the time. 20 shots, median 1.6 s. 19 cuts (6 dissolves); 20 moves.

Moves:

- 3.97 s pan ×1 (pan 5, 0%), 2–98% 330 ms, 10–90% 230 ms, peak 0.2
- 5.95 s push ×1.224 (pan 5.5, 0.1%), 2–98% 280 ms, 10–90% 180 ms, peak 0.9, overshoot 25%
- 11.48 s push ×1.25 (pan -1.8, 21.5%), 2–98% 1170 ms, 10–90% 930 ms, peak 0.62
- 15.50 s push ×1.237 (pan 0, 0%), 2–98% 370 ms, 10–90% 250 ms, peak 0.19
- 18.29 s pan ×1.001 (pan 10.6, 0%), 2–98% 320 ms, 10–90% 190 ms, peak 0.99, overshoot 44%
- 18.70 s pan ×1 (pan 11.8, 0%), 2–98% 400 ms, 10–90% 270 ms, peak 0.17
- 20.86 s pan ×1.004 (pan -0.1, 6.2%), 2–98% 300 ms, 10–90% 190 ms, peak 0.02
- 23.52 s pan ×0.996 (pan 0.1, 12.5%), 2–98% 220 ms, 10–90% 130 ms, peak 0.99, overshoot 46%
- 25.33 s pan ×1.001 (pan 11.7, 0%), 2–98% 370 ms, 10–90% 260 ms, peak 0.18
- 27.51 s pull ×0.893 (pan 0.1, 0.1%), 2–98% 320 ms, 10–90% 180 ms, peak 0.9, overshoot 28%
- 27.95 s pull ×0.815 (pan 7.9, 1.7%), 2–98% 320 ms, 10–90% 280 ms, peak 0.26, overshoot 2%
- (9 more under 150 ms, ×1.1 or 5% of the frame: blur, UI changes or tracker noise)

**What the instrument can read.** Pushes of ×1.22–1.25 at 5.9, 11.5 and 15.5 s; one pull ×0.82 to the logo. The 0.3 s 'pans' with 25–46% overshoot are text slides.

Autofit left out 5 moves with a cut too close and 3 whose best fit was above 3% (the tracker, not a curve).

### Shot list

| Time (s)    | Length (s) | Framing             | What happens                                                                              | Out             |
| ----------- | ---------- | ------------------- | ----------------------------------------------------------------------------------------- | --------------- |
| 0.00–3.93   | 3.93       | detail, card        | the sidebar's 'Codebase' item; 'Introducing Code Hosting'                                 | dissolve 0.43 s |
| 3.93–8.80   | 4.87       | type with inline UI | 'Create a repo and start a [+ New]'; the button is pressed                                | dissolve 0.67 s |
| 8.80–13.57  | 4.77       | isolated controls   | a name field and 'Create Repo'; 'Or'; 'Sync from GitHub'                                  | hard cuts       |
| 13.57–16.33 | 2.76       | window              | the repo list on violet; push ×1.24                                                       | hard cut        |
| 16.33–23.80 | 7.47       | code, merge         | 'Review and Merge'; a diff with an 'Ask Cursor' menu; 'Ready to Merge' → 'Squash & Merge' | dissolves       |
| 23.80–28.53 | 4.73       | black cards         | 'Run CI from Buildkite', 'Push to deploy with Vercel', 'Git hosting, at agent scale'      | hard cuts       |
| 28.53–30.90 | 2.37       | logo                | ORIGIN on violet                                                                          | end             |

### By eye

- **Zoom:** isolated elements at ×2–3 (a 'Create Repo' field, 'Sync from GitHub', the merge card); one window on a violet gradient
- **Cards:** 'Introducing Code Hosting', 'Create a repo and start a [+ New]', 'Or', 'Review and [Merge]', 'Run CI from Buildkite', 'Push to deploy with Vercel', 'Git hosting, at agent scale'; Origin logo
- **Cursor:** large macOS hand/arrow, pressing each control
- **Frame:** white and warm grey; one window on a violet gradient; black for the CI and deploy beats
- **Aspect:** 16:9, 30 fps
- **Sound:** none: no audio track

### Frame-level beats

Read from 10-frame strips around 7 cuts, 1 dissolve and 2 moves; 1 f = 33 ms at 30 fps.

- **The '+ New' chip in the sentence becomes the pressable button**: the type hands off to the UI with no cut.
- **The sentence builds a word every 2–3 frames** ('Create' → 'a' → 'repo' → 'and', about 80 ms a word), left-anchored, so the line grows rightward toward where the chip will land.
- **A scale cut onto the chip.** At 6.30 s (read as a dissolve) the sentence at reading size cuts, on one frame, to the same chip at about ×6 with the hand pointer already on it. The chip keeps its screen position (about 50% across), so the cut reads as a push with no frames spent on travel.
- **One word as a cut.** 'Or' sits alone on the backdrop for about 1 s between 'Create Repo' and 'Sync from GitHub' (8.80–9.83 s); each control appears complete on frame 0 at the same centre.
- **The press and the cut share a frame.** The hand is on 'Sync from GitHub' for the 5 frames before 11.43 s; the window on violet is complete on frame 0. The press is implied by the cut (a match on action).
- **The only camera move starts on the first frame of its shot.** The push ×1.24 on the repo list begins at the cut and runs about 1 s; it never starts from a held frame.
- **A blank white frame precedes 'Review'** (13.57 s), as in Cursor's other films; the black cards swap by sliding the old line up over 4 frames while the next fades in below (23.80 s).

**Eye at the cuts.** Sentence → chip close-up: 0% (same position). Control → 'Or' → control: 0% (all centred). Button → window (11.43 s): from the centre to the window's content at about 45%, inside 10%. Detail → card (3.93 s): the sidebar item at about 15% to the card's first word at about 10%, inside 10%. The instrument places 6 of 7 hard cuts on the right frame.

## 2. Classify

Motion-designed launch film mixing kinetic type with isolated, real UI elements. Conventions: inline UI in a sentence, a flow told as one shot per step, a logo lockup on a gradient.

## 3. Diagnose

- Real buttons sit inside the sentence. → Inline UI: the copy names the action and shows its control in the same line.
- One shot per step of the git flow. → A flow told as discrete beats is legible at any length; no step needs the one before it on screen.
- The press lands on a still frame. → Settle before the press, the same rule cutscene's `lead` follows.

## 4. Prescribe

- _new_: Inline UI in a card: the sentence ends on the real control. (cards (not built))
- _confirms_: Isolated controls at ×2–3 with a large cursor. (camera / overlay)
- _confirms_: End on a logo lockup (2.4 s). (CARD.close)

## 5. Critique

- **I like:** The film teaches the product's whole loop, create to deploy, in seven beats and 31 s.
- **I wish:** The isolated controls are rebuilt cleanly; the one real window appears only once.
- **I wonder:** A card whose last word is a screenshot of the real control from the scene: cheap, honest, and cutscene can make it.
