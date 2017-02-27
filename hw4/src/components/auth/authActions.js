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
		)
	}
}

// to act login action
export function actLogin(username, password){
	return (dispatch) => {
		return resource('POST', 'login', {username, password})
		.then((response) => {
			//originally, we know the result of authentication by response,
			//then we decide whether render the main.
			//here for testing, we believe that any non-empty password is correct.
			if (username != '' && password != '') {
				dispatch({type:ActionType.LOGIN, username})
				dispatch(getFilledMain(username))
				dispatch({type:ActionType.NAV2MAIN})
			} else {
				dispatch({type:ActionType.ERRORMESSAGE, message:`There was an error logging in as ${username}`})
			}

		})
	}
}

// to act logout action
export function actLogout(){
	return (dispatch) => {
		return resource('POST', 'logout')
		.then((response) => {
			dispatch({type:ActionType.LOGOUT})
			dispatch({type:ActionType.NAV2LANDING})
		})
	}
}

export function actRegistrationCheck(registerFields){
	return (dispatch) => {
		if (!/^[A-Za-z][A-Za-z0-9]*$/.test(registerFields.username.value)) {
			dispatch({type:ActionType.ERRORMESSAGE, message: "The username can use letters and digits. Also, the first character must be a letter."})
		} else if (registerFields.displayName.value === "") {
			dispatch({type:ActionType.ERRORMESSAGE, message: "You should specify a display name."})
		} else if (!/^[_a-z0-9]+@([_a-z0-9]+\.)+[a-z0-9]{2,3}$/.test(registerFields.email.value)) {
			dispatch({type:ActionType.ERRORMESSAGE, message: "A valid email address should contain @. After @, there should be a valid domain name."})
		} else if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(registerFields.phoneNumber.value)) {
			dispatch({type:ActionType.ERRORMESSAGE, message: "One valid format of phone number is like 123-456-7890."})
		} else if (!validateBirthdate(registerFields.birthdate.value)) {
			dispatch({type:ActionType.ERRORMESSAGE, message: "You must be older than 18."})
		} else if (!/^\d{5}$/.test(registerFields.zipcode.value)) {
			dispatch({type:ActionType.ERRORMESSAGE, message: "You must input a valid zipcode like XXXXX. X is a digit."})
		} else if (registerFields.password.value == '') {
			dispatch({type:ActionType.ERRORMESSAGE, message: "You must set a password."})
		} else if (registerFields.confirmation.value != registerFields.password.value) {
			dispatch({type:ActionType.ERRORMESSAGE, message: "You must input two indentical passwords."})
		} else {
			dispatch(actLogin(registerFields.username.value, registerFields.password.value))
			dispatch({type:ActionType.SUCCESSMESSAGE, message: "You have successfully registered. Enjoy Ricebook!"})
		}
	}
}

function validateBirthdate(dateStr) {
	var dateRef = new Date()
	var date = new Date(dateStr)
	dateRef.setYear(dateRef.getFullYear() - 18)
	return date < dateRef
}