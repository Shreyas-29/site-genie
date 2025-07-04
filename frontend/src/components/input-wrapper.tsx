"use client";

import { cn } from "@/lib/utils";
import { ArrowUpIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface Props {
    isPanel?: boolean;
    textareaClassName?: string;
    buttonClassName?: string;
    isLoading?: boolean;
    onGenerate: (prompt: string) => Promise<void>;
}

const InputWrapper = ({ isPanel, textareaClassName, buttonClassName, onGenerate, isLoading }: Props) => {

    const [prompt, setPrompt] = useState<string>("");
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!prompt.trim()) {
            toast.error("Please enter a prompt");
            return;
        }

        try {
            await onGenerate(prompt);
            setPrompt("");
        } catch (error) {
            console.error("Error in handleSubmit:", error);
            toast.error("Failed to process your request. Please try again.");
        }
    };

    return (
        <div className={cn("flex flex-col items-center justify-center w-full", isPanel ? "" : "mt-8")}>
            <form
                onSubmit={handleSubmit}
                className={cn(
                    "flex flex-col p-2 w-full rounded-lg lg:rounded-2xl bg-background/80 backdrop-blur-md shadow-xl shadow-neutral-300/10 border transition-colors",
                    isFocused ? "border-border" : "border-border/30"
                )}
            >
                <div className="flex items-center grow relative rounded-lg lg:rounded-2xl">
                    <Textarea
                        value={prompt}
                        disabled={isLoading}
                        onChange={(e) => setPrompt(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Describe a website, e.g. 'Hiking blog' or 'Coffee shop'"
                        className={cn(
                            "flex bg-transparent w-full min-h-32 max-h-40 resize-none border-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 lg:rounded-2xl text-sm md:text-base",
                            textareaClassName
                        )}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && e.metaKey) {
                                handleSubmit(e);
                            }
                        }}
                    />
                    <Button
                        type="submit"
                        size="icon"
                        disabled={isLoading || !prompt.trim()}
                        className={cn("absolute bottom-2 right-2", buttonClassName)}
                    >
                        {isLoading ? (
                            <Loader2Icon className="size-5 animate-spin" />
                        ) : (
                            <ArrowUpIcon className="size-5" />
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default InputWrapper;
