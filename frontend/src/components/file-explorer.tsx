'use client';

import { File, Folder, ChevronRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';

type FileType = {
    name: string;
    type: string;
    children: any;
};

interface FileExplorerProps {
    files: FileType[];
    onFileSelect: (file: FileType) => void;
    selectedFile: string;
}

const FileItem = ({
    file,
    level = 0,
    onSelect,
    selectedFile,
}: {
    file: FileType;
    level?: number;
    onSelect: (file: FileType) => void;
    selectedFile: string;
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const isSelected = selectedFile === file.name;

    const handleClick = () => {
        if (file.type === 'folder') {
            setIsExpanded(!isExpanded);
        } else {
            onSelect(file);
        }
    };

    return (
        <div className="select-none">
            <div
                className={`flex items-center py-1 px-2 rounded-md cursor-pointer hover:bg-accent ${isSelected ? 'bg-accent' : ''
                    }`}
                style={{ paddingLeft: `${level * 16 + 8}px` }}
                onClick={handleClick}
            >
                {file.type === 'folder' ? (
                    <span className="flex items-center">
                        {isExpanded ? (
                            <ChevronDown className="w-4 h-4 mr-1" />
                        ) : (
                            <ChevronRight className="w-4 h-4 mr-1" />
                        )}
                        <Folder className="w-4 h-4 text-yellow-500" />
                    </span>
                ) : (
                    <File className="w-4 h-4 text-blue-500" />
                )}
                <span className="ml-2 text-sm">{file.name}</span>
            </div>
            {isExpanded &&
                file.children?.map((child: any) => (
                    <FileItem
                        key={child.name}
                        file={child}
                        level={level + 1}
                        onSelect={onSelect}
                        selectedFile={selectedFile}
                    />
                ))}
        </div>
    );
};

const FileExplorer = ({ files, onFileSelect, selectedFile }: FileExplorerProps) => {
    return (
        <div className="h-full overflow-y-auto">
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
