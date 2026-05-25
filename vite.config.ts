/// <reference types="vitest" />
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import dts from "vite-plugin-dts";
import { peerDependencies } from "./package.json";

const externalPackages = [
  ...Object.keys(peerDependencies),
  "react/jsx-runtime",
];
const isExternalDependency = (id: string) =>
  externalPackages.some(
    (dependency) => id === dependency || id.startsWith(`${dependency}/`),
  );

export default defineConfig({
  build: {
    lib: {
      entry: "./src/index.ts", // Specifies the entry point for building the library.
      name: "vite-react-ts-button", // Sets the name of the generated library.
      fileName: (format) => `index.${format}.js`, // Generates the output file name based on the format.
      formats: ["cjs", "es"], // Specifies the output formats (CommonJS and ES modules).
    },
    rollupOptions: {
      external: isExternalDependency, // Defines external dependencies for Rollup bundling.
    },
    sourcemap: true, // Generates source maps for debugging.
    emptyOutDir: true, // Clears the output directory before building.
  },
  plugins: [
    dts(),
    svgr({
      svgrOptions: {
        exportType: "default",
        ref: true,
        svgo: false,
        titleProp: true,
      },
      include: "**/*.svg",
    }),
  ], // Uses the 'vite-plugin-dts' plugin for generating TypeScript declaration files (d.ts).
  test: {
    globals: true,
    environment: "jsdom",
    css: true,
    setupFiles: "./setupTests.ts",
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/*.mdx",
      "**/*.stories.tsx",
      "Example.tsx",
    ],
  },
});
