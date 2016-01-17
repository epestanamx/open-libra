var openLibra = require('./')
var client = openLibra.createClient()

client.books('/', 'GET', { publisher: 'Green Tea Press', num_items: 1 }, function (err, books) {
  if (!err) {
    console.log(books)
  }
})
