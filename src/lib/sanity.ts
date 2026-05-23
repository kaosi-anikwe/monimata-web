import { createClient } from "@sanity/client";

const projectId = import.meta.env.SANITY_PROJECT_ID;

export const sanityClient = projectId
    ? createClient({
        projectId,
        dataset: import.meta.env.SANITY_DATASET || "production",
        apiVersion: "2024-01-01",
        useCdn: true,
    })
    : null;

// GROQ query helpers

export async function getLandingPage() {
    if (!sanityClient) return null;
    return sanityClient.fetch(`*[_type == "landingPage"][0]{
    heroTitle,
    heroSubtitle,
    heroImage,
    stats[]{label, value},
    features[]{title, description, icon, image},
    howItWorks[]{step, title, description},
    gamification{title, subtitle, description, items[]},
    faqs[]{question, answer},
    ctaTitle,
    ctaDescription
  }`);
}

export async function getBlogPosts() {
    if (!sanityClient) return [];
    return sanityClient.fetch(`*[_type == "post"] | order(publishedAt desc){
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage,
    "author": author->name
  }`);
}

export async function getBlogPost(slug: string) {
    if (!sanityClient) return null;
    return sanityClient.fetch(
        `*[_type == "post" && slug.current == $slug][0]{
      title,
      body,
      publishedAt,
      mainImage,
      "author": author->name
    }`,
        { slug }
    );
}

export async function getGuides() {
    if (!sanityClient) return [];
    return sanityClient.fetch(`*[_type == "guide"] | order(publishedAt desc){
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage
  }`);
}

export async function getGuide(slug: string) {
    if (!sanityClient) return null;
    return sanityClient.fetch(
        `*[_type == "guide" && slug.current == $slug][0]{
      title,
      body,
      publishedAt,
      mainImage
    }`,
        { slug }
    );
}

export async function getFAQs() {
    if (!sanityClient) return [];
    return sanityClient.fetch(`*[_type == "faq"] | order(order asc){
    question,
    answer
  }`);
}
