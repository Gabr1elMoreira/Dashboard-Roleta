import React from "react";
import { obterCorDeFundo } from "../utils/cores";

function CardResultado({ r, filtroEstrategia }) {
  return (
    <div
      className={`relative rounded-xl shadow-lg overflow-hidden p-4 text-center text-white font-bold ${obterCorDeFundo(
        r,
        filtroEstrategia
      )} transform transition duration-300 hover:scale-105`}
    >
      {/* Número dentro de círculo */}
      <div className="flex justify-center items-center mx-auto mb-2 w-16 h-16 rounded-full bg-white/20 text-4xl font-extrabold shadow-inner">
        {r.numero}
      </div>

      {/* Cavalo / Camuflado / Hora */}
      {filtroEstrategia === "cavalo" && (
        <div className="text-lg uppercase">
          <div className="font-bold">CAVALO</div>
          <div className="text-sm">{r.cavalo.nome}</div>
        </div>
      )}
      {filtroEstrategia === "camuflado" && (
        <div className="text-lg uppercase">{r.camuflado}</div>
      )}
      {filtroEstrategia === "todos" && (
        <div className="text-xs mt-2">{new Date(r.timestamp).toLocaleString()}</div>
      )}
    </div>
  );
}

export default CardResultado;
