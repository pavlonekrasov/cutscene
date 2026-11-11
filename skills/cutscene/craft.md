# Reel craft: what measured references do

Rules distilled for directing a reel. cutscene learned them by measuring other teams' launch films
frame by frame: 50 crafted films from X, 13 Screen Studio clips and 4 Linear changelog films. Use
them to judge a reel, and to set a reel's own `camera` when its owner asks for a look. cutscene's
defaults stay as they are until the owner decides on these numbers.

Measure a finished reel with `npx cutscene measure <reel.mp4>`. It prints shots, cuts and camera
moves in the same terms as the references, so the two compare directly.

## Structure (each seen in 4 or more references)

- **Cut to reframe; move to follow.** Half the X films (25 of 50) change framing only by cut or
  hold a locked frame. Use camera moves to follow action inside a region, and cut for a new one.
- **Name the claim, then prove it.** 22 of 50 open on a card that states the feature, then cut to
  the UI doing it. A film with several features repeats this per chapter.
- **Isolate the component.** Show one panel or control alone on a plain backdrop at ×2–4, without
  the window around it (23 of 50).
- **Type in close-up.** The typed line fills the frame. Follow the caret, or pull back once the line
  is complete (29 of 50).
- **Hold after every push.** At least 1.5 s, usually 2–9 s. While the action stays in that region,
  follow it with pans; don't pull out and push back in.
- **Lock the frame when the app moves by itself.** That covers a list animating in, a theme flipping
  or a page loading: let the app's own motion carry the shot.
- **Push to act, pull to see.** Push in for an input; pull back so its effect and its cause share a
  frame.
- **End on the result.** End on the toast, the notification, the saved state or the receipt, not on
  the last click. Then end card(s): 47 of 50 end on a card or a logo, for about 4 s.
- **Settle before news.** The camera comes to rest before a modal opens or a press lands
  (`CAMERA.lead` already does this).

## Camera numbers (two genres)

|              | cutscene default | Screen Studio clips                       | Launch films on X (50)                                                   |
| ------------ | ---------------- | ----------------------------------------- | ------------------------------------------------------------------------ |
| Working zoom | ×1.5             | ×1.4–2.3, about ×1.7; ×2.1–2.7 for typing | close-ups at ×2–4, by eye                                                |
| Push-in      | 0.5 s            | settles in 0.75–0.9 s, starts fast        | about 0.75 s with cutscene's curve (median of 16)                        |
| Pull-out     | 0.6 s            | a smooth spring, settles in about 1.0 s   | about 1.0 s with cutscene's curve (median of 24)                         |
| Pan          | 0.5–0.8 s        | 0.9–1.35 s                                | about 0.86 s; scrolls ease out (median of 27)                            |
| Curve        | symmetric in-out | front-loaded: a critically damped spring  | symmetric in-out for zooms, in-out quart or quint (24 of 40), like 0.3.0 |
| Overshoot    | none             | none                                      | none                                                                     |
| Shots        | —                | —                                         | median 1.3 s; films median 31 s                                          |

For the X films' pace in a reel file today, lengthen the moves:
`camera: { push: 0.75, pull: 1.0, pan: [0.7, 1.0] }`. The curve is already theirs. For the Screen
Studio pace, set `camera: { working: 1.7, push: 0.8, pull: 1.0 }` with `density: 4` so ×1.7 stays
sharp. Its spring curve doesn't ship yet.

## Cuts and cards

- **Short dissolves are normal.** Every X film dissolves somewhere, typically over 0.35 s. Keep a
  dissolve shorter than the shots it joins. cutscene's default still dissolves only into cards.
- **Don't cut on a beat grid.** Across 37 films with music, cuts land on the beat no more often than
  chance.
- **Cards:** 45 of 50 films use them, typically 2. Cards build word by word or phrase by phrase.
  Linear's cards leave by scaling to ×0.95 and fading, accelerating out over about 0.4 s.

## Don't copy

- Saturated wallpaper backdrops and motion blur on every move: they make a reel read as "made in
  Screen Studio".
- Webcam bubbles and spoken captions: cutscene records the app, with no narrator.
- A rebuilt mock of the UI. Eight X films tilt the real UI in perspective for an opening. Every
  breakdown notes the cost in legibility, and cutscene doesn't do it until the owner decides.
