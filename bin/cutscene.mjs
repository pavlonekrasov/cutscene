#!/usr/bin/env node
// cutscene's command line: set a project up for recording, install the agent skill, check the
// machine. Plain Node, no dependencies, so `npx @pavlonekrasov/cutscene …` runs anywhere.
import { spawnSync } from "node:child_process";
import {
  appendFileSync,
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import { createRequire } from "node:module";
import { homedir } from "node:os";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const own = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const cwd = process.cwd();
const [command = "help", ...rest] = process.argv.slice(2);
const flags = new Set(rest.filter((arg) => arg.startsWith("--")));
const args = rest.filter((arg) => !arg.startsWith("--"));
/** A flag's value: undefined when the flag isn't there; fails when it's there without one. */
const option = (name) => {
  const at = rest.indexOf(`--${name}`);
  if (at < 0) return undefined;
  const value = rest[at + 1];
  if (!value || value.startsWith("--")) fail(`--${name} needs a value.`);
  return value;
};

const say = (line = "") => console.log(line);
const fail = (line) => {
  console.error(`cutscene: ${line}`);
  process.exit(1);
};
/** Runs a command in the project, output shown; Windows needs a shell for npm/npx (.cmd). */
const run = (cmd, cmdArgs) => {
  // npm, npx and friends are .cmd files on Windows, which only start through a shell; there the
  // command goes as one quoted line (package names and flags, never user input).
  if (process.platform !== "win32")
    return spawnSync(cmd, cmdArgs, { cwd, stdio: "inherit" }).status === 0;
  const line = [cmd, ...cmdArgs].map((part) => (/[\s"]/.test(part) ? `"${part}"` : part)).join(" ");
  return spawnSync(line, { cwd, stdio: "inherit", shell: true }).status === 0;
};

function packageManager() {
  if (existsSync(join(cwd, "pnpm-lock.yaml")))
    return { name: "pnpm", add: ["add", "-D"], x: ["pnpm", "exec"] };
  if (existsSync(join(cwd, "yarn.lock"))) return { name: "yarn", add: ["add", "-D"], x: ["yarn"] };
  if (existsSync(join(cwd, "bun.lock")) || existsSync(join(cwd, "bun.lockb")))
    return { name: "bun", add: ["add", "-d"], x: ["bunx"] };
  return { name: "npm", add: ["install", "-D"], x: ["npx"] };
}

function projectPackage() {
  const file = join(cwd, "package.json");
  if (!existsSync(file)) fail("no package.json here. Run it in your app's root.");
  const text = readFileSync(file, "utf8");
  return { file, text, json: JSON.parse(text), indent: text.match(/^\s+(?=")/m)?.[0] ?? "  " };
}

/** The Chromium Playwright would launch, if it's installed. */
function chromium() {
  try {
    const require = createRequire(join(cwd, "package.json"));
    const { chromium: browser } = require("@playwright/test");
    const path = browser.executablePath();
    return { path, installed: existsSync(path) };
  } catch {
    return { path: null, installed: false };
  }
}

function ffmpegPath() {
  if (spawnSync("ffmpeg", ["-version"], { stdio: "ignore" }).status === 0) return "ffmpeg (PATH)";
  try {
    const path = createRequire(join(root, "package.json"))("ffmpeg-static");
    if (path && spawnSync(path, ["-version"], { stdio: "ignore" }).status === 0)
      return `${path} (ffmpeg-static)`;
  } catch {}
  return null;
}

function init() {
  const dir = args[0] ?? "demo";
  const pkg = projectPackage();
  const pm = packageManager();
  const deps = { ...pkg.json.dependencies, ...pkg.json.devDependencies };

  // 1. The package, and Playwright Test if the project doesn't have it.
  const missing = [own.name, "@playwright/test"].filter((name) => !deps[name]);
  if (missing.length) {
    say(`→ Installing ${missing.join(" and ")} with ${pm.name}`);
    if (!run(pm.name, [...pm.add, ...missing]))
      fail(`${pm.name} couldn't install ${missing.join(", ")}.`);
  } else say(`✓ ${own.name} and @playwright/test are already in package.json`);

  // 2. A Chromium to record with (Playwright's own; any other Chromium is a config option).
  if (flags.has("--no-browser")) say("· Skipped the browser (--no-browser)");
  else if (chromium().installed) say("✓ Playwright's Chromium is installed");
  else {
    say("→ Installing Playwright's Chromium");
    const [x, ...xArgs] = pm.x;
    if (!run(x, [...xArgs, "playwright", "install", "chromium"]))
      say(
        "! Couldn't install Chromium. Run `npx playwright install chromium`, or set `browser` in the config.",
      );
  }

  // 3. The adapter, config and a first scene, never over a file that's there.
  const target = join(cwd, dir);
  const copy = (from, to) => {
    for (const entry of readdirSync(from, { withFileTypes: true })) {
      const source = join(from, entry.name);
      const dest = join(to, entry.name);
      if (entry.isDirectory()) copy(source, dest);
      else if (existsSync(dest)) say(`· Kept ${relative(cwd, dest)} (already there)`);
      else {
        mkdirSync(to, { recursive: true });
        cpSync(source, dest);
        say(`✓ Wrote ${relative(cwd, dest)}`);
      }
    }
  };
  copy(join(root, "templates"), target);

  // 4. A script to run it (the one already there, else "demo" or "cutscene", never over a
  // script of the project's own), and Playwright's run output kept out of git.
  const fresh = JSON.parse(readFileSync(pkg.file, "utf8"));
  const script = `playwright test -c ${dir}/cutscene.config.ts`;
  const scripts = fresh.scripts ?? {};
  const names = ["demo", "cutscene"];
  const name =
    names.find((key) => scripts[key] === script) ?? names.find((key) => !(key in scripts));
  if (!name) say(`· Kept your "demo" and "cutscene" scripts; run it with npx ${script}`);
  else if (scripts[name] === script) say(`✓ "${name}" script is there`);
  else {
    fresh.scripts = { ...scripts, [name]: script };
    writeFileSync(pkg.file, `${JSON.stringify(fresh, null, pkg.indent)}\n`);
    say(`✓ Added the "${name}" script`);
  }
  const gitignore = join(cwd, ".gitignore");
  const ignore = `${dir}/test-results/`;
  if (existsSync(gitignore) && !readFileSync(gitignore, "utf8").includes(ignore)) {
    appendFileSync(gitignore, `\n# cutscene: Playwright's run output\n${ignore}\n`);
    say(`✓ Ignored ${ignore}`);
  }

  say();
  say("Next:");
  say(
    `  1. Fill in ${dir}/app.ts (when a page is settled, what to hide) and the baseURL in ${dir}/cutscene.config.ts.`,
  );
  say(
    `  2. Write flows in ${dir}/scenes/*.scene.ts, then: ${name ? `${pm.name === "npm" ? "npm run" : pm.name} ${name}` : `npx ${script}`}`,
  );
  say(
    "  3. Videos land in ~/Videos/cutscene (CUTSCENE_OUT to change). Read each check/contact.jpg.",
  );
  say(`  Agents: npx ${own.name} skill   (installs the cutscene skill for Claude Code)`);
}

function skill() {
  const dest = option("dir")
    ? resolve(option("dir"))
    : join(flags.has("--project") ? cwd : homedir(), ".claude", "skills", "cutscene");
  mkdirSync(dest, { recursive: true });
  cpSync(join(root, "skills", "cutscene"), dest, { recursive: true });
  say(`✓ Installed the cutscene skill to ${dest}`);
  say("  Another agent: add --dir <its skills folder>/cutscene");
}

function doctor() {
  const major = Number(process.versions.node.split(".")[0]);
  const rows = [];
  rows.push([major >= 20, `Node ${process.versions.node}`, "Node 20 or newer"]);
  let playwright = null;
  try {
    playwright = createRequire(join(cwd, "package.json"))("@playwright/test/package.json").version;
  } catch {}
  rows.push([
    Boolean(playwright),
    `@playwright/test ${playwright ?? "not found"}`,
    "npx @pavlonekrasov/cutscene init",
  ]);
  const browser = chromium();
  rows.push([
    browser.installed,
    `Chromium ${browser.installed ? browser.path : "not installed"}`,
    "npx playwright install chromium (or set `browser`)",
  ]);
  const ffmpeg = ffmpegPath();
  rows.push([
    Boolean(ffmpeg),
    `ffmpeg ${ffmpeg ?? "not found"}`,
    "reinstall cutscene, or put ffmpeg on PATH",
  ]);
  for (const [ok, what, fix] of rows) say(`${ok ? "✓" : "✗"} ${what}${ok ? "" : `  → ${fix}`}`);
  if (rows.some(([ok]) => !ok)) process.exitCode = 1;
}

/** Renders a reel file: its takes, then the camera, ramps and cards (src/reel). */
function reel() {
  const file = args.find((arg) => /\.reel\.[cm]?[jt]s$/.test(arg));
  if (!file) fail("which reel? cutscene reel <file.reel.ts> [--config <cutscene.config.ts>]");
  const path = resolve(cwd, file);
  if (!existsSync(path)) fail(`${file} isn't there.`);
  // The config the reel's scenes record through: the one given, else the nearest above the file.
  let config = option("config") ? resolve(cwd, option("config")) : null;
  for (let dir = dirname(path); !config; dir = dirname(dir)) {
    const found = ["ts", "mts", "js", "mjs"]
      .map((ext) => join(dir, `cutscene.config.${ext}`))
      .find((candidate) => existsSync(candidate));
    if (found) config = found;
    else if (dirname(dir) === dir)
      fail("no cutscene.config.ts above the reel file. Pass --config.");
  }
  if (!existsSync(config)) fail(`${config} isn't there.`);
  let cli;
  try {
    cli = createRequire(config).resolve("@playwright/test/cli");
  } catch {
    fail("@playwright/test isn't installed here. Run: npx @pavlonekrasov/cutscene init");
  }
  const env = { ...process.env, CUTSCENE_REEL_FILE: path };
  if (flags.has("--reuse")) env.CUTSCENE_REEL_REUSE = "1";
  if (option("project")) env.CUTSCENE_REEL_PROJECT = option("project");
  const run = spawnSync(process.execPath, [cli, "test", "-c", config], {
    cwd,
    stdio: "inherit",
    env,
  });
  process.exitCode = run.status ?? 1;
}

/**
 * Measures a video's camera and cuts with the same instrument reels are judged by (src/reel/measure),
 * or prints its in-page version for reading a reference in a browser without downloading it.
 */
function measure() {
  const lib = join(root, "dist", "reel", "measure.js");
  if (!existsSync(lib)) fail("cutscene isn't built here: run npm run build.");
  const { describe, measureFile, pageSource } = createRequire(import.meta.url)(lib);
  if (flags.has("--page")) return say(pageSource());
  const file = args[0];
  if (!file) fail("which video? cutscene measure <file.mp4> [--json] [--out <file.json>]");
  const path = resolve(cwd, file);
  if (!existsSync(path)) fail(`${file} isn't there.`);
  const grammar = measureFile(path);
  if (option("out"))
    writeFileSync(
      resolve(cwd, option("out")),
      `${JSON.stringify(grammar, null, 2)}
`,
    );
  say(flags.has("--json") ? JSON.stringify(grammar, null, 2) : describe(grammar));
}

function help() {
  say(`cutscene ${own.version}: record real web app flows as pixel-exact product videos.

Usage: npx ${own.name} <command>

  init [dir]      set up this project (default dir: demo): installs the package and
                  @playwright/test if missing, Playwright's Chromium, writes an adapter,
                  a config and a first scene, adds a "demo" script
    --no-browser  skip the Chromium download
  skill           install the agent skill to ~/.claude/skills/cutscene
    --project     into ./.claude/skills/cutscene instead
    --dir <path>  into any folder (another agent's skills)
  doctor          check Node, Playwright, a Chromium browser and ffmpeg
  reel <file>     render a showreel from a .reel.ts file: records its own takes of the
                  scenes it lists, then adds the camera, speed ramps and cards
    --config <path>   the cutscene config (default: the nearest above the file)
    --reuse           cut again from the last takes instead of recording them
    --project <name>  the format to shoot in (default: desktop)
  measure <file>  a video's shots, cuts and camera moves, as reels are judged
    --json            print the numbers as JSON
    --out <file>      also write them to a JSON file
    --page            print the in-page version, for a video playing in a browser

Docs: ${own.homepage}`);
}

const commands = { init, skill, doctor, reel, measure, help, "--help": help, "-h": help };
if (!commands[command]) fail(`unknown command "${command}". Try: npx ${own.name} help`);
commands[command]();
