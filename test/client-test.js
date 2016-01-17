var test = require('tape')
var openLibra = require('../')
var Client = require('../lib/client')

test('should create a client', function (t) {
  t.ok(openLibra.createClient, 'should be exist')
  t.equals(typeof openLibra.createClient, 'function', 'should be a function')

  var client = openLibra.createClient()
  t.ok(client instanceof Client, 'sould be instance of client')
  t.end()
})
