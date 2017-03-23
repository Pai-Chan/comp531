import Promise from 'bluebird'

import ActionType, { resource } from '../../actions'
import { getProfile } from '../profile/profileActions'
import { getHeadline } from '../main/headline'
import { getFolloweds } from '../main/followingActions'
import { getArticles } from '../article/articleActions'

// fill the main page of all the props needed, also profile info for later use
export function getFilledMain(username){
	return (dispatch) => {
		var profilePrms = dispatch(getProfile(username))
		var followedsPrms = dispatch(getFolloweds(username))
		var articlesPrms = dispatch(getArticles(username))
		
		return Promise.all([profilePrms, followedsPrms, articlesPrms]).then(
			() => {
				dispatch({type:ActionType.NAV2MAIN})
			}
		).catch((err) => {
			dispatch({
				type:ActionType.ERRORMESSAGE, 
				message:`There was an error when getting filled main. ${err}`
			})
		})
	}
}

// to act login action
export function actLogin(username, password){
	return (dispatch) => {
		return resource('POST', 'login', {username, password})
		.then((response) => {
			if (typeof response === 'object' && response.result == 'success') {
				dispatch({type:ActionType.LOGIN, username: response.username})
				dispatch(getFilledMain(response.username))
			} else {
				dispatch({
					type:ActionType.ERRORMESSAGE, 
					message:'Username or password is wrong.'
				})
			}
		}).catch((err) => {
			dispatch({
				type:ActionType.ERRORMESSAGE, 
				message:`There was an error when logging in. ${err}`
			})
		})
	}
}

// to act logout action
export function actLogout(){
	return (dispatch) => {
		return resource('PUT', 'logout')
		.then((response) => {
			dispatch({type:ActionType.LOGOUT})
			dispatch({type:ActionType.NAV2LANDING})
		}).catch((err) => {
			dispatch({
				type:ActionType.ERRORMESSAGE, 
				message:`There was an error logging out as ${response.username}. ${err}`
			})
		})
	}
}

export function actRegistrationCheck(registerFields){
	return (dispatch) => {
		if (!/^[A-Za-z][A-Za-z0-9]*$/.test(registerFields.username.value)) {
			dispatch({
				type:ActionType.ERRORMESSAGE, 
				message: "The username can use letters and digits. Also, the first character must be a letter."
			})
		} else if (!/^[_a-z0-9]+@([_a-z0-9]+\.)+[a-z0-9]{2,3}$/.test(registerFields.email.value)) {
			dispatch({
				type:ActionType.ERRORMESSAGE, 
				message: "A valid email address should contain @. After @, there should be a valid domain name."
			})
		} else if (!validatedob(registerFields.dob.value)) {
			dispatch({
				type:ActionType.ERRORMESSAGE, 
				message: "You must be older than 18."
			})
		} else if (!/^\d{5}$/.test(registerFields.zipcode.value)) {
			dispatch({
				type:ActionType.ERRORMESSAGE, 
				message: "You must input a valid zipcode like XXXXX. X is a digit."
			})
		} else if (registerFields.password.value == '') {
			dispatch({
				type:ActionType.ERRORMESSAGE, 
				message: "You must set a password."
			})
		} else if (registerFields.confirmation.value != registerFields.password.value) {
			dispatch({
				type:ActionType.ERRORMESSAGE, 
				message: "You must input two indentical passwords."
			})
		} else {
			let data = {
				username: registerFields.username.value,
				email: registerFields.email.value,
				dob: registerFields.dob.value,
				zipcode: registerFields.zipcode.value,
				password: registerFields.password.value
			}
			resource('POST', 'register', data)
			.then((response) => {
				if (typeof response === 'object' && response.result == 'success') {
					dispatch({
						type:ActionType.SUCCESSMESSAGE, 
						message: `${response.username}, you have successfully registered. Enjoy Ricebook!`
					})
				} else {
					dispatch({
						type:ActionType.ERRORMESSAGE, 
						message: `Something goes wrong when registering Ricebook!`
					})
				}
			})
		}
	}
}

function validatedob(dateStr) {
	var dateRef = new Date()
	var date = new Date(dateStr)
	dateRef.setYear(dateRef.getFullYear() - 18)
	return date < dateRef
}