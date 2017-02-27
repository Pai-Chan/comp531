import React, {PropTypes} from 'react'
import { connect } from 'react-redux'

import { addFollowed, removeFollowed } from './followingActions'

export const Following = ({dispatch, followeds}) => {

	//new followed name for getting his headline and avatar
	let newFollowed

	let followedsInDOM = Object.keys(followeds).map((username, index) => {
		return (
			<div className="panel panel-default" key={username}>
				<div className="panel-body">
					<img src={followeds[username].avatar} className="img-thumbnail img-responsive"/>
					<p>{username + ": " + followeds[username].headline}</p>
					<button type="button" className="btn btn-danger btn-xs" onClick={() => {
						dispatch(removeFollowed(username))
					}}><i className="glyphicon glyphicon-remove"></i></button>
				</div>
			</div>
		)
	}) 

	return (
		<div className="panel panel-default text-center" id="friendDivSidebar">
			{ followedsInDOM }
			<div className="panel">
				<form className="form-inline">
					<div className="form-group">
						<label htmlFor="mystatusInput" className="sr-only">New User</label>
						<input type="text" className="form-control" id="mystatusInput" placeholder="User" ref={(node) => {
							newFollowed = node
						}}/>
						<button type="button" className="btn btn-default" onClick={() => {
							dispatch(addFollowed(newFollowed.value))
							newFollowed.value = ''
						}}>Add</button>
					</div>
				</form>
			</div>
		</div>
	)
}

Following.PropTypes = {
	followeds: PropTypes.string.isRequired
}

export default connect((state) => {
	return {
		followeds: state.followeds
	}
})(Following)