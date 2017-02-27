import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

export const Article = ({dispatch, articleId, article}) => {

	//convert timestamp to readable string to display in the card
	var date = new Date(article.timestamp)
	var dateStr = date.toString()

	return (
		<div className="col-md-6 col-sm-6" key={"article"+articleId}>
			<div className="panel panel-default">
				<div className="panel-heading">{article.author} said:
				</div>
				<div className="panel-body">
					<p>{ article.text }</p>
					<div>
					<img src={ article.image } className="img-thumbnail img-responsive"/>
					<br/>
					<button type="button" className="btn btn-warning btn-xs">Edit</button>
					<button type="button" className="btn btn-success btn-xs">Comment</button>
					<br/>
					<small>{dateStr}</small>
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