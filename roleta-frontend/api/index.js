const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// MEMÓRIA TEMPORÁRIA (No Vercel, isso reseta frequentemente!)
let resultados = [];

function analisarNumero(num) {
    if (num === 0) return { cor: 'verde', cavalo: 'nenhum', camuflado: null };
    const coresVermelhas = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    const cor = coresVermelhas.includes(num) ? 'vermelho' : 'preto';
    const mod = num % 10;
    let cavalo;
    if ([1, 4, 7].includes(mod)) cavalo = 'cavalo1';
    else if ([2, 5, 8].includes(mod)) cavalo = 'cavalo2';
    else cavalo = 'cavalo3';

    const camufladosMap = {
        1: [1, 10, 19, 28], 2: [2, 11, 20, 29], 3: [3, 12, 21, 30],
        4: [4, 13, 22, 31], 5: [5, 14, 23, 32], 6: [6, 15, 24, 33],
        7: [7, 16, 25, 34], 8: [8, 17, 26, 35], 9: [9, 18, 27, 36]
    };

    let camuflado = null;
    for (const [key, arr] of Object.entries(camufladosMap)) {
        if (arr.includes(num)) { camuflado = Number(key); break; }
    }
    return { cor, cavalo, camuflado };
}

function calcularEstatisticas(dados) {
    const stats = {
        cores: { vermelho: 0, preto: 0 },
        cavalos: { cavalo1: 0, cavalo2: 0, cavalo3: 0, outro: 0 },
        camuflados: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 }
    };
    dados.forEach(r => {
        if (stats.cores[r.cor] !== undefined) stats.cores[r.cor]++;
        if (stats.cavalos[r.cavalo] !== undefined) stats.cavalos[r.cavalo]++;
        else stats.cavalos.outro++;
        if (r.camuflado) stats.camuflados[r.camuflado]++;
    });
    return stats;
}

// Rotas da API
app.get('/api/resultados', (req, res) => {
    res.json(resultados.slice(-200));
});

app.get('/api/estatisticas', (req, res) => {
    res.json(calcularEstatisticas(resultados));
});

app.post('/api/resultados', (req, res) => {
    const { numero } = req.body;
    if (numero === undefined || numero < 0 || numero > 36) {
        return res.status(400).json({ erro: 'Número inválido.' });
    }
    const info = analisarNumero(numero);
    const novoResultado = {
        id: resultados.length + 1,
        numero,
        timestamp: new Date(),
        ...info
    };
    resultados.push(novoResultado);
    res.json(novoResultado);
});

module.exports = app;
