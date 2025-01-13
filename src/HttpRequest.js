// src/HttpRequest.js

class HttpRequest {
  constructor(url, params) {
    this.url = url;
    this.params = params || {};
  }

  getUrl() {
    return this.url;
  }

  getParams() {
    return this.params;
  }
}

export default HttpRequest;
