import React from "react";
import CardResultado from "./CardResultado";

function Historico({ resultados, filtroEstrategia }) {
  return (
    <div className="resultados mt-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        🎰 HISTÓRICO DE RESULTADOS
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-10 xl:grid-cols-10 gap-4">
        {resultados
          .filter((r) => {
            if (filtroEstrategia === "todos") return true;
            if (filtroEstrategia === "cavalo")
              return r.cavalo.nome && r.cavalo.nome !== "-";
            if (filtroEstrategia === "camuflado")
              return r.camuflado && r.camuflado !== "-";
          })
          .map((r, i) => (
            <CardResultado key={i} r={r} filtroEstrategia={filtroEstrategia} />
          ))}
      </div>
    </div>
  );
}

export default Historico;
