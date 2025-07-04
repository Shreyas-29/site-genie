"use client";

import { Button } from "@/components/ui/button";
import { RefreshCw, ExternalLink, ChevronDownIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";

type ViewMode = "preview" | "code";

interface Props {
    currentPage: string;
    pages: string[];
    onPageChange: (page: string) => void;
    url: string;
    onUrlChange: (url: string) => void;
    onRefresh: () => void;
}

const RightHeader = ({
    currentPage,
    pages = ["Home"],
    onPageChange,
    url,
    onUrlChange,
    onRefresh,
}: Props) => {

    const displayName = currentPage ?
        currentPage.charAt(0).toUpperCase() + currentPage.slice(1) :
        "Select Page";

    return (
        <div className="flex items-center justify-between w-full py-2">
            <div className="flex items-center">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2 capitalize"
                        >
                            {displayName}
                            <ChevronDownIcon className="size-4 opacity-50" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-[200px]">
                        {pages.map((page) => (
                            <DropdownMenuItem
                                key={page}
                                onClick={() => onPageChange(page)}
                                className={cn(
                                    "cursor-pointer capitalize",
                                    currentPage === page && "bg-accent"
                                )}
                            >
                                {page}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="flex items-center space-x-2">
                <Button
                    size="sm"
                    variant="ghost"
                    onClick={onRefresh}
                    className="size-8 p-0"
                >
                    <RefreshCw className="size-3.5" />
                </Button>
                <div className="relative flex items-center w-64">
                    <Input
                        value={url}
                        onChange={(e) => onUrlChange(e.target.value)}
                        className="h-8 text-xs pr-8"
                        placeholder="Preview URL"
                    />
                    <Button
                        size="sm"
                        variant="ghost"
                        className="absolute right-1 rounded-sm size-6 p-0"
                        onClick={() => window.open(url, "_blank")}
                    >
                        <ExternalLink className="size-3.5" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default RightHeader;
