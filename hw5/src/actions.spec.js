import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

import ActionType, {} from './actions'
import Reducer, {shared} from './reducers'


describe('Validate actions (these are functions that dispatch actions)', () => {

	let resource, url	

	beforeEach(() => {
		if(mockery.enable) {
			mockery.enable({warnOnUnregistered: false, useCleanCache:true})
			mockery.registerMock('node-fetch', fetch)
			require('node-fetch')
  		}
  		resource = require('./actions').resource
  		url = require('./actions').url
	})

	afterEach(() => {
  		if (mockery.enable) {
			mockery.deregisterMock('node-fetch')
			mockery.disable()
  		}
	})
	
	it('resource should be a resource (i.e., mock a request)', (done)=> {
		mock(`${url}/sample`, {
			method: 'GET',
			headers: {'Content-Type':'application/json'},
			json: {articles: [
				{_id:1,text:'One Text Content',author:'sep1',date:'2000-11-11T11:23:45.678Z',commentsShown: false},
				{_id:2,text:'Two Text Content',author:'sep2',date:'2000-11-11T11:23:45.678Z',commentsShown: false},
			]}
		})
		resource('GET', 'sample').then((response) => {
			expect(response).to.exist
			expect(response).to.to.be.an('object')
		})
		.then(done)
		.catch(done)
	})


	it('resource should give me the http error', (done)=> {

		resource('POST', 'invalid_endpoint').catch((err) => {
			expect(err).to.exist;
		})
		.then(done)
		.catch(done)
	})


	it('resource should be POSTable', (done)=> {
		const username = 'pc30'
		const password = 'thisispassword'
		
		mock(`${url}/login`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			json: {username, result:"success"}
		})

		resource('POST', 'login', {username, password}).then((response) => {
			expect(response).to.eql({username: 'pc30', result: 'success'})
		})
		.then(done)
		.catch(done)
	})


	it('should update error message (for displaying error mesage to user)', ()=>{
		const errorMessage1 = 'This is an error message.'
		const action1 = {
			type: ActionType.ERRORMESSAGE,
			message: errorMessage1
		}
		const errorMessage2 = 'This is another error message.'
		const action2 = {
			type: ActionType.ERRORMESSAGE,
			message: errorMessage2
		}
		const stateAfterErrorMessage1 = shared(undefined, action1)
		expect(stateAfterErrorMessage1.errorMessage).to.eql(action1.message);
		const stateAfterErrorMessage2 = shared(stateAfterErrorMessage1, action2)
		expect(stateAfterErrorMessage2.errorMessage).to.eql(action2.message);
	})


	it('should update success message (for displaying success message to user)', ()=>{
		const successMessage1 = 'This is a success message.'
		const action1 = {
			type: ActionType.SUCCESSMESSAGE,
			message: successMessage1
		}
		const successMessage2 = 'This is another success message.'
		const action2 = {
			type: ActionType.SUCCESSMESSAGE,
			message: successMessage2
		}
		const stateAfterSuccessMessage1 = shared(undefined, action1)
		expect(stateAfterSuccessMessage1.successMessage).to.eql(action1.message);
		const stateAfterSuccessMessage2 = shared(stateAfterSuccessMessage1, action2)
		expect(stateAfterSuccessMessage2.successMessage).to.eql(action2.message);
	})


	it('should navigate (to profile, main, or landing)', ()=>{
		const stateAfterNav2Profile = shared(undefined, {type: ActionType.NAV2PROFILE})
		expect(stateAfterNav2Profile.location).to.eql('PROFILE_PAGE')
		const stateAfterNav2Main = shared(stateAfterNav2Profile, {type: ActionType.NAV2MAIN})
		expect(stateAfterNav2Main.location).to.eql('MAIN_PAGE')
		const stateAfterNav2Landing = shared(stateAfterNav2Main, {type: ActionType.NAV2LANDING})
		expect(stateAfterNav2Landing.location).to.eql('LANDING_PAGE')
	})
})