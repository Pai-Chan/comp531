import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import {postNewArticle} from './articleActions'

export const NewArticle = ({dispatch, username}) => {

	let newArticle

	return (
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
	)
}

NewArticle.PropTypes = {
	username: PropTypes.string.isRequired
}

export default connect((state) => {
	return {
		username: state.landing.username
	}
})(NewArticle)