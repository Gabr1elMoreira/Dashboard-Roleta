const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

let resultados = [];

function analisarNumero(num) {
  if (num === 0) return { cor: 'verde', cavalo: 'nenhum', camuflado: null };

  const coresVermelhas = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
  const cor = coresVermelhas.includes(num) ? 'vermelho' : 'preto';

  const mod = num % 10;
  let cavalo;
  if ([1,4,7].includes(mod)) cavalo = 'cavalo1';
  else if ([2,5,8].includes(mod)) cavalo = 'cavalo2';
  else cavalo = 'cavalo3';

  const camufladosMap = {
    1: [1,10,19,28],
    2: [2,11,20,29],
    3: [3,12,21,30],
    4: [4,13,22,31],
    5: [5,14,23,32],
    6: [6,15,24,33],
    7: [7,16,25,34],
    8: [8,17,26,35],
    9: [9,18,27,36]
  };

  let camuflado = null;
  for (const [key, arr] of Object.entries(camufladosMap)) {
    if (arr.includes(num)) { camuflado = Number(key); break; }
  }

  return { cor, cavalo, camuflado };
}

// POST resultado
app.post('/resultados', (req, res) => {
  const { numero } = req.body;
  if (numero === undefined || numero < 0 || numero > 36) {
    return res.status(400).json({ erro: 'Número inválido. Deve ser entre 0 e 36.' });
  }
  const info = analisarNumero(numero);
  const novoResultado = {
    id: resultados.length + 1,
    numero,
    timestamp: new Date(),
    ...info
  };
  resultados.push(novoResultado);

  io.emit('novo_resultado', novoResultado);
  io.emit('atualizacao_estatisticas', calcularEstatisticas());

  res.json(novoResultado);
});

// GET resultados
app.get('/resultados', (req, res) => {
  res.json(resultados.slice(-200));
});

// GET estatísticas
function calcularEstatisticas() {
  const stats = {
    cores: { vermelho: 0, preto: 0 },
    cavalos: { cavalo1: 0, cavalo2: 0, cavalo3: 0, outro: 0 },
    camuflados: { 1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0 }
  };

  resultados.forEach(r => {
    stats.cores[r.cor] ? stats.cores[r.cor]++ : null;
    stats.cavalos[r.cavalo] ? stats.cavalos[r.cavalo]++ : stats.cavalos.outro++;
    if (r.camuflado) stats.camuflados[r.camuflado]++;
  });

  return stats;
}

app.get('/estatisticas', (req, res) => {
  res.json(calcularEstatisticas());
});

io.on('connection', (socket) => {
  console.log('Cliente conectado', socket.id);
  socket.on('disconnect', () => console.log('Cliente desconectou', socket.id));
});

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
