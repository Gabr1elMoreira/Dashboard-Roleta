import React from "react";
import SectionHeader from "../SectionHeader";
import HighlightCard from "../HighlightCard";
import ColorBar from "../ColorBar";

const VisaoGeral = ({ stats, ultimos100, totalGeral }) => {
    const totalPares = stats.paridade.par + stats.paridade.impar || 1;
    const totalAltos = stats.amplitude.baixo + stats.amplitude.alto || 1;

    return (
        <div className="space-y-4 animate-fade-in">
            <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b-2 border-white/10 pb-4 mb-2 relative">
                <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">
                    Visão Geral
                </h2>

                {/* Badge Centralizado */}
                <div className="lg:absolute lg:left-1/2 lg:-translate-x-1/2 flex justify-center">
                    <span className="text-[11px] font-black bg-blue-600/20 text-blue-400 px-6 py-2.5 rounded-xl border border-blue-500/30 uppercase tracking-[0.2em] shadow-lg">
                        RESUMO AO VIVO
                    </span>
                </div>

                <div className="flex items-center gap-4 bg-black/40 px-6 py-3 rounded-[24px] border border-white/10 shadow-2xl">
                    <div className="relative">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#00D837] animate-pulse"></div>
                        <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-[#00D837] blur-sm animate-pulse"></div>
                    </div>
                    <span className="text-xs font-black text-white uppercase tracking-[0.2em]">
                        BASEADO NOS <span className="text-[#00D837]">ÚLTIMOS 100 GIROS</span>
                    </span>
                </div>
            </header>

            {/* 🎲 Painel de Controle: 6 Blocos em Perfeito Equilíbrio */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">

                {/* 1. Números Quentes (Índice 0) */}
                <div className="bg-white/5 p-4 rounded-[24px] border border-white/20 shadow-2xl flex flex-col justify-between group hover:bg-white/10 transition-all min-h-[130px]">
                    <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-3">
                        <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Números Quentes</h3>
                        <div className="flex items-center gap-1">
                            <span className="text-base drop-shadow-[0_0_8px_rgba(255,165,0,0.5)]">🔥</span>
                        </div>
                    </div>
                    <div className="flex justify-between gap-2 px-1 py-1 flex-grow items-center">
                        {stats.quentes.map(([num, freq], i) => (
                            <div key={i} className="flex-1 bg-black/40 rounded-[20px] border border-white/10 py-2 flex flex-col items-center justify-center shadow-2xl transition-transform overflow-hidden relative scale-105 border-b-2 border-b-[#00D837]/30">
                                <span className="text-3xl font-black text-white leading-none mb-3 tracking-tighter drop-shadow-md z-10">{num}</span>
                                <span className="text-[10px] font-black text-[#00D837] uppercase bg-[#00D837]/20 px-3 py-1 rounded-full border border-[#00D837]/50 shadow-[0_0_15px_rgba(0,216,55,0.4)] z-10 animate-pulse">
                                    {freq}x
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-60"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2. Zona Quente (Subiu para Índice 1) */}
                <HighlightCard title="Zona Quente" icon="🎯" name={stats.destaques.zona.nome} freq={stats.destaques.zona.freq} total={totalGeral} color={stats.destaques.zona.color} />

                {/* 3. Cavalo Quente (Subiu para Índice 2) */}
                <HighlightCard title="Cavalo Quente" icon="🐎" name={stats.destaques.cavalo.id} freq={stats.destaques.cavalo.freq} total={totalGeral} color={stats.destaques.cavalo.color} />

                {/* 4. Par vs Ímpar (Desceu para Índice 3) */}
                <div className="bg-white/5 p-4 rounded-[24px] border border-white/20 shadow-2xl flex flex-col justify-between group hover:bg-white/10 transition-all border-t-2 border-t-blue-500/50 min-h-[130px]">
                    <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-3">
                        <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Par vs Ímpar</h3>
                        <span className="text-lg drop-shadow-md opacity-70">⚖️</span>
                    </div>
                    <div className="flex justify-around items-center py-1 flex-grow">
                        {(() => {
                            const p = (stats.paridade.par / totalPares) * 100;
                            const i = (stats.paridade.impar / totalPares) * 100;
                            const pColor = p > i ? "text-[#00D837]" : p < i ? "text-red-500" : "text-white";
                            const iColor = i > p ? "text-[#00D837]" : i < p ? "text-red-500" : "text-white";
                            return (
                                <>
                                    <div className="text-center">
                                        <div className={`text-3xl font-black leading-none tracking-tighter drop-shadow-md ${pColor}`}>{p.toFixed(0)}%</div>
                                        <div className="text-[10px] font-black text-white uppercase mt-2 tracking-widest">PAR</div>
                                    </div>
                                    <div className="h-8 w-px bg-white/10"></div>
                                    <div className="text-center">
                                        <div className={`text-3xl font-black leading-none tracking-tighter drop-shadow-md ${iColor}`}>{i.toFixed(0)}%</div>
                                        <div className="text-[10px] font-black text-white uppercase mt-2 tracking-widest">ÍMPAR</div>
                                    </div>
                                </>
                            );
                        })()}
                    </div>
                </div>

                {/* 5. Alto vs Baixo (Desceu para Índice 4) */}
                <div className="bg-white/5 p-4 rounded-[24px] border border-white/20 shadow-2xl flex flex-col justify-between group hover:bg-white/10 transition-all border-t-2 border-t-purple-500/50 min-h-[130px]">
                    <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-3">
                        <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Alto vs Baixo</h3>
                        <span className="text-lg drop-shadow-md opacity-70">↕️</span>
                    </div>
                    <div className="flex justify-around items-center py-1 flex-grow">
                        {(() => {
                            const a = (stats.amplitude.alto / totalAltos) * 100;
                            const b = (stats.amplitude.baixo / totalAltos) * 100;
                            const aColor = a > b ? "text-[#00D837]" : a < b ? "text-red-500" : "text-white";
                            const bColor = b > a ? "text-[#00D837]" : b < a ? "text-red-500" : "text-white";
                            return (
                                <>
                                    <div className="text-center">
                                        <div className={`text-3xl font-black leading-none tracking-tighter drop-shadow-md ${aColor}`}>{a.toFixed(0)}%</div>
                                        <div className="text-[10px] font-black text-white uppercase mt-2 tracking-widest">ALTO</div>
                                    </div>
                                    <div className="h-8 w-px bg-white/10"></div>
                                    <div className="text-center">
                                        <div className={`text-3xl font-black leading-none tracking-tighter drop-shadow-md ${bColor}`}>{b.toFixed(0)}%</div>
                                        <div className="text-[10px] font-black text-white uppercase mt-2 tracking-widest">BAIXO</div>
                                    </div>
                                </>
                            );
                        })()}
                    </div>
                </div>

                {/* 6. Camuflado Quente (Índice 5) */}
                <div className="bg-white/5 p-4 rounded-[24px] border border-white/20 shadow-2xl flex flex-col justify-between group hover:bg-white/10 transition-all border-t-2 border-t-pink-500/50 min-h-[130px]">
                    <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-3">
                        <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Camuflado Quente</h3>
                        <span className="text-lg drop-shadow-md opacity-70">🎭</span>
                    </div>
                    <div className="flex justify-around items-center py-1 flex-grow">
                        {stats.destaques.camuflado.map((item, i) => (
                            <React.Fragment key={i}>
                                <div className="text-center">
                                    <div className="text-3xl font-black leading-none tracking-tighter drop-shadow-md mb-1" style={{ color: item.color }}>
                                        {item.id}
                                    </div>
                                    <div className="bg-white/5 px-3 py-1 rounded-xl border border-white/10 shadow-inner">
                                        <span className="text-xs font-black text-white uppercase tracking-[0.1em]">
                                            {item.freq}X
                                        </span>
                                    </div>
                                </div>
                                {i === 0 && stats.destaques.camuflado.length > 1 && (
                                    <div className="h-8 w-px bg-white/10 mx-2"></div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

            </section>

            {/* Fluxo Cromático */}
            <section className="bg-white/5 p-4 rounded-[32px] border border-white/20 shadow-2xl relative overflow-hidden">
                <div className="space-y-3">
                    <div className="flex justify-between items-center mb-1">
                        <h3 className="text-xs font-black text-white uppercase tracking-[0.3em]">Fluxo de Cores</h3>
                    </div>

                    <div className="space-y-3">
                        <div className="flex h-10 w-full rounded-xl overflow-hidden border-2 border-black/50 shadow-[0_0_20px_rgba(0,0,0,0.4)]">
                            <ColorBar resultados={ultimos100} cor="vermelho" bg="bg-red-600" />
                            <ColorBar resultados={ultimos100} cor="preto" bg="bg-gray-950" />
                            <ColorBar resultados={ultimos100} cor="verde" bg="bg-[#00D837]" />
                        </div>

                        <div className="flex w-full px-1 justify-between text-center font-black uppercase">
                            <div className="flex flex-col items-center" style={{ width: `${(stats.cor.vermelho / totalGeral) * 100}%` }}>
                                <span className="text-2xl text-red-500 tracking-tighter drop-shadow-sm">{((stats.cor.vermelho / totalGeral) * 100).toFixed(0)}%</span>
                                <span className="text-[10px] text-white/50 tracking-widest mt-0.5">VERMELHO</span>
                            </div>
                            <div className="flex flex-col items-center" style={{ width: `${(stats.cor.preto / totalGeral) * 100}%` }}>
                                <span className="text-2xl text-white tracking-tighter drop-shadow-sm">{((stats.cor.preto / totalGeral) * 100).toFixed(0)}%</span>
                                <span className="text-[10px] text-white/50 tracking-widest mt-0.5">PRETO</span>
                            </div>
                            <div className="flex flex-col items-center" style={{ width: `${(stats.cor.verde / totalGeral) * 100}%` }}>
                                <span className="text-2xl text-[#00D837] tracking-tighter drop-shadow-sm">{((stats.cor.verde / totalGeral) * 100).toFixed(0)}%</span>
                                <span className="text-[10px] text-white/50 tracking-widest mt-0.5">ZERO</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default VisaoGeral;
