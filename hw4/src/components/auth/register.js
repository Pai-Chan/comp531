import React from 'react'

import { connect } from 'react-redux'

import { actRegistrationCheck } from './authActions'

export const Register = ({dispatch}) => {

	// corresponding registerFields recording input field
	let registerFields = {}

	return (
		<div className="col-md-6 col-sm-6">
			<div className="panel panel-default">
				<div className="panel-heading">Registration</div>
				<div className="panel-body">
					<form>
						<div className="form-group">
							<label htmlFor="signupInputUsername">Username:</label>
							<input ref={(node) => {
								registerFields.username = node
							}} type="text" className="form-control" id="signupInputUsername" placeholder="Username"/>
						</div>
						<div className="form-group">
							<label htmlFor="signupInputDisplayname">Display Name:</label>
							<input ref={(node) => {
								registerFields.displayName = node
							}} type="text" className="form-control" id="signupInputDisplayname" placeholder="Display Name"/>
						</div>
						<div className="form-group">
							<label htmlFor="signupInputEmail">Email:</label>
							<input ref={(node) => {
								registerFields.email = node
							}} type="email" className="form-control" id="signupInputEmail" placeholder="Email"/>
						</div>
						<div className="form-group">
							<label htmlFor="signupInputEmail">Phone Number:</label>
							<input ref={(node) => {
								registerFields.phoneNumber = node
							}} type="text" className="form-control" id="signupInputEmail" placeholder="Phone Number"/>
						</div>
						<div className="form-group">
							<label htmlFor="newDisplayName">Date of Birth: </label>
							<input ref={(node) => {
								registerFields.birthdate = node
							}} type="date" className="form-control" placeholder="Date of Birth"/>
						</div>
						<div className="form-group">
							<label htmlFor="signupInputPassword">Zipcode:</label>
							<input ref={(node) => {
								registerFields.zipcode = node
							}} type="text" className="form-control" id="signupInputPassword" placeholder="Password"/>
						</div>
						<div className="form-group">
							<label htmlFor="signupInputPassword">Password:</label>
							<input ref={(node) => {
								registerFields.password = node
							}} type="password" className="form-control" id="signupInputPassword" placeholder="Password"/>
						</div>
						<div className="form-group">
							<label htmlFor="signupInputPasswordConfirmation">Confirmation:</label>
							<input ref={(node) => {
								registerFields.confirmation = node
							}} type="password" className="form-control" id="signupInputPasswordConfirmation" placeholder="Password Again"/>
						</div>
						<button type="button" className="btn btn-default" onClick={() => {
							dispatch(actRegistrationCheck(registerFields))
						}}>Sign Up</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default connect()(Register)