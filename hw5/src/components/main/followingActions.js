import Promise from 'bluebird'

import ActionType, { resource } from '../../actions'

import { getProfileAvatar, getProfileHeadline } from '../profile/profileActions'
import { getArticles } from '../article/articleActions'
//get followeds return data in json of followeds
export const getFolloweds = (username) => {
	return (dispatch) => {
		resource('GET', `following/${username}`)
		.then((response) => {

			let followedsList = response.following
			let promises = followedsList.map((username) => {
				return dispatch(getFollowedItems(username))
			})
			return Promise.all(promises)
			// followedsList.forEach((follower) => {
			// 	dispatch({type:ActionType.ADD_FOLLOWED_ITEM, username: follower.username, item: follower})
			// })
		})
	}
}

export const getFollowedItems = (username) => {
	return (dispatch) => {
		dispatch({type:ActionType.ADD_FOLLOWED_ITEM, username, item: username})
		let taskGetAvatar = resource('GET', `avatars/${username}`)
							.then((response) => {
								dispatch({type:ActionType.ADD_FOLLOWED_ITEM, username, item: {avatar: response.avatars[0].avatar}})
							})
		let taskGetHeadline = resource('GET', `headlines/${username}`)
							.then((response) => {
								dispatch({type:ActionType.ADD_FOLLOWED_ITEM, username, item: {headline: response.headlines[0].headline}})
							})
		return Promise.all([taskGetAvatar, taskGetHeadline])
	}
}

// add a followed, name is input by website user, avatar and headline are not hardcoded in hw5
export const addFollowed = (username) => {
	return (dispatch) => {
		resource('PUT',`following/${username}`)
		.then((response) => {
			let lastIndex = response.following.length - 1
			if (response.following[lastIndex] === username) {
				dispatch(getFollowedItems(response.following[lastIndex]))
				dispatch(getArticles())
			} else {
				dispatch({type:ActionType.ERRORMESSAGE, message:`There is no username ${username}.`})
			}
		}).catch((err) => {
				dispatch({type:ActionType.ERRORMESSAGE, message:`Error Caught: ${err}.`})			
		})
	}
}

// remove a followed, triggered by clicking on delete button
export const removeFollowed = (username) => {
	return (dispatch) => {
		resource('DELETE', `following/${username}`)
		.then((response) => {
			if (!response.following.includes(username)) {
				dispatch({type:ActionType.REMOVE_FOLLOWED, username})
				dispatch({type:ActionType.CLEAR_ALL_ARTICLES})
				dispatch(getArticles())
			} else {
				dispatch({type:ActionType.ERRORMESSAGE, message:`Server Error: fail to remove ${username}.`})
			}
		})
	}
}