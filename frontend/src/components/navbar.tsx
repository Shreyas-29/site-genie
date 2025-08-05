import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = () => {
    return (
        <header className="fixed top-0 inset-x-0 mx-auto max-w-7xl h-16 px-2 md:px-12 z-[100]">
            <div className="flex items-center justify-between size-full">
                <div className="flex items-center flex-1 lg:flex-none">
                    <Link href="/" className="text-lg font-semibold text-foreground">
                        <span className="text-lg font-semibold">
                            Site Genie
                        </span>
                    </Link>
                </div>
                <div className="items-center flex gap-2 lg:gap-4">
                    <Button size="sm" className="hidden sm:flex">
                        <Link href="/project">
                            Project
                        </Link>
                    </Button>
                </div>
            </div>
        </header>
    )
};

export default Navbar
