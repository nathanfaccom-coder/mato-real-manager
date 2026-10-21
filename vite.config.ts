import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  base: "./",
  publicDir: false,
  plugins: [react()],
  build: {
    assetsDir: "build",
    rollupOptions: {
      input: "app.html",
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          firebase: ["firebase/compat/app", "firebase/compat/firestore"],
        },
      },
    },
  },
  server: {
    port: 5173,
    open: "/app.html",
  },
});
