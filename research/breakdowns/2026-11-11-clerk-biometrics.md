# Clerk: biometric sign-in

- **Video:** https://video.twimg.com/amplify_video/2089754799927689219/vid/avc1/1280x720/wR5AsqCUenKEy6Z0.mp4?tag=29
- **Found on:** https://x.com/clerk/status/2089756323965796604
- **Maker:** Clerk. **Kind:** launch film. **Posted:** 2026-08-18. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-clerk-biometrics.json](../references/2026-11-11-clerk-biometrics.json)

**Why it's here.** An abstract opener (dots stretch into the Face ID glyph) resolves into the one button the feature adds, 'Continue with Face ID', isolated on white, before the phone screen shows it in place. 21.2 s.

## 1. Describe

### Measured

21.17 s, 1280×720, 59.9 fps. Camera still 80% of the time. 12 shots, median 1.09 s. 11 cuts (5 dissolves); 6 moves.

Moves:

- 4.54 s pull ×0.173 (pan 86.5, 2.9%), 2–98% 860 ms, 10–90% 440 ms, peak 0.44
- 6.14 s pan ×0.982 (pan 0, -5.4%), 2–98% 1390 ms, 10–90% 680 ms, peak 0.78, overshoot 21%
- 7.74 s pull ×0.499 (pan 0.2, -43.6%), 2–98% 550 ms, 10–90% 340 ms, peak 0.24
- (3 more under 150 ms, ×1.1 or 5% of the frame: blur, UI changes or tracker noise)

**What the instrument can read.** The two big 'moves' are the glyph assembling and the phone sliding up; content motion, not camera.

### Curve fits

RMS error as % of the move's travel; the same fit recovers cutscene 0.3.0's own push at 0.16%.

| Move               | Best fit                                      | Next other curve     | cutscene 0.3.0's curve |
| ------------------ | --------------------------------------------- | -------------------- | ---------------------- |
| pull ×0.18 at 4.54 | in-out-quint on linear scale, 1298 ms (0.73%) | ease, 809 ms (1.47%) | 2.22% (1055 ms)        |

Autofit left out 1 moves with a cut too close.

### Shot list

| Time (s)    | Framing          | What happens                                                    | Out       |
| ----------- | ---------------- | --------------------------------------------------------------- | --------- |
| 0.00–7.56   | abstract         | dots stretch into rounded strokes that become the Face ID glyph | dissolves |
| 7.56–9.14   | isolated control | 'Continue with Face ID'                                         | hard cut  |
| 9.14–13.86  | phone            | the sign-in screen; Face ID confirms; the account screen        | hard cuts |
| 13.86–16.30 | card             | 'Now' → 'Now in Clerk: Sign in with biometrics'                 | hard cut  |
| 16.30–21.17 | logo             | Clerk                                                           | end       |

### By eye

- **Zoom:** the button alone at ×3; the phone at about 70% of frame height
- **Cards:** 'Now' → 'Now in Clerk: Sign in with biometrics' (builds, left-aligned); logo 4.9 s
- **Cursor:** none (touch)
- **Frame:** white to lavender gradient; a phone with no bezel shadow
- **Aspect:** 16:9, 60 fps
- **Sound:** an audio track with rhythmic onsets (not listened to)

## 2. Classify

Motion-designed micro-launch for a single control, on a phone. Conventions: a shape morph into an icon, the control isolated, then in context, a left-aligned claim that builds.

## 3. Diagnose

- The control is shown alone before it's shown in a screen. → Introduce the part, then the whole: the viewer knows what to look for when the full screen arrives.
- The opener morphs into the feature's own icon. → Shape continuity: the abstract motion pays off as the button's glyph.

## 4. Prescribe

- _confirms_: Isolate the component before showing it in context. (camera / renderer (not built))
- _confirms_: A claim card that builds, then the logo (4.9 s here). (CARD.close)

## 5. Critique

- **I like:** A one-button feature gets a one-button film: nothing on screen is unrelated to Face ID.
- **I wish:** Seven seconds of abstract shapes before any UI is long for 21 s.
- **I wonder:** Could cutscene's phone format open on the one control a scene is about, then pull to the screen?

## Not for us

- Abstract morph openers: motion design, not recorded UI.
