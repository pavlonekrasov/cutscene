/**
 * The layer drawn over the real app while it records: a cursor that follows the mouse (or a tap dot
 * for touch), a press ripple, and an optional caption. It lives in the page, so it lands in the same
 * frames as the UI and never needs compositing. Runs as an init script on every document, so a full
 * navigation keeps the cursor where it was (sessionStorage). Not product UI: aria-hidden, no events.
 */
export type OverlayOptions = {
  pointer: "mouse" | "touch";
  /** CSS selectors hidden while recording: dev-only badges, toolbars, cookie banners. */
  hide: string[];
  /** CSS selectors blurred for the whole recording (the blurred version): a logo, names. */
  blur: string[];
  /** The page's main region (CSS selector): `scroll(distance)` scrolls its container. */
  main: string;
};

/** The director's hooks in the page, as `window.__cutscene`. */
export type Hooks = {
  caption(text: string | null): void;
  visible(on: boolean): void;
  /** Scrolls every container between the node and the page so it sits mid-view (paced). */
  scrollTo(node: Element): Promise<void>;
  /** Scrolls the main region's container by a distance (paced). */
  scrollBy(distance: number): Promise<void>;
};

export type Page$ = typeof window & { __cutscene: Hooks };

export function installOverlay({ pointer, hide, blur, main }: OverlayOptions) {
  const KEY = "cutscene-cursor";
  const ns = "http://www.w3.org/2000/svg";
  const hidden = hide.length ? `${hide.join(", ")} { display: none !important; }` : "";
  // Strong enough that a 20px mark or a line of text can't be read back, at any density.
  const blurred = blur.length ? `${blur.join(", ")} { filter: blur(6px) !important; }` : "";
  const style = `
    ${hidden}
    ${blurred}
    #cutscene-layer { position: fixed; inset: 0; pointer-events: none; z-index: 2147483647; }
    #cutscene-cursor { position: absolute; left: 0; top: 0; width: 26px; height: 26px;
      transform-origin: 3px 3px; transition: scale 90ms ease-out, opacity 160ms ease-out;
      will-change: translate;
      filter: drop-shadow(0 1px 1.5px oklch(0 0 0 / 0.35)); }
    #cutscene-cursor[data-down] { scale: 0.86; }
    .cutscene-ripple { position: absolute; width: 40px; height: 40px; margin: -20px 0 0 -20px;
      border-radius: 50%; background: oklch(0.62 0.19 264 / 0.28);
      box-shadow: 0 0 0 1.5px oklch(0.62 0.19 264 / 0.55);
      animation: cutscene-ripple 520ms cubic-bezier(0.22, 1, 0.36, 1) forwards; }
    .cutscene-tap { position: absolute; width: 44px; height: 44px; margin: -22px 0 0 -22px;
      border-radius: 50%; background: oklch(1 0 0 / 0.55); box-shadow: 0 0 0 1px oklch(0 0 0 / 0.18),
      0 2px 8px oklch(0 0 0 / 0.2); animation: cutscene-tap 420ms ease-out forwards; }
    @keyframes cutscene-ripple { from { scale: 0.3; opacity: 1; } to { scale: 1.25; opacity: 0; } }
    @keyframes cutscene-tap { 0% { scale: 0.6; opacity: 0; } 25% { scale: 1; opacity: 1; }
      100% { scale: 1.1; opacity: 0; } }
    #cutscene-caption { position: absolute; inset-inline: 16px; bottom: 28px; translate: 0 8px;
      width: fit-content; max-width: 720px; margin-inline: auto; padding: 10px 18px; border-radius: 999px;
      background: oklch(0.2 0.01 270 / 0.88); color: oklch(0.98 0 0); opacity: 0;
      font: 500 16px/1.4 var(--font-sans, system-ui), system-ui, sans-serif; text-align: center;
      backdrop-filter: blur(8px); transition: opacity 240ms ease-out, translate 240ms ease-out; }
    #cutscene-caption[data-on] { opacity: 1; translate: 0 0; }
    @media (max-width: 480px) { #cutscene-caption { font-size: 14px; padding: 8px 14px; bottom: 20px; } }
  `;

  function mount() {
    if (document.getElementById("cutscene-layer")) return;
    const sheet = document.createElement("style");
    sheet.textContent = style;
    document.head.append(sheet);
    const layer = document.createElement("div");
    layer.id = "cutscene-layer";
    layer.setAttribute("aria-hidden", "true");
    const caption = document.createElement("div");
    caption.id = "cutscene-caption";
    layer.append(caption);
    document.documentElement.append(layer);

    const saved = JSON.parse(sessionStorage.getItem(KEY) ?? "null") as [number, number] | null;
    let cursor: SVGSVGElement | null = null;
    if (pointer === "mouse") {
      cursor = document.createElementNS(ns, "svg");
      cursor.id = "cutscene-cursor";
      cursor.setAttribute("viewBox", "0 0 26 26");
      const path = document.createElementNS(ns, "path");
      path.setAttribute("d", "M3 2.5v18.2l4.6-4.4 3 6.9 3.3-1.4-3-6.8h6.4z");
      path.setAttribute("fill", "oklch(0.15 0 0)");
      path.setAttribute("stroke", "oklch(1 0 0)");
      path.setAttribute("stroke-width", "1.6");
      path.setAttribute("stroke-linejoin", "round");
      cursor.append(path);
      layer.append(cursor);
      if (saved) cursor.style.translate = `${saved[0] - 3}px ${saved[1] - 3}px`;
      else cursor.style.opacity = "0";
    }

    addEventListener(
      "mousemove",
      (event) => {
        if (!cursor) return;
        cursor.style.opacity = "1";
        cursor.style.translate = `${event.clientX - 3}px ${event.clientY - 3}px`;
        sessionStorage.setItem(KEY, JSON.stringify([event.clientX, event.clientY]));
      },
      { capture: true, passive: true },
    );
    const mark = (className: string, x: number, y: number) => {
      const dot = document.createElement("div");
      dot.className = className;
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      layer.append(dot);
      dot.addEventListener("animationend", () => dot.remove());
    };
    addEventListener(
      "mousedown",
      (event) => {
        if (!cursor) return;
        cursor.toggleAttribute("data-down", true);
        mark("cutscene-ripple", event.clientX, event.clientY);
      },
      { capture: true, passive: true },
    );
    addEventListener("mouseup", () => cursor?.removeAttribute("data-down"), {
      capture: true,
      passive: true,
    });
    addEventListener(
      "touchstart",
      (event) => {
        const touch = event.touches[0];
        if (touch) mark("cutscene-tap", touch.clientX, touch.clientY);
      },
      { capture: true, passive: true },
    );

    // Scrolls animated on the page's own clock, which the director paces (`pace.ts`); Chrome's
    // smooth scroll ignores the pace. Eased in and out, timed by distance.
    type Move = [box: Element, from: number, to: number];
    const curve = (k: number) => (k < 0.5 ? 4 * k * k * k : 1 - (-2 * k + 2) ** 3 / 2);
    const glideScroll = (moves: Move[]) => {
      const distance = Math.max(0, ...moves.map(([, from, to]) => Math.abs(to - from)));
      if (!distance) return Promise.resolve();
      const ms = Math.min(900, 300 + distance * 0.5);
      return new Promise<void>((done) => {
        let start = 0;
        const step = (time: number) => {
          start ||= time;
          const k = Math.min(1, (time - start) / ms);
          for (const [box, from, to] of moves)
            box.scrollTo({ top: from + (to - from) * curve(k), behavior: "instant" });
          if (k < 1) requestAnimationFrame(step);
          else done();
        };
        requestAnimationFrame(step);
      });
    };

    const hooks: Hooks = {
      caption(text) {
        if (text) caption.textContent = text;
        caption.toggleAttribute("data-on", Boolean(text));
      },
      visible(on) {
        layer.style.visibility = on ? "" : "hidden";
      },
      scrollTo(node) {
        const boxes: Element[] = [];
        for (let box = node.parentElement; box; box = box.parentElement)
          if (box.scrollHeight > box.clientHeight) boxes.push(box);
        const from = boxes.map((box) => box.scrollTop);
        node.scrollIntoView({ block: "center", inline: "nearest", behavior: "instant" });
        const moves = boxes.map((box, i): Move => [box, from[i]!, box.scrollTop]);
        for (const [box, start] of moves) box.scrollTo({ top: start, behavior: "instant" });
        return glideScroll(moves);
      },
      scrollBy(distance) {
        let box: Element | null = document.querySelector(main);
        while (box && box !== document.body && !(box.scrollHeight > box.clientHeight))
          box = box.parentElement;
        const target = box && box !== document.body ? box : document.scrollingElement!;
        return glideScroll([[target, target.scrollTop, target.scrollTop + distance]]);
      },
    };
    Object.assign(window, { __cutscene: hooks });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
}
