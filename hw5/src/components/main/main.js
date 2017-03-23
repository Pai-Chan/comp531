import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import ActionType from '../../actions'

import Headline from './headline'
import Following from './following'
import ArticleView from '../article/articleView'


//the main page view component contains headline following and articleview
export const Main = ({dispatch, successMessage, errorMessage}) => {

	const successMessageContainer = successMessage == "" ? null : (
		<div className="alert alert-success">{successMessage}</div>		
	)

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
				<div>
					<ul className="nav navbar-nav">
						<li className="active"><a href="#">Main Page</a></li>
						<li><a href="#" onClick={() => {dispatch({type:ActionType.NAV2PROFILE})}}>My Profile</a></li>
					</ul>
				</div>
				</div>
			</nav>
			<div className="container">
				<div className="row">
					<div className="col-md-offset-1 col-md-10 col-sm-offset-1 col-sm-10">
						{errorMessageContainer}
						{successMessageContainer}
					</div>
				</div>
			</div>
			<div className="container">
				<div className="row">
					<div className="col-md-3 col-sm-3 col-xs-6">
						<Headline/>
						<Following/>
					</div>
					<ArticleView/>
				</div>
			</div>	

		</div>
	)
}

Main.PropTypes = {
	successMessage: PropTypes.string.isRequired,
	errorMessage: PropTypes.string.isRequired
}

export default connect((state) => {
	return {
		successMessage: state.shared.successMessage,
		errorMessage: state.shared.errorMessage
	}
})(Main)