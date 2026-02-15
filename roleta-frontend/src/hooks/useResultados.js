import { useState, useEffect } from "react";
import { API_URL } from "../constants";
import { determinarCor, determinarCavalo, determinarCamuflado, determinarZona } from "../utils/estrategias";

export const useResultados = () => {
    const [resultados, setResultados] = useState([]);
    const [estatisticas, setEstatisticas] = useState(null);
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");

    const processarResultado = (r) => ({
        ...r,
        cor: determinarCor(r.numero),
        cavalo: determinarCavalo(r.numero),
        camuflado: determinarCamuflado(r.numero),
        zona: determinarZona(r.numero),
    });

    useEffect(() => {
        async function fetchDados() {
            try {
                const res = await fetch(`${API_URL}/resultados`);
                const data = await res.json();
                const resultadosComEstrategia = data
                    .map(processarResultado)
                    .reverse();
                setResultados(resultadosComEstrategia);

                const res2 = await fetch(`${API_URL}/estatisticas`);
                const data2 = await res2.json();
                setEstatisticas(data2);
            } catch (err) {
                console.error(err);
                setErro("ERRO AO BUSCAR DADOS DO SERVIDOR.");
            }
        }
        fetchDados();
    }, []);

    const adicionarResultado = (novoResultado) => {
        setResultados((prev) => [processarResultado(novoResultado), ...prev]);
    };

    return {
        resultados,
        setResultados,
        estatisticas,
        setEstatisticas,
        erro,
        setErro,
        sucesso,
        setSucesso,
        adicionarResultado
    };
};
