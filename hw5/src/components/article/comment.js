import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

export const Comment = ({dispatch, commentId, comment}) => {

	return (
		<div className="col-md-12 col-sm-12" key={"comment"+commentId}>
			<div className="panel panel-default">
				<div className="panel-heading">{ comment.author } commented:
				</div>
				<div className="panel-body">
					<p>{ comment.text }</p>
					<div>
					<br/>
					<small>{ comment.date }</small>
					<br/>
					</div>
				</div>
			</div>					
		</div>
	)
}

Comment.PropTypes = {
	commentId: PropTypes.number.isRequired,
	comment: PropTypes.object.isRequired,
}