import { Config } from "@remotion/cli/config";
import fs from "node:fs";

// Use a locally installed Chromium when Remotion can't download its own
// headless shell (e.g. sandboxed/cloud environments with restricted network).
// Override with REMOTION_BROWSER_EXECUTABLE=/path/to/chrome.
const candidates = [
  process.env.REMOTION_BROWSER_EXECUTABLE,
  "/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell",
].filter((p): p is string => Boolean(p));

const browser = candidates.find((p) => fs.existsSync(p));
if (browser) {
  Config.setBrowserExecutable(browser);
}
