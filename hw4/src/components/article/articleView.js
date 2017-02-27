import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import {filterArticles, postNewArticle} from './articleActions'
import {Article} from './article'

export const ArticleView = ({dispatch, articles, filterWord, username}) => {

	//corresponding prop of searchBox, so that user's filterWord can be captured
	let searchBox
	// temporary for new posted article div
	let newArticle

	// earlier post should be in the front
	// it should appear more in the upper place
	function compareTimestamp(a,b) {
		if (a.timestamp < b.timestamp) {
			return 1
		}
		if (a.timestamp > b.timestamp) {
			return -1
		}
		return 0
	}
	// make articles object to array, so that can be sorted by timestamp
	var articlesArray = $.map(articles, (value, index) => {
		return [value]
	})

	let articlesAntiChron = articlesArray.sort(compareTimestamp)

	let articlesInDOM = articlesAntiChron.map((article) => {
		if (article.author.toLowerCase().includes(filterWord.toLowerCase()) || 
			article.text.toLowerCase().includes(filterWord.toLowerCase())) {
			return (
				<Article key={article.articleId} articleId={article.articleId} article={article}/>
			)
		}
		return null
	})

	return (
		<div className="col-md-9 col-sm-9 col-xs-12">
			
			<div className="panel panel-default">
				<div className="panel-body">
					<form className="form">
						<div className="form-group">
							<textarea className="form-control" rows="4" placeholder="Enter your post here." ref={(node) => {newArticle = node}}></textarea>
							<label htmlFor="imagefileInput">Image File: </label>
							<input type="file" id="imagefileInput"/>
							<br/>
							<input type="reset" className="btn btn-default" value="Clear"/>
							<input type="button" className="btn btn-default" value="Post" onClick={() => {
								dispatch(postNewArticle(username, newArticle))
							}}/>
						</div>
					</form>
				</div>					
			</div>

			<div className="panel panel-default">
				<div className="panel-body">
					<form className="form-inline">
						<div className="form-group">
							<label className="sr-only" htmlFor="searchPost">Search Post</label>
							<div className="input-group">
								<div className="input-group-addon">Search Post: </div>
								<input type="text" className="form-control" id="searchPost" placeholder="Enter keywords here." 
								ref={(node) => {searchBox = node}} onChange={() => {dispatch(filterArticles(searchBox.value))}}/>
							</div>
						</div>
					</form>
				</div>					
			</div>

			 <div className="row">{	articlesInDOM }</div>



		</div>
	)
}

ArticleView.PropTypes = {
	articles: PropTypes.string.isRequired,
	filterWord: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired
}

export default connect((state) => {
	return {
		articles: state.articles,
		filterWord: state.custom.filterWord,
		username: state.landing.username
	}
})(ArticleView)