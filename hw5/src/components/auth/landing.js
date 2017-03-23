import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import ActionType from '../../actions'

import Register from './register'
import Login from './login'

const Landing = ({dispatch, errorMessage, successMessage}) => {

	//for display success message
	const successMessageContainer = successMessage == "" ? null : (
		<div className="alert alert-success">{successMessage}</div>		
	)

	//for display error message, when register or login process goes wrong, 
	//it shows up related text info
	const errorMessageContainer = errorMessage == "" ? null : (
		<div className="alert alert-danger">{errorMessage}</div>
	)

	return (
		<div>
			<nav className="navbar navbar-default" role="navigation">
				<div className="container-fluid">
				<div className="navbar-header">
					<a className="navbar-brand" href="#">Ricebook</a>
				</div>
				</div>
			</nav>
			<div className="row">
				<div className="col-md-offset-3 col-md-6 col-sm-offset-1 col-sm-10">
					<div className="panel panel-default center-block text-center">
						<h1>Welcome to Ricebook</h1>
					</div>
				</div>
			</div>

			<div className="row">
				<div className="col-md-offset-1 col-md-10 col-sm-offset-1 col-sm-10">
					{errorMessageContainer}
					{successMessageContainer}
				</div>
			</div>

			<Register/>

			<Login/>

		</div>
	)
}

Landing.PropTypes = {
	errorMessage: PropTypes.string.isRequired,
	successMessage: PropTypes.string.isRequired
}

export default connect((state) => {
	return {
		errorMessage: state.shared.errorMessage,
		successMessage: state.shared.successMessage
	}
})(Landing)