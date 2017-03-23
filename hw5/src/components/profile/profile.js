import React from 'react'
import { connect } from 'react-redux'

import ActionType from '../../actions'
import { getAction } from '../../actions'

import Avatar from './avatar'
import ProfileForm from './profileForm'

//Profile view component in the profile page
const Profile = ({dispatch}) => (
	<div>
		<nav className="navbar navbar-default" role="navigation">
			<div className="container-fluid">
			<div className="navbar-header">
				<a className="navbar-brand" href="#">Ricebook</a>
			</div>
			<div>
				<ul className="nav navbar-nav">
					<li><a href="#" onClick={() => {dispatch(getAction(ActionType.NAV2MAIN))}}>Main Page</a></li>
					<li className="active"><a href="#">My Profile</a></li>
				</ul>
			</div>
			</div>
		</nav>
		<div className="container">
			<div className="row">
				<div className="col-md-8 col-md-offset-2 col-sm-6 col-sm-offset-3">
					<Avatar/>
					<ProfileForm/>
				</div>
			</div>
		</div>		
	</div>
)

export default connect()(Profile)