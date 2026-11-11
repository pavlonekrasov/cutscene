# The craft rulebook

What cutscene has learned from measured references. Each rule gives its range, **n** (references
that support it, and which ones), and the cutscene setting it maps to. n < 3, or one brand only,
is **provisional**. A rule that would change a 0.3.0 default goes to Pavlo; it never goes straight
into code. Breakdowns: [breakdowns/](breakdowns/). Numbers: [references/](references/).

**Read the n honestly.** 13 of the 17 references were made with Screen Studio, so the camera rules
below are mostly one tool's defaults, which seven craft-led brands chose to ship. They are the
genre's de facto standard, not an independent consensus. Linear's four films are the counterpoint:
motion design, with a locked camera.

**The evidence is split on timing.** 0.3.0's eight X reels (custom-edited by Dia, Notion, v0,
shadcn, Figma and others) measured push-ins of 400–570 ms with the speed peak at 0.36–0.5, close
to today's default ([2026-11-08](2026-11-08-showreel-references.md)). That was a throwaway script,
not this instrument. Until those reels are measured again with `measure`, rules 1–2 describe the
Screen Studio genre, not the hand-edited one, and no default moves on them.

## Measured: cutscene 0.3.0 against the references (same instrument)

|                                | cutscene 0.3.0 (tour reel)            | References (Screen Studio-made)                                         |
| ------------------------------ | ------------------------------------- | ----------------------------------------------------------------------- |
| Push, 2–98%                    | 0.35–0.36 s                           | 0.72–0.89 s (Stripe 0.45–0.52 s)                                        |
| Pull, 2–98%                    | (0.6 s nominal)                       | 0.93–1.03 s                                                             |
| Speed peak (share of the move) | 0.52–0.54 (symmetric)                 | 0.03–0.19 (front-loaded)                                                |
| Curve fit, RMS of travel       | 0.16% for its own curve (the control) | its own curve fits worst on all 14 moves: 3.3–7.5%; best fits 0.15–1.4% |
| Working zoom                   | ×1.33–1.5                             | brand medians ×1.24–2.26, median ×1.68                                  |
| Camera still                   | 92%                                   | 56–92%, median 76% (launch clips)                                       |

## Rules

| #   | Rule and range                                                                                                                                                                      | n, sources                                                                                                                | Maps to (now)                                           | Status                                                                                                                                |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Pull-out: a critically damped spring in log-zoom, ω 5.7–6.0/s, settling 98% in 0.97–1.03 s; no overshoot.                                                                           | 4: Supabase, Pitch, v0, Sentry (fits 0.15–0.30%)                                                                          | `ease` cubic-bezier(0.65,0,0.35,1), `CAMERA.pull` 0.6 s | **contradicts 0.3.0** → Pavlo, after the X reels are re-measured                                                                      |
| 2   | Push-in and follow-pans: front-loaded (speed peak 0.03–0.16); out-quint ~1.3 s, or a critically damped spring ω 6.6–7.9/s settling 0.75–0.9 s. Stripe runs faster (ω 9–10, 0.52 s). | 8: Sentry, Supabase, v0, Pitch, Notion Calendar, Notion, Render, Stripe                                                   | `ease`, `CAMERA.push` 0.5 s, `CAMERA.pan` 0.5–0.8 s     | **contradicts 0.3.0** → Pavlo, after the X reels are re-measured; the curve is what Part 3 step 3 (spring follow) builds as an option |
| 3   | Working zoom ×1.4–2.3 (median ×1.68); deeper for small targets and typing (×2.1–2.7).                                                                                               | 11 brands                                                                                                                 | `CAMERA.working` ×1.5                                   | adjusts → Pavlo                                                                                                                       |
| 4   | Reframes of up to ×2.7 move, with blur; they don't cut.                                                                                                                             | 4: Supabase, Framer, Tailwind, Pitch                                                                                      | `CAMERA.cutOver.zoom` ×1.8                              | contradicts → Pavlo                                                                                                                   |
| 5   | Hold after a push: at least 1.5 s, typically 2–9 s, often the whole task; while the action stays in the region, follow with pans instead of pulling out and pushing back in.        | 9: Shopify (1.55 min), Supabase, Sentry, Stripe, Render, Pitch, Notion, Notion Calendar, v0; Linear's 1.6–2.0 s read time | hold before a pull (no setting)                         | new, n ≥ 3 → propose as default                                                                                                       |
| 6   | Establish wide briefly: 0.1–1.9 s (median ~0.8 s) before the first push.                                                                                                            | 8: Stripe, Pitch, Notion Calendar, Supabase, v0, Notion, Framer, Tailwind                                                 | first shot                                              | new, n ≥ 3 → propose                                                                                                                  |
| 7   | End wide on the result (the toast, the finished slide, the list).                                                                                                                   | 8: Stripe, Pitch, Notion Calendar, Notion, Supabase, v0, Framer, Render                                                   | reel structure                                          | new, n ≥ 3 → propose                                                                                                                  |
| 8   | Push to act, pull to see: alternate a push for an input with a pull to show its effect.                                                                                             | 4: Supabase, Shopify, Pitch, Stripe                                                                                       | camera                                                  | new                                                                                                                                   |
| 9   | Motion blur on fast camera moves.                                                                                                                                                   | 6 by eye: Stripe, Pitch, Supabase, Framer, Tailwind, Screen Studio hero                                                   | renderer (not built)                                    | new; opt-in at most (it's the Screen Studio signature)                                                                                |
| 10  | A window on a backdrop with margins, rounded corners and a shadow.                                                                                                                  | 9 by eye                                                                                                                  | `frame`                                                 | confirms 0.3.0; references mostly use saturated wallpapers, which we don't copy                                                       |
| 11  | Lock the camera while the app's own content moves.                                                                                                                                  | 1: Linear (GitHub loop triggers)                                                                                          | camera                                                  | provisional                                                                                                                           |
| 12  | End cards: a claim 1.4–2.6 s, a logo 1.5–4.2 s (median 3.0 s); they leave by scaling to ×0.95 and fading, accelerating out over ~0.4 s.                                             | 4 films, 1 brand: Linear                                                                                                  | `CARD.close` 2 s, `CARD.leave` 0.3 s                    | provisional                                                                                                                           |
| 13  | Cuts land on musical accents, not on a beat grid.                                                                                                                                   | 1: Linear (58% of cuts within 40 ms of an onset; chance ~38%); 3 others show no grid                                      | beat snap                                               | provisional; beat snap stays research-gated                                                                                           |

## What the instrument can't read

- In-app changes (a message appearing, a page navigating) read as cut candidates; breakdowns mark
  which ones stills confirm.
- Perspective cameras (Linear's 3D films) and heavy motion blur (Framer, the Screen Studio hero).
- Title exits that fade or blur, and long scrolls that bring in new content.

## Runs

### 2026-11-11: What we learned

- 17 references read with no sign-in: 4 Linear changelog films, 13 Screen Studio showcase clips.
  The 8 X reels from 0.3.0 still need a session Pavlo signs in to.
- **Contradictions (to Pavlo):** rules 1, 2 and 4. cutscene's symmetric 0.5 s ease is the curve
  that fits every Screen Studio-made move worst, and those moves take 2–2.5 times as long. 0.3.0's
  X reels measured close to today's default, so re-measure them before any default moves.
- **Adjusts:** working zoom ×1.5 → about ×1.7 (rule 3).
- **Reached n ≥ 3, proposed as defaults:** a hold after each push (5), a short establishing wide
  (6), ending wide on the result (7).
- **Not found yet:** no reference uses parallel action or a format change within a reel. Sound: all
  4 Linear films have music; none snaps cuts to a beat grid.
