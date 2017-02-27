import Promise from 'bluebird'

import ActionType, { resource } from '../../actions'

import {getProfileAvatar, getProfileHeadline} from '../profile/profileActions'

const initialFollowers = require('../../data/followers.json')

//get followeds return data in json of followeds
export const getFolloweds = (username) => {
	return (dispatch) => {
		resource('GET', `${username}/following`)
		.then((response) => {

			let followersList = initialFollowers.followers
			followersList.forEach((follower) => {
				dispatch({type:ActionType.ADD_FOLLOWED_ITEM, username: follower.username, item: follower})
			})
		})
	}
}



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