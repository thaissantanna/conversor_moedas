// src/App.js

import React, { useState } from "react";
import HttpClient from "./HttpClient";
import HttpRequest from "./HttpRequest";
import Scanner from "./Scanner";

const chaveApi = "573cdce5f0a9452ea3588bcb";
const urlApi = `https://v6.exchangerate-api.com/v6/${chaveApi}/latest/`;

const moedas = [
  { id: 1, codigo: "BRL" },
  { id: 2, codigo: "USD" },
  { id: 3, codigo: "EUR" },
  { id: 4, codigo: "GBP" },
  { id: 5, codigo: "JPY" },
  { id: 6, codigo: "AUD" },
  { id: 7, codigo: "CHF" },
  { id: 8, codigo: "CAD" },
  { id: 9, codigo: "CNY" },
  { id: 10, codigo: "ARS" },
];

function App() {
  const [moedaInicial, setMoedaInicial] = useState("BRL");
  const [moedaFinal, setMoedaFinal] = useState("USD");
  const [valor, setValor] = useState("");
  const [resultado, setResultado] = useState(null);

  const converterMoeda = async () => {
    if (moedaInicial === moedaFinal) {
      alert("Você selecionou a mesma moeda inicial e moeda final.");
      return;
    }
    if (!valor || isNaN(valor)) {
      alert("Por favor, insira um valor válido.");
      return;
    }

    const httpRequest = new HttpRequest(`${urlApi}${moedaInicial}`);
    const httpClient = new HttpClient();

    try {
      const responseData = await httpClient.request(httpRequest);
      const taxas = Scanner.getTaxas(responseData);
      const valorConvertido = (valor * taxas[moedaFinal]).toFixed(2);
      setResultado(`${valor} ${moedaInicial} equivale a ${valorConvertido} ${moedaFinal}.`);
    } catch (error) {
      console.error("Erro ao buscar as taxas de câmbio:", error);
      alert("Não foi possível realizar a conversão. Tente novamente mais tarde.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Conversor de Moedas</h1>
      <div>
        <label>Moeda Inicial:</label>
        <select value={moedaInicial} onChange={(e) => setMoedaInicial(e.target.value)}>
          {moedas.map((moeda) => (
            <option key={moeda.id} value={moeda.codigo}>
              {moeda.codigo}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Moeda Final:</label>
        <select value={moedaFinal} onChange={(e) => setMoedaFinal(e.target.value)}>
          {moedas.map((moeda) => (
            <option key={moeda.id} value={moeda.codigo}>
              {moeda.codigo}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Valor:</label>
        <input
          type="number"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          placeholder="Digite o valor"
        />
      </div>
      <button onClick={converterMoeda}>Converter</button>
      {resultado && <h2>{resultado}</h2>}
    </div>
  );
}

export default App;
