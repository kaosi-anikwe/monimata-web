import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFileSync } from "node:fs";

// Read logo SVG and convert to data URI for embedding
const logoSvg = readFileSync("public/images/logo-full-dark.svg", "utf-8");
const logoDataUri = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString("base64")}`;

// Cache font data across calls
let fontCache: ArrayBuffer | null = null;

async function loadFont(): Promise<ArrayBuffer> {
    if (fontCache) return fontCache;

    // Fetch Bricolage Grotesque SemiBold from Google Fonts (TTF format)
    const css = await fetch(
        "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600&display=swap",
        {
            headers: {
                // Use older user-agent to get TTF instead of WOFF2 (satori doesn't support WOFF2)
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 6.1; Win64; x64; Trident/7.0; rv:11.0) like Gecko",
            },
        },
    ).then((r) => r.text());

    const match = css.match(/src:\s*url\((.+?)\)\s/);
    if (!match) throw new Error("Could not parse font URL from Google Fonts CSS");

    fontCache = await fetch(match[1]).then((r) => r.arrayBuffer());
    return fontCache!;
}

export async function generateOgImage(title: string): Promise<Uint8Array> {
    const fontData = await loadFont();

    const svg = await satori(
        {
            type: "div",
            props: {
                style: {
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#102319",
                    padding: "60px 80px",
                },
                children: [
                    {
                        type: "img",
                        props: {
                            src: logoDataUri,
                            height: 60,
                            style: { marginBottom: "40px" },
                        },
                    },
                    {
                        type: "div",
                        props: {
                            style: {
                                color: "white",
                                fontSize: 64,
                                fontFamily: "Bricolage Grotesque",
                                textAlign: "center",
                                lineHeight: 1.3,
                                maxWidth: "1000px",
                            },
                            children: title,
                        },
                    },
                ],
            },
        },
        {
            width: 1200,
            height: 630,
            fonts: [
                {
                    name: "Bricolage Grotesque",
                    data: fontData,
                    weight: 600,
                    style: "normal",
                },
            ],
        },
    );

    const resvg = new Resvg(svg, {
        fitTo: { mode: "width", value: 1200 },
    });
    return new Uint8Array(resvg.render().asPng());
}
