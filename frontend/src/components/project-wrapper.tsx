"use client";

import { useSiteStore } from "@/hooks/use-site";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import CodeViewer from "./code-viewer";
import FileExplorer from "./file-explorer";
import InputWrapper from "./input-wrapper";
import LeftHeader from "./left-header";
import Preview from "./preview";
import ProjectPannel from "./project-pannel";
import RightHeader from "./right-header";

interface WebsiteData {
    html: string;
    css: string;
}

interface FileType {
    name: string;
    type: "file" | "folder";
    content?: string;
    children?: FileType[];
}

const ProjectWrapper = () => {

    const {
        currentPage,
        pages,
        websiteData,
        initializeWebsite,
        setCurrentFile,
        setCurrentPage,
        addPage,
        updateWebsiteData,
        currentFile,
        files,
    } = useSiteStore();

    const [rightViewMode, setRightViewMode] = useState<"preview" | "code">("preview");
    const [previewUrl, setPreviewUrl] = useState<string>("about:blank");

    const currentPageData = websiteData[currentPage] || { html: "", css: "" };

    useEffect(() => {
        if (currentPageData?.html && currentPageData?.css) {
            const previewContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <base href="/" target="_parent">
                    <style>
                        ${currentPageData.css}
                        a { cursor: pointer; }
                    </style>
                    <script>
                        // Intercept link clicks
                        document.addEventListener("DOMContentLoaded", function() {
                            document.body.addEventListener("click", function(e) {
                                // Find the closest anchor element
                                let target = e.target;
                                while (target && target.tagName !== "A" && target !== document.body) {
                                    target = target.parentNode;
                                }
                                
                                if (target && target.tagName === "A") {
                                    e.preventDefault();
                                    const href = target.getAttribute("href");
                                    if (href && href !== "#" && !href.startsWith("http") && !href.startsWith("mailto:")) {
                                        // Extract page name from URL (remove leading/trailing slashes and .html if present)
                                        let pageName = href.replace(/^\\/+|\\/+$|\\.html$/g, "") || "home";
                                        // Send message to parent window
                                        window.parent.postMessage({ 
                                            type: "NAVIGATE", 
                                            page: pageName 
                                        }, "*");
                                    }
                                }
                            });
                        });
                    </script>
                </head>
                <body>${currentPageData.html}</body>
                </html>
            `;

            const blob = new Blob([previewContent], { type: "text/html" });
            const url = URL.createObjectURL(blob);
            setPreviewUrl(url);

            return () => {
                URL.revokeObjectURL(url);
            };
        }
    }, [currentPageData, currentPage]);

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data?.type === "NAVIGATE") {
                const pageName = event.data.page;
                if (pages.includes(pageName)) {
                    setCurrentPage(pageName);
                    setCurrentFile(`${pageName}.html`);
                }
            }
        };

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, [pages, setCurrentPage, setCurrentFile]);

    const handlePageChange = (page: string) => {
        setCurrentPage(page);
        setCurrentFile(`${page.toLowerCase()}.html`);
    };

    const handleRefresh = () => {
        if (currentPageData?.html && currentPageData?.css) {
            const blob = new Blob([`
                <!DOCTYPE html>
                <html>
                <head>
                    <style>${currentPageData.css}</style>
                </head>
                <body>${currentPageData.html}</body>
                </html>
            `], { type: "text/html" });
            setPreviewUrl(URL.createObjectURL(blob));
        }
    };

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
                body: JSON.stringify({
                    description: prompt,
                    style: "modern",
                    color_scheme: "blue",
                    generate_multiple_pages: true,
                }),
            });
            console.log("response", response);
            if (!response.ok) {
                toast.error("Failed to generate website. Please try again");
                return;
            }

            const data = await response.json();

            if (data.pages) {
                initializeWebsite(data.pages);
            } else {
                const pageName = "home";
                addPage(pageName, data.html || "<div>No content</div>", data.css || "/* No styles */");
            }

            toast.success("Your website is ready!")
        } catch (error) {
            console.error("Error generating website:", error);
            toast.error("Failed to generate website. Please try again.");
        }
    };

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
                    currentPage={currentPage}
                    pages={pages}
                    onPageChange={handlePageChange}
                    url={previewUrl}
                    onUrlChange={(url) => setPreviewUrl(url)}
                    onRefresh={handleRefresh}
                    viewMode={rightViewMode}
                    onViewModeChange={setRightViewMode}
                />
            }
            // rightContent={
            //     <Preview url={previewUrl} />
            // }
            rightContent={
                rightViewMode === "preview" ? (
                    <Preview url={previewUrl} />
                ) : (
                    <div className="flex h-full">
                        <div className="w-64 border-r border-border overflow-auto">
                            <FileExplorer
                                files={files}
                                onFileSelect={handleFileSelect}
                                selectedFile={currentFile!}
                            />
                        </div>
                        <div className="flex-1 overflow-auto">
                            <CodeViewer
                                content={getFileContent()}
                                language={currentFile?.endsWith('.css') ? 'css' : 'html'}
                            />
                        </div>
                    </div>
                )
            }
        />
    );
};

export default ProjectWrapper;
