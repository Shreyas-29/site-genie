import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WebsiteData {
    [pageName: string]: {
        html: string;
        css: string;
    };
}

interface WebsiteFile {
    name: string;
    type: "file" | "folder";
    content?: string;
    children?: WebsiteFile[];
}

interface WebsiteState {
    files: WebsiteFile[];
    currentFile: string | null;
    currentPage: string;
    websiteData: WebsiteData;
    pages: string[];
    initializeWebsite: (pages: { [pageName: string]: { html: string; css: string } }) => void;
    setCurrentPage: (page: string) => void;
    setCurrentFile: (fileName: string) => void;
    updateWebsiteData: (pageName: string, html: string, css: string) => void;
    addPage: (pageName: string, html: string, css: string) => void;
}

export const useSiteStore = create<WebsiteState>()(
    persist(
        (set, get) => ({
            files: [],
            currentFile: null,
            currentPage: "home",
            websiteData: {},
            pages: ["home"],
            
            initializeWebsite: (pages) => {
                const pageEntries = Object.entries(pages);
                const files: WebsiteFile[] = [{
                    name: "public",
                    type: "folder",
                    children: []
                }];

                pageEntries.forEach(([pageName, { html, css }]) => {
                    files[0]?.children?.push(
                        {
                            name: `${pageName}.html`,
                            type: "file",
                            content: html
                        },
                        {
                            name: "styles",
                            type: "folder",
                            children: [{
                                name: `${pageName}.css`,
                                type: "file",
                                content: css
                            }]
                        }
                    );
                });

                set({
                    files,
                    websiteData: pages,
                    pages: Object.keys(pages),
                    currentPage: Object.keys(pages)[0] || "home",
                    currentFile: "index.html"
                });
            },

            setCurrentPage: (page) => set({ currentPage: page }),

            setCurrentFile: (fileName) => set({ currentFile: fileName }),

            updateWebsiteData: (pageName, html, css) => set((state) => {
                const updatedData = {
                    ...state.websiteData,
                    [pageName]: { html, css }
                };

                const updatedFiles = [...state.files];
                const publicFolder = updatedFiles[0];
                
                if (publicFolder?.children) {
                    const htmlFile = publicFolder.children.find(
                        f => f.name === `${pageName}.html`
                    );
                    if (htmlFile) htmlFile.content = html;

                    const stylesFolder = publicFolder.children.find(
                        f => f.name === "styles"
                    );
                    const cssFile = stylesFolder?.children?.find(
                        f => f.name === `${pageName}.css`
                    );
                    if (cssFile) cssFile.content = css;
                }

                return {
                    websiteData: updatedData,
                    files: updatedFiles
                };
            }),

            addPage: (pageName, html, css) => set((state) => {
                const newPageName = pageName.toLowerCase();
                const updatedData = {
                    ...state.websiteData,
                    [newPageName]: { html, css }
                };

                const updatedFiles = [...state.files];
                const publicFolder = updatedFiles[0];
                
                if (publicFolder?.children) {
                    publicFolder.children.push({
                        name: `${newPageName}.html`,
                        type: "file",
                        content: html
                    });

                    const stylesFolder = publicFolder.children.find(
                        f => f.name === "styles"
                    );
                    if (stylesFolder?.children) {
                        stylesFolder.children.push({
                            name: `${newPageName}.css`,
                            type: "file",
                            content: css
                        });
                    }
                }

                return {
                    websiteData: updatedData,
                    pages: [...new Set([...state.pages, newPageName])],
                    currentPage: newPageName,
                    currentFile: `${newPageName}.html`,
                    files: updatedFiles
                };
            })
        }),
        {
            name: "site-storage",
        }
    )
);
