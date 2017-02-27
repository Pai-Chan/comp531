import React from 'react'
import { connect } from 'react-redux'

import ActionType from '../../actions'

import Headline from './headline'
import Following from './following'
import ArticleView from '../article/articleView'


//the main page view component contains headline following and articleview
const Main = ({dispatch}) => {


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

export default connect()(Main)