// src/HttpClient.js

import axios from "axios";
import HttpRequest from "./HttpRequest";

class HttpClient {
  async request(httpRequest) {
    try {
      const response = await axios.get(httpRequest.getUrl(), {
        params: httpRequest.getParams(),
      });
      return response.data;
    } catch (error) {
      throw new Error("Erro ao fazer a requisição: " + error.message);
    }
  }
}

export default HttpClient;
