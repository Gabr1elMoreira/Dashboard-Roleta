import React from "react";

const FilterOption = ({ label, icon, active, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`w-full text-left px-5 py-4 rounded-xl flex items-center gap-4 transition-all group ${active
                ? "bg-[#00D837] text-black shadow-xl"
                : "hover:bg-white/5 text-white hover:text-white"
                }`}
        >
            <span className={`text-xl transition-transform group-hover:scale-110 ${active ? 'grayscale-0' : 'grayscale-0'}`}>{icon}</span>
            <span className="font-black text-xs uppercase tracking-widest">{label}</span>
        </button>
    );
};

export default FilterOption;
