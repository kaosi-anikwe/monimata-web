// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import sanity from "@sanity/astro";

// https://astro.build/config
export default defineConfig({
  integrations: [
    sanity({
      projectId: "6o5sii6d",
      dataset: "production",
      studioBasePath: "/studio",
      useCdn: true,
      apiVersion: "2024-01-01",
    }),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
