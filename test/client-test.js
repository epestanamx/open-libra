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

test('should fail with unknown endpoint', function (t) {
  var client = openLibra.createClient({ endpoint: endpoint })

  nock(endpoint)
    .get('/error')
    .reply(404)

  client._request('/error', 'GET', {}, function (err, books) {
    t.ok(err, 'should fail')
    t.end()
  })
})

test('should fail if not query is passd', function (t) {
  var client = openLibra.createClient({ endpoint: endpoint })

  nock(endpoint)
    .get('/')
    .reply(404)

  client._request('/', 'GET', null, function (err, books) {
    t.ok(err, 'should fail')
    t.end()
  })
})

test('sould list books', function (t) {
  var client = openLibra.createClient({ endpoint: endpoint })

  t.ok(client.books, 'should be exists')
  t.equals(typeof client.books, 'function', 'should be a function')

  nock(endpoint)
    .get('/?')
    .reply(200, [])

  client.books({}, function (err, books) {
    t.error(err, 'should be not an error')
    t.ok(Array.isArray(books), 'should be an array')
    t.end()
  })
})

test('should be search books', function (t) {
  var client = openLibra.createClient({ endpoint: endpoint })

  t.ok(client.search, 'should be exists')
  t.equals(typeof client.search, 'function', 'should be a function')

  nock(endpoint)
    .get('/')
    .query({ book_title: 'javascript' })
    .reply(200, [{ title: 'javascript' }])

  client.search('javascript', {}, function (err, books) {
    t.error(err, 'should be not an error')
    t.ok(Array.isArray(books), 'should be an array')
  })

  t.end()
})
