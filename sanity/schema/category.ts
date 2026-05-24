export default {
    name: "category",
    title: "Category",
    type: "document",
    fields: [
        {
            name: "name",
            title: "Name",
            type: "string",
            description: 'Display name shown in navigation and listings (e.g. "Blog", "How To").',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: { source: "name", maxLength: 96 },
            description: "URL-safe identifier. Becomes the route path (e.g. blog → /blog).",
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: "showInHeader",
            title: "Show in Header",
            type: "boolean",
            description: "Display this category as a navigation link on the website header.",
            initialValue: true,
        },
        {
            name: "showOnMobile",
            title: "Show on Mobile",
            type: "boolean",
            description: "Display this category as a navigation link on the mobile app.",
            initialValue: true,
        },
    ],
    orderings: [
        {
            title: "Name",
            name: "nameAsc",
            by: [{ field: "name", direction: "asc" }],
        },
    ],
    preview: {
        select: { title: "name", showInHeader: "showInHeader", showOnMobile: "showOnMobile" },
        prepare(selection: Record<string, any>) {
            const { title, showInHeader, showOnMobile } = selection;
            const flags = [showInHeader && "Header", showOnMobile && "Mobile"].filter(Boolean).join(", ");
            return { title, subtitle: flags || "Hidden" };
        },
    },
};
