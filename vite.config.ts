import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const isVercel =
  (Boolean(process.env.VERCEL) && process.env.VERCEL !== "0") ||
  Boolean(process.env.VERCEL_URL);

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  nitro: isVercel ? { preset: "vercel" } : undefined,
});

