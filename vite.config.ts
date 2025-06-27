import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import deno from "@deno/vite-plugin";
import vitePluginMd from "vite-plugin-md";

import "react";
import "react-dom";

export default defineConfig({
  root: "./client",
  server: {
    port: 3000,
  },
  plugins: [
    vitePluginMd(),
    react(),
    deno(),
  ],
  assetsInclude: ["**/*.md"],
  optimizeDeps: {
    include: ["react/jsx-runtime"],
  },
  build: {
    sourcemap: false
  },
});
