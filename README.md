# open-libra

Simple client for Open Libra API

## Install

$ npm install open-libra --save

## Usage

``` js
var openLibra = require('open-libra')

var client = openLibra.createCliente()

client.books(function (err, books) {
  // do something books
})

client.search('javascript', function(err, books) {
  // do something books
})
```
