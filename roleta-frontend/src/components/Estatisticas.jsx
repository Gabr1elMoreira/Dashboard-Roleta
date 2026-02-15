import React, { useMemo } from "react";
import VisaoGeral from "./stats/views/VisaoGeral";
import VisaoDuzia from "./stats/views/VisaoDuzia";
import VisaoColuna from "./stats/views/VisaoColuna";
import VisaoZona from "./stats/views/VisaoZona";
import VisaoCavalo from "./stats/views/VisaoCavalo";
import VisaoCamuflado from "./stats/views/VisaoCamuflado";

function Estatisticas({ estatisticas, resultados, filtroEstrategia }) {
  if (!estatisticas && (!resultados || resultados.length === 0)) {
    return (
      <div className="text-center text-white/50 py-10 italic">
        Aguardando mais rodadas para processar dados...
      </div>
    );
  }

  const ultimos100 = useMemo(() => resultados.slice(0, 100), [resultados]);
  const totalGeral = ultimos100.length;

  // 🎯 DADOS CALCULADOS
  const stats = useMemo(() => {
    const countCor = (cor) => ultimos100.filter(r => r.cor === cor).length;
    const countZona = (nome) => ultimos100.filter(r => r.zona?.nome === nome).length;

    const zonas = [
      { nome: "Zero", freq: countZona("Zero"), color: "bg-[#00D837]" },
      { nome: "Voisins", freq: countZona("Voisins"), color: "bg-yellow-500" },
      { nome: "Orphelins", freq: countZona("Orphelins"), color: "bg-blue-500" },
      { nome: "Tier", freq: countZona("Tier"), color: "bg-red-500" },
    ];

    const cavalos = {
      "1 4 7": ultimos100.filter(r => [1, 4, 7].includes(r.numero % 10)).length,
      "2 5 8": ultimos100.filter(r => [2, 5, 8].includes(r.numero % 10)).length,
      "0 3 6 9": ultimos100.filter(r => [0, 3, 6, 9].includes(r.numero % 10)).length,
    };

    const camuflados = {
      1: ultimos100.filter(r => [1, 10, 19, 28].includes(r.numero)).length,
      2: ultimos100.filter(r => [2, 11, 20, 29].includes(r.numero)).length,
      3: ultimos100.filter(r => [3, 12, 21, 30].includes(r.numero)).length,
      4: ultimos100.filter(r => [4, 13, 22, 31].includes(r.numero)).length,
      5: ultimos100.filter(r => [5, 14, 23, 32].includes(r.numero)).length,
      6: ultimos100.filter(r => [6, 15, 24, 33].includes(r.numero)).length,
      7: ultimos100.filter(r => [7, 16, 25, 34].includes(r.numero)).length,
      8: ultimos100.filter(r => [8, 17, 26, 35].includes(r.numero)).length,
      9: ultimos100.filter(r => [9, 18, 27, 36].includes(r.numero)).length,
    };

    const contagemNumeros = {};
    ultimos100.forEach((r) => {
      contagemNumeros[r.numero] = (contagemNumeros[r.numero] || 0) + 1;
    });

    const topCamuflado = Object.entries(camuflados).sort((a, b) => b[1] - a[1])[0];
    const topCavalo = Object.entries(cavalos).sort((a, b) => b[1] - a[1])[0];
    const topZona = [...zonas].sort((a, b) => b.freq - a.freq)[0] || { nome: "N/A", freq: 0, color: "bg-gray-500" };

    // Cores específicas para cavalos
    const getCavaloColor = (id) => {
      if (id === "1 4 7") return "#EF4444"; // Red
      if (id === "2 5 8") return "#3B82F6"; // Blue
      if (id === "0 3 6 9") return "#00D837"; // Green
      return "#6B7280";
    };

    // Cores dinâmicas para camuflados (HEX baseado no design)
    const getCamufladoColor = (id) => {
      const idx = parseInt(id);
      const cores = {
        0: "#00D837", // Verde
        1: "#FF0000", // Vermelho
        2: "#f97316", // Laranja
        3: "#facc15", // Amarelo
        4: "#00D837", // Verde
        5: "#14b8a6", // Teal
        6: "#2563eb", // Azul
        7: "#1e3a8a", // Azul Escuro
        8: "#8b5cf6", // Roxo
        9: "#ec4899"  // Rosa
      };
      return cores[idx] || "#6B7280";
    };

    const topZonaColor = topZona.color.includes('[')
      ? topZona.color.match(/\[(.*?)\]/)[1]
      : (topZona.color.includes('bg-red') ? "#EF4444" :
        topZona.color.includes('bg-yellow') ? "#EAB308" :
          topZona.color.includes('bg-blue') ? "#3B82F6" : "#00D837");

    return {
      cor: { vermelho: countCor("vermelho"), preto: countCor("preto"), verde: countCor("verde") },
      paridade: {
        par: ultimos100.filter(r => r.numero !== 0 && r.numero % 2 === 0).length,
        impar: ultimos100.filter(r => r.numero % 2 !== 0).length,
      },
      amplitude: {
        baixo: ultimos100.filter(r => r.numero >= 1 && r.numero <= 18).length,
        alto: ultimos100.filter(r => r.numero >= 19 && r.numero <= 36).length,
      },
      zonas,
      quentes: Object.entries(contagemNumeros).sort((a, b) => b[1] - a[1]).slice(0, 3),
      cavalos,
      camuflados,
      destaques: {
        camuflado: Object.entries(camuflados)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 2)
          .map(([id, freq]) => ({
            id,
            freq,
            color: getCamufladoColor(id)
          })),
        cavalo: {
          id: topCavalo ? topCavalo[0] : "1 4 7",
          freq: topCavalo ? topCavalo[1] : 0,
          color: getCavaloColor(topCavalo ? topCavalo[0] : "1 4 7")
        },
        zona: { ...topZona, color: topZonaColor }
      }
    };
  }, [ultimos100]);

  const renderContent = () => {
    const props = { stats, ultimos100, totalGeral };

    switch (filtroEstrategia) {
      case "duzia":
        return <VisaoDuzia {...props} />;
      case "coluna":
        return <VisaoColuna {...props} />;
      case "zona":
        return <VisaoZona {...props} />;
      case "cavalo":
        return <VisaoCavalo {...props} />;
      case "camuflado":
        return <VisaoCamuflado {...props} />;
      default: // Visão Geral
        return <VisaoGeral {...props} />;
    }
  };

  return <div className="pb-2">{renderContent()}</div>;
}

export default Estatisticas;