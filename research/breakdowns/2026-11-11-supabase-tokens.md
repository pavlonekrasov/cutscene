# Supabase: personal access tokens with permissions

- **Video:** https://video.twimg.com/ext_tw_video/2114817011553341440/pu/vid/avc1/1280x720/paXi05HUb_l3m_Ua.mp4?tag=12
- **Found on:** https://x.com/supabase/status/2114817051634045080
- **Maker:** Supabase. **Kind:** launch film. **Posted:** 2026-10-26. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-supabase-tokens.json](../references/2026-11-11-supabase-tokens.json)

**Why it's here.** A 26 s film for a settings flow, in a two-column layout: a bold claim on the left ('Set when it expires', 'Limit what it can reach', 'Limit what it can do', 'Review the blast radius') and that step of the real form on the right, cropped, slightly tilted and bleeding off the edge. It ends on a white 'Now generally available' card.

## 1. Describe

### Measured

26.3 s, 1280×720, 60 fps. Camera still 89% of the time. 12 shots, median 2.77 s. 11 cuts (6 dissolves); 10 moves.

Moves:

- 3.48 s pan ×0.942 (pan 25.8, 5.3%), 2–98% 400 ms, 10–90% 230 ms, peak 0.12, overshoot 3%
- 5.86 s pan ×0.96 (pan -2, 35.1%), 2–98% 590 ms, 10–90% 180 ms, peak 0.69
- 10.17 s pan ×0.983 (pan 1, 9.3%), 2–98% 190 ms, 10–90% 130 ms, peak 0.92, overshoot 19%
- 14.44 s pan ×0.996 (pan 6, -0.8%), 2–98% 160 ms, 10–90% 100 ms, peak 1, overshoot 26%
- 18.56 s push ×1.229 (pan 10.3, -10.4%), 2–98% 460 ms, 10–90% 300 ms, peak 0.1
- (5 more under 150 ms, ×1.1 or 5% of the frame: blur, UI changes or tracker noise)

**What the instrument can read.** 60 fps, still 89%, 12 shots at a 2.8 s median. The moves are small panel slides beside cuts; autofit skips them.

Autofit left out 3 moves with a cut too close.

### Shot list

| Time (s)    | Length (s) | Framing   | What happens                                                                          | Out       |
| ----------- | ---------- | --------- | ------------------------------------------------------------------------------------- | --------- |
| 0.00–3.17   | 3.17       | title     | 'Personal Access Tokens with more permission control'                                 | dissolve  |
| 3.17–7.80   | 4.63       | expiry    | 'Set when it expires' beside the expiry picker (7 days); 'Limit what…' builds         | hard cuts |
| 7.80–10.15  | 2.35       | reach     | 'Limit what it can reach' beside the project list (analytics, mobile-app, storefront) | hard cut  |
| 10.15–14.57 | 4.42       | abilities | 'Limit what it can do' beside permission presets set from 'No access'                 | dissolve  |
| 14.57–18.15 | 3.58       | review    | 'Review the blast radius' beside the capability summary; 'Create token' clicked       | dissolve  |
| 18.15–22.07 | 3.92       | result    | 'Token created' with Copy; a push ×1.23                                               | dissolve  |
| 22.07–26.30 | 4.23       | card      | 'Now generally available', Supabase, on white                                         | end       |

### By eye

- **Zoom:** the form step at about ×1.8, cropped so it runs off the right edge
- **Cards:** 'Personal Access Tokens with more permission control'; four step claims; 'Now generally available'
- **Cursor:** the system pointer
- **Frame:** near-black; the panel slightly tilted; white for the last card
- **Aspect:** 16:9, 1280×720, 60 fps
- **Sound:** an audio track with rhythmic onsets (not listened to)

### Frame-level beats

Read from 10-frame strips around 4 cuts, 1 dissolve and 2 moves; 1 f = 16.7 ms at 60 fps.

- **Captions roll, they don't cut.** The title slides up and out over about 3 strip columns while the tilted form fades up on the right; then 'Set when it expires' rolls in from below at the left, line by line (3.48 s, 0.9 s in all). At 5.86 s it rolls out upward and 'Limit what it can reach' rolls in the same way. The caption column behaves like a ticker: out the top, in from the bottom.
- **The panel scrolls while the caption rolls.** During each caption change the form on the right moves up to its next section over the same 1.0 s, so text and UI travel in the same direction at the same time.
- **The pointer is always mid-task.** In every held chapter (4.52, 7.80, 13.93, 15.38 s) the pointer drifts toward or rests on the control the caption names: the expiry field, a project row, a permission dropdown, then 'Create token'. It moves about 1% of the width per frame, slower than a real hand, so it reads at feed size.
- **The pressed control lights green.** The selected dropdown and the primary button are the only green elements on a grey panel; the caption is white. Three levels: white claim, green action, grey context.
- **The result tilts the other way.** 'Token created' sits on a plane tilted opposite to the form's (22.07 s), and the end card's white bars wipe down from the top left over 10 frames to cover it.

**Eye at the cuts.** Caption → caption: 0% (same left position, about 5–25% across). Pointer → pointer across a chapter change: within about 10%, because the form scrolls under a pointer that stays near the same place in the frame. All 4 measured cuts are pointer or panel changes; the film has no hard cut between its title and its end card.

## 2. Classify

Hand-edited feature film for a multi-step form. Conventions: a caption column beside a cropped panel, one claim per form step, a palette flip for the end card.

## 3. Diagnose

- Claim on the left, the matching form step cropped on the right. → Caption beside proof: the copy names the step the crop shows, so each shot is one promise.
- The crop bleeds off the right edge. → Partial framing implies a larger whole while giving the step the size to be read.
- The claims follow the form's own order. → The form's structure is the script.
- Grey subtext about 10 px under each claim. → Legibility: the subtext is decoration at feed size.

## 4. Prescribe

- _new_: A caption column beside the focus crop instead of a card over it. (renderer caption layout (not built))
- _confirms_: Crop to region, letting the crop bleed off one edge. (camera framing (exists: act.focus))
- _confirms_: Tilted plane (Linear ×3, Supabase). (renderer tilt (not built))

## 5. Critique

- **I like:** Each claim names a form step and the crop beside it is that step, so a four-step security form reads as four promises.
- **I wish:** The grey subtext is unreadable on near-black at feed size.
- **I wonder:** Could a reel place a scene's caption in a column beside the focus crop, using the scene's own step names?
