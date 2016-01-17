var test = require('tape')
var openLibra = require('../')

test('should create a client', function (t) {
  t.ok(openLibra.createClient, 'should be exist')
  t.equals(typeof openLibra.createClient, 'function', 'should be a function')
  t.end()
})
