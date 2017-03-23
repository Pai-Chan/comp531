import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import {Comment} from './comment'

import {showComments, hideComments} from './articleActions'

import ActionType from '../../actions'

export const Article = ({dispatch, articleId, article}) => {

	const showOrHideWord = !article.commentsShown ? "Show": "Hide"

	const commentsInDOM = !article.commentsShown ? null : (
		article.comments.map((comment) => {
			return (
				<Comment key={comment._id} commentId={comment._id} comment={comment} />				
			)
		})
	)

	return (
		<div className="col-md-12 col-sm-12" key={"article"+articleId}>
			<div className="panel panel-default">
				<div className="panel-heading">{article.author} said:
				</div>
				<div className="panel-body">
					<p>{ article.text }</p>
					<div>
					<img src={ article.img } className="img-thumbnail img-responsive"/>
					<br/>
					<small>{article.date}</small>
					<br/>
					<button type="button" className="btn btn-warning btn-xs">Edit</button>
					<button type="button" className="btn btn-success btn-xs" onClick={
						() => {
							if (article.commentsShown) {
								dispatch(hideComments(articleId))
							} else {
								dispatch(showComments(articleId))
							}
						}
					}>
						{showOrHideWord + " Comments " + "(" + article.comments.length + ")"}
					</button>
					<br/>
					{ commentsInDOM }
					</div>
				</div>
			</div>					
		</div>
	)
}

Article.PropTypes = {
	articleId: PropTypes.number.isRequired,
	article: PropTypes.object.isRequired
}