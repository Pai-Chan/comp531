import ActionType, { getAction, resource } from '../../actions'

import createLogger from 'redux-logger'
const logger = createLogger()

// get the avatar email zipcode and date of birth and headline to store in redux
export const getProfile = (username) => {
	return (dispatch) => {
		var avatarPrms = dispatch(getAvatar(username))
		var emailPrms = dispatch(getEmail(username))
		var zipcodePrms = dispatch(getZipcode(username))
		var dobPrms = dispatch(getDob(username))
		var headlinePrms = dispatch(getHeadline(username))

		return Promise.all([avatarPrms, emailPrms, zipcodePrms, dobPrms, headlinePrms])
	}
}

// get the items avatar email zipcode and date of birth and headline to store in redux
export const getProfileItems = (username) => {
	return (dispatch) => {
		var avatarPrms = getAvatar(username)(dispatch)
		var emailPrms = getEmail(username)(dispatch)
		var zipcodePrms = getZipcode(username)(dispatch)
		var dobPrms = getDob(username)(dispatch)
		var headlinePrms = getHeadline(username)(dispatch)

		return Promise.all([
			avatarPrms, 
			emailPrms, 
			zipcodePrms, 
			dobPrms, 
			headlinePrms
		])
	}
}

export const getAvatar = (username) => {
	return (dispatch) => {
		return resource('GET', `avatars/${username}`)
		.then((response) => {
			dispatch({type:ActionType.SET_PROFILE_ITEM, profile: {avatar: response.avatars[0].avatar}})
		}).catch((err) => {
			dispatch({type:ActionType.ERRORMESSAGE, message:`There was an error when getting avatar. ${err}`})
		})
	}
}

export const getEmail = (username) => {
	return (dispatch) => {
		return resource('GET', `email/${username}`)
		.then((response) => {
			dispatch({type:ActionType.SET_PROFILE_ITEM, profile: {email: response.email}})
		}).catch((err) => {
			dispatch({type:ActionType.ERRORMESSAGE, message:`There was an error when getting email. ${err}`})
		})
	}
}

export const getZipcode = (username) => {
	return (dispatch) => {
		return resource('GET', `zipcode/${username}`)
		.then((response) => {
			dispatch({type:ActionType.SET_PROFILE_ITEM, profile: {zipcode: response.zipcode}})
		}).catch((err) => {
			dispatch({type:ActionType.ERRORMESSAGE, message:`There was an error when getting zipcode. ${err}`})
		})
	}
}

export const getDob = () => {
	return (dispatch) => {
		return resource('GET', 'dob')
		.then((response) => {
			dispatch({type:ActionType.SET_PROFILE_ITEM, profile: {dobTimestamp: response.dob}})
		}).catch((err) => {
			dispatch({type:ActionType.ERRORMESSAGE, message:`There was an error when getting dob. ${err}`})
		})
	}
}

export const getHeadline = (username) => {
	return (dispatch) => {
		return resource('GET', `headlines/${username}`)
		.then((response) => {
			dispatch({type:ActionType.SET_PROFILE_ITEM, profile: {headline: response.headlines[0].headline}})
		}).catch((err) => {
			dispatch({type:ActionType.ERRORMESSAGE, message:`There was an error when getting headline. ${err}`})
		})
	}
}

export const updateEmail = (email) => {
	return (dispatch) => {
		return resource('PUT', 'email', {email})
		.then((response) => {
			dispatch({type:ActionType.SET_PROFILE_ITEM, profile: {email: response.email}})
			dispatch({type:ActionType.SUCCESSMESSAGE, message:'Successful Update.'})
		}).catch((err) => {
			dispatch({type:ActionType.ERRORMESSAGE, message:`There was an error when updating email. ${err}`})
		})
	}
}

export const updateHeadline = (headline) => {
	return (dispatch) => {
		return resource('PUT', 'headline', {headline})
		.then((response) => {
			dispatch({type:ActionType.SET_PROFILE_ITEM, profile: {headline: response.headline}})
			dispatch({type:ActionType.SUCCESSMESSAGE, message:'Successful Update.'})
		}).catch((err) => {
			dispatch({type:ActionType.ERRORMESSAGE, message:`There was an error when updating headline. ${err}`})
			throw new Error()
		})
	}		
}

export const updateZipcode = (zipcode) => {
	return (dispatch) => {
		resource('PUT', 'zipcode', {zipcode})
		.then((response) => {
			dispatch({type:ActionType.SET_PROFILE_ITEM, profile: {zipcode: response.zipcode}})
			dispatch({type:ActionType.SUCCESSMESSAGE, message:'Successful Update.'})
		}).catch((err) => {
			dispatch({type:ActionType.ERRORMESSAGE, message:`There was an error when updating zipcode. ${err}`})
		})
	}	
}

export const updatePassword = (password) => {
	return (dispatch) => {
		resource('PUT', 'password', {password})
		.then((response) => {
			dispatch({type:ActionType.SUCCESSMESSAGE, message:'Successful Update.'})
		})
		.catch((err) => {
			dispatch({type:ActionType.ERRORMESSAGE, message:`There was an error when updating password. ${err}`})
		})
	}
}

// check if the user input is correct and update related field
export const updateProfile = (username, updatedFields) => {
	return (dispatch) => {
		let profile = {}
		//load
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
							dispatch({
								type:ActionType.ERRORMESSAGE, 
								message: "A valid email address should contain @. After @, there should be a valid domain name which is two or three characters."
							})
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
			let prms = []
			Object.keys(profile).forEach(
				(key) => {
					switch(key) {
						case 'email':
							prms.push(dispatch(updateEmail(profile[key])))
							break
						case 'zipcode':
							prms.push(dispatch(updateZipcode(profile[key])))
							break
						case 'password':
							prms.push(dispatch(updatePassword(profile[key])))
							break
						case 'headline':
							prms.push(dispatch(updateHeadline(profile[key])))
						default:
							break
					}					
				}
			)
			Object.keys(updatedFields).forEach((key) => {
				updatedFields[key].value = ""
			})

			return Promise.all(prms)
		}
	}
}

