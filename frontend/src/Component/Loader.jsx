import React from "react";

const Loader = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[#09090b]">
            <div className="flex flex-col items-center gap-4">

                {/* Spinner */}
                <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-white animate-spin" />

                {/* App name */}
                <span className="text-white/60 text-sm font-light tracking-widest uppercase">
                    Melodia
                </span>

            </div>
        </div>
    );
};

export default Loader;