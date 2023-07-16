import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import dns from "dns";
import { fileURLToPath } from "node:url";
import mkcert from 'vite-plugin-mkcert'

dns.setDefaultResultOrder("verbatim");

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()
      // , mkcert()
    ],
    define: {
      "process.env": process.env,
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      host: true,
      port: +env.VITE_PORT,
      open: true,
      // https: true 
    },
  };
});
