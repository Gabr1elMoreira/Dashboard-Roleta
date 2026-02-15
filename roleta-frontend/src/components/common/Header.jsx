import React from "react";

const Header = ({ showSinais, setShowSinais, totalResultados }) => {
    return (
        <div className="bg-gradient-to-r from-black via-blue-950 to-black p-4 sm:p-6 rounded-3xl shadow-2xl mb-6 border border-white/10 flex items-center justify-between">
            <div className="w-12"></div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-center text-white tracking-widest uppercase flex-1">
                🎯 DASHBOARD ROLETA <span className="text-blue-500 font-light underline decoration-[#00D837]">PRO</span>
            </h1>
            <button
                onClick={() => setShowSinais(!showSinais)}
                className={`px-5 py-2.5 rounded-xl font-black transition-all flex items-center gap-2 border shadow-lg ${showSinais
                    ? "bg-red-500 border-red-400 text-white shadow-red-900/20"
                    : "bg-[#00D837] border-[#00D837]/50 text-black shadow-[#00D837]/20"
                    }`}
            >
                {showSinais ? "✖ FECHAR ALERTAS" : "🔔 ALERTAS AO VIVO"}
                {totalResultados > 0 && !showSinais && (
                    <span className="bg-red-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                        !
                    </span>
                )}
            </button>
        </div>
    );
};

export default Header;
