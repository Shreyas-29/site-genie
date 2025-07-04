'use client';

import { CodeIcon, EyeIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

interface RightHeaderProps {
    viewMode: "preview" | "code";
    onViewModeChange: (mode: "preview" | "code") => void;
}

const RightHeader = ({ viewMode, onViewModeChange }: RightHeaderProps) => {
    return (
        <div className="flex items-center justify-between h-10 px-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <Tabs
                value={viewMode}
                onValueChange={(value) => onViewModeChange(value as "preview" | "code")}
                className="h-full"
            >
                <TabsList className="h-8">
                    <TabsTrigger value="preview" className="flex items-center gap-1.5 text-xs">
                        <EyeIcon className="size-3.5" />
                        <span>Preview</span>
                    </TabsTrigger>
                    <TabsTrigger value="code" className="flex items-center gap-1.5 text-xs">
                        <CodeIcon className="size-3.5" />
                        <span>Code</span>
                    </TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
    );
};

export default RightHeader;
