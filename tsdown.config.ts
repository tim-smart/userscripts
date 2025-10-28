import { defineConfig } from "tsdown"

export default defineConfig([
  {
    entry: ["src/github-fix/index.ts"],
    format: "iife",
    outDir: "dist/github-fix",
    outExtensions: (_) => ({
      js: ".user.js",
    }),
    outputOptions: {
      banner: `// ==UserScript==
// @name         Github Fix
// @namespace    https://timsmart.co/
// @version      2025-10-28
// @description  Remove AI from github homepage
// @author       Tim Smart <hello@timsmart.co>
// @match        https://github.com
// @grant        GM_addStyle
// ==/UserScript==
`,
    },
  },
])
