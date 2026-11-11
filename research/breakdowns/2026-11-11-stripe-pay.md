# Stripe: agents can pay

- **Video:** https://video.twimg.com/amplify_video/2115115394088255488/vid/avc1/720x720/v4CnBUYZSiSqegZb.mp4?tag=29
- **Found on:** https://x.com/stripe/status/2115122346075832468
- **Maker:** Stripe. **Kind:** launch film. **Posted:** 2026-10-27. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-stripe-pay.json](../references/2026-11-11-stripe-pay.json)

**Why it's here.** A 23 s square film in four shots, one per step: 'stripe pay @elementara_ai 10.0' typed in a terminal at ×4; a pull back to the output asking for explicit approval; a light browser dialog, 'Requesting to pay $10.00', with Approve; and the terminal's receipt, 'Transfer sent'.

## 1. Describe

### Measured

22.8 s, 720×720, 30 fps. Camera still 90% of the time. 4 shots, median 6.37 s. 3 cuts (1 dissolves); 3 moves.

Moves:

- 6.41 s pull ×0.729 (pan 18.6, 25.7%), 2–98% 840 ms, 10–90% 610 ms, peak 0.07
- 19.55 s pull ×0.738 (pan 10.3, -7.9%), 2–98% 1030 ms, 10–90% 700 ms, peak 0.28
- (1 more under 150 ms, ×1.1 or 5% of the frame: blur, UI changes or tracker noise)

**What the instrument can read.** Square 720×720, 30 fps, 4 shots at a 6.4 s median. Both pulls fit cleanly. ×0.76 over 1.1 s, out-cubic (rms 1.5%; cutscene 7.9%). ×0.74 over 1.1 s, a ζ 0.8 spring (0.58%; cutscene 2.6%): the Screen Studio family.

### Curve fits

RMS error as % of the move's travel; the same fit recovers cutscene 0.3.0's own push at 0.16%.

| Move                | Best fit                               | Next other curve                      | cutscene 0.3.0's curve |
| ------------------- | -------------------------------------- | ------------------------------------- | ---------------------- |
| pull ×0.76 at 6.41  | out-cubic, 1119 ms (1.54%)             | spring ζ=0.9, ω 5.1/s, 920 ms (1.74%) | 7.88% (833 ms)         |
| pull ×0.74 at 19.55 | spring ζ=0.8, ω 3.5/s, 1078 ms (0.58%) | ease, 1377 ms (0.77%)                 | 2.56% (1693 ms)        |

### Shot list

| Time (s)    | Length (s) | Framing  | What happens                                                                                | Out            |
| ----------- | ---------- | -------- | ------------------------------------------------------------------------------------------- | -------------- |
| 0.00–6.37   | 6.37       | command  | 'stripe pay @elementara_ai 10.0' typed at ×4                                                | hard cut       |
| 6.37–11.37  | 5.00       | output   | pull ×0.76 to the request details and 'Your transfer requires explicit approval'            | short dissolve |
| 11.37–15.80 | 4.43       | approval | a light dialog: 'Requesting to pay $10.00', the agent's account, Decline / Approve          | hard cut       |
| 15.80–22.80 | 7.00       | receipt  | the terminal: 'Request approved', 'Transfer sent $10.00 USD → @elementara_ai'; a pull ×0.74 | end            |

### By eye

- **Zoom:** the command line at ×4; the output block at about ×3 after the pull; the dialog whole
- **Cards:** none
- **Cursor:** none; the terminal caret
- **Frame:** terminal dark navy; the approval dialog on a lavender field
- **Aspect:** 1:1, 720×720, 30 fps
- **Sound:** none: no audio track

### Frame-level beats

Read from 10-frame strips around 2 cuts, 1 dissolve and 2 moves; 1 f = 33 ms at 30 fps. The film is vertical.

- **The output fades in block by block as the frame pulls.** After the command runs (6.37 s) the 'Recipient found' line is there on frame 0; the detail rows and the boxed description then fade up over about 5 frames each, top to bottom, while the frame pulls ×0.76 over 1.3 s (6.41 s). The pull is paced so each new block enters the frame as it appears.
- **The dialog arrives light over dark.** At 11.37 s (read as a dissolve) the dark terminal is covered within 1 frame by a pale scrim and the white approval dialog fades up over 2 more: the change of luminance is the alert. 'Approve' is the only saturated element, at the lower right of the dialog.
- **The dialog holds 4.4 s with nothing moving.** No pointer is shown on 'Approve'; the next cut is the consequence.
- **Dialog → terminal on frame 0** (15.80 s), back to the dark terminal at the same framing as before the dialog, now with 'Request approved' added below. Same frame, one more line: the cut reads as time passing.
- **The closing pull reveals the window.** From 19.55 s the frame pulls ×0.74 over 1.5 s until the terminal is a window with traffic lights on a white backdrop: the film ends by showing that what we watched was one small window.

**Eye at the cuts.** Terminal → dialog: from the terminal's last line (about 50% × 75%) to the dialog's title at 50% × 35%: no sideways travel, 40% vertical. Dialog → terminal: from 'Approve' at about 62% across to 'Request approved' at about 20%, a 40% jump, the widest in the film, on the cut that carries the result. Both hard cuts land on the measured frame.

## 2. Classify

Minimal square demo for a developer feature: command → output → approval → receipt. Conventions: terminal crops, a pull per step, no cards, no logo.

## 3. Diagnose

- Four shots, one per step of the flow. → One beat per shot: the flow's structure is the edit, so no cards are needed.
- One typed line fills the frame; its output block gets a pull to ×3. → Frame size follows content size: the crop tracks how much there is to read.
- The approval dialog is light in a dark film. → Contrast marks the human-in-the-loop moment as different in kind.
- The last pull fits a ζ 0.8 spring at 1.1 s. → Screen Studio-style spring: front-loaded, a soft settle.

## 4. Prescribe

- _confirms_: Frame size follows content size (one line ×4, a block ×3). (act.type framing (exists))
- _new_: A short flow can be one shot per step with no cards or logo. (reel script (skill))
- _confirms_: Spring-genre pulls around 1.1 s (ζ 0.8–0.9). (camera curve (Part 3))

## 5. Critique

- **I like:** Four shots, one per step, make a payment with an approval step legible with no copy at all.
- **I wish:** The 'requires explicit approval' line, the film's point, stays about 8 px tall at feed size even after the pull.
- **I wonder:** Could act.type in a terminal-like UI choose its crop from the typed line's width?

## Not for us

- A CLI outside the browser.
