import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// Aavat view component
const Avatar = ({dispatch, username}) => {
	return (
		<div className="panel panel-default">
			<div className="panel-heading"><h3>The Avatar of {username}</h3></div>
			<div className="panel-body text-center">
				<div className="row">
					<div className="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-8 col-xs-offset-2">
						<img src="images/p2408565537.jpg" className="img-thumbnail img-responsive"/>
					</div>
				</div>
				<label htmlFor="profilePictureInput">Upload new picture: </label>
				<input type="file" id="profilePictureInput"/>
			</div>
		</div>

	)
}

Avatar.PropTypes = {
	username: PropTypes.string.isRequired
}


export default connect((state) => {
	return {
		username: state.landing.username
	}
})(Avatar)