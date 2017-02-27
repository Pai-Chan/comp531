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
    SET_FILTERWORD: 'SET_FILTERWORD'
}


export function getAction(type, otherStatesObj) {
    var typeObj
    if (type instanceof Object) {
        typeObj = type;
    } else {
        typeObj = {type}
    }
    return Object.assign(typeObj, otherStatesObj)
}

// fetch function from slide to get http resource,
// for this assignment, we don't make http calls,
// so the effective statements are commented.

export function resource(method, endpoint, payload){

    // let url = 'http://localhost:8080'

    // const options =  {
    //     method,
    //     credentials: 'include',
    //     headers: {'Content-Type': 'application/json'}
    // }
    
    // if (payload) options.body = JSON.stringify(payload)

    // return fetch(`${url}/${endpoint}`, options)
    // .then(response => {
    //     if (response.status === 200) {
    //         if (response.headers.get('Content-Type').indexOf('json') > 0) {
    //             return response.json()
    //         }else {
    //             return response.text()
    //         }
    //     } else {
    //         //throw new Error(response.statusText)

    //         //even if no found, we get and return this 404 response
    //         // we don't mind it because it is not used for testing phase
    //         return response 
    //     }
    // })
    return Promise.all([])
}

export default ActionType