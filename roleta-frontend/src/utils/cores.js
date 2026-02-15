export const obterCorDeFundo = (r, filtroEstrategia) => {
  if (filtroEstrategia === "cavalo") {
    switch (r.cavalo.cor) {
      case "vermelho":
        return "bg-red-600";
      case "azul":
        return "bg-blue-600";
      case "verde":
        return "bg-green-600";
      default:
        return "bg-gray-500";
    }
  } else if (filtroEstrategia === "camuflado") {
    const camufladoIndex = parseInt(r.camuflado.split(" ")[1]);
    const coresCamuflado = [
      "bg-red-600",
      "bg-orange-500",
      "bg-yellow-500",
      "bg-green-600",
      "bg-teal-500",
      "bg-blue-600",
      "bg-indigo-600",
      "bg-purple-600",
      "bg-pink-600",
    ];
    return coresCamuflado[camufladoIndex - 1] || "bg-gray-500";
  } else {
    switch (r.cor) {
      case "vermelho":
        return "bg-red-600";
      case "preto":
        return "bg-gray-800";
      case "verde":
        return "bg-green-600";
      default:
        return "bg-gray-500";
    }
  }
};
