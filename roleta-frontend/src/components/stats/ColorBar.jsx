import React from "react";

const ColorBar = ({ resultados, cor, bg, showPercent }) => {
    const count = resultados.filter(r => r.cor === cor).length;
    const percent = resultados.length > 0 ? (count / resultados.length) * 100 : 0;

    return (
        <div
            className={`${bg} h-full transition-all duration-[1500ms] ease-out flex items-center justify-center overflow-hidden`}
            style={{ width: `${percent}%` }}
        >
            {showPercent && percent > 5 && (
                <span className="text-[10px] font-black text-white drop-shadow-md animate-fade-in">
                    {percent.toFixed(0)}%
                </span>
            )}
        </div>
    );
};

export default ColorBar;
