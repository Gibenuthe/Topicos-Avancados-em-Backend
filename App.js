import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [feedback, setFeedback] = useState({ id: '', classificacao: '', comentario: '', informacoes: '' });
  const [feedbacks, setFeedbacks] = useState([]);
  const [backendURL, setBackendURL] = useState('https://leswbxsfhc.execute-api.us-east-1.amazonaws.com/dev-projeto');


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFeedback((prevFeedback) => ({ ...prevFeedback, [name]: value }));
  };


  const handleURLChange = (event) => {
    setBackendURL(event.target.value);
  };

  const obterFeedbacks = async () => {
      const response = await axios.get(`${backendURL}/feedback`);
      setFeedbacks(response.data);
  }

  const cadastrar = async () => {
    try {
      const response = await axios.post(`${backendURL}/feedback`, feedback);
      console.log(response.status)

      if (response.status === 200 || response.status === 201) {
        // Atualize a lista local de livros após o cadastro
        setFeedbacks([...feedbacks, response.data]);
        // Limpe o estado do livro atual
        setFeedbacks({ id: '', classificacao: '', comentario: '', informacoes: '' });
      } else {
        // Trate outros códigos de status conforme necessário
        console.error("Erro ao cadastrar o feedback", response.data);
      }

    }
    catch (error) {
      console.error("Erro ao conectar com o back-end", error);
    }
  };

  const atualizar = async (id) => {

  };

  const remover = async (id) => {
    const newFeedbacks = feedbacks.filter(f => f.id !== id);
    setFeedbacks(newFeedbacks);


  };

  const obterFeedback = async (id) => {
    try {
      const response = await axios.get(`${backendURL}/feedback/${id}`);
      console.log(response.status)
      if (response.status === 200) {
        setFeedback({ id: response.data.id, classificacao: response.data.Classificacao, comentario: response.data.Comentario, informacoes: response.data.Informacoes });
        console.log(JSON.stringify(response.data))
      } else {
        console.error('Erro ao buscar feedbacks')
      }

    }
    catch (error) {
      console.error("Erro ao conectar com o back-end", error);
    }
  };

  return (
    <div className="App">
      <form>
        <input
          name="id"
          placeholder="ID"
          value={feedback.id}
          onChange={handleInputChange}
          disabled
        />
        <input
          name="classificacao"
          placeholder="Classificação"
          value={feedback.classificacao}
          onChange={handleInputChange}
          disabled
        />
        <input
          name="comentario"
          placeholder="Comentário"
          value={feedback.comentario}
          onChange={handleInputChange}
          disabled
        />
        <input
          name="informacoes"
          placeholder="Informações"
          value={feedback.informacoes}
          onChange={handleInputChange}
          disabled
        />
        <button type="button" disabled onClick={cadastrar}>Cadastrar</button>
        <button type="button" disabled onClick={() => atualizar(feedback.id)}>Atualizar</button>
        <button type="button" disabled onClick={() => remover(feedback.id)}>Remover</button>
        <button type="button" disabled onClick={() => obterFeedback(feedback.id)}>Obter pelo id</button>
        <button type="button" onClick={() => obterFeedbacks()}>Obter todos</button>
      </form>
      <input
        className="backend-url-input"
        type="text"
        placeholder="URL do Backend"
        value={backendURL}
        onChange={handleURLChange}
      />
      <ul>
    {feedbacks.map(f => (
      <li key={f.id}>
        <div className="feedback-box">
          <div className="informacoes">{f.Informacoes}</div>
          <div className="classificacao">{f.Classificacao}</div>
          <div className="comentario">{f.Comentario}</div>
        </div>
      </li>
    ))}
</ul>

    </div>
  );
}

export default App;