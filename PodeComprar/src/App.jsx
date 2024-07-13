import { useState } from 'react'
import axios from 'axios';


function getAnosApartir1950() {
  const anoLimite = 1950;
  let anoReferencia = new Date().getFullYear();

  const anos = [];

  do {
    anos.push(anoReferencia);
    anoReferencia--;
  } while (anoReferencia >= anoLimite)
  return anos;
}


function App() {
  const [carregando, setCarregando] = useState(false);
  const [pais, setPais] = useState('');
  const [anoNascimento, setAnoNascimento] = useState('');

  const getPaises = () => {
    return [
      {
        descricao: 'Brasil',
        id: 'BR',
      },
      {
        descricao: 'Japão',
        id: 'JP',
      },
      {
        descricao: 'Estados Unidos',
        id: 'EUA',
      }
    ]
  }

  function handleOnClick() {
    setCarregando(true);


    setTimeout(() => {
      let podeComprar;
      const idade = new Date().getFullYear() - Number(anoNascimento);

      axios
      .get('http://localhost:3002/pode-comprar')
      .then((response) => {
        console.log(response)
      })
      
      if (podeComprar) {
        alert('Você pode comprar alcool');
      } else {
        alert('Você não pode comprar alcool');
      }
      setCarregando(false)
    }, 1000);


  }


  return (
    <body>
      <div className='corpo'>
        <h1>Pode Comprar🍻?</h1>
        <label for="pais">País:</label>
        <br />
        <select name="pais" id="pais" onChange={(event) => {
          setPais(event.target.value)
        }}>
          <option value="" disabled selected>Selecione</option>
          {
            getPaises().map(pais => (
              <option value={pais.id}>{pais.descricao}</option>
            ))
          }
        </select>
        <br />
        <label for="ano">Ano Nascimento:</label>
        <br />
        <select name="ano" id="ano" onChange={(event) => {
          setAnoNascimento(event.target.value)
        }}>

          <option value="" disabled selected>Selecione</option>
          {
            getAnosApartir1950().map(ano => (
              <option value={ano}>{ano}</option>
            ))
          }
        </select>
        <br />
        {carregando ? (
          <button disabled>Carregando</button>
        ) : (
          <button disabled={pais === '' || anoNascimento === ''} onClick={handleOnClick}>Consultar</button>
        )}
      </div>
    </body>
  )
}

export default App
