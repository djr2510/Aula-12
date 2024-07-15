import React, { useState } from 'react';
import axios from 'axios';

function getAnosApartir1950() {
  const anoLimite = 1950;
  let anoReferencia = new Date().getFullYear();
  const anos = [];
  do {
    anos.push(anoReferencia);
    anoReferencia--;
  } while (anoReferencia >= anoLimite);
  return anos;
}

function App() {
  const [carregando, setCarregando] = useState(false);
  const [pais, setPais] = useState('');
  const [anoNascimento, setAnoNascimento] = useState('');

  const getPaises = () => [
    { descricao: 'Brasil', id: 'BR' },
    { descricao: 'Japão', id: 'JP' },
    { descricao: 'Estados Unidos', id: 'EUA' }
  ];

  async function consultarDados() {
    setCarregando(true);
    try {
      const response = await axios.post('http://localhost:3002/pode-comprar', {
        anoNascimento,
        pais,
      });
      const { data } = response;
      return data.podeComprar;
    } catch (error) {
      console.error('Erro ao consultar dados:', error);
      return false; 
    } finally {
      setCarregando(false);
    }
  }

  async function handleOnClick() {
    try {
      const podeComprar = await consultarDados();
      if (podeComprar) {
        alert('Você pode comprar álcool');
      } else {
        alert('Você não pode comprar álcool');
      }
    } catch (error) {
      console.error('Erro ao consultar dados:', error);
    }
  }

  return (
    <div className='corpo'>
      <h1>Pode Comprar 🍻?</h1>
      <label htmlFor="pais">Pais🏳️:</label>
      <br />
      <select
        name="pais"
        id="pais"
        value={pais}
        onChange={(event) => setPais(event.target.value)}
      >
        <option value="">Selecione</option>
        {getPaises().map((pais) => (
          <option key={pais.id} value={pais.id}>{pais.descricao}</option>
        ))}
      </select>
      <br />
      <label htmlFor="ano">Ano Nascimento🥳:</label>
      <br />
      <select
        name="ano"
        id="ano"
        value={anoNascimento}
        onChange={(event) => setAnoNascimento(event.target.value)}
      >
        <option value="">Selecione</option>
        {getAnosApartir1950().map((ano) => (
          <option key={ano} value={ano}>{ano}</option>
        ))}
      </select>
      <br />
      {carregando ? (
        <button disabled>Carregando</button>
      ) : (
        <button disabled={!pais || !anoNascimento} onClick={handleOnClick}>
          Consultar
        </button>
      )}
    </div>
  );
}

export default App;
