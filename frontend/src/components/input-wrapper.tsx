"use client";

import { cn } from '@/lib/utils';
import { ArrowUpIcon, Loader2Icon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

const InputWrapper = () => {

    const [prompt, setPrompt] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const handleSubmit = async () => {
        if (!prompt.trim()) {
            toast.error("Please enter a prompt");
            return;
        }

        setIsLoading(true);
        toast.loading("Your website is being generated...");

        try {
            const result = await fetch("/api/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt }),
            });

            const data = await result.json();
            console.log(data);

        } catch (error) {
            console.log("Error generating site", error);
            toast.error("Failed to generate website. Please try again");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div className="flex w-full mt-8">
                <form
                    onSubmit={handleSubmit}
                    className={cn(
                        "flex flex-col p-2 w-full rounded-lg lg:rounded-2xl bg-background/80 backdrop-blur-md shadow-xl shadow-neutral-300/10 border transition-colors relative",
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
                            className="flex bg-transparent w-full min-h-32 max-h-40 resize-none border-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 lg:rounded-2xl text-sm md:text-base"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && e.metaKey) {
                                    handleSubmit();
                                }
                            }}
                        />
                    </div>
                    <Button
                        type="submit"
                        size="icon"
                        disabled={isLoading || !prompt.trim()}
                        className="absolute bottom-2 right-2"
                    >
                        {isLoading ? (
                            <Loader2Icon className="size-5 animate-spin" />
                        ) : (
                            <ArrowUpIcon className="size-5" />
                        )}
                    </Button>
                </form>
            </div>
        </div>
    )
};

export default InputWrapper
