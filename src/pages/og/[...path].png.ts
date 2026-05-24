import type { APIRoute, GetStaticPaths } from "astro";
import { generateOgImage } from "../../lib/og";
import { getCategories, getPosts } from "../../lib/sanity";

export const getStaticPaths: GetStaticPaths = async () => {
    const categories = await getCategories();
    const posts = await getPosts();

    return [
        {
            params: { path: "home" },
            props: { title: "MoniMata — Zero-Based Budgeting for Nigerians" },
        },
        {
            params: { path: "privacy-policy" },
            props: { title: "Privacy Policy — MoniMata" },
        },
        {
            params: { path: "terms-of-service" },
            props: { title: "Terms of Service — MoniMata" },
        },
        ...categories.map((cat: any) => ({
            params: { path: cat.slug },
            props: { title: `${cat.name} — MoniMata` },
        })),
        ...posts.map((post: any) => ({
            params: { path: `${post.category.slug}/${post.slug}` },
            props: { title: `${post.title} — ${post.author.name}` },
        })),
    ];
};

export const GET: APIRoute = async ({ props }) => {
    const png = await generateOgImage(props.title as string);
    return new Response(png.buffer as ArrayBuffer, {
        headers: { "Content-Type": "image/png" },
    });
};
