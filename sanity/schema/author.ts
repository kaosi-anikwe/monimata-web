export default {
    name: "author",
    title: "Author",
    type: "document",
    fields: [
        {
            name: "name",
            title: "Name",
            type: "string",
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: { source: "name", maxLength: 96 },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: "avatar",
            title: "Avatar",
            type: "image",
            options: { hotspot: true },
        },
        {
            name: "bio",
            title: "Bio",
            type: "text",
            rows: 3,
        },
        {
            name: "role",
            title: "Role",
            type: "string",
        },
    ],
};
