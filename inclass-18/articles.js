const articles = {
	articles: [
		{_id:0, text:'Hello Rice!'},
		{_id:1, text:'Hello Houston!'},
		{_id:2, text:'Hello Texas!'},
		{_id:3, text:'Hello America!'}
	]
}

const addArticle = (req, res) => {
	console.log("Receive addArticle request.")
	const newArticle = {}
	newArticle._id = articles['articles'].length
	newArticle.text = req.body.text
	articles['articles'].push(newArticle)
	const resBody = {}
	resBody.articles = [newArticle]
	res.send(resBody)
}

const getArticles = (req, res) => {
	const id = req.params.id
	if (!id) {
		res.send(articles)
	} else {
		const result = {}
		result.articles = articles.articles.filter(article => (article._id == id))
		res.send(result)
	}
}

module.exports = (app) => {
	app.post('/article', addArticle)
	app.get('/articles/:id*?', getArticles)
}