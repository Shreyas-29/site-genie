'use client';

import { Button } from '@/components/ui/button';
import { MessageSquare, Code2 } from 'lucide-react';

type LeftViewMode = 'chat' | 'files';

interface LeftHeaderProps {
    viewMode: LeftViewMode;
    onViewModeChange: (mode: LeftViewMode) => void;
}

const LeftHeader = ({ viewMode, onViewModeChange }: LeftHeaderProps) => {
    return (
        <div className="flex items-center justify-between w-full">
            <h2 className="text-sm font-medium">Project</h2>
            <div className="flex items-center space-x-1">
                <Button
                    variant={viewMode === 'chat' ? 'secondary' : 'ghost'}
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => onViewModeChange('chat')}
                >
                    <MessageSquare className="h-3.5 w-3.5" />
                </Button>
                <Button
                    variant={viewMode === 'files' ? 'secondary' : 'ghost'}
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => onViewModeChange('files')}
                >
                    <Code2 className="h-3.5 w-3.5" />
                </Button>
            </div>
        </div>
    );
};

export default LeftHeader;
