# Linear: Agent sessions on mobile

- **Video:** https://webassets.linear.app/files/ornj730p/production/8ea92634a2eaa8e2e1441da4fa69ccf0fad9c60e.mp4
- **Found on:** https://linear.app/changelog
- **Maker:** Linear (3D motion design). **Kind:** showreel. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-linear-mobile-agent-diffs.json](../references/2026-11-11-linear-mobile-agent-diffs.json)

**Why it's here.** Cinema grammar on a phone UI: 24 fps, depth of field, hard cuts between close framings (diff, composer, keyboard, agent status) as the request is typed and picked up.

## 1. Describe

### Measured

20.83 s, 1920×1080, 24 fps. Camera still 80% of the time. 13 shots, median 1.33 s. 12 cuts (0 dissolves); 3 moves.

Moves:

- 4.98 s pan ×0.977 (pan 0, 5%), 2–98% 2550 ms, 10–90% 2160 ms, peak 0.81, overshoot 5%
- (2 more under 150 ms, ×1.1 or 5% of the frame: blur, UI changes or tracker noise)

**What the instrument can read.** A perspective camera: the tracker's moves are not usable. Stills confirm at least four real framing changes (2.63, 10.29, 14.92, 17.29); the other candidates are text changing inside a shot.

### Shot list

| Time (s)    | Length (s) | Framing                  | What happens                                                                 | Out  |
| ----------- | ---------- | ------------------------ | ---------------------------------------------------------------------------- | ---- |
| 0.00–2.63   | 2.63       | phone, tilted, wide      | the agent's Changes tab                                                      | hard |
| 2.63–10.29  | 7.66       | diff and composer, close | a request typed on the keyboard: 'add a preview so I can verify this change' | hard |
| 10.29–14.92 | 4.63       | the session, close       | the request posted; 'Working 00:03… 00:06'                                   | hard |
| 14.92–17.29 | 2.37       | phone, tilted            | the agent's follow-up written out                                            | hard |
| 17.29–20.83 | 3.54       | logo card                | held 3.5 s                                                                   | end  |

### By eye

- **Zoom:** close framings of an iPhone UI, tilted, shallow depth of field
- **Cards:** the Linear logo, 3.5 s
- **Cursor:** none (touch UI; typing shows on the keyboard)
- **Frame:** full-bleed near-black
- **Aspect:** 16:9, 1920×1080, 24 fps
- **Sound:** an audio track (71 onsets); 4 of 12 cut candidates on its grid (chance 19%)

### Frame-level beats

- Typing plays at about real speed in the close-up; the wait ('Working') is shown for ~4 s, long enough to read the timer tick.

Read from 10-frame strips around 7 cuts and 1 move; 1 f = 41.7 ms at 24 fps.

- **The first shot is a corner of the phone.** At 1.67 s only the top right of the screen is in frame, tilted about 20° and running off the right edge: the status bar, 'Linear', the Changes tab and a file name. The frame holds still for 10 frames.
- **The cut goes to a flatter, wider plane.** At 2.63 s the next frame shows the diff (three red rows) with the composer and the keyboard's top row below it, tilted back like a page on a desk; the top rows are soft, the composer line is the sharpest row.
- **Each typed word is its own event.** The measured cuts at 3.54, 4.88 and 7.83 s are text arriving in the composer: 'add', 'add a pre…', 'verify this change'. In the 3.05 s move the line grows by about 2 characters per column (about 7 characters a second) and wraps to a second line at column 5, where the composer's height steps between two frames.
- **Key pop-ups are the only bright flashes.** A pressed key shows its letter in an enlarged cap for 1–3 frames (P at 4.88 s, Y in the move, A, G and E around 7.83 s); the keyboard flips to its number row in the last 2 columns, 2 frames after the last letter.
- **The send button is the one saturated element**: a blue disc at the right end of the composer, at about 90% × 70% of the frame in every typing shot.
- **The posted request is shown on a steeper plane.** At 13.67 s the session card (avatar, name, file chip, the sentence) is tilted about 15° the other way with only its top third lit; a progress row under it brightens over 10 frames.
- **The follow-up arrives as a block.** At 14.92 s the cut goes to the phone, upright and tilted, with 8 lines of the agent's reply already written; no typing-on.

**Eye at the cuts.** Corner → diff: about 75% × 50% → composer at about 30% × 65%: 45%, the largest jump, with no softening. Diff → session: composer (30% × 65%) → the sentence (40% × 40%): 10%. Session → follow-up: 40% → about 50%: 10%. Follow-up → logo: 0–5%. 3 of 7 measured cuts are true edits; 4 are typing.

## 2. Classify

Cinematic phone-UI film at 24 fps: close framings cut together. Conventions: tilted phone, depth of field, keyboard close-ups, a logo card.

## 3. Diagnose

- Hard cuts between close framings (diff, composer, keyboard, status). → Cut-not-move: each detail is its own shot, so the phone's small text is legible at 1080p.
- 24 fps with depth of field. → Film grammar signals 'cinema', not 'screen recording'.

## 4. Prescribe

- _new_: 24 fps for a filmic piece (also Notion and Notion Calendar's clips). (formats: fps (not proposed))

## 5. Critique

- **I like:** Close framings make a phone's 13 px text readable without a single camera move.
- **I wish:** The tilt and blur that make it filmic also hide most of each screen.
- **I wonder:** Could cutscene's phone format cut between locator crops of one recording, as this cuts between close framings?

## Not for us

- A 3D phone mock-up; cutscene's phone format records the real page in a device frame.
