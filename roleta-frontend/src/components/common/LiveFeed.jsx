import React from "react";
import { determinarDuzia, determinarColuna } from "../../utils/estrategias";
import { obterCorDeFundoCard } from "../../utils/ui/colors";

const LiveFeed = ({ resultados, filtroEstrategia }) => {
    const [hoveredNumber, setHoveredNumber] = React.useState(null);

    return (
        <div className="h-full flex flex-col">
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl shadow-xl mb-6 border border-white/20 text-center shrink-0">
                <h2 className="text-xl font-black text-white uppercase tracking-[0.1em]">
                    Histórico 100 Números
                </h2>
            </div>

            <div className="bg-black/40 backdrop-blur-md rounded-[32px] shadow-2xl p-3 flex-1 min-h-0 overflow-y-auto border border-white/10 border-t-2 border-t-blue-500/50">
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
                    {resultados
                        .slice(0, 100)
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
