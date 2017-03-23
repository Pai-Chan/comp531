import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import {filterArticles, postNewArticle, filterShownArticles, sortByTimeAndArrayize} from './articleActions'
import {Article} from './article'
import {NewArticle} from './newArticle'

export const ArticleView = ({dispatch, articles, filterWord, username}) => {

	//corresponding prop of searchBox, so that user's filterWord can be captured
	let searchBox
	// temporary for new posted article div
	let newArticle

	const articlesAntiChron = sortByTimeAndArrayize(articles)
	const shownArticlesList = filterShownArticles(articlesAntiChron, filterWord)

	const articlesInDOM = shownArticlesList.map((article) => {
		return <Article key={article._id} dispatch={dispatch} articleId={article._id} article={article} />
	})

	return (
		<div className="col-md-9 col-sm-9 col-xs-12">
			
			<div className="panel panel-default">
				<div className="panel-body">
					<NewArticle dispatch={dispatch} username={username} />
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

			<div className="row">{ articlesInDOM }</div>



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