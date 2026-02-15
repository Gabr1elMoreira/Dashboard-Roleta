import React, { useState, useRef, useEffect } from "react";
import FilterOption from "./common/FilterOption";

function BarraSuperior({ numero, setNumero, enviarNumero, filtroEstrategia, setFiltroEstrategia }) {
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
        buttonRef.current && !buttonRef.current.contains(event.target)) {
        setMostrarFiltros(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative z-[999] bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-3xl shadow-2xl border border-white/20 mb-8 transition-all duration-500">
      <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">

        {/* Input e botão */}
        <div className="flex flex-col sm:flex-row items-center gap-5 w-full lg:w-auto">
          <label className="text-xs font-black text-white uppercase tracking-[0.2em]">
            Entrada de Dados
          </label>
          <div className="flex items-center gap-3 w-full sm:w-auto bg-black/40 p-2 rounded-2xl border border-white/10 shadow-inner group focus-within:border-blue-500/50 transition-all">
            <input
              type="number"
              placeholder="0-36"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && enviarNumero()}
              min="0"
              max="36"
              className="bg-transparent border-none focus:ring-0 p-2 w-24 text-center text-2xl font-black text-white placeholder-white/20"
            />
            <button
              onClick={enviarNumero}
              className="bg-[#00D837] hover:bg-[#00c031] text-black px-8 py-3 rounded-xl font-black shadow-lg shadow-[#00D837]/20 transition-all duration-300 transform active:scale-95 whitespace-nowrap uppercase tracking-tighter"
            >
              ENVIAR
            </button>
          </div>
        </div>

        {/* Seletor de Filtros */}
        <div className="flex flex-col sm:flex-row items-center gap-5 w-full lg:w-auto">
          <label className="text-xs font-black text-white uppercase tracking-[0.2em]">
            Filtro de Análise
          </label>
          <div className="relative w-full sm:w-auto" ref={dropdownRef}>
            <button
              ref={buttonRef}
              onClick={() => setMostrarFiltros(!mostrarFiltros)}
              className="w-full sm:w-72 bg-black text-white px-5 py-4 rounded-2xl font-black border border-white/10 flex items-center justify-between transition-all hover:bg-black/80 shadow-lg group"
            >
              <span className="flex items-center gap-3 uppercase text-[11px] tracking-widest text-white">
                {filtroEstrategia === "cores" && "🎨 Visão Geral"}
                {filtroEstrategia === "duzia" && "📈 Dúzias"}
                {filtroEstrategia === "coluna" && "📋 Colunas"}
                {filtroEstrategia === "zona" && "🗺️ Zonas"}
                {filtroEstrategia === "cavalo" && "🐎 Cavalos"}
                {filtroEstrategia === "camuflado" && "🎭 Camuflados"}
              </span>
              <span className={`transition-transform duration-300 text-white ${mostrarFiltros ? 'rotate-180' : ''}`}>▼</span>
            </button>

            {mostrarFiltros && (
              <div className="absolute top-[110%] left-0 bg-black border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[1000] w-full sm:w-80 overflow-hidden animate-fade-in ring-1 ring-white/10">
                <div className="p-3 space-y-1">
                  <div className="text-[10px] font-black text-white uppercase tracking-[0.3em] px-4 py-3">Básicos</div>
                  <FilterOption label="Visão Geral" icon="🎨" active={filtroEstrategia === "cores"} onClick={() => { setFiltroEstrategia("cores"); setMostrarFiltros(false); }} />
                  <FilterOption label="Dúzias" icon="📈" active={filtroEstrategia === "duzia"} onClick={() => { setFiltroEstrategia("duzia"); setMostrarFiltros(false); }} />
                  <FilterOption label="Colunas" icon="📋" active={filtroEstrategia === "coluna"} onClick={() => { setFiltroEstrategia("coluna"); setMostrarFiltros(false); }} />

                  <div className="h-px bg-white/5 my-3 mx-4"></div>

                  <div className="text-[10px] font-black text-white uppercase tracking-[0.3em] px-4 py-3">Especialistas</div>
                  <FilterOption label="Zonas da Roleta" icon="🗺️" active={filtroEstrategia === "zona"} onClick={() => { setFiltroEstrategia("zona"); setMostrarFiltros(false); }} />
                  <FilterOption label="Cavalos" icon="🐎" active={filtroEstrategia === "cavalo"} onClick={() => { setFiltroEstrategia("cavalo"); setMostrarFiltros(false); }} />
                  <FilterOption label="Camuflados" icon="🎭" active={filtroEstrategia === "camuflado"} onClick={() => { setFiltroEstrategia("camuflado"); setMostrarFiltros(false); }} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BarraSuperior;
