import Navbar from "@/components/navbar";

const MarketingLayout = ({ children }: { children: React.ReactNode; }) => {
    return (
        <div className="flex flex-col relative w-full min-h-screen">
            <div className="absolute h-full w-full inset-0 bg-background bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [mask-image:radial-gradient(circle_at_top,transparent_25%,black_80%)] [background-size:16px_16px] -z-10"></div>
            <Navbar />
            <div className="pt-16 w-full">
                {children}
            </div>
        </div>
    );
};

export default MarketingLayout
