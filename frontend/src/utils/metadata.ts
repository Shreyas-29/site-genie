import { Metadata } from "next";

interface MetadataProps {
    title?: string;
    description?: string;
    image?: string | null;
    icons?: Metadata["icons"];
    noIndex?: boolean;
    keywords?: string[];
    author?: string;
}

export const generateMetadata = ({
    title = `${process.env.NEXT_PUBLIC_APP_NAME} | Home`,
    description = "Site Genie is a AI powered website builder that helps you to create a website in minutes.",
    icons = [
        {
            rel: "icon",
            type: "image/png",
            sizes: "32x32",
            url: "/icons/icon.png"
        },
    ],
    noIndex = false,
    keywords = [
        "AI website builder",
        "website automation",
        "AI writing assistant",
        "website generation",
        "artificial intelligence",
        "website marketing"
    ],
    author = process.env.NEXT_PUBLIC_AUTHOR_NAME,
}: MetadataProps = {}): Metadata => {
    const metadataBase = new URL(process.env.NEXT_PUBLIC_APP_URL || "https://site-genie.vercel.app");

    return {
        metadataBase,
        title: {
            template: `%s | ${process.env.NEXT_PUBLIC_APP_NAME}`,
            default: title
        },
        description,
        keywords,
        authors: [{ name: author }],
        creator: author,
        publisher: process.env.NEXT_PUBLIC_APP_NAME,
        formatDetection: {
            email: false,
            address: false,
            telephone: false,
        },
        icons,
    };
};
