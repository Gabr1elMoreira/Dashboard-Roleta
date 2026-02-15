import React from "react";
import SectionHeader from "../SectionHeader";

const VisaoCavalo = ({ stats, totalGeral }) => {
    const topoId = Object.entries(stats.cavalos).sort((a, b) => b[1] - a[1])[0][0];

    const CONFIGS = {
        "1 4 7": {
            label: "CAVALO 1-4-7",
            color: "red-500",
            border: "border-red-500",
            bg: "bg-red-500"
        },
        "2 5 8": {
            label: "CAVALO 2-5-8",
            color: "blue-500",
            border: "border-blue-500",
            bg: "bg-blue-500"
        },
        "0 3 6 9": {
            label: "CAVALO 0-3-6-9",
            color: "[#00D837]",
            border: "border-[#00D837]",
            bg: "bg-[#00D837]"
        }
    };

    return (
        <div className="space-y-6 animate-fade-in flex flex-col h-full">
            <SectionHeader title="Cavalos" badge="ANÁLISE" />

            <div className="flex-1 flex items-center justify-center p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mx-auto">
                    {["1 4 7", "2 5 8", "0 3 6 9"]
                        .sort((a, b) => (stats.cavalos[b] || 0) - (stats.cavalos[a] || 0))
                        .map((id) => {
                            const freq = stats.cavalos[id] || 0;
                            const perc = totalGeral > 0 ? (freq / totalGeral) * 100 : 0;
                            const isTop = topoId === id;
                            const conf = CONFIGS[id];

                            return (
                                <div
                                    key={id}
                                    className={`relative p-10 rounded-[40px] border-2 transition-all duration-500 flex flex-col items-center justify-between shadow-2xl group min-h-[240px] bg-black
                                    ${conf.border} ${isTop ? "scale-[1.05] z-30 shadow-white/10" : "hover:scale-[1.02]"}
                                `}
                                >
                                    <div className="z-10 w-full flex flex-col items-center gap-2">
                                        <span className={`text-sm font-black px-5 py-2 rounded-full uppercase tracking-widest transition-all shadow-lg
                                        ${conf.bg} text-white border border-white/20
                                    `}>
                                            {conf.label}
                                        </span>
                                    </div>

                                    <div className="z-10 flex flex-col items-center py-4">
                                        <div className="text-7xl font-black tracking-tighter text-white transition-transform duration-500 group-hover:scale-110">
                                            {freq}<span className="text-2xl text-white/20 ml-1">x</span>
                                        </div>
                                    </div>

                                    <div className="z-10 w-full px-2">
                                        <div className="h-2 w-full bg-black/60 rounded-full overflow-hidden border border-white/5">
                                            <div
                                                className={`h-full ${conf.bg} rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(255,255,255,0.05)]`}
                                                style={{ width: `${perc}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Decorador de terminais ao fundo */}
                                    <span className="absolute bottom-4 right-4 text-6xl font-black text-white/[0.03] pointer-events-none italic transition-all">
                                        {id.split(' ')[0]}
                                    </span>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default VisaoCavalo;
