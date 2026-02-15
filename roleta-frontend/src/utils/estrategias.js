// utils/estrategias.js

import { roletaEuropeia } from "./roleta";

/* 🎨 Funções de Estratégias Originais */

// Determina a cor do número
export const determinarCor = (num) => {
  if (num === 0) return "verde";
  const vermelhos = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
  return vermelhos.includes(num) ? "vermelho" : "preto";
};

// Determina o cavalo do número
export const determinarCavalo = (num) => {
  const ultimo = num % 10;
  if ([1, 4, 7].includes(ultimo)) return { nome: "CAVALO 1 4 7", cor: "vermelho" };
  if ([2, 5, 8].includes(ultimo)) return { nome: "CAVALO 2 5 8", cor: "azul" };
  if ([0, 3, 6, 9].includes(ultimo)) return { nome: "CAVALO 0 3 6 9", cor: "verde" };
  return { nome: "-", cor: "-" };
};

// Determina o camuflado do número
export const determinarCamuflado = (num) => {
  const grupos = {
    0: [0],
    1: [1, 10, 19, 28],
    2: [2, 11, 20, 29],
    3: [3, 12, 21, 30],
    4: [4, 13, 22, 31],
    5: [5, 14, 23, 32],
    6: [6, 15, 24, 33],
    7: [7, 16, 25, 34],
    8: [8, 17, 26, 35],
    9: [9, 18, 27, 36],
  };
  for (const [key, arr] of Object.entries(grupos)) {
    if (arr.includes(num)) return `CAMUFLADO ${key}`;
  }
  return "-";
};

/* 🎯 NOVA PARTE: ZONAS E VIZINHOS DA ROLETA */

// 🎯 Determinar a zona do número (Roleta Europeia)
export const determinarZona = (num) => {
  const zonas = {
    Zero: [15, 32, 0, 26, 3, 35, 12],
    Voisins: [25, 2, 21, 4, 19, 22, 18, 29, 7, 28],
    Orphelins: [6, 34, 17, 1, 20, 14, 31, 9],
    Tier: [27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33],
  };

  if (zonas.Zero.includes(num)) return { nome: "Zero", cor: "verde" };
  if (zonas.Voisins.includes(num)) return { nome: "Voisins", cor: "amarelo" };
  if (zonas.Orphelins.includes(num)) return { nome: "Orphelins", cor: "azul" };
  if (zonas.Tier.includes(num)) return { nome: "Tier", cor: "vermelho" };

  return { nome: "-", cor: "cinza" };
};



// Retorna os números vizinhos de um número específico na roleta
export const obterVizinho = (numero, qtd = 2) => {
  const index = roletaEuropeia.findIndex((item) => item.numero === numero);
  if (index === -1) return [];

  const vizinhos = [];
  for (let i = 1; i <= qtd; i++) {
    const vDireita = roletaEuropeia[(index + i) % roletaEuropeia.length].numero;
    const vEsquerda = roletaEuropeia[(index - i + roletaEuropeia.length) % roletaEuropeia.length].numero;
    vizinhos.push(vDireita);
    vizinhos.push(vEsquerda);
  }
  return vizinhos.sort((a, b) => a - b);
};


// 🎯 NOVAS FUNÇÕES: COLUNAS E DÚZIAS

// Determina a coluna do número
export const determinarColuna = (numero) => {
  if (numero === 0) return "-";
  if ([1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34].includes(numero)) return "Coluna 1";
  if ([2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35].includes(numero)) return "Coluna 2";
  if ([3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36].includes(numero)) return "Coluna 3";
  return "-";
};

// Determina a dúzia do número
export const determinarDuzia = (numero) => {
  if (numero === 0) return "-";
  if (numero >= 1 && numero <= 12) return "1ª Dúzia";
  if (numero >= 13 && numero <= 24) return "2ª Dúzia";
  if (numero >= 25 && numero <= 36) return "3ª Dúzia";
  return "-";
};