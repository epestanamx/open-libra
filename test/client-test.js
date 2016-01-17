var test = require('tape')
var nock = require('nock')
var openLibra = require('../')
var Client = require('../lib/client')

var endpoint = 'http://api.openlibra.test'

test('should create a client', function (t) {
  t.ok(openLibra.createClient, 'should be exists')
  t.equals(typeof openLibra.createClient, 'function', 'should be a function')

  var client = openLibra.createClient()
  t.ok(client instanceof Client, 'sould be instance of client')
  t.end()
})

test('sould list books', function (t) {
  var client = openLibra.createClient({ endpoint: endpoint })

  t.ok(client.books, 'should be exists')
  t.equals(typeof client.books, 'function', 'should be a function')

  nock(endpoint)
    .get('/?')
    .reply(200, [])

  client.books('/', 'GET', {}, function (err, books) {
    t.error(err, 'should be not an error')
    t.ok(Array.isArray(books), 'should be an array')
  })

  t.end()
})
