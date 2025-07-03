'use client';

import { useState } from 'react';
import FileExplorer from './file-explorer';

interface CodeViewerProps {
    files: any[];
}

const CodeViewer = ({ files }: CodeViewerProps) => {

    const [selectedFile, setSelectedFile] = useState('');

    const handleFileSelect = (file: any) => {
        setSelectedFile(file.name);
        // Here you would load the file content
    };

    return (
        <div className="flex h-full">
            <div className="w-64 border-r border-border h-full overflow-auto">
                <FileExplorer
                    files={files}
                    onFileSelect={handleFileSelect}
                    selectedFile={selectedFile}
                />
            </div>
            <div className="flex-1 overflow-auto">
                {selectedFile ? (
                    <div className="p-4">
                        <code className="language-typescript">
                            {`// Content of ${selectedFile} will appear here`}
                        </code>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                        Select a file to view its content
                    </div>
                )}
            </div>
        </div>
    );
};

export default CodeViewer;
