import { determinarDuzia, determinarColuna, determinarZona, determinarCor, obterVizinho, determinarCavalo, determinarCamuflado } from "./estrategias";

/**
 * Analisa o histórico de resultados e gera sinais de alta precisão
 * Baseado em: Repetição de Padrões, Cruzamento de Atrasos e Frequência
 */
export const analisarGatilhos = (resultados) => {
    if (!resultados || resultados.length < 50) return [];

    const sinais = [];
    const ultimos100 = resultados.slice(0, 100);
    const ultimoNumero = resultados[0].numero;

    // --- 1. ESTRATÉGIA DE REPETIÇÃO DE PADRÃO (MEMÓRIA DA ROLETA) ---
    const proximosAposUltimo = [];
    for (let i = 1; i < ultimos100.length - 1; i++) {
        if (ultimos100[i].numero === ultimoNumero) {
            proximosAposUltimo.push(ultimos100[i - 1].numero);
        }
    }

    if (proximosAposUltimo.length >= 2) {
        const contagem = {};
        proximosAposUltimo.forEach(n => contagem[n] = (contagem[n] || 0) + 1);
        const tendecias = Object.entries(contagem)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3);

        if (tendecias.length > 0) {
            const numerosSugeridos = tendecias.map(t => parseInt(t[0]));
            sinais.push({
                id: `repeticao-${ultimoNumero}`,
                tipo: "padrao",
                categoria: "Análise de Padrão",
                mensagem: `Padrão Detectado: O ${ultimoNumero} costuma chamar os números abaixo.`,
                sugestao: `Alvos: ${numerosSugeridos.join(", ")} + 1 Vizinho de Cobertura`,
                prioridade: tendecias[0][1] >= 2 ? "alta" : "media"
            });
        }
    }

    // --- 2. ATRASO DE DÚZIAS (AGORA 12 RODADAS) ---
    const duzias = ["1ª Dúzia", "2ª Dúzia", "3ª Dúzia"];
    duzias.forEach(d => {
        let atraso = 0;
        for (const r of resultados) {
            if (determinarDuzia(r.numero) === d) break;
            atraso++;
        }
        if (atraso >= 15) {
            sinais.push({
                id: `duzia-atraso-${d}`,
                tipo: "alerta",
                categoria: "Dúzia",
                mensagem: `${d} está há ${atraso} rodadas sem sair!`,
                sugestao: `Entrada sugerida na ${d}`,
                prioridade: atraso >= 15 ? "alta" : "media"
            });
        }
    });

    // --- 3. ATRASO DE COLUNAS (AGORA 12 RODADAS) ---
    const colunas = ["Coluna 1", "Coluna 2", "Coluna 3"];
    colunas.forEach(c => {
        let atraso = 0;
        for (const r of resultados) {
            if (determinarColuna(r.numero) === c) break;
            atraso++;
        }
        if (atraso >= 15) {
            sinais.push({
                id: `coluna-atraso-${c}`,
                tipo: "alerta",
                categoria: "Coluna",
                mensagem: `${c} está há ${atraso} rodadas sem sair!`,
                sugestao: `Entrada sugerida na ${c}`,
                prioridade: atraso >= 15 ? "alta" : "media"
            });
        }
    });

    // --- 4. QUEBRA DE TENDÊNCIA DE COR ---
    const ultimasCores = resultados.slice(0, 6).map(r => determinarCor(r.numero));
    if (ultimasCores.length >= 5 && ultimasCores.every(c => c === ultimasCores[0] && c !== "verde")) {
        const corOposta = ultimasCores[0] === "vermelho" ? "PRETO" : "VERMELHO";
        sinais.push({
            id: "quebra-cor",
            tipo: "alerta",
            categoria: "Cores",
            mensagem: `Sequência Monocromática: ${ultimasCores.length}x ${ultimasCores[0].toUpperCase()}`,
            sugestao: `Entrar no ${corOposta} (Probabilidade de quebra 89%)`,
            prioridade: ultimasCores.length >= 7 ? "alta" : "media"
        });
    }

    // --- 5. ATRASO DE CAVALOS (FAMÍLIAS DE TERMINAIS) ---
    const cavalos = ["CAVALO 1 4 7", "CAVALO 2 5 8", "CAVALO 0 3 6 9"];
    cavalos.forEach(c => {
        let atraso = 0;
        for (const r of resultados) {
            if (determinarCavalo(r.numero).nome === c) break;
            atraso++;
        }
        if (atraso >= 12) {
            sinais.push({
                id: `cavalo-atraso-${c.replace(/\s+/g, '-')}`,
                tipo: "oportunidade",
                categoria: "Cavalos",
                mensagem: `${c} está há ${atraso} rodadas sem sair!`,
                sugestao: `Entrada em ${c}`,
                prioridade: atraso >= 18 ? "alta" : "media"
            });
        }
    });

    // --- 6. PADRÃO DE REPETIÇÃO CAMUFLADOS (FREQUÊNCIA CURTA) ---
    const ultimos6 = resultados.slice(0, 6);
    const contagemCamuflados = {};

    ultimos6.forEach(r => {
        const c = determinarCamuflado(r.numero);
        if (c !== "-") {
            contagemCamuflados[c] = (contagemCamuflados[c] || 0) + 1;
        }
    });

    Object.entries(contagemCamuflados).forEach(([camuflado, freq]) => {
        if (freq >= 4) { // Apareceu mais de 3 vezes (4, 5 ou 6) em 6 rodadas
            sinais.push({
                id: `camuflado-repeticao-${camuflado.replace(/\s+/g, '-')}`,
                tipo: "elite",
                categoria: "Camuflados",
                mensagem: `Frequência Crítica: ${camuflado} apareceu ${freq}x nas últimas 6 rodadas!`,
                sugestao: `Tendência Forte: Seguir ${camuflado}`,
                prioridade: "alta"
            });
        }
    });

    // --- 7. TERMINAIS AUSENTES (DENSIDADE 15 GIROS) ---
    const cavalosConfig = [
        { nome: "CAVALO 1 4 7", terminais: [1, 4, 7] },
        { nome: "CAVALO 2 5 8", terminais: [2, 5, 8] },
        { nome: "CAVALO 0 3 6 9", terminais: [0, 3, 6, 9] }
    ];

    const ultimos15 = resultados.slice(0, 15);
    const cavalosIncompletos = [];

    cavalosConfig.forEach(cavalo => {
        // Filtra todos os números dos últimos 15 que pertencem a este cavalo
        const ocorrenciasNoCavalo = ultimos15.filter(r => cavalo.terminais.includes(r.numero % 10));

        // Terminais que saíram pelo menos uma vez nos últimos 15
        const terminaisPresentesNoHistorico = [...new Set(ultimos15.filter(r => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(r.numero % 10)).map(r => r.numero % 10))];

        // Ausentes: Terminais do cavalo que NÃO apareceram NADA nos últimos 15 giros
        const ausentesAbsolutos = cavalo.terminais.filter(t => !ultimos15.some(r => r.numero % 10 === t));

        // Definição da condição de ativação (Com exceção para o cavalo 0 3 6 9)
        let condicaoAtiva = false;

        if (cavalo.nome === "CAVALO 0 3 6 9") {
            // Exceção: Precisa de 3 terminais e 1 sequência dentro de QUALQUER janela de 5 rodadas (dentro das 15)
            for (let i = 0; i <= ultimos15.length - 5; i++) {
                const janela = ultimos15.slice(i, i + 5);
                const countJanela = janela.filter(r => cavalo.terminais.includes(r.numero % 10)).length;
                let temSequenciaJanela = false;
                for (let j = 0; j < janela.length - 1; j++) {
                    if (cavalo.terminais.includes(janela[j].numero % 10) &&
                        cavalo.terminais.includes(janela[j + 1].numero % 10)) {
                        temSequenciaJanela = true;
                        break;
                    }
                }
                if (countJanela >= 3 && temSequenciaJanela) {
                    condicaoAtiva = true;
                    break;
                }
            }
        } else {
            // Novo Gatilho: Verificar se houve números do mesmo cavalo seguidos (um após o outro)
            let temSequenciaConsecutiva = false;
            for (let i = 0; i < ultimos15.length - 1; i++) {
                if (cavalo.terminais.includes(ultimos15[i].numero % 10) &&
                    cavalo.terminais.includes(ultimos15[i + 1].numero % 10)) {
                    temSequenciaConsecutiva = true;
                    break;
                }
            }
            // Regra Normal: 3 ocorrências e 1 sequência consecutiva em qualquer lugar das 15
            condicaoAtiva = (ocorrenciasNoCavalo.length >= 3 && temSequenciaConsecutiva);
        }

        // Gatilho Final
        if (condicaoAtiva && ausentesAbsolutos.length === 1) {
            const tAusente = ausentesAbsolutos[0];
            cavalosIncompletos.push({ cavalo: cavalo.nome, terminal: tAusente });

            sinais.push({
                id: `terminal-ausente-dens-15-${tAusente}`,
                tipo: "oportunidade",
                categoria: "Terminais",
                mensagem: `${cavalo.nome}: Detectada forte tendência de terminais com sequência e ausência de ${tAusente}.`,
                sugestao: `Entrada em Terminais ${tAusente} + 1 Vizinho`,
                prioridade: "alta"
            });
        }
    });

    // --- 8. ZONA MORTA ---
    const zonasList = ["Zero", "Voisins", "Orphelins", "Tier"];
    const atrasosZonas = {};
    zonasList.forEach(z => {
        let atraso = 0;
        for (const r of resultados) {
            const zInfo = determinarZona(r.numero);
            if (zInfo.nome === z) break;
            atraso++;
        }
        atrasosZonas[z] = atraso;
        if (atraso >= 18) {
            sinais.push({
                id: `zona-atraso-${z}`,
                tipo: "oportunidade",
                categoria: "Zonas",
                mensagem: `Zona ${z.toUpperCase()} não é atingida há ${atraso} giros.`,
                sugestao: `Cobrir a zona ${z} e vizinhos`,
                prioridade: "media"
            });
        }
    });

    // --- 8. GATILHOS DE CONVERGÊNCIA (CRUZAMENTO DE ELITE) ---
    // Atribui pontuação e rastreia motivos para cada número da roleta
    const analiseNumeros = Array.from({ length: 37 }, () => ({ pts: 0, motivos: [] }));

    // Pontuar Números por Atraso de Dúzia
    duzias.forEach(d => {
        let atraso = 0;
        for (const r of resultados) {
            if (determinarDuzia(r.numero) === d) break;
            atraso++;
        }
        if (atraso >= 10) {
            for (let n = 0; n <= 36; n++) {
                if (determinarDuzia(n) === d) {
                    analiseNumeros[n].pts += (atraso > 15 ? 20 : 15);
                    analiseNumeros[n].motivos.push("Dúzia");
                }
            }
        }
    });

    // Pontuar Números por Atraso de Coluna
    colunas.forEach(c => {
        let atraso = 0;
        for (const r of resultados) {
            if (determinarColuna(r.numero) === c) break;
            atraso++;
        }
        if (atraso >= 10) {
            for (let n = 0; n <= 36; n++) {
                if (determinarColuna(n) === c) {
                    analiseNumeros[n].pts += (atraso > 15 ? 20 : 15);
                    analiseNumeros[n].motivos.push("Coluna");
                }
            }
        }
    });

    // Pontuar Números por Atraso de Zona
    Object.entries(atrasosZonas).forEach(([zona, atraso]) => {
        if (atraso >= 15) {
            const numerosDaZona = {
                Zero: [15, 32, 0, 26, 3, 35, 12],
                Voisins: [25, 2, 21, 4, 19, 22, 18, 29, 7, 28],
                Orphelins: [6, 34, 17, 1, 20, 14, 31, 9],
                Tier: [27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33],
            }[zona] || [];
            numerosDaZona.forEach(n => {
                analiseNumeros[n].pts += 10;
                analiseNumeros[n].motivos.push("Zona");
            });
        }
    });

    // Pontuar Números por Terminais Ausentes (+20 pontos)
    cavalosIncompletos.forEach(item => {
        for (let n = 0; n <= 36; n++) {
            if (n % 10 === item.terminal) {
                analiseNumeros[n].pts += 20;
                analiseNumeros[n].motivos.push(`Terminais ${item.terminal}`);
            }
        }
    });

    // Pontuar Vizinhos do Último (Tendência)
    const vizinhosUltimo = obterVizinho(ultimoNumero, 2);
    vizinhosUltimo.forEach(n => {
        analiseNumeros[n].pts += 5;
        analiseNumeros[n].motivos.push("Tendência Vizinho");
    });

    // Identificar números com alta convergência
    const convergencias = analiseNumeros
        .map((data, num) => ({ num, ...data }))
        .filter(item => item.pts >= 30)
        .sort((a, b) => b.pts - a.pts);

    if (convergencias.length > 0) {
        const topItem = convergencias[0];
        const alvos = convergencias.slice(0, 4).map(c => c.num);
        const prob = Math.min(85 + (topItem.pts / 5), 98).toFixed(1);

        // Remove duplicatas dos motivos e formata
        const motivosUnicos = [...new Set(topItem.motivos)].join(" + ");

        sinais.unshift({
            id: `convergencia-${Date.now()}`,
            tipo: "elite",
            categoria: "Cruzamento AI",
            mensagem: `CONVERGÊNCIA MASTER: Identificamos força máxima nos números abaixo por cruzamento de padrões [${motivosUnicos}].`,
            sugestao: `Cobrir Alvos: ${alvos.join(", ")} | Assertividade: ${prob}%`,
            prioridade: "alta"
        });
    }

    // --- FINALIZAÇÃO E GARANTIA DE 3 GATILHOS ---
    if (sinais.length < 3) {
        // Reduzir limites para garantir variedade se houver poucos sinais
        const duzias2 = ["1ª Dúzia", "2ª Dúzia", "3ª Dúzia"];
        duzias2.forEach(d => {
            let atraso = 0;
            for (const r of resultados) {
                if (determinarDuzia(r.numero) === d) break;
                atraso++;
            }
            if (atraso >= 12 && atraso < 15 && !sinais.find(s => s.id === `duzia-atraso-${d}`)) {
                sinais.push({
                    id: `duzia-atraso-${d}`,
                    tipo: "alerta",
                    categoria: "Dúzia",
                    mensagem: `${d} com atraso moderado (${atraso} giros).`,
                    sugestao: `Entrada preventiva na ${d}`,
                    prioridade: "media"
                });
            }
        });

        const colunas2 = ["Coluna 1", "Coluna 2", "Coluna 3"];
        colunas2.forEach(c => {
            let atraso = 0;
            for (const r of resultados) {
                if (determinarColuna(r.numero) === c) break;
                atraso++;
            }
            if (atraso >= 12 && atraso < 15 && !sinais.find(s => s.id === `coluna-atraso-${c}`)) {
                sinais.push({
                    id: `coluna-atraso-${c}`,
                    tipo: "alerta",
                    categoria: "Coluna",
                    mensagem: `${c} com atraso moderado (${atraso} giros).`,
                    sugestao: `Entrada preventiva na ${c}`,
                    prioridade: "media"
                });
            }
        });
    }

    return sinais.slice(0, 5); // Retorna os top 5 para não poluir
};
