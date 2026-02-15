import React, { useMemo } from "react";
import { analisarGatilhos } from "../utils/analisador";

function PainelDeSinais({ resultados }) {
    const sinais = useMemo(() => analisarGatilhos(resultados), [resultados]);

    if (sinais.length === 0) {
        return (
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/10 mb-6 text-center animate-pulse">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-12 w-12 border-4 border-[#00D837] border-t-transparent rounded-full animate-spin shadow-[0_0_15px_#00D837]"></div>
                    <p className="text-white font-black text-xs uppercase tracking-[0.3em]">
                        Rastreando Padrões...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 mb-8 animate-fade-in shadow-2xl">
            <div className="grid grid-cols-1 gap-5">
                {sinais.map((sinal) => (
                    <div
                        key={sinal.id}
                        className={`relative overflow-hidden rounded-[32px] border p-6 transition-all duration-500 hover:scale-[1.02] shadow-2xl backdrop-blur-lg ${sinal.tipo === 'elite'
                            ? 'bg-amber-950/30 border-amber-500/50 shadow-amber-500/20'
                            : sinal.prioridade === 'alta'
                                ? 'bg-red-950/20 border-red-500/50 shadow-red-500/10'
                                : 'bg-blue-950/20 border-blue-500/50 shadow-blue-500/10'
                            }`}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <span className={`text-[10px] font-black uppercase px-4 py-1.5 rounded-full shadow-lg border border-white/10 ${sinal.tipo === 'elite' ? 'bg-amber-600 text-white' :
                                sinal.prioridade === 'alta' ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'
                                }`}>
                                {sinal.categoria}
                            </span>
                            {sinal.tipo === 'elite' && (
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-black text-amber-500 animate-pulse">ALTA PRECISÃO</span>
                                    <div className="h-1.5 w-8 bg-amber-500 rounded-full"></div>
                                </div>
                            )}
                        </div>

                        <p className="text-sm font-black text-white leading-relaxed mb-4 tracking-tight">
                            {sinal.mensagem}
                        </p>

                        <div className={`p-5 rounded-2xl border shadow-inner group ${sinal.tipo === 'elite' ? 'bg-amber-500/10 border-amber-500/20' : 'bg-black/40 border-white/5'
                            }`}>
                            <div className="text-[10px] font-black text-white uppercase mb-2 tracking-[0.1em]">Recomendação de Operação</div>
                            <div className="text-base font-black text-white flex items-center gap-3 group-hover:translate-x-1 transition-transform">
                                <span className="text-xl">{sinal.tipo === 'elite' ? '🌟' : '🎯'}</span> {sinal.sugestao}
                            </div>
                        </div>

                        {/* Background Decorative Element */}
                        <div className="absolute -bottom-6 -right-6 opacity-5 scale-[2] pointer-events-none transform rotate-12">
                            <span className="text-8xl font-black text-white">{sinal.categoria[0]}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PainelDeSinais;
