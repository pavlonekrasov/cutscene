// A static server for the example app: `node server.mjs` serves ./site on http://localhost:4173.
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const root = join(import.meta.dirname, "site");
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript" };

createServer(async (request, response) => {
  const path = normalize(new URL(request.url, "http://x").pathname).replace(/^([/\\])+/, "");
  const file = join(root, path || "index.html");
  if (!file.startsWith(root)) return response.writeHead(403).end();
  try {
    const body = await readFile(file);
    response.writeHead(200, { "content-type": types[extname(file)] ?? "application/octet-stream" });
    response.end(body);
  } catch {
    response.writeHead(404).end("Not found");
  }
}).listen(4173, () => console.log("example app on http://localhost:4173"));
