import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './styles.css';
import Estatisticas from './components/Estatisticas';

const API_URL = 'http://localhost:4000';

function App() {
  const [numero, setNumero] = useState('');
  const [resultados, setResultados] = useState([]);
  const [estatisticas, setEstatisticas] = useState(null);
  const [erro, setErro] = useState('');
  const resultadosRef = useRef([]);
  const socketRef = useRef(null);

  // --- Conecta ao socket.io
  useEffect(() => {
    socketRef.current = io(API_URL);

    socketRef.current.on('connect', () => {
      console.log('Conectado ao servidor via socket');
    });

    socketRef.current.on('novo_resultado', (novoResultado) => {
      console.log('Novo resultado recebido via socket:', novoResultado);
      resultadosRef.current = [novoResultado, ...resultadosRef.current];
      setResultados([...resultadosRef.current]);
    });

    socketRef.current.on('atualizacao_estatisticas', (novaEstatistica) => {
      console.log('Estatísticas atualizadas:', novaEstatistica);
      setEstatisticas(novaEstatistica);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // --- Busca dados iniciais
  const fetchDados = async () => {
    try {
      const res1 = await fetch(`${API_URL}/resultados`);
      const data1 = await res1.json();
      setResultados(data1);
      resultadosRef.current = data1;

      const res2 = await fetch(`${API_URL}/estatisticas`);
      const data2 = await res2.json();
      setEstatisticas(data2);
      setErro('');
    } catch (err) {
      console.error('Erro ao buscar dados do servidor:', err);
      setErro('Erro ao buscar dados do servidor.');
    }
  };

  useEffect(() => {
    fetchDados();
  }, []);

  // --- Envia número manual
  const enviarNumero = async () => {
    if (numero === '') return;

    try {
      const num = parseInt(numero);
      const res = await fetch(`${API_URL}/resultados`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ numero: num }),
      });

      if (!res.ok) throw new Error('Erro no envio');
      setNumero('');
      setErro('');
    } catch (err) {
      console.error('Erro ao adicionar número:', err);
      setErro('Erro ao adicionar número.');
    }
  };

  return (
    <div className="App">
      <h1>🎯 Resultados da Roleta</h1>

      <div className="input-container">
        <input
          type="number"
          placeholder="Digite o número"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          min="0"
          max="36"
        />
        <button onClick={enviarNumero}>Adicionar</button>
      </div>

      {erro && <p className="erro">{erro}</p>}

      <Estatisticas estatisticas={estatisticas} />

      <div className="resultados">
        <h2>Histórico de Resultados</h2>
        <ul>
          {resultados.map((r, i) => (
            <li key={i}>{r.numero}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
