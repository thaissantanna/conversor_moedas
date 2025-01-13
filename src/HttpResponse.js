// src/HttpResponse.js

class HttpResponse {
  constructor(status, data) {
    this.status = status;
    this.data = data;
  }

  getStatus() {
    return this.status;
  }

  getData() {
    return this.data;
  }
}

export default HttpResponse;
