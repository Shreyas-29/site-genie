"use client";

import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { GripVertical, GripHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
    leftHeader: React.ReactNode;
    leftContent: React.ReactNode;
    rightHeader: React.ReactNode;
    rightContent: React.ReactNode;
    defaultLayout?: number[];
}

const ProjectPannel = ({
    leftHeader,
    leftContent,
    rightHeader,
    rightContent,
    defaultLayout = [30, 70],
}: Props) => {
    return (
        <PanelGroup direction="horizontal" className="h-[calc(100vh-4rem)]">
            {/* Left Panel */}
            <Panel
                defaultSize={defaultLayout[0]}
                minSize={20}
                maxSize={50}
                className="flex flex-col bg-background border-r border-border"
            >
                <div className="h-12 flex items-center px-2 border-b border-border">
                    {leftHeader}
                </div>
                <div className="flex-1 overflow-auto">
                    {leftContent}
                </div>
            </Panel>

            <PanelResizeHandle className="w-1.5 bg-border/50 hover:bg-primary/50 transition-colors relative group">
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <GripVertical className="w-3 h-6 text-foreground/50" />
                </div>
            </PanelResizeHandle>

            {/* Right Panel */}
            <Panel
                defaultSize={defaultLayout[1]}
                minSize={30}
                className="flex flex-col bg-background"
            >
                <div className="h-12 flex items-center px-2 border-b border-border">
                    {rightHeader}
                </div>
                <div className="flex-1 overflow-auto">
                    {rightContent}
                </div>
            </Panel>
        </PanelGroup>
    );
};

export default ProjectPannel;
