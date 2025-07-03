import InputWrapper from '@/components/input-wrapper';
import { StarsIcon } from 'lucide-react';
import React from 'react'

const HomePage = () => {
    return (
        <div className="flex flex-col items-center relative z-0 h-[calc(100vh-4rem)] px-4 lg:px-0">

            <div className="fixed inset-x-0 bottom-0 -z-10 translate-y-1/2 mx-auto w-1/4 h-1/12 rounded-full bg-red-500/50 opacity-75 blur-[5rem]"></div>
            <div className="fixed inset-x-0 bottom-0 -z-20 translate-y-1/4 mx-auto w-1/2 h-1/4 rounded-full bg-orange-500/50 opacity-50 blur-[10rem]"></div>
            <div className="fixed inset-x-0 bottom-0 -z-30 translate-y-1/4 mx-auto w-3/4 h-1/2 rounded-full bg-amber-500/50 opacity-25 blur-[15rem]"></div>

            <div className="flex flex-col items-center mt-28 lg:mt-40 w-full mx-auto max-w-2xl z-20">
                <div className="text-center w-full">
                    {/* <StarsIcon className="size-8 mx-auto" /> */}
                    <h2 className="text-3xl lg:text-5xl font-semibold text-center">
                        Build your website in minutes
                    </h2>
                    <p className="text-base text-muted-foreground text-balance mt-2">
                        Site Genie is a website builder that allows you to create a website in minutes
                    </p>
                </div>

                <InputWrapper />
            </div>
        </div>
    )
};

export default HomePage
