import Promise from 'bluebird'

import ActionType, { resource } from '../../actions'

const initialArticles = require('../../data/articles.json')

//set filterWord to display only targeted card
export const filterArticles = (filterWord) => {
	return (dispatch) => {
		dispatch({type:ActionType.SET_FILTERWORD, filterWord: filterWord})
	}
}

//post new article, currently new article Id is 2000
export const postNewArticle = (username, newArticle) => {
	return (dispatch) => {
		resource('POST', `${username}/newArticle`)
		.then((response) => {
			let timestamp = new Date().valueOf()
			dispatch({type:ActionType.ADD_ARTICLE_PART, articleId: 2000, part: {articleId: 2000, author: username, text: newArticle.value, image:'', timestamp}})
			newArticle.value = ""

		})
	}
}

//put json data of articles into state
export const getArticles = (username) => {
	return (dispatch) => {
		resource('GET', `${username}/articles`)
		.then((response) => {

			let articlesList = initialArticles.articles
			articlesList.forEach((article) => {
				dispatch({type:ActionType.ADD_ARTICLE_PART, articleId:article.articleId, part:article})
			})

		})
	}
}