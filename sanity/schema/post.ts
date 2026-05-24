export default {
    name: "post",
    title: "Post",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: { source: "title", maxLength: 96 },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: "postType",
            title: "Post Type",
            type: "string",
            options: {
                list: [
                    { title: "Blog Post", value: "blog" },
                    { title: "Guide", value: "guide" },
                ],
                layout: "radio",
            },
            initialValue: "blog",
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: "excerpt",
            title: "Excerpt",
            type: "text",
            rows: 3,
            description: "Short summary shown in listings and meta tags.",
        },
        {
            name: "mainImage",
            title: "Cover Image",
            type: "image",
            options: { hotspot: true },
            fields: [
                {
                    name: "alt",
                    title: "Alt Text",
                    type: "string",
                },
            ],
        },
        {
            name: "author",
            title: "Author",
            type: "reference",
            to: [{ type: "author" }],
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: "publishedAt",
            title: "Published At",
            type: "datetime",
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: "tags",
            title: "Tags",
            type: "array",
            of: [{ type: "string" }],
            options: { layout: "tags" },
        },
        {
            name: "body",
            title: "Body",
            type: "array",
            of: [
                {
                    type: "block",
                    styles: [
                        { title: "Normal", value: "normal" },
                        { title: "H2", value: "h2" },
                        { title: "H3", value: "h3" },
                        { title: "H4", value: "h4" },
                        { title: "Quote", value: "blockquote" },
                    ],
                    marks: {
                        decorators: [
                            { title: "Bold", value: "strong" },
                            { title: "Italic", value: "em" },
                            { title: "Code", value: "code" },
                            { title: "Underline", value: "underline" },
                            { title: "Strikethrough", value: "strike-through" },
                        ],
                        annotations: [
                            {
                                name: "link",
                                title: "Link",
                                type: "object",
                                fields: [
                                    {
                                        name: "href",
                                        title: "URL",
                                        type: "url",
                                        validation: (Rule: any) =>
                                            Rule.uri({ allowRelative: true, scheme: ["http", "https", "mailto"] }),
                                    },
                                    {
                                        name: "blank",
                                        title: "Open in new tab",
                                        type: "boolean",
                                        initialValue: true,
                                    },
                                ],
                            },
                        ],
                    },
                },
                {
                    type: "image",
                    options: { hotspot: true },
                    fields: [
                        { name: "alt", title: "Alt Text", type: "string" },
                        { name: "caption", title: "Caption", type: "string" },
                    ],
                },
                {
                    type: "object",
                    name: "codeBlock",
                    title: "Code Block",
                    fields: [
                        { name: "code", title: "Code", type: "text" },
                        {
                            name: "language",
                            title: "Language",
                            type: "string",
                            options: {
                                list: [
                                    "javascript",
                                    "typescript",
                                    "python",
                                    "bash",
                                    "json",
                                    "html",
                                    "css",
                                    "sql",
                                    "dart",
                                    "kotlin",
                                    "swift",
                                    "plaintext",
                                ],
                            },
                        },
                        { name: "filename", title: "Filename", type: "string" },
                    ],
                },
                {
                    type: "object",
                    name: "callout",
                    title: "Callout",
                    fields: [
                        {
                            name: "type",
                            title: "Type",
                            type: "string",
                            options: {
                                list: [
                                    { title: "Info", value: "info" },
                                    { title: "Warning", value: "warning" },
                                    { title: "Tip", value: "tip" },
                                    { title: "Note", value: "note" },
                                ],
                            },
                            initialValue: "info",
                        },
                        { name: "text", title: "Text", type: "text" },
                    ],
                },
                {
                    type: "object",
                    name: "videoEmbed",
                    title: "Video Embed",
                    fields: [
                        {
                            name: "url",
                            title: "Video URL",
                            type: "url",
                            description: "YouTube or Vimeo URL",
                            validation: (Rule: any) => Rule.required(),
                        },
                        { name: "caption", title: "Caption", type: "string" },
                    ],
                },
            ],
        },
    ],
    orderings: [
        {
            title: "Published Date, New",
            name: "publishedAtDesc",
            by: [{ field: "publishedAt", direction: "desc" }],
        },
    ],
};
