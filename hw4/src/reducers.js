import { combineReducers } from 'redux'
import ActionType from './actions'

import createLogger from 'redux-logger'
const logger = createLogger()

export function shared(state = {location:'', errorMessage:'', successMessage:''}, action){
	let cleanMessage = {errorMessage:'', successMessage:''}
	switch(action.type) {
		case ActionType.NAV2MAIN:
			return {...state, ...cleanMessage, location: 'MAIN_PAGE'}
		case ActionType.NAV2PROFILE:
			return {...state, ...cleanMessage, location: 'PROFILE_PAGE'}
		case ActionType.NAV2LANDING:
			return {...state, ...cleanMessage, location: 'LANDING_PAGE'}
		case ActionType.ERRORMESSAGE:
			return {...state, ...cleanMessage, errorMessage: action.message}
		case ActionType.SUCCESSMESSAGE:
			return {...state, ...cleanMessage, successMessage: action.message}
		default:
			return {...state, ...cleanMessage}
	}
}

export function landing(state = { username: '' }, action) {
	switch(action.type) {
		case ActionType.LOGOUT:
			return {...state, username: ''}
		case ActionType.LOGIN:
			return {...state, username: action.username}
		default:
			return state
	}
}

export function profile(state = {}, action) {
	switch(action.type) {
		case ActionType.SET_PROFILE_ITEM:
			let updatedState = Object.assign({}, state)
			Object.keys(action.profile).forEach((key) => {
				updatedState[key] = action.profile[key] 
			})
			// for (var property in action.profile) {
			// 	updatedState[property] = action.profile[property]
			// }
			return updatedState
		default:
			return state
	}
}

export function followeds(state = {}, action) {
	switch(action.type) {
		case ActionType.ADD_FOLLOWED_ITEM:
			let updatedState = Object.assign({}, state)
			if (!updatedState[action.username]) {
				updatedState[action.username] = {}
			}
			let userProfile = updatedState[action.username]
			Object.keys(action.item).forEach((key) => {
				userProfile[key] = action.item[key]
			})
			return updatedState
		case ActionType.REMOVE_FOLLOWED:
			let deductedState = Object.assign({}, state)
			delete deductedState[action.username]
			return deductedState
		default:
			return state
	}
}

export function articles(state = {}, action) {
	switch(action.type) {
		case ActionType.ADD_ARTICLE_PART:
			let updatedState = Object.assign({}, state)
			if (!updatedState[action.articleId]) {
				updatedState[action.articleId] = {}
			}
			let article = updatedState[action.articleId]
			Object.keys(action.part).forEach((key) => {
				article[key] = action.part[key] 
			})
			// for (var property in action.part) {
			// 	article[property] = action.part[property]
			// }
			return updatedState
		default:
			return state
	}
}

export function custom(state = {filterWord:''}, action) {
	switch(action.type) {
		case ActionType.SET_FILTERWORD:
			return {...state, filterWord: action.filterWord}
		default:
			return state
	}
}


const Reducer = combineReducers({
	shared, landing, profile, followeds, articles, custom
})

export default Reducer