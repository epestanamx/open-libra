var request = require('client-request')
var qs = require('querystring')

function Client (options) {
  this.options = options || {}
  this.endpoint = this.options.endpoint || 'http://www.etnassoft.com/api/v1/get'
}

Client.prototype._request = function (path, method, params, callback) {
  var uri = this.endpoint + path

  if (params) {
    uri += '?' + qs.encode(params)
  }

  request({
    uri: uri,
    method: method
  }, function (err, res, body) {
    if (err) return callback(err)

    if (res.statusCode !== 200) return callback(new Error('An error ocurred in the request'))

    body = String(body)
    body = body.substring(body.indexOf('(') + 1, body.lastIndexOf(')'))

    if (!body) {
      body = []
    }

    callback(null, body)
  })
}

Client.prototype.books = function (params, callback) {
  this._request('/', 'GET', params, callback)
}

Client.prototype.search = function (query, params, callback) {
  params.book_title = query
  this._request('/', 'GET', params, callback)
}

module.exports = Client
