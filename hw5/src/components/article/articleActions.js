import Promise from 'bluebird'

import ActionType, { resource } from '../../actions'

//set filterWord to display only targeted card
export const filterArticles = (filterWord) => {
	return (dispatch) => {
		dispatch({type:ActionType.SET_FILTERWORD, filterWord: filterWord})
	}
}

//post new article
export const postNewArticle = (username, newArticle) => {
	return (dispatch) => {
		if (newArticle.value == '') {
			dispatch({type:ActionType.ERRORMESSAGE, message:'Empty article text is not allowed.'})
			return
		}
		return resource('POST', `article`, {text: newArticle.value})
		.then((response) => {
			response.articles.forEach((article) => {
				dispatch({
					type:ActionType.ADD_ARTICLE_PART, 
					articleId:article._id, 
					part:article
				})
				dispatch({type:ActionType.ADD_ARTICLE_PART, 
					articleId:article._id, 
					part:{commentsShown:false}
				})
			})
			newArticle.value = ""

		})
	}
}

//put json data from the server side of articles into state
export const getArticles = (username) => {
	return (dispatch) => {
		return resource('GET', `articles`)
		.then((response) => {
			response.articles.forEach((article) => {
				dispatch({
					type:ActionType.ADD_ARTICLE_PART, 
					articleId:article._id, 
					part:article
				})
				dispatch({
					type:ActionType.ADD_ARTICLE_PART, 
					articleId:article._id, 
					part:{commentsShown:false}
				})
			})

		})
	}
}

// called by button show comment to show comment below article
export const showComments = (articleId) => {
	return (dispatch) => {
		dispatch({
			type:ActionType.ADD_ARTICLE_PART, 
			articleId:articleId, 
			part:{commentsShown:true}
		})
	}
}

// called by button hide comment to hide comment below article
export const hideComments = (articleId) => {
	return (dispatch) => {
		dispatch({
			type:ActionType.ADD_ARTICLE_PART, 
			articleId:articleId, 
			part:{commentsShown:false}
		})
	}	
}

//filter out the articles without containg filterWord
export const filterShownArticles = (articleList, filterWord) => {
	return articleList.filter(article => 
		(article.author.toLowerCase().includes(filterWord.toLowerCase()) || 
			article.text.toLowerCase().includes(filterWord.toLowerCase()))
	)
}

//antrichronized order rendered by article list input to display the articles
export const sortByTimeAndArrayize = (articles) => {
	// earlier post should be in the front
	// it should appear more in the upper place
	function compareTime(a,b) {
		let aTime = new Date(a.date).getTime()
		let bTime = new Date(b.date).getTime()

		if (aTime < bTime) {
			return 1
		}
		if (aTime > bTime) {
			return -1
		}
		return 0
	}
	// make articles object to array, so that can be sorted by timestamp
	var articlesArray = Object.keys(articles).map((key) => {
		return articles[key]
	})

	let articlesAntiChron = articlesArray.sort(compareTime)

	return 	articlesAntiChron
}