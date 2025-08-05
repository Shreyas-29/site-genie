"use client";

import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronRightIcon, FileIcon, FileTextIcon } from "lucide-react";
import { useState } from "react";

export interface FileType {
    name: string;
    type: "file" | "folder";
    content?: string;
    children?: FileType[];
}

interface ItemProps {
    file: FileType;
    level?: number;
    onSelect: (file: FileType) => void;
    selectedFile: string;
}

const FileItem = ({
    file,
    level = 0,
    onSelect,
    selectedFile,
}: ItemProps) => {

    const isSelected = selectedFile === file.name;

    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const handleClick = () => {
        console.log(file.name.includes("css"));
        if (file.type === "folder") {
            setIsExpanded(!isExpanded);
        } else {
            onSelect(file);
        }
    };

    return (
        <div className="select-none">
            <div
                className={cn(
                    "flex items-center py-1 px-2 rounded-md cursor-pointer hover:bg-accent",
                    isSelected && "bg-accent"
                )}
                style={{
                    paddingLeft: `${level * 24 + 8}px`,
                }}
                onClick={handleClick}
            >
                {file.type === "folder" ? (
                    <>
                        {isExpanded ? (
                            <ChevronDownIcon className="w-4 h-4 mr-1" />
                        ) : (
                            <ChevronRightIcon className="w-4 h-4 mr-1" />
                        )}
                        {/* <FolderIcon className="w-4 h-4 mr-2 text-blue-500" /> */}
                    </>
                ) : (
                    file.name.includes("css") ? (
                        <FileIcon className="w-4 h-4 mr-2 text-sky-500" />
                    ) : (
                        <FileTextIcon className="w-4 h-4 mr-2 text-orange-500" />
                    )
                )}
                <span className="text-sm truncate">{file.name}</span>
            </div>
            {file.type === "folder" && isExpanded && file.children && (
                <div>
                    {file.children.map((child, index) => (
                        <FileItem
                            key={child.name + index}
                            file={child}
                            level={level + 1}
                            onSelect={onSelect}
                            selectedFile={selectedFile}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

interface Props {
    files: FileType[];
    onFileSelect: (file: FileType) => void;
    selectedFile: string;
}

const FileExplorer = ({ files, onFileSelect, selectedFile }: Props) => {
    return (
        <div className="h-full overflow-auto p-2">
            {files.map((file) => (
                <FileItem
                    key={file.name}
                    file={file}
                    onSelect={onFileSelect}
                    selectedFile={selectedFile}
                />
            ))}
        </div>
    );
};

export default FileExplorer;
