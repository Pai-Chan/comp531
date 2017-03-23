import { expect } from 'chai'
import mockery from 'mockery'
import fetch, {mock} from 'mock-fetch'

import ActionType from '../../actions'
import Reducer from '../../reducers'

describe('Validate Article actions', () => {
	
	let resource, url, filterArticles
	
	beforeEach(() => {
		if(mockery.enable) {
			mockery.enable({warnOnUnregistered: false, useCleanCache:true})
			mockery.registerMock('node-fetch', fetch)
			require('node-fetch')
  		}
		resource = require('../../actions').resource
  		url = require('../../actions').url
  		filterArticles = require('./articleActions').filterArticles
	})

	afterEach(() => { 
  		if (mockery.enable) {
			mockery.deregisterMock('node-fetch')
			mockery.disable()
  		}
	})


	it('should fetch articles (mocked request)', (done)=>{

		mock(`${url}/articles`, {
			method: 'GET',
			headers: {'Content-Type':'application/json'},
			json: {articles:[]}
		})

		resource('GET', `articles`)
		.then((res) => {
			expect(res).to.eql({articles:[]})
		})
		.then(done)
		.catch(done)
	})


	it('should update the search keyword',()=> {
		const filterWord = 'hello'
		
		let state = undefined
		const dispatch = (action) => {
			state = Reducer(state, action)
		}
		dispatch({})
		filterArticles(filterWord)(dispatch)
		expect(state.custom.filterWord).to.eql('hello')
	})
})