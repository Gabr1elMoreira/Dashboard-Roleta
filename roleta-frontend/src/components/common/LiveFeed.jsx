import React from "react";
import { determinarDuzia, determinarColuna } from "../../utils/estrategias";
import { obterCorDeFundoCard } from "../../utils/ui/colors";

const LiveFeed = ({ resultados, filtroEstrategia, resetarHistorico }) => {
    const [hoveredNumber, setHoveredNumber] = React.useState(null);

    return (
        <div className="h-full flex flex-col">
            <div className="bg-white/10 backdrop-blur-md p-3 sm:p-5 rounded-xl sm:rounded-2xl shadow-xl mb-4 sm:mb-6 border border-white/20 flex items-center justify-center gap-4 shrink-0">
                <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-[0.1em]">
                    Histórico 200 Números
                </h2>
                <button
                    onClick={resetarHistorico}
                    title="Reset Total"
                    className="bg-red-500/20 hover:bg-red-500 text-red-500 hover:text-white p-2 rounded-lg transition-all border border-red-500/30 flex items-center justify-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>

            <div className="bg-black/40 backdrop-blur-md rounded-2xl sm:rounded-[32px] shadow-2xl p-2 sm:p-3 flex-1 min-h-[300px] sm:min-h-0 overflow-y-auto border border-white/10 border-t-2 border-t-blue-500/50 max-h-[600px] scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-1 sm:gap-1.5">
                    {resultados
                        .slice(0, 200)
                        .map((r, i) => {
                            const { bg, textColor } = obterCorDeFundoCard(r, filtroEstrategia);
                            const isHighlighted = hoveredNumber !== null && r.numero === hoveredNumber;

                            return (
                                <div
                                    key={i}
                                    onMouseEnter={() => setHoveredNumber(r.numero)}
                                    onMouseLeave={() => setHoveredNumber(null)}
                                    className={`relative aspect-square rounded-xl shadow-md border flex items-center justify-center transition-all duration-200 p-1 sm:p-1.5
                                        ${isHighlighted
                                            ? "scale-115 z-10 border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.6)] ring-2 ring-yellow-400/50"
                                            : "border-white/5 opacity-100"
                                        }
                                        ${hoveredNumber !== null && r.numero !== hoveredNumber ? "opacity-50" : ""}
                                    `}
                                    style={{
                                        backgroundColor: bg,
                                    }}
                                >
                                    <div
                                        className={`flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-[14px] font-black shadow-inner transition-colors border-[3px]
                                            ${isHighlighted ? "bg-yellow-400 text-black border-yellow-600" : "bg-white/95 text-black"}
                                        `}
                                        style={{ borderColor: !isHighlighted ? bg : undefined }}
                                    >
                                        {r.numero}
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default LiveFeed;
