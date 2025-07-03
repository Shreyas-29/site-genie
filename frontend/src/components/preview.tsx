'use client';

interface PreviewProps {
    url: string;
}

export const Preview = ({ url }: PreviewProps) => {
    return (
        <div className="h-full w-full bg-white">
            <iframe
                src={url}
                className="w-full h-full border-0"
                title="Website Preview"
                sandbox="allow-same-origin allow-scripts"
            />
        </div>
    );
};

export default Preview;
