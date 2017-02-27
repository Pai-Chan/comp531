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
			dispatch({type:ActionType.ADD_ARTICLE_PART, articleId: 2000, part: {author: username, text: newArticle.value, image:'', timestamp}})
			newArticle.value = ""

		})
	}
}

//put json data of articles into state
export const getArticles = (username) => {
	return (dispatch) => {
		resource('GET', `${username}/articles`)
		.then((response) => {
			// This is the fake list of the articles id,
			// the reason that fetching articles needs username is:
			// every person's perspective(filter) is different
			// which will be replaced by actual articles later.
			// const fakeArticlesIds = ['1000', '1001', '1002', '1003', '1004', '1005', '1006', '1007']
			let articlesList = initialArticles.articles
			articlesList.forEach((article) => {
				dispatch({type:ActionType.ADD_ARTICLE_PART, articleId:article.articleId, part:article})
			})
			// let articlesPrms = fakeArticlesIds.map((articleId) => {
			// 	let articlesList = initialArticles.articles
			// 	let authorPrms = getArticleAuthor(articleId)(dispatch)
			// 	let textPrms = getArticleText(articleId)(dispatch)
			// 	let imagePrms = getArticleImage(articleId)(dispatch)
			// 	return Promise.all([textPrms, imagePrms])
			// })

			// Promise.all(articlesPrms)
		})
	}
}

// export const getArticleAuthor = (articleId) => {
// 	return (dispatch) => {
// 		return resource('GET', `${articleId}/author`)
// 		.then((response) => {
// 			let author
// 			switch(articleId) {
// 				case '1000':
// 					author = 'Mr1000'
// 					dispatch({type:ActionType.ADD_ARTICLE_PART, articleId, part:{author}})
// 					break
// 				case '1001':
// 					author = 'Mr1001'
// 					dispatch({type:ActionType.ADD_ARTICLE_PART, articleId, part:{author}})
// 					break
// 				case '1002':
// 					author = 'Mr1002'
// 					dispatch({type:ActionType.ADD_ARTICLE_PART, articleId, part:{author}})
// 					break
// 				case '1003':
// 					author = 'Mr1003'
// 					dispatch({type:ActionType.ADD_ARTICLE_PART, articleId, part:{author}})
// 					break
// 				case '1004':
// 					author = 'Mr1004'
// 					dispatch({type:ActionType.ADD_ARTICLE_PART, articleId, part:{author}})
// 					break
// 				case '1005':
// 					author = 'Mr1005'
// 					dispatch({type:ActionType.ADD_ARTICLE_PART, articleId, part:{author}})
// 					break
// 				case '1006':
// 					author = 'Mr1006'
// 					dispatch({type:ActionType.ADD_ARTICLE_PART, articleId, part:{author}})
// 					break
// 				case '1007':
// 					author = 'Mr1007'
// 					dispatch({type:ActionType.ADD_ARTICLE_PART, articleId, part:{author}})
// 					break
// 				default:
// 					break
// 			}
// 		})
// 	}
// }

// export const getArticleText = (articleId) => {
// 	return (dispatch) => {
// 		return resource('GET', `${articleId}/text`)
// 		.then((response) => {
// 			// hardcoded: articleId could be one of '1000' to '1007'
// 			let text
// 			switch(articleId) {
// 				case '1000':
// 					text = "Text One: The easiest way to get started with React is to use this Hello World example code on CodePen. You don't need to install anything. "
// 					dispatch({type:ActionType.ADD_ARTICLE_PART, articleId, part:{text}})
// 					break
// 				case '1001':
// 					text = "Text Two: The easiest way to get started with React is to use this Hello World example code on CodePen. You don't need to install anything."
// 					dispatch({type:ActionType.ADD_ARTICLE_PART, articleId, part:{text}})
// 					break
// 				case '1002':
// 					text = "Text Three: The easiest way to get started with React is to use this Hello World example code on CodePen. You don't need to install anything."
// 					dispatch({type:ActionType.ADD_ARTICLE_PART, articleId, part:{text}})
// 					break
// 				case '1003':
// 					text = "Text Four: The easiest way to get started with React is to use this Hello World example code on CodePen. You don't need to install anything."
// 					dispatch({type:ActionType.ADD_ARTICLE_PART, articleId, part:{text}})
// 					break
// 				case '1004':
// 					text = "Text Five: The easiest way to get started with React is to use this Hello World example code on CodePen. You don't need to install anything."
// 					dispatch({type:ActionType.ADD_ARTICLE_PART, articleId, part:{text}})
// 					break
// 				case '1005':
// 					text = "Text Six: The easiest way to get started with React is to use this Hello World example code on CodePen. You don't need to install anything."
// 					dispatch({type:ActionType.ADD_ARTICLE_PART, articleId, part:{text}})
// 					break
// 				case '1006':
// 					text = "Text Seven: The easiest way to get started with React is to use this Hello World example code on CodePen. You don't need to install anything."
// 					dispatch({type:ActionType.ADD_ARTICLE_PART, articleId, part:{text}})
// 					break
// 				case '1007':
// 					text = "Text Eight: The easiest way to get started with React is to use this Hello World example code on CodePen. You don't need to install anything."
// 					dispatch({type:ActionType.ADD_ARTICLE_PART, articleId, part:{text}})
// 					break					
// 				default:
// 					break
// 			}
// 		})
// 	}
// }

// export const getArticleImage = (articleId) => {
// 	return (dispatch) => {
// 		return resource('GET', `${articleId}/image`)
// 		.then((response) => {
// 			// hardcoded: articleId could be one of '1000' to '1007'
// 			let image
// 			switch(articleId) {
// 				case '1000':
// 					image = 'images/p1694625178.jpg'
// 					dispatch({type:ActionType.ADD_ARTICLE_PART, articleId, part:{image}})
// 					break
// 				case '1001':
// 					image = 'images/p1693430071.jpg'
// 					dispatch({type:ActionType.ADD_ARTICLE_PART, articleId, part:{image}})
// 					break
// 				case '1002':
// 					image = ''
// 					dispatch({type:ActionType.ADD_ARTICLE_PART, articleId, part:{image}})
// 					break
// 				case '1003':
// 					image = ''
// 					dispatch({type:ActionType.ADD_ARTICLE_PART, articleId, part:{image}})
// 					break
// 				case '1004':
// 					image = 'images/p1430000737.jpg'
// 					dispatch({type:ActionType.ADD_ARTICLE_PART, articleId, part:{image}})
// 					break
// 				case '1005':
// 					image = 'images/p2179036751.jpg'
// 					dispatch({type:ActionType.ADD_ARTICLE_PART, articleId, part:{image}})
// 					break
// 				case '1006':
// 					image = ''
// 					dispatch({type:ActionType.ADD_ARTICLE_PART, articleId, part:{image}})
// 					break
// 				case '1007':
// 					image = ''
// 					dispatch({type:ActionType.ADD_ARTICLE_PART, articleId, part:{image}})
// 					break
// 				default:
// 					break
// 			}
// 		})
// 	}
// }