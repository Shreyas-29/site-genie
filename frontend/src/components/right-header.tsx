'use client';

import { Button } from '@/components/ui/button';
import { RefreshCw, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type ViewMode = 'preview' | 'code';

interface Props {
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
}: Props) => {
    return (
        <div className="flex items-center justify-between w-full py-2">
            <div className="flex items-center bg-muted rounded-md p-1">
                <Button
                    size="sm"
                    onClick={() => onViewModeChange('preview')}
                    className={cn(
                        "h-7 focus-visible:ring-0 focus-visible:ring-transparent",
                        viewMode === 'preview' ? 'bg-white text-primary hover:bg-white' : 'bg-transparent text-foreground hover:bg-transparent'
                    )}
                >
                    Preview
                </Button>
                <Button
                    size="sm"
                    onClick={() => onViewModeChange('code')}
                    className={cn(
                        "h-7 focus-visible:ring-0 focus-visible:ring-transparent",
                        viewMode === 'code' ? 'bg-white text-primary hover:bg-white' : 'bg-transparent text-foreground hover:bg-transparent'
                    )}
                >
                    Code
                </Button>
            </div>

            <div className="flex items-center space-x-2">
                <Button
                    size="sm"
                    variant="ghost"
                    onClick={onRefresh}
                    className="size-8 p-0"
                >
                    <RefreshCw className="size-3.5" />
                </Button>
                <div className="relative flex items-center w-64">
                    <Input
                        value={url}
                        onChange={(e) => onUrlChange(e.target.value)}
                        className="h-8 text-xs pr-8"
                        placeholder="Preview URL"
                    />
                    <Button
                        size="sm"
                        variant="ghost"
                        className="absolute right-1 rounded-sm size-6 p-0"
                        onClick={() => window.open(url, '_blank')}
                    >
                        <ExternalLink className="size-3.5" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default RightHeader;
