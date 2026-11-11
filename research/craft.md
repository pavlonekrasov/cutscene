# The craft rulebook

What cutscene has learned from measured references. Each rule gives its range, **n** (references
that support it, and which ones), and the cutscene setting it maps to. n < 3, or one brand only,
is **provisional**. A rule that would change a 0.3.0 default goes to Pavlo; it never goes straight
into code. Breakdowns: [breakdowns/](breakdowns/). Numbers: [references/](references/).

**Read the n honestly.** 67 references, in three groups:

- **50 launch films from X.** Crafted, not recorded demos (Pavlo's bar, see
  [verdicts](verdicts.md)). 29 hand-edited, 13 motion-designed, 4 in 3D, 3 with live action, 1 in
  the Screen Studio style. 20 brands.
- **13 Screen Studio showcase clips.** Mostly that tool's defaults, so their camera rules describe
  one tool.
- **4 Linear changelog films.**

Curves are fitted only where the best fit explains the move (RMS under 3% of its travel). That left
67 moves in 29 of the X films; the rest sit too close to a cut or were tracked too loosely.

**The two genres, now measured with one instrument.** Screen Studio clips push on front-loaded
springs and out-curves, and move rather than cut. Hand-edited X films mostly cut: 25 of 50 change
framing only by cut or never move. When they do move, they push and pull on symmetric in-out
curves, the shape cutscene 0.3.0 already uses. Both genres take longer than cutscene does: about
1.5× on X, about 2× in Screen Studio.

## Measured: cutscene 0.3.0 against the references (same instrument)

|                    | cutscene 0.3.0                      | Screen Studio clips                  | X launch films (n = 50; curves from 67 clean fits)                                                                       |
| ------------------ | ----------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| Push               | 0.5 s (2–98% 0.35–0.36 s)           | 2–98% 0.72–0.89 s (Stripe 0.45–0.52) | median 0.86 s (IQR 0.72–1.42), n = 16; with cutscene's own curve fitted, median **0.75 s**                               |
| Pull               | 0.6 s                               | settles 0.93–1.03 s                  | median 1.10 s (IQR 0.72–1.74), n = 24; with cutscene's curve, median **1.0 s**                                           |
| Pan                | 0.5–0.8 s                           | follow-pans 0.88–1.35 s              | median 0.88 s (IQR 0.68–1.26), n = 27; with cutscene's curve, median **0.86 s**                                          |
| Curve shape        | in-out, cubic-bezier(0.65,0,0.35,1) | front-loaded: spring ζ 1, out-quint  | zoom moves: 24 of 40 in-out (quart, quint), 8 out, 8 spring; pans: 17 of 27 out-family (scrolls)                         |
| cutscene's curve   | 0.16% on its own push (the control) | worst fit on all 14 moves (3.3–7.5%) | best on 8 of 67, within 1 point of the best on 22; median RMS 1.6% on pushes (best 0.5%)                                 |
| Big reframes       | cut over ×1.8 or half the width     | move, up to ×2.7                     | 25 of 50 reframe only by cut or hold a locked frame; 12 only move; 13 do both                                            |
| Camera still       | 92%                                 | 56–92%, median 76%                   | median 82%                                                                                                               |
| Shot length, film  | —                                   | —                                    | median shot 1.3 s; films median 31 s (IQR 23–47 s)                                                                       |
| Cuts               | hard; dissolves only on cards       | —                                    | every film dissolves somewhere: 49% of cut events, median 0.35 s (UI crossfades are counted too)                         |
| Format, frame rate | 16:9 (phone 9:16)                   | 16:9 and near-16:9                   | 44 of 50 at 16:9; 2 square, 2 at 4:3, 2 at 2:1; none changes format mid-film. 24 fps ×10, 30 ×19, 60 ×21                 |
| Sound              | silent                              | mostly none                          | 39 have an audio track with onsets; 11 are silent (all six Cursor films, Zed, Graphical, Stripe, v0 Design Mode, Vercel) |

**Since 2026-11-11 the defaults follow rule 14:** push 0.75 s, pull 1.0 s, pans 0.7–1.0 s. On the
example reel the instrument reads the new pushes at 0.52–0.53 s (2–98%), against 0.35–0.37 s with
0.3.0's defaults. Read the same way, the X films' pushes have a median of 0.63 s (IQR 0.28–0.97 s,
n = 70, every push, not only the clean fits). The example scene now holds its ×2 result for 1.5 s
after the push (rule 5); with its old 0.8 s wait, the reel cut to wide 0.05 s after the push ended.

## Rules

| #   | Rule and range                                                                                                                                                                                                    | n, sources                                                                                                                                                                 | Maps to (now)                                        | Status                                                                                                                                 |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Pull-out: a critically damped spring in log-zoom, ω 5.7–6.0/s, settling 98% in 0.97–1.03 s.                                                                                                                       | 4 Screen Studio: Supabase, Pitch, v0, Sentry. X pulls split: 11 in-out, 7 out, 6 spring                                                                                    | `ease`, `CAMERA.pull` 1.0 s                          | **Screen Studio genre only.** The curve is an opt-in look; the duration (≈1.0 s) agrees across genres, see rule 14                     |
| 2   | Push-in and follow-pans front-loaded (speed peak 0.03–0.16): out-quint ~1.3 s, or a spring ω 6.6–7.9/s.                                                                                                           | 8 Screen Studio. X pushes: 13 of 16 in-out, 9 of them keyed on a linear scale                                                                                              | `ease`, `CAMERA.push` 0.75 s, `CAMERA.pan` 0.7–1.0 s | **Screen Studio genre only.** X confirms 0.3.0's in-out shape; the spring follow (Part 3) stays an option, not the default             |
| 3   | Working zoom ×1.4–2.3 (median ×1.68); deeper for small targets and typing (×2.1–2.7).                                                                                                                             | 11 Screen Studio brands; X typing close-ups at ×2–4 (rule 16)                                                                                                              | `CAMERA.working` ×1.5                                | adjusts → Pavlo                                                                                                                        |
| 4   | Reframes of up to ×2.7 move, with blur; they don't cut.                                                                                                                                                           | 4 Screen Studio: Supabase, Framer, Tailwind, Pitch                                                                                                                         | `CAMERA.cutOver.zoom` ×1.8                           | **Screen Studio only.** X films cut (25 of 50), which confirms 0.3.0's cut-over                                                        |
| 5   | Hold after a push: at least 1.5 s, typically 2–9 s, often the whole task; while the action stays in the region, follow with pans.                                                                                 | 9 Screen Studio; Linear's 1.6–2.0 s read time; X reading holds of 2–4 s (Notion shared brain, Perplexity ×2, Supabase Explorer)                                            | hold before a pull (no setting)                      | n ≥ 3 → propose as default                                                                                                             |
| 6   | Establish wide briefly: 0.1–1.9 s (median ~0.8 s) before the first push.                                                                                                                                          | 8 Screen Studio. X films rarely open wide (7 of 50): 22 open on a card, 15 on a detail                                                                                     | first shot                                           | n ≥ 3 for Screen Studio-style reels; for edited reels, rule 17's card opens instead                                                    |
| 7   | End on the result: the toast, the saved state, the notification, the receipt.                                                                                                                                     | 8 Screen Studio; X: Perplexity Personal Computer and hybrid (notifications), Figma Payload, Notion shared brain, Stripe pay, v0 Browser Use                                | reel structure; `act.focus` on the toast             | n ≥ 3 → propose                                                                                                                        |
| 8   | Push to act, pull to see: a push for an input, a pull to show its effect.                                                                                                                                         | 4 Screen Studio; X: v0 Design Mode, Framer in Cursor, Stripe pay, Vercel security review                                                                                   | camera                                               | n ≥ 3                                                                                                                                  |
| 9   | Motion blur on fast camera moves.                                                                                                                                                                                 | 6 Screen Studio, by eye                                                                                                                                                    | renderer (not built)                                 | opt-in at most (the Screen Studio signature)                                                                                           |
| 10  | A window on a backdrop with margins, rounded corners and a shadow.                                                                                                                                                | 9 Screen Studio; X: 18 light and 17 dark backdrops, 6 photographic, 4 colour fields                                                                                        | `frame`                                              | confirms 0.3.0                                                                                                                         |
| 11  | Lock the camera while the app's own content moves, or while the whole surface changes.                                                                                                                            | Linear (GitHub loop triggers); X: Cursor Annotate, v0 ChatGPT, Graphical (locked); Family dark mode (hold wide for the theme flip)                                         | camera; `act.wide`                                   | n ≥ 3 → propose                                                                                                                        |
| 12  | Cards: 45 of 50 films have at least one (median 2). 47 of 50 end on a card or logo; the end runs 3.9 s at the median (IQR 2.0–6.3 s), about 11% of the film. Linear's cards leave by scaling to ×0.95 and fading. | 50 X films; 4 Linear                                                                                                                                                       | `CARD.close` 2 s, `CARD.leave` 0.3 s                 | **confirmed**; end-card length adjusts (2 → about 3–4 s) → Pavlo                                                                       |
| 13  | Cuts do not snap to a beat grid. Across 37 films with music and 425 hard cuts: 36% land within 40 ms of an onset (chance 28%); 21% on a beat grid (chance 19%); no film snaps.                                    | 37 X films; Linear (58% on onsets, one film)                                                                                                                               | beat snap                                            | **settled: no grid snap.** At most a weak pull toward accents; not worth building                                                      |
| 14  | Camera moves take about 1.5× 0.3.0's times. Fitted with cutscene's own curve, X moves are matched best at push 0.75 s, pull 1.0 s, pan 0.86 s (medians).                                                          | 67 moves, 29 X films. Agrees in direction with Screen Studio (rules 1–2)                                                                                                   | `CAMERA.push` 0.75, `pull` 1.0, `pan` [0.7, 1.0]     | **adopted** (Pavlo, 2026-11-11: "Yes, try X pace"). It replaces the 500 ms push verdict, which rested on the older script's 400–570 ms |
| 15  | Isolate the component: one element or panel alone on a plain backdrop, at ×2–4, no window chrome.                                                                                                                 | 23 X films: Arc, Dia ×2, Clerk ×4, Cursor ×2, Family ×3, Figma ×3, Notion, Perplexity, Raycast ×2, Supabase ×3, v0 ×3                                                      | renderer: crop a locator's box from the recording    | **new, n ≥ 3 → propose** (Part 2 candidate)                                                                                            |
| 16  | Typing close-ups at ×2–4: the typed line fills the frame, and the frame follows the caret or pulls back once the line is complete.                                                                                | 29 X films type on screen (Cursor side chats, Figma Specs, Perplexity ×4, Raycast, v0 ×4 …)                                                                                | `act.type` framing; rule 3                           | confirms; deepens rule 3's typing zoom                                                                                                 |
| 17  | Open on a card that names the claim, then cut to its proof; chapter cards repeat it per feature. Cards build word by word or phrase by phrase.                                                                    | 22 X films open on a card; chapters: Cursor Annotate, Dia three features, Family Ethereum, Supabase ×3; builds: Arc Windows, Family previews, Notion dock, Cursor Annotate | cards (`CARD`)                                       | n ≥ 3 → propose                                                                                                                        |
| 18  | Side by side: two or three windows or devices in one frame for parallel action, or an input beside the output it changes.                                                                                         | 8: Cursor SDK, Cursor computer use, Family previews, Family dark mode, Figma Payload, Notion shared brain, Raycast Glaze, Zed delta                                        | Part 2 `split`                                       | **evidence for the 0.3.2 build** (n ≥ 3)                                                                                               |
| 19  | Short dissolves between shots, kept shorter than the shots they join.                                                                                                                                             | all 50 dissolve somewhere (median 0.35 s); the critiques of Figma Specs and Family dark mode show what over-long ones cost                                                 | cuts (dissolves only on cards today)                 | adjusts 0.3.0's "no dissolves outside cards" → Pavlo                                                                                   |
| 20  | Open on the navigation to the feature (the tab, the settings row), cropped, before the feature itself.                                                                                                            | 6: Clerk Logs, Family dark mode, Family Ethereum, Figma Payload, Supabase Explorer, Supabase × Expo                                                                        | reel script                                          | n ≥ 3                                                                                                                                  |
| 21  | Real UI on a slightly tilted plane, often with a vignette, for an opening or a mood.                                                                                                                              | 8, 3 brands: Linear ×3, Supabase ×3, Clerk ×2 (plus Linear's two 3D films). Every critique notes the cost in legibility                                                    | renderer tilt (not built)                            | new, n ≥ 3 → opt-in at most; it touches "don't copy 3D" → Pavlo                                                                        |
| 22  | A burst: three to eight shots of 0.3–1.4 s over one result or one control changing state, after a long hold.                                                                                                      | 4: Dia Meet, Perplexity hybrid, Raycast 2026 (the emoji ring), Figma vector                                                                                                | cuts (not built)                                     | new, n ≥ 3 → opt-in                                                                                                                    |
| 23  | Match cut or match on action: an element held at the same screen position across cuts, or an input (a key, a swipe) cut to its result.                                                                            | 4: Arc Tidy Tabs, Framer in Cursor, Notion dock, Dia Profiles                                                                                                              | Part 2 match cut                                     | evidence for the opt-in (n ≥ 3)                                                                                                        |
| 24  | A caption beside or under the frame: a claim column beside a cropped panel, or one subtitle line per shot.                                                                                                        | 4, 2 brands: Supabase ×3, Zed                                                                                                                                              | renderer caption (not built)                         | provisional (one brand carries it)                                                                                                     |
| 25  | A backdrop colour per chapter or scene.                                                                                                                                                                           | 2: Family Ethereum, Dia Profiles                                                                                                                                           | renderer backdrop per scene                          | provisional                                                                                                                            |
| 26  | Story devices: close the loop (data entered in one scene appears in the next); three tasks of rising difficulty; a person, a time and a deadline.                                                                 | Figma Payload, Notion shared brain; v0 Browser Use; Zed delta                                                                                                              | reel script (skill)                                  | provisional                                                                                                                            |

## What the instrument can't read

- In-app changes (a message appearing, a page navigating) read as cut candidates. UI crossfades
  read as dissolves, so rule 19's share is an upper bound. The breakdowns mark which cuts the stills
  confirm.
- Perspective cameras (Linear's films, the tilted planes of rule 21) and heavy motion blur.
- Title exits that fade or blur, and long scrolls that bring in new content.
- Sound is measured for onsets and loudness only, never listened to. "Music" in a breakdown means
  an audio track with rhythmic onsets.

## Runs

### 2026-11-11 (second run, X): What we learned

- **50 crafted launch films on X**, read in Pavlo's signed-in browser. 90 candidates were screened
  (82 new, 8 from 0.3.0) and 40 set aside as recorded demos or off-brief. Each film was measured, curve-fitted, given a
  shot sheet, and broken down in the design-engineering-articulation order: describe, classify,
  diagnose, prescribe, critique.
- **Contradictions (to Pavlo):**
  - Rule 14: moves take about 1.5× 0.3.0's times. This runs against the 500 ms push verdict, which
    rested on the older script's 400–570 ms. Pavlo: "Yes, try X pace"; adopted, see below.
  - Rule 19: short dissolves between shots.
  - Rule 21: tilted real UI.
  - Rule 12: end cards of 3–4 s, not 2.
- **Settled:**
  - 0.3.0's in-out curve shape and cut-over are right for edited reels (rules 2 and 4 describe
    Screen Studio only).
  - Beat snap is out: no film snaps to a grid, and onsets beat chance by only 8 points.
  - Montages that speed up are rare: the measure flags only 6 of 50 films as cutting faster
    toward the end.
- **Reached n ≥ 3:** isolate the component (15, n = 23), side by side (18, n = 8), card then proof
  (17), open on the navigation (20), lock the frame (11), end on the result (7), a burst (22), match
  cuts (23).
- **Not found in 50:** reverse or non-linear time, a cold open on the result, Dutch angles, a format
  change mid-film, a cut grid locked to music.

### 2026-11-11 (first run): What we learned

- 17 references read with no sign-in: 4 Linear changelog films, 13 Screen Studio showcase clips.
- Contradictions to Pavlo: rules 1, 2 and 4. The X run since shows they describe the Screen Studio
  genre.
- Adjusts: working zoom ×1.5 → about ×1.7 (rule 3).
- Proposed as defaults (n ≥ 3): a hold after each push (5), a short establishing wide (6), ending
  wide on the result (7).
