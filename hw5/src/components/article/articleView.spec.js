import React from 'react'
import { findDOMNode } from 'react-dom'
import TestUtils from 'react-addons-test-utils'

import { expect } from 'chai'
import { shallow } from 'enzyme'
import { ArticleView } from './articleView'
import { NewArticle } from './newArticle'
import Reducer from '../../reducers'

describe('ArticlesView (component tests)', () => {
	
	it('should render articles', () => {
		const articles = [
			{
				_id:1,
				text:'Text Content 1',
				author:'sep1',
				date:'2000-11-11T11:23:45.678Z',
				commentsShown: false,
				comments: []
			},
			{
				_id:2,
				text:'Text Content 2',
				author:'sep2',
				date:'2011-11-11T11:23:45.678Z',
				commentsShown: false,
				comments: []
			}			
		]
		const filterWord = ''
		const username = 'pc30test'
		const node = shallow(
			<ArticleView dispatch={_ => _} articles={articles} filterWord={filterWord} username={username} />
		)
		expect(node).to.exist
		expect(node.childAt(2).childAt(0).nodes[0].props.articleId).to.eql(2)
		expect(node.childAt(2).childAt(0).nodes[0].props.article).to.eql(articles[1])
		expect(node.childAt(2).childAt(1).nodes[0].props.articleId).to.eql(1)
		expect(node.childAt(2).childAt(1).nodes[0].props.article).to.eql(articles[0])
	})


	it('should dispatch actions to create a new article',() => {

		let state = undefined
		const dispatch = (action) => {
			state = Reducer(state, action)
		}
		dispatch({})
		let actionDispatched = false
		const node = TestUtils.renderIntoDocument(
			<div>
				<NewArticle dispatch={ _ => actionDispatched = true } username={'pc30test'} />
			</div>
		)
		const articleTextarea = findDOMNode(node).children[0].children[0].children[0]
		articleTextarea.value = 'This is a new article.'
		const postButton = findDOMNode(node).children[0].children[0].children[5]
		TestUtils.Simulate.click(postButton)
		expect(actionDispatched).to.be.true
	})
})