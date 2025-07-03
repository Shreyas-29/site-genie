'use client';

import { Button } from '@/components/ui/button';
import { RefreshCw, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';

type ViewMode = 'preview' | 'code';

interface RightHeaderProps {
    viewMode: ViewMode;
    onViewModeChange: (mode: ViewMode) => void;
    url: string;
    onUrlChange: (url: string) => void;
    onRefresh: () => void;
}

const RightHeader = ({
    viewMode,
    onViewModeChange,
    url,
    onUrlChange,
    onRefresh,
}: RightHeaderProps) => {
    return (
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-1">
                <Button
                    variant={viewMode === 'preview' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => onViewModeChange('preview')}
                >
                    Preview
                </Button>
                <Button
                    variant={viewMode === 'code' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => onViewModeChange('code')}
                >
                    Code
                </Button>
            </div>

            <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" onClick={onRefresh}>
                    <RefreshCw className="h-4 w-4" />
                </Button>
                <div className="relative flex items-center">
                    <Input
                        value={url}
                        onChange={(e) => onUrlChange(e.target.value)}
                        className="h-8 w-64 text-xs"
                        placeholder="Enter URL"
                    />
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 h-6 w-6"
                        onClick={() => window.open(url, '_blank')}
                    >
                        <ExternalLink className="h-3 w-3" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default RightHeader;
