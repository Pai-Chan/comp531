
const express = require('express')
const bodyParser = require('body-parser')

var articles = [
	{
		id: 1,
		author: 'Mr1',
		text: 'This is the first article.'
	},
	{
		id: 2,
		author: 'Mr2',
		text: 'This is the second article.'
	},
	{
		id: 3,
		author: 'Mr3',
		text: 'This is the third article.'
	}
]

let nextId = 4

const addArticle = (req, res) => {
	console.log('Payload received', req.body)    
    let newArticle = {
    	id: nextId++,
    	author: 'Mr_another',
    	text: req.body.text
    }
    articles.push(newArticle)
    res.send(newArticle)
}

const getArticles = (req, res) => {
	res.send({articles})
}


const hello = (req, res) => res.send({ hello: 'world' })

const app = express()
app.use(bodyParser.json())
app.post('/article', addArticle)
app.get('/articles', getArticles)
app.get('/', hello)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})

