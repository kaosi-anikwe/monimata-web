import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

const projectId = import.meta.env.SANITY_PROJECT_ID;
const dataset = import.meta.env.SANITY_DATASET || "production";

export const sanityClient = projectId
  ? createClient({
    projectId,
    dataset,
    apiVersion: "2024-01-01",
    useCdn: true,
  })
  : null;

// Image URL helper
const builder = sanityClient ? createImageUrlBuilder(sanityClient) : null;

export function urlFor(source: any) {
  if (!builder || !source) return null;
  return builder.image(source);
}

// Shared field projections
const authorProjection = `{
  name,
  "slug": slug.current,
  avatar,
  bio,
  role
}`;

const postListProjection = `{
  title,
  "slug": slug.current,
  postType,
  excerpt,
  publishedAt,
  mainImage,
  tags,
  "author": author->${authorProjection}
}`;

const postDetailProjection = `{
  title,
  "slug": slug.current,
  postType,
  excerpt,
  publishedAt,
  mainImage,
  tags,
  body,
  "author": author->${authorProjection},
  "headings": body[style in ["h2", "h3"]]{
    "key": _key,
    "text": children[0].text,
    "level": style
  }
}`;

// ─── Posts (blog + guides) ───

export async function getPosts(type?: "blog" | "guide") {
  if (!sanityClient) return [];
  const filter = type
    ? `_type == "post" && postType == "${type}"`
    : `_type == "post"`;
  return sanityClient.fetch(
    `*[${filter}] | order(publishedAt desc) ${postListProjection}`
  );
}

export async function getPost(slug: string) {
  if (!sanityClient) return null;
  return sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0] ${postDetailProjection}`,
    { slug }
  );
}

export async function getPostSlugs() {
  if (!sanityClient) return [];
  return sanityClient.fetch(
    `*[_type == "post"]{ "slug": slug.current, postType }`
  );
}

// ─── FAQs ───

export async function getFAQs() {
  if (!sanityClient) return null;
  return sanityClient.fetch(
    `*[_type == "faq"] | order(order asc){ question, answer }`
  );
}

// ─── API helpers (for mobile app consumption) ───

export async function getPostsForAPI(type?: "blog" | "guide") {
  if (!sanityClient) return [];
  const filter = type
    ? `_type == "post" && postType == "${type}"`
    : `_type == "post"`;
  return sanityClient.fetch(
    `*[${filter}] | order(publishedAt desc) ${postDetailProjection}`
  );
}
