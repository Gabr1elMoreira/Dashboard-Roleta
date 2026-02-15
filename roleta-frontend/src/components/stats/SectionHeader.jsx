import React from "react";

const SectionHeader = ({ title, badge }) => {
    return (
        <div className="flex items-center justify-between border-b-2 border-white/20 pb-8 mb-10">
            <h2 className="text-5xl font-black text-white uppercase tracking-tighter leading-none">
                {title.split(" ")[0]} <span className="text-white">{title.split(" ").slice(1).join(" ")}</span>
            </h2>
            <span className="text-[13px] font-black bg-blue-600/30 text-white px-6 py-2.5 rounded-2xl border border-blue-500/30 uppercase tracking-[0.2em] shadow-xl">
                {badge}
            </span>
        </div>
    );
};

export default SectionHeader;
