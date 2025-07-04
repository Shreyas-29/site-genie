import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WebsiteFile {
    name: string;
    type: 'file' | 'folder';
    content?: string;
    children?: WebsiteFile[];
}

interface WebsiteState {
    files: WebsiteFile[];
    currentFile: string | null;
    websiteData: {
        html: string;
        css: string;
    };
    setCurrentFile: (fileName: string) => void;
    updateWebsiteData: (html: string, css: string) => void;
    initializeWebsite: (html: string, css: string) => void;
}

const useSiteStore = create<WebsiteState>()(
    persist(
        (set, get) => ({
            files: [],
            currentFile: null,
            websiteData: {
                html: "<!-- Your generated HTML will appear here -->",
                css: "/* Your generated CSS will appear here */"
            },

            setCurrentFile: (fileName) => set({ currentFile: fileName }),

            updateWebsiteData: (html, css) => {
                set((state) => {
                    const updateFiles = (files: WebsiteFile[]): WebsiteFile[] => {
                        return files.map(file => {
                            if (file.name === 'index.html') {
                                return { ...file, content: html };
                            }
                            if (file.name === 'styles.css') {
                                return { ...file, content: css };
                            }
                            if (file.children) {
                                return { ...file, children: updateFiles(file.children) };
                            }
                            return file;
                        });
                    };

                    return {
                        websiteData: { html, css },
                        files: updateFiles([...state.files])
                    };
                });
            },

            initializeWebsite: (html, css) => {
                const files: WebsiteFile[] = [
                    {
                        name: 'public',
                        type: 'folder',
                        children: [
                            {
                                name: 'index.html',
                                type: 'file',
                                content: html
                            },
                            {
                                name: 'styles.css',
                                type: 'file',
                                content: css
                            }
                        ]
                    }
                ];

                set({
                    files,
                    currentFile: 'index.html',
                    websiteData: { html, css }
                });
            }
        }),
        {
            name: 'site-storage', // unique name for localStorage key
            // Optional: only persist specific parts of the state
            // partialize: (state) => ({ 
            //     files: state.files,
            //     currentFile: state.currentFile,
            //     websiteData: state.websiteData
            // })
        }
    )
);

export default useSiteStore;