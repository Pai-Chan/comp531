import ActionType, { getAction, resource } from '../../actions'

import createLogger from 'redux-logger'
const logger = createLogger()

const profileData = require('../../data/profile.json')

export const getProfile = (username) => {
	return (dispatch) => {

		dispatch({type:ActionType.SET_PROFILE_ITEM, profile: profileData.profileItems})
	}
}

// check if the user input is correct and update related field
export const updateProfile = (username, updatedFields) => {
	return (dispatch) => {
		let profile = {}
		Object.keys(updatedFields).forEach(
			(key) => {
				if (key != 'confirmation' && updatedFields[key].value != '') {
					profile[key] = updatedFields[key].value
				}
			}
		)

		if (Object.keys(profile).length === 0) {
			dispatch({type:ActionType.ERRORMESSAGE, message: "You have not specify to change anything."})
			return
		}

		let isValidForm = true
		Object.keys(profile).forEach(
			(key) => {
				switch(key) {
					case 'email':
						if (!/^[_a-z0-9]+@([_a-z0-9]+\.)+[a-z0-9]{2,3}$/.test(profile[key])) {
							dispatch({type:ActionType.ERRORMESSAGE, message: "A valid email address should contain @. After @, there should be a valid domain name."})
							isValidForm = false
							return							
						}
						break
					case 'phoneNumber':
						if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(profile[key])) {
							dispatch({type:ActionType.ERRORMESSAGE, message: "One valid format of phone number is like 123-456-7890."})
							isValidForm = false
							return
						}
						break
					case 'zipcode':
						if (!/^\d{5}$/.test(profile[key])) {
							dispatch({type:ActionType.ERRORMESSAGE, message: "You must input a valid zipcode like XXXXX. X is a digit."})
							isValidForm = false
							return
						}
						break
					case 'password':
						if (profile[key] != updatedFields.confirmation.value) {
							dispatch({type:ActionType.ERRORMESSAGE, message: "You must input two indentical passwords."})
							isValidForm = false
							return
						}
					default:
						break
				}
			}
		)

		if (isValidForm) {
			dispatch({type: ActionType.SET_PROFILE_ITEM, profile})
			dispatch({type:ActionType.SUCCESSMESSAGE, message: "Related Field(s) have been updated successfully."})
			Object.keys(updatedFields).forEach((key) => {
				updatedFields[key].value = ""
			})			
		}
	}
}
