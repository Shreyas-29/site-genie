import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props {
    content: string;
    language: "html" | "css" | "javascript" | "typescript" | string;
}

const CodeViewer = ({ content, language }: Props) => {
    return (
        <div className="h-full overflow-y-auto hide-scrollbar">
            {content ? (
                <SyntaxHighlighter
                    language={language}
                    style={vscDarkPlus}
                    customStyle={{
                        margin: 0,
                        padding: "1.5rem",
                        height: "100%",
                        background: "#0f172a",
                        fontSize: "0.875rem",
                        lineHeight: "1.5",
                    }}
                    showLineNumbers
                    wrapLines
                >
                    {content}
                </SyntaxHighlighter>
            ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                    No content to display
                </div>
            )}
        </div>
    );
};

export default CodeViewer;
