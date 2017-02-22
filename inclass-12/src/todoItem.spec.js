import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { findDOMNode } from 'react-dom'
import { expect } from 'chai'

import { ToDoItem } from './todoItem'

const findByClassname = (children, classname) => {
    const result = Array.prototype.filter.call(children, it => it.className.indexOf(classname) >= 0)
    return result.length ? result[0] : null
}

describe('Validate ToDoItem', () => {

    it('should display a single ToDo with text', () => {
        // use TestUtils.renderIntoDocument
        // findDOMNode and assert 3 children of the ToDoItem element
        // assert the innerHTML of the todo is the text you initially set
        const myDiv = TestUtils.renderIntoDocument(
            <div>
                <ToDoItem id={0} text={"My own test"} done={false} toggle={_ => _} remove={_ => _}/>
            </div>
        )

        const myToDoItem = findDOMNode(myDiv).children[0]

        expect(myToDoItem.children.length).to.equal(3)
        expect(myToDoItem.children[1].innerHTML).to.equal("My own test")
    })

    it('should display a single ToDo with no classname', () => {
        // use TestUtils.renderIntoDocument
        // findDOMNode and assert 3 children of the ToDoItem element
        // assert there is no child with classname 'completed'

        const myDiv = TestUtils.renderIntoDocument(
            <div>
                <ToDoItem id={0} text={"My own test"} done={false} toggle={_ => _} remove={_ => _}/>
            </div>
        )

        const myToDoItem = findDOMNode(myDiv).children[0]

        expect(myToDoItem.children.length).to.equal(3)
        expect(myToDoItem.children[1].className).to.not.equal("completed")

    })

    it('should toggle completed when clicked', () => {
        let toggled = false
        // use TestUtils.renderIntoDocument
        // when the checkbox is clicked via TestUtils.Simulate.click()
        // we expect the variable toggled to be true

        const myDiv = TestUtils.renderIntoDocument(
            <div>
                <ToDoItem id={0} text={"My own test"} done={false} toggle={() => { toggled = true }} remove={_ => _} />
            </div>
        )

        const myToDoItem = findDOMNode(myDiv).children[0]

        expect(toggled).to.be.false
        TestUtils.Simulate.click(myToDoItem.children[0])
        expect(toggled).to.be.true

    })

    it('should remove an item when clicked', () => {
        let removed = false
        // use TestUtils.renderIntoDocument
        // when the remove button is clicked via TestUtils.Simulate.click()
        // we expect the variable removed to be true

        const myDiv = TestUtils.renderIntoDocument(
            <div>
                <ToDoItem id={0} text={"My own test"} done={false} toggle={() => {_ = _}} remove={() => {removed = true}} />
            </div>
        )

        const myToDoItem = findDOMNode(myDiv).children[0]

        expect(removed).to.be.false
        TestUtils.Simulate.click(myToDoItem.children[2])
        expect(removed).to.be.true

    })

    it('should display a completed ToDo', () => {
        // use TestUtils.renderIntoDocument
        // the item should have done=true
        // assert that the rendered className is "completed"

        const myDiv = TestUtils.renderIntoDocument(
            <div>
                <ToDoItem id={0} text={"My own test"} done={true} toggle={() => {_ = _}} remove={() => {removed = true}} />
            </div>
        )

        const myToDoItem = findDOMNode(myDiv).children[0]        

        expect(myToDoItem.children[1].className).to.equal("completed")

    })

})
