# Family: Ethereum wallet in the browser

- **Video:** https://video.twimg.com/ext_tw_video/1907434459151867905/pu/vid/avc1/1280x720/XJPcxJXEDwm5O_3h.mp4?tag=14
- **Found on:** https://x.com/family/status/1907436623286960220
- **Maker:** Family. **Kind:** launch film. **Posted:** 2025-04-02. **Read:** 2026-11-11.
- **Numbers:** [references/2026-11-11-family-ethereum.json](../references/2026-11-11-family-ethereum.json)

**Why it's here.** A 47 s platform launch in chapters. Each chapter is a verb card ('Sign up your way', 'Verify that it's you', 'Send tokens', 'Send NFTs', 'Sign in with Family') followed by one floating panel doing exactly that, on a backdrop colour of its own. 41 shots, median 1.0 s.

## 1. Describe

### Measured

47.27 s, 1280×720, 30 fps. Camera still 82% of the time. 41 shots, median 1 s. 40 cuts (33 dissolves); 35 moves.

Moves:

- 1.54 s pan ×1 (pan 11, 0%), 2–98% 230 ms, 10–90% 170 ms, peak 0.27, overshoot 5%
- 2.98 s pan ×1.03 (pan -14.3, 2.6%), 2–98% 270 ms, 10–90% 250 ms, peak 0.8, overshoot 10%
- 33.78 s pan ×1 (pan 0, 13.9%), 2–98% 390 ms, 10–90% 270 ms, peak 0.23
- 40.31 s pan ×1 (pan -15, 0%), 2–98% 190 ms, 10–90% 140 ms, peak 0.47, overshoot 4%
- 42.53 s pull ×0.826 (pan 0.3, 0.4%), 2–98% 190 ms, 10–90% 130 ms, peak 0.72, overshoot 24%
- 42.85 s pull ×0.782 (pan 3.4, -0.1%), 2–98% 420 ms, 10–90% 360 ms, peak 0.84
- 45.00 s pan ×0.999 (pan 5.7, 0%), 2–98% 370 ms, 10–90% 70 ms, peak 0.55
- (28 more under 150 ms, ×1.1 or 5% of the frame: blur, UI changes or tracker noise)

**What the instrument can read.** Still 82%: the motion is panels sliding in and cards building, mostly next to cuts. The one fitted pan (33.78) is a panel entering, rms 7.6%: too loose to count.

Autofit left out 3 moves with a cut too close and 1 whose best fit was above 3% (the tracker, not a curve).

### Shot list

| Time (s)    | Framing            | What happens                                                                                                            | Out                |
| ----------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------- | ------------------ |
| 0.00–3.33   | cards              | 'Getting into crypto'; 'Just got' builds to 'Just got easier'; a mascot flies through                                   | dissolves          |
| 3.33–10.27  | sign-up chapter    | 'Sign up your way'; 'Phone or Email' on blue; the phone form, an email typed; 'Verify that it's you'; a code typed      | dissolves          |
| 10.27–17.47 | account chapter    | 'Your Phrase' pills; 'One self-custody account'; 'All your wallets'; 'Now available in your browser'                    | dissolves          |
| 17.47–21.87 | the desktop window | the wallet in a browser window on purple, the only full window in the film                                              | dissolve           |
| 21.87–28.07 | send chapter       | 'Send tokens'; a send card picks a token, enters an amount, confirms; 'Transaction Sent' with a check                   | cuts and dissolves |
| 28.07–31.93 | NFT chapter        | 'Send NFTs'; a cat NFT card; quantity 1 → 3                                                                             | cuts               |
| 31.93–40.73 | sign-in chapter    | 'Sign in with Family' on teal; a site's 'Connect' button tapped; the connection request; 'One seamless … for every app' | dissolves          |
| 40.73–47.27 | close              | a security check; 'Your Control'; the logo with family.co                                                               | end                |

### By eye

- **Zoom:** panels shown whole and floating (a phone screen, a send card, a connect dialog); typed values at about ×2
- **Cards:** about 12: 'Getting into crypto', 'Just got easier', 'Sign up your way', 'Verify that it's you', 'One self-custody account', 'All your wallets', 'Now available in your browser', 'Send tokens', 'Send NFTs', 'Sign in with Family', 'One seamless … for every app', 'Your Control'
- **Cursor:** a yellow tap dot
- **Frame:** flat colour fields with soft shapes, a new colour per chapter (cream, blue, purple, yellow, teal)
- **Aspect:** 16:9, 1280×720, 30 fps
- **Sound:** an audio track with rhythmic onsets (not listened to)

## 2. Classify

Motion-designed launch film for a new product surface (a browser wallet). Conventions: verb chapter cards, single-panel UI demos, illustrated mascots, a logo with the URL.

## 3. Diagnose

- Every chapter opens on a verb card, then one panel performs that verb. → Claim then proof, chunked: one action per chapter keeps 47 s legible without narration.
- Each chapter has its own backdrop colour. → Colour as a chapter marker (wayfinding): the colour change says 'next feature' before the card is read.
- The UI is shown as single floating panels; the full window appears once, for 'in your browser'. → Isolation by default; context only where context is the claim.
- 41 shots at a 1.0 s median but 82% still. → Fast cutting of held frames: the rhythm comes from the cuts, not from camera movement.

## 4. Prescribe

- _new_: Give each chapter of a multi-scene reel its own backdrop tint, so the colour change marks the chapter. (renderer backdrop per scene (not built))
- _confirms_: Isolate the component: one panel per action on a plain field. (camera / renderer (not built))
- _confirms_: A verb card before each scene names what the scene proves. (cards (not built))

## 5. Critique

- **I like:** The verb cards name the action the next shot proves, so the film never needs a voice-over.
- **I wish:** At 47 s it repeats the card-then-panel unit eight times at the same pace; the send and NFT chapters could be one.
- **I wonder:** Could the reel derive chapter tints from the app's own palette, stepping hue in OKLCH at fixed lightness?

## Not for us

- Mascot and illustration animation.
- Rebuilt panels on drawn fields.
