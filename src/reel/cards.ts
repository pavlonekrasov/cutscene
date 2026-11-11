import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import type { Page } from "@playwright/test";
import { frameSize } from "../edit";
import type { Format } from "../formats";
import type { Look } from "../frame";
import type { Page$ } from "../overlay";
import type { CardLine, ReelJob } from "./take";

/** A card's type, CSS px on a 1920-wide canvas: the name, then quieter lines. */
const TITLE = { size: 44, weight: 600, lead: 1.15 };
const LINE = { size: 24, weight: 400, lead: 1.4 };
/** Room around a line for its entrance blur, CSS px on the canvas. */
const PAD = 12;

/**
 * Draws a reel's card lines inside the app's own page, at the end of a take, so they are set in
 * the app's typeface (a card page of its own wouldn't have the webfont). Each line is a PNG on the
 * frame's backdrop colour, sized so one of its pixels is one pixel of the finished reel; the reel
 * animates them. The page is done recording by now.
 */
export async function rasteriseCards(
  page: Page,
  cards: ReelJob["cards"],
  format: Format,
  look: Look,
  theme: "light" | "dark",
  dir: string,
  /** The finished reel's pixels per canvas CSS px. */
  scale = 2,
): Promise<{ open: CardLine[]; close: CardLine[] } | null> {
  if (!cards?.open?.length && !cards?.close?.length) return null;
  await mkdir(join(dir, "cards"), { recursive: true });
  const canvasCss =
    format.frame === "none" ? format.viewport.width : format.canvas.width / format.scale;
  // A phone's canvas is narrow: the type shrinks with it, down to a readable floor.
  const fit = Math.max(0.5, Math.min(1, canvasCss / 1920));
  // The page paints at the take's density; the reel shows the line at `scale`.
  const k = (scale / format.scale) * fit;
  const result = { open: [] as CardLine[], close: [] as CardLine[] };
  for (const side of ["open", "close"] as const) {
    const lines = cards[side] ?? [];
    if (!lines.length) continue;
    await page.evaluate(
      ({ lines, k, pad, title, line, backdrop, dark }) => {
        (window as Page$).__cutscene?.visible(false);
        document.getElementById("cutscene-cards")?.remove();
        const host = document.createElement("div");
        host.id = "cutscene-cards";
        host.style.cssText = `position:fixed;inset:0;z-index:2147483647;background:${backdrop};display:flex;flex-direction:column;align-items:center;justify-content:center;`;
        const family = getComputedStyle(document.body).fontFamily;
        lines.forEach((text, i) => {
          const type = i === 0 ? title : line;
          const row = document.createElement("div");
          const ink = dark ? "oklch(0.97 0 0" : "oklch(0.2 0 0";
          row.textContent = text;
          row.style.cssText = `font:${type.weight} ${type.size * k}px/${type.lead} ${family};letter-spacing:${i === 0 ? "-0.02em" : "0"};color:${ink}${i === 0 ? ")" : " / 0.62)"};white-space:nowrap;padding:${pad * k}px ${pad * 2 * k}px;background:${backdrop};`;
          host.append(row);
        });
        document.documentElement.append(host);
      },
      {
        lines,
        k,
        pad: PAD,
        title: TITLE,
        line: LINE,
        backdrop: look.backdrop,
        dark: theme === "dark",
      },
    );
    for (let i = 0; i < lines.length; i++) {
      const file = join("cards", `${side}-${i + 1}.png`);
      await page
        .locator("#cutscene-cards > div")
        .nth(i)
        .screenshot({ path: join(dir, file) });
      result[side].push({ file, ...frameSize(join(dir, file)) });
    }
  }
  return result;
}

/** How a card plays, seconds: the spec's entrance, a hold, a softer exit. */
export const CARD = { open: 1.5, close: 2, enter: 0.4, stagger: 0.08, leave: 0.3, dissolve: 7 };

const easeOut = (k: number) => 1 - (1 - k) ** 3;
const clamp = (k: number) => Math.min(1, Math.max(0, k));

/**
 * A card line `i` at `t` seconds into a card `length` long: it enters with opacity, an 8 px rise
 * and a 4 px blur over 400 ms (ease-out, 80 ms after the line before it), holds, and leaves by
 * opacity alone.
 */
export function cardLine(i: number, t: number, length: number, scale: number) {
  const k = easeOut(clamp((t - 0.1 - i * CARD.stagger) / CARD.enter));
  const out = clamp((t - (length - CARD.leave)) / CARD.leave);
  const leave = 1 - out * out * (3 - 2 * out);
  return { alpha: k * leave, rise: (1 - k) * 8 * scale, blur: (1 - k) * 4 * scale };
}
