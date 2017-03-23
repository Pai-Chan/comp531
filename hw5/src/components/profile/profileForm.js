import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Action, {displayErrorMsg} from '../../actions'
import {updateProfile} from './profileActions'
import Avatar from './avatar'

import createLogger from 'redux-logger'
const logger = createLogger()

//the profile form view component
export const ProfileForm = ({dispatch, profile, username, successMessage, errorMessage}) => {

	//corresponding to input areas, for dispatching
	let updatedFields = {}

	const successMessageContainer = successMessage == "" ? null : (
		<div className="alert alert-success">{successMessage}</div>		
	)


	const errorMessageContainer = errorMessage == "" ? null : (
		<div className="alert alert-danger">{errorMessage}</div>
	)

	//convert timestamp data to readable string
	const dob = new Date(profile.dobTimestamp)
	const year = dob.getFullYear().toString()
	const month = (dob.getMonth() + 1).toString()
	const date = dob.getDate().toString()
	const dobStr = year + '-' + month + '-' + date

	return (
		<div>
			<div className="panel panel-default">
				<div className="panel-heading"><h3>Current Info of {username}</h3></div>
				<div className="panel-body">
					<p>Date of Birth: {dobStr}</p>
					<p>Email Address: {profile.email}</p>
					<p>Headline Status: {profile.headline}</p>
					<p>Zipcode: {profile.zipcode}</p>
				</div>
			</div>

			{errorMessageContainer}

			{successMessageContainer}

			<div className="panel panel-default">
				<div className="panel-heading"><h3>Info Update</h3></div>
				<div className="panel-body">
					<form>

						<div className="form-group">
							<label htmlFor="newEmailAddress">Email Address: </label>
							<input ref={
								(node) => {
									updatedFields.email = node
							}} type="text" className="form-control" placeholder="New Email Address"/>
						</div>

						<div className="form-group">
							<label htmlFor="newEmailAddress">Headline Status: </label>
							<input ref={
								(node) => {
									updatedFields.headline = node
							}} type="text" className="form-control" placeholder="New Headline Status"/>
						</div>

						<div className="form-group">
							<label htmlFor="newZipcode">Zipcode: </label>
							<input ref={
								(node) => {
									updatedFields.zipcode = node
							}} type="text" className="form-control" placeholder="New Zipcode"/>
						</div>

						<div className="form-group">
							<label htmlFor="newPassword">New Password: </label>
							<input ref={
								(node) => {
									updatedFields.password = node
							}}type="password" className="form-control" placeholder="New Password"/>
						</div>
						<div className="form-group">
							<label htmlFor="newPassword">Confirmation: </label>
							<input ref={
								(node) => {
									updatedFields.confirmation = node
							}}type="password" className="form-control" placeholder="New Password"/>
						</div>
						<button type="reset" className="btn btn-default">Clear</button>
						<button type="button" className="btn btn-default" onClick={() => {
							dispatch(updateProfile(username, updatedFields))
						}}>Update</button>
					</form>		
				</div>
			</div>
		</div>
	)
}

ProfileForm.PropTypes = {
	profile: PropTypes.object.isRequired,
	username: PropTypes.string.isRequired,
	successMessage: PropTypes.string.isRequired,
	errorMessage: PropTypes.string.isRequired
}


export default connect((state) => {
	return {
		profile: state.profile,
		username: state.landing.username,
		successMessage: state.shared.successMessage,
		errorMessage: state.shared.errorMessage
	}
})(ProfileForm)