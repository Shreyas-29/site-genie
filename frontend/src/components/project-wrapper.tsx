'use client';

import { useState } from 'react';
import ProjectPannel from './project-pannel';
import LeftHeader from './left-header';
import FileExplorer from './file-explorer';
import InputWrapper from './input-wrapper';
import RightHeader from './right-header';
import Preview from './preview';
import CodeViewer from './code-reviewer';

const ProjectWrapper = () => {

    const [leftViewMode, setLeftViewMode] = useState<'chat' | 'files'>('chat');
    const [rightViewMode, setRightViewMode] = useState<'preview' | 'code'>('preview');
    const [url, setUrl] = useState('http://localhost:3000');

    const files = [
        {
            name: 'public',
            type: 'folder',
            children: [
                { name: 'index.html', type: 'file' },
                { name: 'styles.css', type: 'file' },
                { name: 'app.js', type: 'file' },
            ],
        },
    ];

    const handleRefresh = () => {
        console.log('Refreshing...');
    };

    const handleFileSelect = (file: any) => {
        console.log('Selected file:', file);
    };

    return (
        <ProjectPannel
            leftHeader={
                <LeftHeader
                    viewMode={leftViewMode}
                    onViewModeChange={setLeftViewMode}
                />
            }
            leftContent={
                <div className="h-full flex flex-col">
                    <div className="flex-1 overflow-auto p-4">
                        {leftViewMode === 'chat' ? (
                            <div>Chat messages will appear here</div>
                        ) : (
                            <FileExplorer
                                files={files}
                                onFileSelect={handleFileSelect}
                                selectedFile=""
                            />
                        )}
                    </div>
                    <div className="p-4 border-t border-border">
                        <InputWrapper />
                    </div>
                </div>
            }
            rightHeader={
                <RightHeader
                    viewMode={rightViewMode}
                    onViewModeChange={setRightViewMode}
                    url={url}
                    onUrlChange={setUrl}
                    onRefresh={handleRefresh}
                />
            }
            rightContent={
                rightViewMode === 'preview' ? (
                    <Preview url={url} />
                ) : (
                    <CodeViewer files={files} />
                )
            }
        />
    );
};

export default ProjectWrapper
