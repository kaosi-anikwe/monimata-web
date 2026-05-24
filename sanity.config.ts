import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import post from "./sanity/schema/post";
import author from "./sanity/schema/author";
import faq from "./sanity/schema/faq";
import category from "./sanity/schema/category";

const projectId = import.meta.env.SANITY_PROJECT_ID || "6o5sii6d";
const dataset = import.meta.env.SANITY_DATASET || "production";

export default defineConfig({
  name: "monimata-studio",
  title: "MoniMata Studio",
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [post, author, faq, category],
  },
});
