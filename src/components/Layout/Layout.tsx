import React from 'react';

interface Props {
    children: React.ReactNode;
};

const Layout: React.FC<Props> = ({
    children
}) => {
    return (
        <>
            <header className="bg-slate-50 lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:flex-col lg:w-112 lg:items-start lg:overflow-y-auto xl:w-120 lg:border-x lg:border-slate-200">
                <div 
                    className="hidden lg:sticky lg:top-0 lg:flex lg:w-16 lg:flex-none lg:items-center lg:whitespace-nowrap lg:py-12 lg:text-sm lg:leading-7 lg:[writing-mode:vertical-rl]"
                >
                    <div className="font-mono text-slate-500 ">RickandMorty</div>
                </div>
            </header>
            
            <main className="border-t border-slate-200 lg:relative lg:mb-28 lg:ml-112 lg:border-t-0 xl:ml-120">
                <div className="relative">{children}</div>
            </main>
            <footer className="border-t border-slate-200 bg-slate-50 py-10 pb-40 sm:py-16 sm:pb-32 lg:hidden">
                <div className="mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4">
                    <h2 className="mt-8 flex items-center font-mono text-sm font-medium leading-7 text-slate-900">
                        <span className="ml-2.5">Sleekflow Footer</span>
                    </h2>
                </div>
            </footer>
        </>
    );
};

export default Layout;
