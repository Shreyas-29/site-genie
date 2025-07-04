"use client";

import { useState } from "react";
import InputWrapper from "./input-wrapper";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useSiteStore from "@/hooks/use-site";

const SiteGenerator = () => {

    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(false);

    const initializeWebsite = useSiteStore((state) => state.initializeWebsite);

    const handleGenerate = async (prompt: string) => {
        try {
            setLoading(true);

            const response = await fetch("http://localhost:8000/api/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    description: prompt,
                    style: "modern",
                    color_scheme: "blue"
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || "Failed to generate website");
            }

            const data = await response.json();

            useSiteStore.getState().initializeWebsite(
                data.html || "<div>No HTML content</div>",
                data.css || "/* No CSS content */"
            );

            router.push("/project");

        } catch (error) {
            console.error("Error generating website:", error);
            toast.error(error instanceof Error ? error.message : "Failed to generate website");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="flex w-full">
                <InputWrapper
                    onGenerate={handleGenerate}
                    isLoading={loading}
                />
            </div>
        </div>
    );
}

export default SiteGenerator