const http = require('http')

const host = '127.0.0.1'
const port = 3333 || process.env.PORT

http.createServer(preprocess).listen(port, host)
console.log(`Server running at http://${host}:${port}`)

function preprocess(req, res) {
     let body = ''
     req.on('data', function(chunk) {
          body += chunk
     })
     req.on('end', function() {
          req.body = body
          server(req, res)
     })
}

function server(req, res) {
     console.log('Request method        :', req.method)
     console.log('Request URL           :', req.url)
     console.log('Request content-type  :', req.headers['content-type'])
     console.log('Request payload       :', req.body)

     let payload
     if (req.method == 'GET' && req.url == '/') {
          payload = { hello: 'world' }
     } else if (req.method == 'GET' && req.url == '/articles'){
          payload = {
               articles: [
                    {id:1, author:'Scott', body:'A post'},
                    {id:2, author:'Not Scott', body:'Another Post'},
                    {id:3, author:'Definitely Not Scott', body:'The Last Post'}
               ]
          }
     } else if (req.method == 'POST' && req.url == '/login') {
          let data = JSON.parse(req.body)
          payload = { username: data.username, result: 'success'}
     } else if (req.method == 'PUT' && req.url == '/logout') {
          payload = 'OK'
     }

     if (payload) {
         res.setHeader('Content-Type', 'application/json')
         res.statusCode = 200
         res.end(JSON.stringify(payload))
     } else {
          payload = 'Bad Request'
          res.setHeader('Content-Type', 'text/plain')
          res.statusCode = 402
          res.end(JSON.stringify(payload)) 
     }
}
