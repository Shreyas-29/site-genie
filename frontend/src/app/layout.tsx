import "@/styles/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Inter } from "next/font/google"
import { cn } from "@/lib/utils";
import { generateMetadata } from "@/utils/metadata";

const base = Inter({
    subsets: ["latin"],
    variable: "--font-base",
});

export const metadata = generateMetadata();

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    "min-h-screen bg-background text-foreground antialiased font-base",
                    base.variable,
                )}
            >
                <Toaster
                    richColors
                    theme="light"
                    position="bottom-center"
                />
                {children}
            </body>
        </html>
    );
};
