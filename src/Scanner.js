// src/Scanner.js

class Scanner {
  static getTaxas(responseData) {
    return responseData.conversion_rates;
  }
}

export default Scanner;
