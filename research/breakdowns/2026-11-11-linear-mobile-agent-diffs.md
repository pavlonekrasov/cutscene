# Linear: Agent sessions on mobile

- **Video:** https://webassets.linear.app/files/ornj730p/production/8ea92634a2eaa8e2e1441da4fa69ccf0fad9c60e.mp4
- **Found on:** https://linear.app/changelog
- **Maker:** Linear (3D motion design). **Kind:** showreel. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-linear-mobile-agent-diffs.json](../references/2026-11-11-linear-mobile-agent-diffs.json)

**Why it's here.** Cinema grammar on a phone UI: 24 fps, depth of field, hard cuts between close framings (diff, composer, keyboard, agent status) as the request is typed and picked up.

**What the instrument can read.** A perspective camera: the tracker's moves are not usable. Stills confirm at least four real framing changes (2.63, 10.29, 14.92, 17.29); the other candidates are text changing inside a shot.

## Measured

20.83 s, 1920×1080, 24 fps. Camera still 80% of the time. 12 cut candidates; 3 moves.

Moves:

- 3.65 s pan ×0.99 (pan 0, 2.2%), 2–98% 1120 ms, 10–90% 910 ms, peak 0.69, overshoot 4%
- 4.98 s pan ×0.977 (pan 0, 5%), 2–98% 2550 ms, 10–90% 2160 ms, peak 0.81, overshoot 5%
- 16.31 s pan ×0.976 (pan 0, 0.1%), 2–98% 480 ms, 10–90% 400 ms, peak 0.93, overshoot 10%

## Shot list

| Time (s)    | Framing                  | What happens                                                                 | Out  |
| ----------- | ------------------------ | ---------------------------------------------------------------------------- | ---- |
| 0.00–2.63   | phone, tilted, wide      | the agent's Changes tab                                                      | hard |
| 2.63–10.29  | diff and composer, close | a request typed on the keyboard: 'add a preview so I can verify this change' | hard |
| 10.29–14.92 | the session, close       | the request posted; 'Working 00:03… 00:06'                                   | hard |
| 14.92–17.29 | phone, tilted            | the agent's follow-up written out                                            | hard |
| 17.29–20.83 | logo card                | held 3.5 s                                                                   | end  |

By eye:

- **Zoom:** close framings of an iPhone UI, tilted, shallow depth of field
- **Cards:** the Linear logo, 3.5 s
- **Cursor:** none (touch UI; typing shows on the keyboard)
- **Frame:** full-bleed near-black
- **Aspect:** 16:9, 1920×1080, 24 fps
- **Sound:** an audio track (71 onsets); 4 of 12 cut candidates on its grid (chance 19%)

## Frame-level beats

- Typing plays at about real speed in the close-up; the wait ('Working') is shown for ~4 s, long enough to read the timer tick.

## Why it works

- Close framings make phone text legible at 1080p without any camera move.

## What it teaches

- _new_: 24 fps for a filmic piece (also Notion and Notion Calendar's clips). (formats: fps (not proposed))

## Not for us

- A 3D phone mock-up; cutscene's phone format records the real page in a device frame.
