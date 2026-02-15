import React from "react";
import SectionHeader from "../SectionHeader";

const VisaoZona = ({ stats, totalGeral }) => {
    // Pegamos a zona de maior frequência para aplicar o destaque de escala
    const topoZona = [...stats.zonas].sort((a, b) => b.freq - a.freq)[0]?.nome;

    return (
        <div className="space-y-6 animate-fade-in flex flex-col h-full">
            <SectionHeader title="Zonas da Roleta" badge="ESTRATÉGIA FÍSICA" />

            <div className="flex-1 flex items-center justify-center p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl mx-auto">
                    {[...stats.zonas]
                        .sort((a, b) => b.freq - a.freq)
                        .map((z, i) => {
                            const isTop = topoZona === z.nome;

                            // Extraímos a base da cor (ex: red-500) para criar classes dinâmicas vivas
                            // Se a cor for bg-[#00D837], tratamos como verde
                            const isCustomGreen = z.color.includes('[#00D837]');
                            const colorBase = isCustomGreen ? '#00D837' : z.color.replace('bg-', '');

                            const borderClass = isCustomGreen ? 'border-[#00D837]' : `border-${colorBase}`;
                            const bgClass = z.color; // já é bg-xxx ou bg-[#xxx]
                            const glowClass = isCustomGreen ? 'shadow-[#00D837]/40' : `shadow-${colorBase}/40`;

                            const perc = totalGeral > 0 ? (z.freq / totalGeral) * 100 : 0;

                            return (
                                <div
                                    key={i}
                                    className={`relative p-8 rounded-[40px] border-2 transition-all duration-500 flex flex-col items-center justify-between shadow-2xl group min-h-[220px] bg-black
                                    ${borderClass} 
                                    ${isTop
                                            ? `scale-[1.05] z-10 ${glowClass}`
                                            : "hover:scale-[1.02]"
                                        }
                                `}
                                >
                                    <div className="z-10 w-full flex flex-col items-center gap-2">
                                        <span className={`text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest transition-all shadow-lg text-white border border-white/20
                                        ${bgClass}
                                    `}>
                                            {z.nome}
                                        </span>
                                    </div>

                                    <div className="z-10 flex flex-col items-center py-4">
                                        <div className="text-7xl font-black tracking-tighter text-white transition-transform duration-500 group-hover:scale-110">
                                            {z.freq}<span className="text-2xl text-white/20 ml-1">x</span>
                                        </div>
                                    </div>

                                    <div className="z-10 w-full px-2">
                                        <div className="h-2 w-full bg-black/60 rounded-full overflow-hidden border border-white/10">
                                            <div
                                                className={`h-full ${bgClass} rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(255,255,255,0.1)]`}
                                                style={{ width: `${perc}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Decorador de letra da zona ao fundo */}
                                    <span className="absolute bottom-4 right-4 text-7xl font-black text-white/[0.03] pointer-events-none italic transition-all uppercase">
                                        {z.nome.charAt(0)}
                                    </span>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default VisaoZona;
