// # Api Gateway Helper
// This helpers are created to work with AWS Api Gateway,
// used to respond with HTTP

module.exports = class Response {
  constructor(status = 200, body) {
    this.statusCode = status
    this.headers = {}

    if (body) {
      this.body = body
    }
  }

  /**
   * Return a JSON Representation of the request
   */
  toJSON() {
    return {
      statusCode: this.statusCode,
      headers: this.headers,
      body: JSON.stringify(this.body)
    }
  }

  /**
   * Sets a StatusCode
   * @param {Number} status - Status Code
   */
  Status(status) {
    this.statusCode = status
    return this
  }

  /**
   * Add a header into the response
   * @param {String} name - Name of the Header
   * @param {String} value - Value of the Header
   */
  WithHeader(name, value) {
    this.headers[name] = value
    return this
  }

  /**
   * Add a Body to the response
   * @param {*} body - Body to append in the response
   */
  WithBody(body) {
    this.body = body
    return this
  }

  /**
   * Append ACAO Header into the request
   * @param {String} permissions - ACAO Value
   */
  WithCORS(permissions = '*') {
    return this.WithHeader('Access-Control-Allow-Origin', permissions)
  }
}
