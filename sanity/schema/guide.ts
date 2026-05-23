export default {
    name: "guide",
    title: "Guide",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: { source: "title", maxLength: 96 },
            validation: (Rule) => Rule.required(),
        },
        {
            name: "excerpt",
            title: "Excerpt",
            type: "text",
            rows: 3,
        },
        {
            name: "mainImage",
            title: "Main Image",
            type: "image",
            options: { hotspot: true },
        },
        {
            name: "body",
            title: "Body",
            type: "array",
            of: [{ type: "block" }, { type: "image" }],
        },
        {
            name: "publishedAt",
            title: "Published At",
            type: "datetime",
        },
    ],
};
