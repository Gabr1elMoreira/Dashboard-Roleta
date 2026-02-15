import React from "react";

const HighlightCard = ({ title, icon, name, freq, total, color, useColor = true }) => {
    const percent = total > 0 ? ((freq / total) * 100).toFixed(0) : 0;

    // Determinar se é uma cor HEX ou classe Tailwind
    const isHex = color?.startsWith('#');
    const textColorClass = !isHex && useColor ? color.replace('bg-', 'text-') : 'text-white';

    // Estilos inline para quando for HEX
    const iconStyle = isHex ? { backgroundColor: color } : {};
    const textStyle = isHex && useColor ? { color: color } : {};

    return (
        <div className="bg-white/5 p-4 rounded-[24px] border border-white/20 shadow-2xl flex flex-col justify-between group hover:bg-white/10 transition-all h-full">
            <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-3">
                <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">{title}</h3>
                <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs shadow-lg border border-white/20 ${!isHex ? color : ''}`}
                    style={iconStyle}
                >
                    {icon}
                </div>
            </div>

            <div className="flex flex-col items-center py-1 flex-grow justify-center">
                <span
                    className={`text-3xl font-black uppercase tracking-tighter mb-1 drop-shadow-md ${!isHex ? textColorClass : ''}`}
                    style={textStyle}
                >
                    {name}
                </span>
                <div className="bg-white/5 px-4 py-1.5 rounded-xl border border-white/10 shadow-inner mt-1">
                    <span className="text-lg font-black text-white uppercase tracking-[0.2em] drop-shadow-sm">
                        {freq}X
                    </span>
                </div>
            </div>
        </div>
    );
};

export default HighlightCard;
