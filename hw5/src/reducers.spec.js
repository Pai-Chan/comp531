import {expect} from 'chai'

import ActionType from './actions'
import Reducer, {shared, articles, custom} from './reducers'
import {sortByTimeAndArrayize, filterShownArticles} from './components/article/articleActions'

describe('Validate reducer (no fetch requests here)', () => {

	it('should initialize state', () => {
		expect(Reducer(undefined, {})).to.eql({
			shared: {location:'', errorMessage:'', successMessage:''},
			landing: {username:''},
			profile: {},
			followeds:{},
			articles: {},
			custom: {filterWord:''}
		})
	})

	it('should state success (for displaying success message to user)', () => {
		const successMessage = 'This is a success message.'
		expect(shared(undefined, {type:ActionType.SUCCESSMESSAGE, message:successMessage }))
		.to.eql({location:'', errorMessage:'', successMessage:successMessage})
	})

	it('should state error (for displaying error message to user)',() => {
		const errorMessage = 'This is an error message.'
		expect(shared(undefined,{type:ActionType.ERRORMESSAGE, message:errorMessage}))
		.to.eql({location:'', errorMessage:errorMessage, successMessage:''})
	})


	it('should set the articles',() => {
		const article = {
			_id:1, 
			text:'Text Content', 
			author:'sep1', 
			date:'2000-11-11T11:23:45.678Z', 
			commentsShown: false
		}
		const result = {}
		result[article._id] = article
		expect(articles(undefined,{type:ActionType.ADD_ARTICLE_PART, articleId: 1, part: article}))
		.to.eql(result)
	})


	it('should set the search keyword',() => {
		expect(custom(undefined,{type:ActionType.SET_FILTERWORD, filterWord:'Hello World'}))
		.to.eql({filterWord:'Hello World'})
	})


	it('should filter displayed articles by the search keyword',() => {
		const article1 = {_id:1,
			text:'One Text Content',
			author:'sep1',
			date:'2000-11-11T11:23:45.678Z',
			commentsShown: false
		}
		const article2 = {_id:2,
			text:'Another Text Content',
			author:'sep2',
			date:'2000-12-12T11:23:45.678Z',
			commentsShown: false
		}
		const filterWord = 'Another'
		const stateAfterArticle1 = Reducer(undefined,{type:ActionType.ADD_ARTICLE_PART, articleId: article1._id,
			part: article1})
		const stateAfterArticle2 = Reducer(stateAfterArticle1,{type:ActionType.ADD_ARTICLE_PART, articleId: article2._id,
			part: article2})
		const stateAfterSetFilterWord = Reducer(stateAfterArticle2, {type:ActionType.SET_FILTERWORD, filterWord:filterWord})
		const articlesAntiChron = sortByTimeAndArrayize(stateAfterSetFilterWord.articles)
		const shownArticlesList = filterShownArticles(articlesAntiChron, stateAfterSetFilterWord.custom.filterWord)		
		expect(shownArticlesList).to.eql(
			[article2]
		)
	})
})