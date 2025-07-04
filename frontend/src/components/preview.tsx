"use client";

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
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation"
                allow="fullscreen"
            />
        </div>
    );
};

export default Preview;
