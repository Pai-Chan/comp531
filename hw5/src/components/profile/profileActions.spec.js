import { expect } from 'chai'
import mockery from 'mockery'
import fetch, {mock} from 'mock-fetch'
import ActionType from '../../actions'
import Reducer from '../../reducers'
import Promise from 'bluebird'

describe('Validate Profile actions (mocked requests)', () => {
	let url, resource, updateHeadline, getProfileItems
	beforeEach(() => {
		if(mockery.enable) {
			mockery.enable({warnOnUnregistered: false, useCleanCache:true})
			mockery.registerMock('node-fetch', fetch)
			require('node-fetch')
  		}
  		url = require('../../actions').url
		resource = require('../../actions').resource
  		getProfileItems = require('./profileActions').getProfileItems
  		updateHeadline = require('./profileActions').updateHeadline
	})

	afterEach(() => { 
  		if (mockery.enable) {
			mockery.deregisterMock('node-fetch')
			mockery.disable()
  		}
	})

	it("should fetch the user's proile information", (done)=>{
		
		const username = 'pc30test'
		const testValueAvatar = 'http://localhost/avatar.jpg'
		const testValueEmail = 'test@rice.edu'
		const testValueZipcode = '77005'
		const testValueDob = '842309883292.691'
		const testValueHeadline = 'This is a headline'

		mock(`${url}/avatars/${username}`, {
			method: 'GET',
			headers: {'Content-Type':'application/json'},
			json:{avatars: [{avatar: testValueAvatar}]}
		})
		mock(`${url}/email/${username}`, {
			method: 'GET',
			headers: {'Content-Type':'application/json'},
			json:{email: testValueEmail}
		})
		mock(`${url}/zipcode/${username}`, {
			method: 'GET',
			headers: {'Content-Type':'application/json'},
			json:{zipcode: testValueZipcode}
		})
		mock(`${url}/dob`, {
			method: 'GET',
			headers: {'Content-Type':'application/json'},
			json:{dob: testValueDob}
		})
		mock(`${url}/headlines/${username}`, {
			method: 'GET',
			headers: {'Content-Type':'application/json'},
			json:{headlines: [{headline: testValueHeadline}]}
		})
		let state = undefined
		const dispatch = (action) => {
			state = Reducer(state, action)
		}
		dispatch({})

		try {
			getProfileItems(username)(dispatch)
			.then(() => {
				expect(state.profile.avatar).to.eql(testValueAvatar)
				expect(state.profile.email).to.eql(testValueEmail)
				expect(state.profile.zipcode).to.eql(testValueZipcode)
				expect(state.profile.dobTimestamp).to.eql(testValueDob)
				expect(state.profile.headline).to.eql(testValueHeadline)
				done()
			})
		} catch (e) {
			done(e)
		}
	})

	
	it('should update headline',(done)=> {
		const username = 'pc30test'
		const headline = 'This is a new headline.'

		mock(`${url}/headline`, {
			method: 'PUT',
			headers: {'Content-Type':'application/json'},
			json: {headline}
		})

		let state = undefined
		const dispatch = (action) => {
			state = Reducer(state, action)
		}
		dispatch({})

		updateHeadline(headline)(dispatch)
		.then(() => {
			expect(state.profile.headline).to.eql(headline)
		})
		.then(done)
		.catch(done)

	})
})