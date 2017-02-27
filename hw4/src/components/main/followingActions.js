import Promise from 'bluebird'

import ActionType, { resource } from '../../actions'

import {getProfileAvatar, getProfileHeadline} from '../profile/profileActions'

const initialFollowers = require('../../data/followers.json')

//get followeds return data in json of followeds
export const getFolloweds = (username) => {
	return (dispatch) => {
		resource('GET', `${username}/following`)
		.then((response) => {
			// This is the fake name list of the followeds,
			// which will be replaced by actual followeds later.
			// const fakeFolloweds = ['Lucy', 'Lily', 'Linda']

			// let followedsPrms = fakeFolloweds.map((username) => {
			// 	let avatarPrms = getFollowedAvatar(username)(dispatch)
			// 	let headlinePrms = getFollowedHeadline(username)(dispatch)
			// 	return Promise.all([avatarPrms, headlinePrms])
			// })

			// Promise.all(followedsPrms)
			let followersList = initialFollowers.followers
			followersList.forEach((follower) => {
				dispatch({type:ActionType.ADD_FOLLOWED_ITEM, username: follower.username, item: follower})
			})
		})
	}
}

// export const getFollowedAvatar = (username) => {
// 	return (dispatch) => {
// 		return resource('GET', `${username}/avatar`)
// 		.then((response) => {
// 			dispatch({type:ActionType.ADD_FOLLOWED_ITEM, username, item:{avatar:'./images/p2408565537.jpg'}})
// 		})
// 	}
// }

// export const getFollowedHeadline = (username) => {
// 	return (dispatch) => {
// 		return resource('GET', `${username}/headline`)
// 		.then((response) => {
// 			dispatch({type:ActionType.ADD_FOLLOWED_ITEM, username, item:{headline:'I am happy because I have a new friend!'}})
// 		})
// 	}
// }

// add a followed, name is input by website user, avatar and headline are hardcoded
export const addFollowed = (username) => {
	return (dispatch) => {
		dispatch({type:ActionType.ADD_FOLLOWED_ITEM, username, item:{
			username,
			avatar: './images/p2408565537.jpg',
			headline:'I am happy because I have a new friend!'
		}})
	}
}

// remove a followed, triggered by clicking on delete button
export const removeFollowed = (username) => {
	return (dispatch) => {
		dispatch({type:ActionType.REMOVE_FOLLOWED, username})
	}
}