import React from "react";
import SectionHeader from "../SectionHeader";
import { CORES_BARRAS_STATS } from "../../../constants";

const VisaoCamuflado = ({ stats, totalGeral }) => {
    // Lista mestre com todas as configurações originais
    const masterList = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((num, i) => {
        const accentColors = [
            { border: "border-red-500", bg: "bg-red-500 shadow-red-500/20" },
            { border: "border-orange-500", bg: "bg-orange-500 shadow-orange-500/20" },
            { border: "border-yellow-500", bg: "bg-yellow-500 shadow-yellow-500/20" },
            { border: "border-green-500", bg: "bg-green-500 shadow-green-500/20" },
            { border: "border-teal-500", bg: "bg-teal-500 shadow-teal-500/20" },
            { border: "border-blue-500", bg: "bg-blue-500 shadow-blue-500/20" },
            { border: "border-indigo-500", bg: "bg-indigo-500 shadow-indigo-500/20" },
            { border: "border-purple-500", bg: "bg-purple-500 shadow-purple-500/20" },
            { border: "border-pink-500", bg: "bg-pink-500 shadow-pink-500/20" }
        ];

        return {
            num,
            freq: stats.camuflados[num] || 0,
            style: accentColors[i],
            barColor: CORES_BARRAS_STATS[i % CORES_BARRAS_STATS.length]
        };
    });

    // Filtra os mais frequentes (Top 3 que tenham saído ao menos 1 vez)
    const topCamuflados = masterList
        .filter(item => item.freq > 0)
        .sort((a, b) => b.freq - a.freq)
        .slice(0, 3);

    return (
        <div className="space-y-6 animate-fade-in flex flex-col h-full">
            <SectionHeader title="Visão Camuflados" badge="FILTRADO" />

            <div className="flex-1 flex items-center justify-center p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mx-auto">
                    {topCamuflados.length > 0 ? (
                        topCamuflados.map((item, i) => {
                            const perc = totalGeral > 0 ? (item.freq / totalGeral) * 100 : 0;
                            const isHighest = i === 0;

                            return (
                                <div
                                    key={item.num}
                                    className={`relative p-8 rounded-[40px] border-2 transition-all duration-500 flex flex-col items-center justify-between shadow-2xl group min-h-[220px] bg-black
                                        ${item.style.border} 
                                        ${isHighest
                                            ? `scale-[1.05] z-10 shadow-${item.style.bg.split('-')[1]}-500/40`
                                            : "hover:scale-[1.02]"
                                        }
                                    `}
                                >
                                    <div className="z-10 w-full flex flex-col items-center gap-2">
                                        <span className={`text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest transition-all shadow-lg text-white border border-white/20
                                            ${item.style.bg.split(' ')[0]}
                                        `}>
                                            CAMUFLADO {item.num}
                                        </span>
                                    </div>

                                    <div className="z-10 flex flex-col items-center py-4">
                                        <div className="text-7xl font-black tracking-tighter text-white">
                                            {item.freq}<span className="text-2xl text-white/30 ml-1">x</span>
                                        </div>
                                    </div>

                                    <div className="z-10 w-full px-2">
                                        <div className="h-2 w-full bg-black/60 rounded-full overflow-hidden border border-white/10">
                                            <div
                                                className={`h-full ${item.barColor} rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(255,255,255,0.1)]`}
                                                style={{ width: `${perc}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Numero decorativo sutil */}
                                    <span className="absolute bottom-4 right-4 text-7xl font-black text-white/[0.03] pointer-events-none italic transition-all">
                                        {item.num}
                                    </span>
                                </div>
                            );
                        })
                    ) : (
                        <div className="col-span-3 text-center py-12">
                            <span className="text-white/20 font-black uppercase tracking-widest">Aguardando dados de frequência...</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VisaoCamuflado;
