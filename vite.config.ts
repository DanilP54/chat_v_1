/// <reference types="vite/client" />

import path from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig,loadEnv } from "vite";

export default defineConfig(({mode}) => {

  const env = loadEnv('', process.cwd(), 'APP_')
  process.env = {...process.env, ...env}
  return {
    plugins: [react()],
    test: {
      globals: true,
      exclude: [ "node_modules", "dist", "tests", "tests-examples"],
      environment: "jsdom",
      setupFiles: "./test.setup.ts",
    },
    envPrefix: "APP_",
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    }
  }
}
);
