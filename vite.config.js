import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  //   server: {
  //     port: 6999,
  //     proxy: {
  //       "/api": {
  //         // target means backend server
  //         target: "http://localhost:7000",
  //       },
  //       //add more shortcuts/proxy prefixes if needed
  //     },
  //   },
});
// the proxy only helps in development mode, so you can use relative paths in your axios requests
