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

    // 📊 Função para calcular estatísticas localmente
    const calcularEstatisticasLocal = (dados) => {
        const stats = {
            cores: { vermelho: 0, preto: 0 },
            cavalos: { cavalo1: 0, cavalo2: 0, cavalo3: 0, outro: 0 },
            camuflados: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 }
        };

        dados.forEach(r => {
            if (r.cor === 'vermelho' || r.cor === 'preto') stats.cores[r.cor]++;

            const cavaloNome = r.cavalo?.nome || "";
            if (cavaloNome.includes('1 4 7')) stats.cavalos.cavalo1++;
            else if (cavaloNome.includes('2 5 8')) stats.cavalos.cavalo2++;
            else if (cavaloNome.includes('0 3 6 9')) stats.cavalos.cavalo3++;
            else stats.cavalos.outro++;

            const camufladoStr = r.camuflado || "";
            if (camufladoStr.startsWith('CAMUFLADO')) {
                const num = camufladoStr.split(' ')[1];
                if (stats.camuflados[num] !== undefined) stats.camuflados[num]++;
            }
        });

        return stats;
    };

    // 💾 Carregar dados do LocalStorage ao iniciar
    useEffect(() => {
        const salvos = localStorage.getItem("historico_roleta");
        if (salvos) {
            const lista = JSON.parse(salvos);
            setResultados(lista);
            setEstatisticas(calcularEstatisticasLocal(lista));
        } else {
            setEstatisticas(calcularEstatisticasLocal([]));
        }
    }, []);

    // 🔄 Função auxiliar para salvar
    const salvarLocal = (novaLista) => {
        localStorage.setItem("historico_roleta", JSON.stringify(novaLista));
    };

    const adicionarResultado = (novoResultado) => {
        setResultados((prev) => {
            const novaLista = [processarResultado(novoResultado), ...prev];
            setEstatisticas(calcularEstatisticasLocal(novaLista));
            salvarLocal(novaLista);
            return novaLista;
        });
    };

    const excluirUltimo = () => {
        setResultados((prev) => {
            const novaLista = prev.slice(1);
            setEstatisticas(calcularEstatisticasLocal(novaLista));
            salvarLocal(novaLista);
            return novaLista;
        });
        setSucesso("ÚLTIMO NÚMERO REMOVIDO!");
        setTimeout(() => setSucesso(""), 2000);
    };

    const resetarHistorico = () => {
        if (!window.confirm("TEM CERTEZA QUE DESEJA RESETAR TODO O HISTÓRICO?")) return;

        setResultados([]);
        setEstatisticas(calcularEstatisticasLocal([]));
        localStorage.removeItem("historico_roleta");

        setSucesso("HISTÓRICO RESETADO!");
        setTimeout(() => setSucesso(""), 2000);
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
        adicionarResultado,
        excluirUltimo,
        resetarHistorico
    };
};
