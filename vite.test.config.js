import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from "node:url";
export default defineConfig({
  plugins: [react()],
  base: "./",
  publicDir: false,
  resolve: {
    alias: [
      {
        find: "firebase/compat/auth",
        replacement: fileURLToPath(
          new URL("./tests/fixtures/empty.js", import.meta.url),
        ),
      },
      {
        find: "firebase/compat/app",
        replacement: fileURLToPath(
          new URL("./tests/fixtures/firebase.js", import.meta.url),
        ),
      },
      {
        find: "firebase/compat/firestore",
        replacement: fileURLToPath(
          new URL("./tests/fixtures/empty.js", import.meta.url),
        ),
      },
    ],
  },
  server: { host: "127.0.0.1", port: 4174, strictPort: true },
  build: { outDir: "tests/.build", rollupOptions: { input: "app.html" } },
});
