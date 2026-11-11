# Supabase integration for Expo

- **Video:** https://video.twimg.com/ext_tw_video/2120192707171614720/pu/vid/avc1/1280x720/YeK1uSjh8XeuW1r5.mp4?tag=12
- **Found on:** https://x.com/supabase/status/2120192738842874296
- **Maker:** Supabase. **Kind:** launch film. **Posted:** 2026-11-10. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-supabase-expo.json](../references/2026-11-11-supabase-expo.json)

**Why it's here.** A 15 s integration announcement. The two logos form a lockup, a tilted terminal flies in and 'eas integrations:supabase' is typed, then the frame pulls back to list what the one command did ('Creates a Supabase project', 'Adds the SDK', 'Writes your keys to Expo') beside the two product icons. 'Available now in the EAS CLI' closes it.

## 1. Describe

### Measured

15.2 s, 1280×720, 60 fps. Camera still 61% of the time. 8 shots, median 1.3 s. 7 cuts (3 dissolves); 10 moves.

Moves:

- 3.49 s pull ×0.902 (pan 0.7, 18%), 2–98% 180 ms, 10–90% 120 ms, peak 0.91, overshoot 17%
- 5.92 s pull ×0.65 (pan 43.5, 26.8%), 2–98% 1070 ms, 10–90% 460 ms, peak 0.38
- (8 more under 150 ms, ×1.1 or 5% of the frame: blur, UI changes or tracker noise)

**What the instrument can read.** 60 fps. The one clean move is the pull from the command to the checklist: ×0.66 over 1.15 s. cutscene 0.3.0's own curve fits it best (rms 1.29%).

### Curve fits

RMS error as % of the move's travel; the same fit recovers cutscene 0.3.0's own push at 0.16%.

| Move               | Best fit                        | Next other curve                                      | cutscene 0.3.0's curve |
| ------------------ | ------------------------------- | ----------------------------------------------------- | ---------------------- |
| pull ×0.66 at 5.92 | cutscene 0.3.0, 1153 ms (1.29%) | spring ζ=0.9 on linear scale, ω 6.1/s, 770 ms (2.35%) | 1.29% (1153 ms)        |

### Shot list

| Time (s)    | Length (s) | Framing | What happens                                                                                           | Out       |
| ----------- | ---------- | ------- | ------------------------------------------------------------------------------------------------------ | --------- |
| 0.00–3.70   | 3.70       | lockup  | a spark, then the Expo and Supabase marks with 'Supabase Integration for Expo Services'                | dissolve  |
| 3.70–5.48   | 1.78       | command | a tilted terminal flies in; 'eas integrations:su…' typed                                               | hard cuts |
| 5.48–12.87  | 7.39       | effects | pull ×0.66: the terminal at left, the three things it did listed beside it, the two app icons at right | hard cut  |
| 12.87–15.20 | 2.33       | card    | the marks merge; 'Available now in the EAS CLI'                                                        | end       |

### By eye

- **Zoom:** the command at about ×2 on a tilted window; pulled to ×1.3 for the checklist
- **Cards:** 'Supabase Integration for Expo Services'; 'Available now in the EAS CLI'
- **Cursor:** none; the terminal caret
- **Frame:** near-black; the terminal tilted in 3D
- **Aspect:** 16:9, 1280×720, 60 fps
- **Sound:** an audio track with rhythmic onsets (not listened to)

### Frame-level beats

Read from 10-frame strips around 3 cuts, 1 dissolve and 1 move; 1 f = 16.7 ms at 60 fps.

- **The lockup leaves upward as the terminal rises.** From 3.70 s the two marks and the title drift up about 15% of the frame and dim over 10 frames while a tilted terminal's top edge enters from the bottom: one vertical motion carries both the exit and the entrance, so there is no cut between title and product.
- **The command finishes, the caret blinks twice, then the camera moves.** At 5.48 s 'eas integrations:supabase:connect' is complete with a block caret; the caret goes out after 6 frames and the pull starts about 0.4 s later (5.92 s). Typing and camera are in series.
- **The pull makes room on the right, then below.** Over 1.6 s (×0.66) the terminal shrinks toward the top left, the Expo app icon slides in at its right, and three lines ('Creates a Supabase project', 'Adds the SDK', 'Writes your keys to Expo') fade in under the terminal one after another, about 5 frames apart; the first line is brightest. A second icon enters at the far right in the last column.
- **The effects fade as the link draws.** At 12.87 s the list and terminal dim over 10 frames while an arc connecting the two icons stays lit: what remains on screen is the relationship.
- **The end card types under the marks** (13.55 s): 'Available now in the EAS CLI' writes on from the left, a few characters a frame, beneath the centred lockup.

**Eye at the cuts.** There is no hard cut between picture and picture in this film: every change is a drift, a pull or a fade on one continuous dark field. The eye's largest trip is inside the pull's end frame, from the terminal (about 25%) to the icons (about 60–90%), led by the order the elements appear in. All 3 measured cuts are fades or typing.

## 2. Classify

Motion-designed integration announcement: logos, one command, its effects, where to get it. Conventions: a logo lockup, a tilted terminal, a checklist caption, an end card with the path.

## 3. Diagnose

- The pull from command to checklist matches cutscene 0.3.0's curve at 1.15 s. → A hand-made in-out pull of this size lands on cutscene's own default.
- The command's three effects are listed beside it. → Caption beside proof: what one command saves is spelled out, which the command alone cannot show.
- The end card names where to get it. → Wayfinding as the call to action (n=2 with Supabase Explorer).

## 4. Prescribe

- _confirms_: cutscene 0.3.0's in-out curve for a 1.15 s pull (rms 1.3%). (camera curve (exists))
- _confirms_: Caption column beside the crop (Supabase ×3). (renderer caption layout (not built))
- _new_: A checklist caption that lists what an action did. (renderer caption (not built))

## 5. Critique

- **I like:** The checklist beside the command says what 'one command' saves you, which the command itself can't.
- **I wish:** After the pull the tilted terminal is small, and the command is hard to read at feed size.
- **I wonder:** Could a reel caption list a scene's steps and tick each one as the scene completes it?

## Not for us

- A terminal outside the app.
