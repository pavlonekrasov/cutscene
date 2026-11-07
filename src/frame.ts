import type { Browser } from "@playwright/test";
import { appSize, type Format } from "./formats";

/** The window's title bar, in CSS pixels. */
const BAR = 38;

/**
 * Where the app sits on the canvas, in device pixels: at its captured size (never resampled),
 * centred, on even pixels so the 4:2:0 chroma grid lines up with the app's own pixels.
 */
export function layout(format: Format) {
  const app = appSize(format);
  if (format.frame === "none") return { x: 0, y: 0, ...app, bar: 0, canvas: app };
  const { canvas, scale } = format;
  const bar = format.frame === "window" ? BAR * scale : 0;
  if (app.width > canvas.width || app.height + bar > canvas.height)
    throw new Error(
      `The ${app.width}×${app.height} app doesn't fit the ${canvas.width}×${canvas.height} canvas.`,
    );
  const even = (n: number) => Math.round(n / 2) * 2;
  const x = even((canvas.width - app.width) / 2);
  const y = even((canvas.height - app.height - bar) / 2) + bar;
  return { x, y, ...app, bar, canvas };
}

/**
 * The frame's look per theme: the backdrop, the window (or phone) edge and its shadow. CSS
 * pixels, drawn at the app's density, so a blur or a hairline matches the UI's own. Shadows and
 * rings are pure black or white: they read as depth on any backdrop, where a tinted shadow reads as
 * dirt.
 */
export type Look = {
  /** A step below the app's outer canvas in light, darker than it in dark, so the window floats. */
  backdrop: string;
  /** Outside the window edge only: it never covers an app pixel. */
  shadow: string;
  /** The title bar: give it the app's outer canvas colour and window and app read as one surface. */
  bar: { background: string; dots: string };
  /** The phone outline. Darker than the app's canvas, or the screen edge disappears into it. */
  bezel: { color: string; rim: string };
};

export type FrameStyle = {
  light: Look;
  dark: Look;
  /**
   * The window's corner, CSS px. Make it concentric with the app: an app whose content sits in a
   * panel with a 12px corner, 8px from the edge, wants 20. A full-bleed app looks right at 12.
   */
  windowRadius: number;
  /** The phone screen's corner, CSS px. */
  screenRadius: number;
};

const black = (alpha: number) => `oklch(0 0 0 / ${alpha})`;
const white = (alpha: number) => `oklch(1 0 0 / ${alpha})`;

/**
 * Neutral defaults. Tune `bar.background` (and `backdrop` a step from it) to your app's outer
 * canvas colour, and `windowRadius` to your app's panel.
 */
export const DEFAULT_FRAME: FrameStyle = {
  light: {
    backdrop: "oklch(0.935 0 0)",
    // Ring, contact, mid and ambient: a tight lift that stays crisp at 4K.
    shadow: [
      `0 0 0 1px ${black(0.07)}`,
      `0 1px 2px -1px ${black(0.1)}`,
      `0 4px 10px -2px ${black(0.05)}`,
      `0 18px 40px -10px ${black(0.1)}`,
    ].join(", "),
    bar: { background: "oklch(0.965 0 0)", dots: "oklch(0.87 0 0)" },
    bezel: { color: "oklch(0.18 0 0)", rim: "oklch(0.3 0 0)" },
  },
  dark: {
    backdrop: "oklch(0.13 0 0)",
    // Dark separates by the white ring; a wide blur over a dark backdrop bands in 8 bits.
    shadow: [
      `0 0 0 1px ${white(0.1)}`,
      `0 2px 4px ${black(0.3)}`,
      `0 24px 56px -12px ${black(0.5)}`,
    ].join(", "),
    bar: { background: "oklch(0.18 0 0)", dots: "oklch(0.3 0 0)" },
    bezel: { color: "oklch(0.09 0 0)", rim: "oklch(0.3 0 0)" },
  },
  windowRadius: 12,
  screenRadius: 28,
};

/** The frame page: drawn in CSS pixels on a canvas-sized page at the app's density. */
export function frameHtml(format: Format, look: Look, style: FrameStyle) {
  const s = format.scale;
  const { x, y, width, height, bar } = layout(format);
  const px = (n: number) => `${n / s}px`;
  const device = format.frame === "device";
  const r = device ? style.screenRadius : style.windowRadius;
  const b = device ? 7 : 0; // phone bezel, CSS px
  const hole = `left:${px(x)};top:${px(y)};width:${px(width)};height:${px(height)};border-radius:${device ? `${r}px` : `0 0 ${r}px ${r}px`}`;
  const shell = device
    ? `left:calc(${px(x)} - ${b}px);top:calc(${px(y)} - ${b}px);width:calc(${px(width)} + ${2 * b}px);height:calc(${px(height)} + ${2 * b}px);border-radius:${r + b}px`
    : `left:${px(x)};top:${px(y - bar)};width:${px(width)};height:${px(height + bar)};border-radius:${r}px`;
  // No title: the app names itself, and a system-font title would sit beside the app's own type.
  return `<!doctype html><html><body style="margin:0">
  <style>
    div { position: absolute; box-sizing: border-box; }
    .hole { box-shadow: 0 0 0 9999px ${look.backdrop}; }
    .shell { box-shadow: ${look.shadow}; }
    .bezel { border: ${b}px solid ${look.bezel.color}; box-shadow: 0 0 0 1px ${look.bezel.rim}; }
    .bar { background: ${look.bar.background}; border-radius: ${r}px ${r}px 0 0; }
    .dots { left: 20px; top: 50%; translate: 0 -50%; display: flex; gap: 8px; }
    .dots i { width: 12px; height: 12px; border-radius: 50%; background: ${look.bar.dots}; }
  </style>
  <div class="hole" style="${hole}"></div>
  <div class="shell" style="${shell}"></div>
  ${device ? `<div class="bezel" style="${shell}"></div>` : ""}
  ${
    format.frame === "window"
      ? `<div class="bar" style="left:${px(x)};top:${px(y - bar)};width:${px(width)};height:${BAR}px">
          <div class="dots"><i></i><i></i><i></i></div></div>`
      : ""
  }
  </body></html>`;
}

/** The frame as a canvas-sized PNG with a transparent hole where the app plays. */
export async function renderFrame(
  browser: Browser,
  format: Format,
  look: Look,
  style: FrameStyle,
  file: string,
) {
  const { canvas } = layout(format);
  // Inside a scene, Playwright gives new pages the project's options; a phone's `isMobile` would
  // lay this page out at 980px and shrink it to fit, drawing the frame at half size.
  const page = await browser.newPage({
    viewport: { width: canvas.width / format.scale, height: canvas.height / format.scale },
    deviceScaleFactor: format.scale,
    isMobile: false,
    hasTouch: false,
  });
  await page.setContent(frameHtml(format, look, style));
  await page.screenshot({ path: file, omitBackground: true });
  await page.close();
}
