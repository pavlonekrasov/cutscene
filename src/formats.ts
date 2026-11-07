/**
 * What a recording is shot at and delivered as. The app is captured at `scale` device pixels per CSS
 * pixel and placed on the canvas 1:1, never resampled, so every glyph and edge in the video is the
 * pixel Chrome painted. The canvas is sized so the frame fits around it.
 */
export type Format = {
  /** The app's CSS size. */
  viewport: { width: number; height: number };
  /** Device pixels per CSS pixel: the capture density and the app's size on the canvas. */
  scale: number;
  pointer: "mouse" | "touch";
  /** The delivered video's size; with `frame: "none"` it is the app's own size. */
  canvas: { width: number; height: number };
  /** `window`: a window with a title bar; `device`: a phone outline; `none`: the app alone. */
  frame: "window" | "device" | "none";
};

export const FORMATS = {
  // 16:9 in 4K: the 1440 × 810 app at 2× is 2880 × 1620, inside a window with room for its shadow.
  desktop: {
    viewport: { width: 1440, height: 810 },
    scale: 2,
    pointer: "mouse",
    canvas: { width: 3840, height: 2160 },
    frame: "window",
  },
  // 9:16: the 390 × 844 phone at 2× is 780 × 1688, inside a device outline.
  phone: {
    viewport: { width: 390, height: 844 },
    scale: 2,
    pointer: "touch",
    canvas: { width: 1080, height: 1920 },
    frame: "device",
  },
} satisfies Record<string, Format>;

export type FormatName = keyof typeof FORMATS;

/** The app's size in device pixels: what the capture delivers and the canvas shows. */
export function appSize(format: Format) {
  return {
    width: format.viewport.width * format.scale,
    height: format.viewport.height * format.scale,
  };
}
