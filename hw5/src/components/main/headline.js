import Promise from 'bluebird'

import React, {PropTypes} from 'react'
import { connect } from 'react-redux'

import ActionType from '../../actions'
import { actLogout, setHeadline } from './headlineActions'

//display headline of this user
export const Headline = ({dispatch, avatar, headline, username, displayName}) => {
	let newHeadline
	return (
		<div className="panel panel-default">
			<div className="panel-heading">{username}</div>
			<div className="panel-body">
				<button type="button" className="btn btn-default" onClick={() => dispatch(actLogout())}>Log Out</button>
				<br/>
				<img src={avatar} className="img-thumbnail img-responsive"/>
				<p>{headline}</p>
				<form className="form-inline">
					<div className="form-group">
						<label htmlFor="mystatusInput" className="sr-only">Status</label>
						<input type="text" className="form-control input-normal" id="mystatusInput" placeholder="Status" ref={(node) => {
							newHeadline = node
						}}/>
						<button type="button" className="btn btn-default" onClick={() => {
							dispatch(setHeadline(newHeadline.value))
							newHeadline.value = ''
						}}>Update</button>
					</div>
				</form>
			</div>
		</div>
	)
}

Headline.PropTypes = {
	username: PropTypes.string.isRequired,
	displayName: PropTypes.string.isRequired,
	avatar: PropTypes.string.isRequired,
	headline: PropTypes.string.isRequired
}

export default connect((state) => {
	return {
		username: state.landing.username,
		displayName: state.profile.displayName,
		avatar: state.profile.avatar,
		headline: state.profile.headline
	}
})(Headline)