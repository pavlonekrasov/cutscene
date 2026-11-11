# Stripe: next-day settlement

- **Video:** https://video.twimg.com/amplify_video/2001632047442341888/vid/avc1/1276x720/hrjeGLBkauMU71YZ.mp4
- **Found on:** https://screen.studio (the showcase wall on the home page)
- **Maker:** Stripe, made with Screen Studio. **Kind:** showreel. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-stripe-next-day-settlement.json](../references/2026-11-11-stripe-next-day-settlement.json)

**Why it's here.** Timing: the push settles on the frame the modal opens, the camera holds while the choice is made, and it pulls out as the confirmation toast arrives, so the clip ends on the result. 6.3 s, loops.

## 1. Describe

### Measured

6.32 s, 1276×720, 60 fps. Camera still 81% of the time. 3 shots, median 2.38 s. 2 cuts (2 dissolves); 5 moves.

Moves:

- 1.87 s push ×1.643 (pan -0.1, -0.1%), 2–98% 450 ms, 10–90% 330 ms, peak 0.22, overshoot 1%
- 5.72 s pull ×0.873 (pan 0, 0%), 2–98% 520 ms, 10–90% 380 ms, peak 0.06
- (3 more under 150 ms, ×1.1 or 5% of the frame: blur, UI changes or tracker noise)

**What the instrument can read.** Good on the push; the pull-out at the end is split into short pieces by motion blur.

### Curve fits

RMS error as % of the move's travel; the same fit recovers cutscene 0.3.0's own push at 0.16%.

| Move               | Best fit                                             | Next other curve                                       | cutscene 0.3.0's curve |
| ------------------ | ---------------------------------------------------- | ------------------------------------------------------ | ---------------------- |
| push ×1.62 at 1.84 | spring ζ 0.9, ω 9.1/s, settles 98% in 0.52 s (1.42%) | spring ζ 1, ω 10.2/s (1.99%); out-quint 909 ms (2.62%) | 3.28%                  |

### Shot list

| Time (s)  | Length (s) | Framing              | What happens                                                                       | Out                  |
| --------- | ---------- | -------------------- | ---------------------------------------------------------------------------------- | -------------------- |
| 0.00–2.38 | 2.38       | wide → working ×1.64 | the pointer moves to 'Next-day settlement'; push from 1.84                         | the modal opens (UI) |
| 2.38–5.30 | 2.92       | working              | the modal; the pointer reads down it and presses 'Turn on next-day settlement'     | UI                   |
| 5.30–6.32 | 1.02       | working → wide       | pull-out ×0.87 with motion blur; the toast 'Next-day settlement turned on' appears | loops                |

### By eye

- **Zoom:** wide shows the whole window; working ×1.64 (the settings section fills the frame)
- **Cards:** none
- **Cursor:** enlarged macOS pointer, smoothed
- **Frame:** window with rounded corners and a soft shadow on a pink-to-violet gradient, ~10% margins
- **Aspect:** 16:9, 1276×720, 60 fps
- **Sound:** none

### Frame-level beats

- The push starts at 1.84 s and settles at ~2.37 s; the modal opens at 2.38 s, on the frame the camera comes to rest.
- The pull-out starts 0.1 s after the confirming press, and the toast arrives during it.

Read from 10-frame strips around 1 dissolve and 2 moves; 1 f = 16.7 ms at 60 fps.

- **The push travels toward the pointer, and the window's margin goes first.** In the 0.95 s push the gradient backdrop is gone by column 4: the window's left edge and sidebar leave the frame while the settings column, with the pointer on it, moves from about 30% to 35% across. The pointer barely changes position in the frame while everything around it grows.
- **The modal arrives in the push's last third.** From column 8 the page dims to about 50% and the modal fades and scales up at the right of centre; it is complete in column 10, the frame the camera stops on. The dim layer does the isolating: the camera doesn't zoom further for the modal.
- **The modal's primary button is the one saturated element**: a violet bar at the modal's bottom right; the pointer sits on it for the whole 5.30 s strip, its hotspot on the button's left third.
- **The press is shown by the modal leaving.** In the last 3 columns of the 5.30 s strip the modal fades with the dim layer over about 4 frames; no button state is visible at this size.
- **The pull is a hard start with blur.** In the 1.06 s pull the first column is smeared over the whole frame and the window is back at wide by column 2 (under 0.15 s for most of the scale); the remaining columns are a slow settle of a few percent. The toast, a dark pill at the bottom centre, is in place from column 3 and the pointer rests above it.

**Eye at the cuts.** There are no cuts. Pointer → modal: about 15% right, inside the push. Modal button → toast: the toast appears about 10% below where the button was pressed, so the confirmation is read without a search.

## 2. Classify

Screen Studio clip: a window on a gradient with an automatic follow camera. Conventions: push to the action, hold, pull to the result, loop.

## 3. Diagnose

- The push settles on the frame the modal opens. → Anticipation: the camera is still before the new content appears.
- The push is a slightly under-damped spring (ζ 0.9) settling in 0.52 s. → Screen Studio's front-loaded spring: fast arrival, soft settle.
- It pulls out as the toast arrives and ends there. → End on the outcome, wide enough to show where it happened.

## 4. Prescribe

- _contradicts_: Camera curve: a fast, slightly under-damped spring, not a symmetric ease-in-out. (camera.ease)
- _new_: End wide on the result. (reel structure)
- _confirms_: The camera settles before the press lands (here, before the modal opens). (CAMERA.lead)

## 5. Critique

- **I like:** Every move finishes before something new appears, so nothing is read in motion.
- **I wish:** The saturated gradient pulls the eye from the window at the edges of the frame.
- **I wonder:** Could cutscene time its pull-out to the first toast after the last action?

## Not for us

- The saturated wallpaper backdrop: Screen Studio's signature look, not a brand-neutral default.
