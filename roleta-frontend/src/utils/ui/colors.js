import { determinarDuzia, determinarColuna } from "../estrategias";
import { CORES_CAMUFLADO } from "../../constants";

export const obterCorDeFundoCard = (r, filtroEstrategia) => {
    let bg = "gray";
    let textColor = "white";

    if (filtroEstrategia === "cavalo") {
        switch (r.cavalo.cor) {
            case "vermelho":
                bg = "#FF0000";
                textColor = "white";
                break;
            case "azul":
                bg = "#2563eb";
                textColor = "white";
                break;
            case "verde":
                bg = "#00D837";
                textColor = "white";
                break;
            default:
                bg = "#6b7280";
                textColor = "white";
        }
    } else if (filtroEstrategia === "camuflado") {
        const camufladoIndex = parseInt(r.camuflado.split(" ")[1]);
        bg = CORES_CAMUFLADO[camufladoIndex - 1] || "#6b7280";
        textColor = [2, 3, 5, 8].includes(camufladoIndex) ? "black" : "white";
    } else if (filtroEstrategia === "zona") {
        switch (r.zona?.nome) {
            case "Zero":
                bg = "#00D837";
                textColor = "white";
                break;
            case "Voisins":
                bg = "#facc15";
                textColor = "black";
                break;
            case "Orphelins":
                bg = "#2563eb";
                textColor = "white";
                break;
            case "Tier":
                bg = "#FF0000";
                textColor = "white";
                break;
            default:
                bg = "#0f172a";
                textColor = "white";
        }
    } else if (filtroEstrategia === "duzia") {
        const duzia = determinarDuzia(r.numero);
        const coresDuzia = {
            "1ª Dúzia": "#FF0000",
            "2ª Dúzia": "#3b82f6",
            "3ª Dúzia": "#00D837",
        };
        bg = coresDuzia[duzia] || "#0f172a";
        textColor = "white";
    } else if (filtroEstrategia === "coluna") {
        const coluna = determinarColuna(r.numero);
        const coresColuna = {
            "Coluna 1": "#FF0000",
            "Coluna 2": "#3b82f6",
            "Coluna 3": "#00D837",
        };
        bg = coresColuna[coluna] || "#0f172a";
        textColor = "white";
    } else {
        switch (r.cor) {
            case "vermelho":
                bg = "#FF0000";
                textColor = "white";
                break;
            case "preto":
                bg = "#000000";
                textColor = "white";
                break;
            case "verde":
                bg = "#00D837";
                textColor = "white";
                break;
            default:
                bg = "#0f172a";
                textColor = "white";
        }
    }

    return { bg, textColor };
};
