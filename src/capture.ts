import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { CDPSession, Page } from "@playwright/test";

/** One captured frame: the file and when it reached the screen (seconds, wall clock). */
export type Frame = { file: string; t: number };

/** A finished recording: its frames, all on disk, and the moment it stopped. */
export type Recording = { frames: Frame[]; end: number };

/**
 * Where a recorder is. Only `recording` takes frames; `stopped` holds the result, so stopping twice
 * returns the same recording and a paint Chrome sends after the stop never lands in it.
 */
type State =
  | { name: "idle" }
  | { name: "recording"; session: CDPSession }
  | { name: "stopped"; recording: Promise<Recording> };

/**
 * Records the page through Chrome's screencast: an image each time the compositor paints, stamped
 * with its time, at the page's full device resolution. Nothing paints while the page is still, so a frame
 * lasts until the next one; the editor turns that into a constant-rate video. It runs alongside the
 * real browser, so what the video shows is what the app did.
 */
export class Recorder {
  private state: State = { name: "idle" };
  private readonly frames: Frame[] = [];
  private readonly writes: Promise<void>[] = [];
  private writeError: unknown = null;

  constructor(
    private readonly page: Page,
    private readonly dir: string,
    private readonly size: { width: number; height: number },
    /** `png` is lossless; `jpeg` (quality 100) paints faster on a slow machine. */
    private readonly image: "png" | "jpeg" = "png",
  ) {}

  async start() {
    if (this.state.name !== "idle")
      throw new Error(`The recorder is ${this.state.name}: start it once.`);
    await mkdir(this.dir, { recursive: true });
    const session = await this.page.context().newCDPSession(this.page);
    session.on("Page.screencastFrame", ({ data, metadata, sessionId }) => {
      if (this.state.name !== "recording") return;
      const now = Date.now() / 1000;
      // The paint time when Chrome reports one on the same clock; else the arrival time.
      const stamp = metadata.timestamp;
      const t = stamp && Math.abs(stamp - now) < 2 ? stamp : now;
      const file = join(this.dir, `${String(this.frames.length).padStart(6, "0")}.${this.image}`);
      this.frames.push({ file, t });
      // Caught here and rethrown by `stop()`: a write that fails mid-scene mustn't crash the run
      // as an unhandled rejection before anything awaits it.
      this.writes.push(
        writeFile(file, Buffer.from(data, "base64")).catch((error: unknown) => {
          this.writeError ??= error;
        }),
      );
      void session.send("Page.screencastFrameAck", { sessionId }).catch(() => {});
    });
    this.state = { name: "recording", session };
    await session.send("Page.startScreencast", this.screencast());
  }

  /** The screencast's settings: the app's full device size, every frame. */
  private screencast() {
    return {
      format: this.image,
      ...(this.image === "jpeg" ? { quality: 100 } : {}),
      maxWidth: this.size.width,
      maxHeight: this.size.height,
      everyNthFrame: 1,
    };
  }

  /**
   * Waits for a frame of what the screen shows now, so a scene's first or last moment is on record.
   * Chrome drops a paint that lands while the last frame's ack is in flight and never sends it later,
   * and a still page paints nothing more (an animation frame doesn't count: nothing changed). So a
   * pulsing placeholder's last frame stood in for the page that replaced it, until the pointer moved.
   * Restarting the screencast makes Chrome redraw and send the screen as it is.
   */
  async settle(timeout = 1500) {
    if (this.state.name !== "recording")
      throw new Error(`The recorder is ${this.state.name}: settle() needs it recording.`);
    const { session } = this.state;
    const from = Date.now() / 1000;
    await session.send("Page.stopScreencast");
    await session.send("Page.startScreencast", this.screencast());
    // A frame painted before the restart can still arrive; only one painted after it counts.
    const until = Date.now() + timeout;
    while ((this.frames.at(-1)?.t ?? 0) < from && Date.now() < until)
      await new Promise((done) => setTimeout(done, 30));
  }

  /** Ends the recording now. Safe to call again (or before `start`): it returns the same result. */
  stop(): Promise<Recording> {
    if (this.state.name === "stopped") return this.state.recording;
    const session = this.state.name === "recording" ? this.state.session : null;
    // The state changes before anything is awaited, so the frame list and its writes are final.
    const recording = this.finish(session, Date.now() / 1000);
    this.state = { name: "stopped", recording };
    return recording;
  }

  private async finish(session: CDPSession | null, end: number): Promise<Recording> {
    if (session) {
      await session.send("Page.stopScreencast").catch(() => {});
      await Promise.all(this.writes);
      await session.detach().catch(() => {});
    }
    if (this.writeError) throw this.writeError;
    return { frames: this.frames, end };
  }
}
