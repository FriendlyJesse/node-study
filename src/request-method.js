import http from 'http'
import url from 'url'

function update (req, res) {
  console.log('4')
}
function remove (req, res) {
  console.log('3')
}
function create (req, res) {
  console.log('2')
}
function get (req, res) {
  console.log('1')
}

const server = http.createServer((req, res) => {
  switch (req.method) {
    case 'POST':
      update(req, res)
      break
    case 'DELETE':
      remove(req, res)
      break
    case 'PUT':
      create(req, res)
      break
    case 'GET':
      get(req, res)
      break
  }
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  })
  res.end('Hello World')
})

server.listen(1337, '127.0.0.1')
console.log('Server running at http://localhost:1337/')