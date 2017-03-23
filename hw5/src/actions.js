import fetch from 'isomorphic-fetch'
import Promise from 'bluebird'

const ActionType = {
	NAV2MAIN: 'NAV2MAIN',
	NAV2LANDING: 'NAV2LANDING',
	NAV2PROFILE: 'NAV2PROFILE',
    ERRORMESSAGE: 'ERRORMESSAGE',
    SUCCESSMESSAGE: 'SUCCESSMESSAGE',
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    SET_PROFILE_ITEM: 'SET_PROFILE_ITEM',
    ADD_FOLLOWED_ITEM: 'ADD_FOLLOWED_ITEM',
    REMOVE_FOLLOWED: 'REMOVE_FOLLOWED',
    ADD_ARTICLE_PART: 'ADD_ARTICLE_PART',
    CLEAR_ALL_ARTICLES: 'CLEAR_ALL_ARTICLES',
    SET_FILTERWORD: 'SET_FILTERWORD'
}


export function getAction(type, otherStatesObj) {
    const typeObj = type instanceof Object ? type : {type};
    return Object.assign(typeObj, otherStatesObj)
}

// fetch function from slide to get http resource,
// for this assignment, we don't make http calls,
// so the effective statements are commented.

export const url = 'https://webdev-dummy.herokuapp.com'

export function resource(method, endpoint, payload){

    const options =  {
        method,
        credentials: 'include',
        headers: {'Content-Type': 'application/json'}
    }
    
    if (payload) options.body = JSON.stringify(payload)

    return fetch(`${url}/${endpoint}`, options)
    .then(response => {
        if (response.status === 200) {
            if (response.headers.get('Content-Type').indexOf('json') > 0) {
                return response.json()
            }else {
                return response.text()
            }
        } else {
            throw new Error()
        }
    })
}

export default ActionType