import React, { useState } from "react";
import BarraSuperior from "./components/BarraSuperior";
import Estatisticas from "./components/Estatisticas";
import PainelDeSinais from "./components/PainelDeSinais";
import Header from "./components/common/Header";
import LiveFeed from "./components/common/LiveFeed";
import { useResultados } from "./hooks/useResultados";
import { API_URL } from "./constants";

function App() {
  const [numero, setNumero] = useState("");
  const [filtroEstrategia, setFiltroEstrategia] = useState("cores");
  const [showSinais, setShowSinais] = useState(false);

  const {
    resultados,
    estatisticas,
    erro,
    setErro,
    sucesso,
    setSucesso,
    adicionarResultado,
    excluirUltimo,
    resetarHistorico
  } = useResultados();

  // 🔌 Conexão com o Socket removida (Não necessário para entradas manuais)
  // useSocket(adicionarResultado);

  // ➕ Enviar número
  const enviarNumero = () => {
    if (numero === "") {
      setErro("DIGITE UM NÚMERO ENTRE 0 E 36.");
      setSucesso("");
      return;
    }

    const num = parseInt(numero);
    if (isNaN(num) || num < 0 || num > 36) {
      setErro("NÚMERO INVÁLIDO.");
      return;
    }

    setNumero("");
    setErro("");
    setSucesso(`NÚMERO ${num} ADICIONADO!`);

    // Adiciona localmente via hook
    adicionarResultado({ numero: num });

    setTimeout(() => setSucesso(""), 2000);
  };

  return (
    <div className="App container mx-auto p-3 sm:p-4 font-sans min-h-screen">
      <Header
        showSinais={showSinais}
        setShowSinais={setShowSinais}
        totalResultados={resultados.length}
      />

      <BarraSuperior
        numero={numero}
        setNumero={setNumero}
        enviarNumero={enviarNumero}
        excluirUltimo={excluirUltimo}
        resetarHistorico={resetarHistorico}
        filtroEstrategia={filtroEstrategia}
        setFiltroEstrategia={setFiltroEstrategia}
      />

      {erro && <p className="text-red-600 text-center text-sm sm:text-base">{erro}</p>}
      {sucesso && <p className="text-green-600 text-center text-sm sm:text-base">{sucesso}</p>}

      <div className="grid grid-cols-1 xl:grid-cols-[72.5%_27.5%] gap-4 sm:gap-6 mt-4 sm:mt-6 relative">
        {/* 1. Conteúdo Principal */}
        <div className="xl:order-1">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 p-3 sm:p-6 h-fit relative">
            <Estatisticas
              estatisticas={estatisticas}
              resultados={resultados}
              filtroEstrategia={filtroEstrategia}
            />

            {/* Overlay de Alertas (Sobreposição) */}
            {showSinais && (
              <div className="absolute inset-0 z-50 bg-black rounded-2xl sm:rounded-3xl p-4 sm:p-6 overflow-y-auto animate-fade-in border-2 border-blue-500/20 shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]">
                <div className="flex justify-between items-center mb-6 sticky top-0 bg-black p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/10 z-10 shadow-xl">
                  <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-3 uppercase tracking-[0.2em]">
                    <span className="flex h-3 w-3 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_red]"></span>
                    Alertas AO VIVO
                  </h2>
                  <button
                    onClick={() => setShowSinais(false)}
                    className="bg-red-500/20 hover:bg-red-500 text-red-500 hover:text-white p-2 rounded-xl transition-all border border-red-500/30 text-xs sm:text-sm"
                  >
                    ✖ FECHAR
                  </button>
                </div>
                <PainelDeSinais resultados={resultados} />
              </div>
            )}
          </div>
        </div>

        {/* 2. Lateral Direita (Feed) */}
        <div className="xl:order-2 h-full">
          <LiveFeed
            resultados={resultados}
            filtroEstrategia={filtroEstrategia}
            resetarHistorico={resetarHistorico}
          />
        </div>
      </div>
    </div>
  );
}

export default App;