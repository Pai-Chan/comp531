import React from 'react'

import { connect } from 'react-redux'
import { actLogin } from './authActions'

export const Login = ({dispatch}) => {

	//corresponding field for username input field, used for argument of dispatch actLogin
	let username;
	//corresnponding field for password input field, used for argument of dispatch actLogin
	let password;

	return (
		<div className="col-md-6 col-sm-6">
			<div className="panel panel-default">
				<div className="panel-heading">Login</div>
				<div className="panel-body">
					<form>
						<div className="form-group">
							<label htmlFor="loginInputUsername">Username:</label>
							<input type="text" className="form-control" id="loginInputUsername" 
							placeholder="Username" ref={(node) => {username = node}}/>
						</div>
						<div className="form-group">
							<label htmlFor="loginInputPassword">Password:</label>
							<input type="password" className="form-control" id="loginInputPassword" 
							placeholder="Password" ref={(node) => {password = node}}/>
						</div>
						<button type="button" className="btn btn-default" onClick={() => {
								dispatch(actLogin(username.value, password.value))
							}}>Log In</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default connect()(Login)