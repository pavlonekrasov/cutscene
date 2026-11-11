# Family: messaging

- **Video:** https://video.twimg.com/ext_tw_video/1768379596423286784/pu/vid/avc1/720x720/nzuRZynrvnZpq3zu.mp4?tag=14
- **Found on:** https://x.com/family/status/1768379809292530090
- **Maker:** Family. **Kind:** launch film. **Posted:** 2024-03-14. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-family-messaging.json](../references/2026-11-11-family-messaging.json)

**Why it's here.** The interface is taken apart into its moments: a dot, then message bubbles pop in with a small overshoot, a voice note records, media tiles slide past, a dollar amount ticks up from $0 to $100, each on white with no phone until the end. 27.4 s.

## 1. Describe

### Measured

27.42 s, 720×720, 60 fps. Camera still 57% of the time. 26 shots, median 1.05 s. 25 cuts (20 dissolves); 33 moves.

Moves:

- 1.72 s pan ×1.013 (pan -27, -2%), 2–98% 170 ms, 10–90% 110 ms, peak 0.56, overshoot 4%
- 3.01 s pan ×1.012 (pan 0, 13.7%), 2–98% 210 ms, 10–90% 130 ms, peak 0.65, overshoot 4%
- 3.29 s pan ×1.036 (pan 0, 5.3%), 2–98% 990 ms, 10–90% 800 ms, peak 0.65, overshoot 28%
- 5.20 s pull ×0.662 (pan -0.6, 0.1%), 2–98% 1100 ms, 10–90% 710 ms, peak 0.03, overshoot 1%
- 10.94 s pan ×1.043 (pan 14, -0.4%), 2–98% 580 ms, 10–90% 370 ms, peak 0.04
- 11.99 s push ×1.785 (pan -16.9, 2.8%), 2–98% 300 ms, 10–90% 170 ms, peak 0.2, overshoot 1%
- 12.79 s pan ×0.982 (pan 24.5, 0%), 2–98% 560 ms, 10–90% 530 ms, peak 0.97, overshoot 15%
- 13.40 s pan ×0.991 (pan 35.4, 0%), 2–98% 210 ms, 10–90% 140 ms, peak 0.15
- 14.59 s pan ×0.983 (pan 40.3, 0%), 2–98% 320 ms, 10–90% 220 ms, peak 0.1
- 16.93 s push ×1.22 (pan -0.1, 23.5%), 2–98% 170 ms, 10–90% 130 ms, peak 0.19, overshoot 3%
- 25.01 s push ×1.546 (pan -0.1, -0.1%), 2–98% 1180 ms, 10–90% 470 ms, peak 0.03
- (22 more under 150 ms, ×1.1 or 5% of the frame: blur, UI changes or tracker noise)

**What the instrument can read.** Square 720×720. The 'moves' are elements sliding and scaling in (several with 15–28% overshoot, the bubbles' spring).

### Curve fits

RMS error as % of the move's travel; the same fit recovers cutscene 0.3.0's own push at 0.16%.

| Move                | Best fit                  | Next other curve                                    | cutscene 0.3.0's curve |
| ------------------- | ------------------------- | --------------------------------------------------- | ---------------------- |
| push ×1.34 at 25.01 | out-expo, 1644 ms (1.51%) | spring ζ=1 on linear scale, ω 6.9/s, 848 ms (2.59%) | 8.26% (584 ms)         |

Autofit left out 5 moves with a cut too close and 2 whose best fit was above 3% (the tracker, not a curve).

### Shot list

| Time (s)    | Length (s) | Framing            | What happens                                                                       | Out             |
| ----------- | ---------- | ------------------ | ---------------------------------------------------------------------------------- | --------------- |
| 0.00–7.65   | 7.65       | isolated bubbles   | a dot; 'Hello', 'How are you?', an emoji reaction, 'Great thanks!' pop in          | short dissolves |
| 7.65–11.92  | 4.27       | voice note         | a recording ring, then waveforms                                                   | dissolves       |
| 11.92–17.55 | 5.63       | media              | 'All your media'; a profile photo; a carousel of tiles                             | dissolves       |
| 17.55–21.67 | 4.12       | transaction        | 'Transact in-chat'; '+'; '$0' ticks to '$100'; a 'Sent $100.00' card               | dissolves       |
| 21.67–27.42 | 5.75       | phone, cards, logo | 'Customize easily'; the chat on a phone over coloured discs; 'Now in Family'; logo | end             |

### By eye

- **Zoom:** single bubbles and controls at ×3–4; the phone appears only at 23.5 s
- **Cards:** 'All your media', 'Transact in-chat', 'Customize easily', 'Now in Family'; logo
- **Cursor:** none
- **Frame:** white, square
- **Aspect:** 1:1, 720×720, 60 fps
- **Sound:** an audio track with rhythmic onsets (not listened to)

### Frame-level beats

Read from 10-frame strips around 5 cuts, 1 dissolve and 1 move; 1 f = 16.7 ms at 60 fps. The film is vertical (9:16).

- **Bubbles enter about 0.3 s apart with a slight overshoot**; the next bubble starts as the previous one settles.
- **The dot becomes the bubble.** At 1.32 s the blue dot widens over 3 frames (50 ms) into a rounded bubble, and the text types into it a letter per 1–2 frames ('H', 'He', 'Hel'): the shape arrives first, the content second. A small tail dot follows at the bubble's lower right.
- **The reaction is the last thing to land.** The emoji scales in on the bubble's corner over about 5 frames with a few degrees of rotation, after both bubbles are still (2.37 s).
- **Two rows, two speeds.** In the voice-note shot (7.65 s) the sent waveform is static while the recording row's playhead moves: one moving element per shot.
- **Carousel → card on frame 0.** The media tiles cut to the word 'Transact' at 15.20 s; the word starts grey and darkens over about 5 frames. Cards in this film fade their ink in; they never slide.
- **Colour floods in as the card leaves.** At 21.67 s 'Customize easily' fades out over 2 frames and a pale blue rises to full strength over the next 4: the backdrop is the transition.
- **The logo grows on a spring.** After 'Now in Family' the mark cuts in small and scales up about ×1.5 over about 1.7 s, fast at first and settling without overshoot (25.01 s).

**Eye at the cuts.** Everything sits on the vertical centre line of a 9:16 frame, so sideways travel is 0–10% at every cut; vertical travel is larger (bubbles at 25%, cards at 50%). 2 of 5 measured cuts are in-shot changes (the bubble forming, the emoji).

## 2. Classify

Motion-designed feature film of isolated UI elements on white, square for the feed. Conventions: pop-in bubbles, a number ticker, short claim cards, the device revealed last.

## 3. Diagnose

- Bubbles pop in with a slight overshoot. → A spring with low damping on entrance reads as the app's own personality (pop in).
- The amount ticks from $0 to $100. → A number ticker makes a value change legible as motion.
- The device frame comes last. → Context after content: the viewer learns the moments, then where they live.

## 4. Prescribe

- _new_: A square cut for the feed, built from isolated elements. (format (Part 2))
- _confirms_: Isolate the component on a plain backdrop. (camera / renderer (not built))

## 5. Critique

- **I like:** Each feature is one gesture of the UI, staged so it can't be missed.
- **I wish:** It's a rebuild of the UI's moments, so it's motion design about the app, not the app.
- **I wonder:** Could cutscene cut a square version of a reel by cropping to the active element's box?

## Not for us

- Rebuilt UI elements animated by hand.
