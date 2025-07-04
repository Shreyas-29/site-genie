"use client";

import { useState, useEffect } from "react";
import ProjectPannel from "./project-pannel";
import LeftHeader from "./left-header";
import FileExplorer from "./file-explorer";
import InputWrapper from "./input-wrapper";
import RightHeader from "./right-header";
import Preview from "./preview";
import CodeViewer from "./code-reviewer";
import { toast } from "sonner";
import useSiteStore from "@/hooks/use-site";

interface WebsiteData {
    html: string;
    css: string;
}

interface FileType {
    name: string;
    type: 'file' | 'folder';
    content?: string;
    children?: FileType[];
}

const ProjectWrapper = () => {

    const {
        files,
        currentFile,
        setCurrentFile,
        websiteData,
        updateWebsiteData
    } = useSiteStore();
    
    const [rightViewMode, setRightViewMode] = useState<"preview" | "code">("preview");
    const [selectedFile, setSelectedFile] = useState<string>("index.html");
    // const [websiteData, setWebsiteData] = useState<WebsiteData>({
    //     html: "<!-- Your generated HTML will appear here -->",
    //     css: "/* Your generated CSS will appear here */"
    // });
    // const [files, setFiles] = useState<FileType[]>([
    //     {
    //         name: "public",
    //         type: "folder",
    //         children: [
    //             {
    //                 name: "index.html",
    //                 type: "file",
    //                 content: "<!-- Your generated HTML will appear here -->"
    //             },
    //             {
    //                 name: "styles.css",
    //                 type: "file",
    //                 content: "/* Your generated CSS will appear here */"
    //             },
    //         ],
    //     },
    // ]);

    // const updateWebsiteData = (html: string, css: string) => {
    //     setWebsiteData({ html, css });

    //     const updatedFiles = [...files];
    //     const updateFileContent = (files: FileType[] = [], name: string, content: string) => {
    //         const file = files.find(f => f.name === name);
    //         if (file) file.content = content;
    //         return files;
    //     };

    //     if (updatedFiles[0]?.children) {
    //         const updatedChildren = updateFileContent(updatedFiles[0].children, 'index.html', html);
    //         updateFileContent(updatedChildren, 'styles.css', css);
    //         setFiles(updatedFiles);
    //     }
    // };

    const handleFileSelect = (file: FileType) => {
        if (file.type === 'file') {
            setCurrentFile(file.name);
        }
    };

    const getFileContent = (): string => {
        if (!currentFile) return "";

        const findFile = (items: FileType[] = []): FileType | undefined => {
            for (const item of items) {
                if (item.name === currentFile) return item;
                if (item.children) {
                    const found = findFile(item.children);
                    if (found) return found;
                }
            }
            return undefined;
        };

        const file = findFile(files);
        return file?.content || "";
    };

    const handleGenerate = async (prompt: string) => {
        try {
            const response = await fetch("http://localhost:8000/api/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt }),
            });
            console.log("response", response);
            if (!response.ok) {
                throw new Error("Failed to generate website");
            }

            const data = await response.json();
            console.log("data", data);
            updateWebsiteData(data.html, data.css);
            toast.success("Website generated successfully!");

        } catch (error) {
            console.error("Error generating website:", error);
            toast.error("Failed to generate website. Please try again.");
        }
    };

    const previewUrl = `data:text/html,${encodeURIComponent(
        `<!DOCTYPE html>
        <html>
        <head>
            <style>${websiteData.css}</style>
        </head>
        <body>${websiteData.html}</body>
        </html>`
    )}`;

    return (
        <ProjectPannel
            leftHeader={<LeftHeader />}
            leftContent={
                <div className="h-full flex flex-col">
                    <div className="grow relative overflow-auto p-2 pb-4">
                        <div className="text-sm text-muted-foreground">
                            Describe the website you want to generate
                        </div>
                    </div>
                    <div className="p-2 pt-1 relative z-0">
                        <div className="absolute -translate-y-[calc(100%+4px)] inset-x-0 z-10 mx-auto w-full h-8 bg-gradient-to-t from-background"></div>
                        <InputWrapper isPanel onGenerate={handleGenerate} />
                    </div>
                </div>
            }
            rightHeader={
                <RightHeader
                    viewMode={rightViewMode}
                    onViewModeChange={setRightViewMode}
                    url={previewUrl}
                    onUrlChange={() => {}}
                    onRefresh={() => {}}
                />
            }
            rightContent={
                rightViewMode === "preview" ? (
                    <Preview url={previewUrl} />
                ) : (
                    <div className="flex h-full">
                        <div className="w-64 border-r border-border overflow-auto">
                            <FileExplorer
                                files={files}
                                onFileSelect={handleFileSelect}
                                selectedFile={selectedFile}
                            />
                        </div>
                        <div className="flex-1 overflow-auto">
                            <CodeViewer
                                content={getFileContent()}
                                language={selectedFile.endsWith('.css') ? 'css' : 'html'}
                            />
                        </div>
                    </div>
                )
            }
        />
    );
};

export default ProjectWrapper;
