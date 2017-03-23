import { expect } from 'chai'
import mockery from 'mockery'
import fetch, {mock} from 'mock-fetch'

import ActionType from '../../actions'
import Reducer from '../../reducers'

describe('Validate Authentication (involves mocked requests)', () => {

	let url, actLogin, actLogout
	
	beforeEach(() => {
		if(mockery.enable) {
			mockery.enable({warnOnUnregistered: false, useCleanCache:true})
			mockery.registerMock('node-fetch', fetch)
			require('node-fetch')
  		}
  		url = require('../../actions').url
  		actLogin = require('./authActions').actLogin
  		actLogout = require('./authActions').actLogout
	})

	afterEach(() => { 
  		if (mockery.enable) {
			mockery.deregisterMock('node-fetch')
			mockery.disable()
  		}
	})


	it('should not log in an invalid user', (done)=> {

		mock(`${url}/login`, {
			method: 'POST',
			headers: {'Content-Type':'application/json'},
			json: 'Unauthorized'
		})

		let state = undefined
		const dispatch = (action) => {
			state = Reducer(state, action)
		}
		dispatch({})
		const username = 'pc30test'
		const password = 'wrong-password'

		actLogin(username, password)(dispatch)
		.then(() => {
			expect(state.shared.errorMessage).to.eql('Username or password is wrong.')
		})
		.then(done)
		.catch(done)
	})

	
	it('should log in a user', (done) => {

		const username = 'pc30test'
		const password = 'center-each-train'

		mock(`${url}/login`, {
			method: 'POST',
			headers: {'Content-Type':'application/json'},
			json: {username, result: 'success'}
		})

		let state = undefined
		const dispatch = (action) => {
			state = Reducer(state, action)
		}
		dispatch({})

		actLogin(username, password)(dispatch)
		.then(() => {
			expect(state.landing.username).to.eql(username)
		})
		.then(done)
		.catch(done)
	})


	it('should log out a user (state should be cleared)', (done)=> {

		const username = 'pc30test'
		const password = 'center-each-train'

		mock(`${url}/login`, {
			method: 'POST',
			headers: {'Content-Type':'application/json'},
			json: {username, result: 'success'}
		})
		mock(`${url}/logout`, {
			method: 'PUT',
			headers: {'Content-Type': 'application/json'},
			json: 'OK'
		})

		let state = undefined
		const dispatch = (action) => {
			state = Reducer(state, action)
		}
		dispatch({})

		actLogin(username, password)(dispatch)
		.then(() => {
			actLogout()(dispatch)
			.then(() => {
				expect(state.landing.username).to.eql('')
			})
		})
		.then(done)
		.catch(done)



		
	})
})