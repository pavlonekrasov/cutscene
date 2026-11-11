# Reel craft: what measured references do

The rules cutscene has learned by measuring other teams' product reels frame by frame, distilled
for directing a reel. cutscene's defaults don't change on these numbers until the owner decides;
use them to judge a reel, and to set a reel's own `camera` when its owner asks for that look.

Measure a finished reel with `npx cutscene measure <reel.mp4>`. It prints shots, cuts and camera
moves the same way the references were measured, so the two compare directly. Check it against
the list below.

## Structure (seen in 8 or more references)

- **Open wide, briefly.** Show the whole window for 0.1–1.9 s (about 0.8 s typically) before the
  first push.
- **Hold after every push.** At least 1.5 s, usually 2–9 s, often the whole task. While the action
  stays in that part of the screen, the camera follows with pans; it doesn't pull out and push
  back in.
- **End wide on the result:** the toast, the saved state, the finished slide, not the last click.
- **Push to act, pull to see.** Push in for an input; pull back so its effect and its cause share
  a frame.
- **Settle before news.** The camera comes to rest before a modal opens or a press lands
  (`CAMERA.lead` already does this).

## Camera numbers (two genres disagree)

|              | cutscene default      | Screen Studio-made clips (Stripe, Notion, Pitch, Supabase, v0, …) | Hand-edited reels on X (0.3.0, older script) |
| ------------ | --------------------- | ----------------------------------------------------------------- | -------------------------------------------- |
| Working zoom | ×1.5                  | ×1.4–2.3, about ×1.7; ×2.1–2.7 for typing                         | ×1.4–2.0                                     |
| Push-in      | 0.5 s, symmetric ease | settles in 0.75–0.9 s, starts fast and decelerates                | 400–570 ms, near-symmetric                   |
| Pull-out     | 0.6 s                 | a smooth spring, settles in about 1.0 s                           | 500–650 ms                                   |
| Overshoot    | none                  | none                                                              | none                                         |

To get the Screen Studio pace in a reel file today, lengthen the moves: `camera: { working: 1.7,
push: 0.8, pull: 1.0 }`, with `density: 4` so ×1.7 stays sharp. The curve itself stays cutscene's
ease until a spring option ships.

## Cards (Linear's changelog films; provisional, one brand)

- A claim card 1.4–2.6 s, then a logo card 1.5–4.2 s (about 3 s).
- Cards leave by scaling to ×0.95 and fading, accelerating out over about 0.4 s.

## Don't copy

- Saturated wallpaper backdrops and motion blur on every move: they make a reel read as "made in
  Screen Studio".
- Webcam bubbles and spoken captions: cutscene records the app, with no narrator.
- A rebuilt or 3D-tilted mock of the UI: the point of cutscene is the real app, legible.
