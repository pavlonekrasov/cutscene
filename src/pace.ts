/**
 * Slow motion for the capture. Chrome streams 2× frames at ~30 per second, so a scene records at
 * `pace` times slower than life and the editor speeds it back up: every motion lands at 60 fps,
 * with the pixels Chrome painted. CSS transitions and animations follow the document timeline,
 * which the director slows over CDP (`Animation.setPlaybackRate`); this init script slows the
 * page's JS clock the same way, so timers (a toast's lifetime, a hover delay) and rAF-driven motion
 * keep their real durations in the finished video. `Date.now()` stays real: the app's timestamps
 * must read true.
 */
export function installPace(pace: number) {
  if (pace === 1) return;
  const perf = performance.now.bind(performance);
  const origin = perf();
  const slow = (t: number) => origin + (t - origin) / pace;
  performance.now = () => slow(perf());

  const frame = window.requestAnimationFrame.bind(window);
  window.requestAnimationFrame = (callback) => frame((t) => callback(slow(t)));

  const timeout = window.setTimeout.bind(window);
  const interval = window.setInterval.bind(window);
  window.setTimeout = ((handler: TimerHandler, ms?: number, ...args: unknown[]) =>
    timeout(handler, (Number(ms) || 0) * pace, ...args)) as typeof window.setTimeout;
  window.setInterval = ((handler: TimerHandler, ms?: number, ...args: unknown[]) =>
    interval(handler, (Number(ms) || 0) * pace, ...args)) as typeof window.setInterval;
}
