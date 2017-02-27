import Promise from 'bluebird'

import ActionType, { resource } from '../../actions'

//logout clear current shared info and navigate to landing page
export const actLogout = () => {
	return (dispatch) => {
		dispatch({type:ActionType.LOGOUT})
		dispatch({type:ActionType.NAV2LANDING})
	}
}

//update the headline status
export const setHeadline = (headline) => {
	return (dispatch) => {
		dispatch({type: ActionType.SET_PROFILE_ITEM, profile:{headline}})
	}
}