import { defineConfig } from "tsdown"

export default defineConfig([
  {
    entry: ["src/*.ts"],
    format: "iife",
    outDir: "dist/",
    treeshake: true,
    minify: {
      mangle: false,
      codegen: false,
      compress: true,
    },
    outputOptions(opts) {
      opts.entryFileNames = "[name].user.js"
      return opts
    },
  },
])
