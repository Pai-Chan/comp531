//
// Inclass React ToDo Exercise
// ============================
//
// Using the views as described in our previous exercise
// re-implement the ToDo App using React.
// 
// Below you will transpile the h() function calls
// into JSX and implement ToDos.addTodo()
//
;(function() {

'use strict'

class ToDoItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            done: false
        }
    }

    render() { return (
        /*
        h("li", { id: `task${_taskId++}`}, [
            h("i", { className: "check glyphicon glyphicon-check", onClick: toggleDone }, []),
            h("span", { contentEditable: true, done: false }, typeof(text) === "string" ? text : ""),
            h("i", { className: "destroy glyphicon glyphicon-remove", onClick: removeTask }, []),
        ])
        */
        <li id={ this.props.id }>
            <i className="check glyphicon glyphicon-check" onClick={ () => this.toggleDone() }></i>
            <span contentEditable="true" className={ this.state.done ? "completed" : "" }>{ typeof(this.props.text) === "string" ? this.props.text : "" }</span>
            <i className="destroy glyphicon glyphicon-remove" onClick={ () => this.props.remove() }></i>
        </li>
    )}

    toggleDone() {
        if (this.state.done) {
            this.setState({done: false});
        } else {
            this.setState({done: true});
        }
    }

}

class ToDos extends React.Component {

    constructor(props) {
        super(props)
        this.nextId = 2;
        this.state = {
            todoItems: [
                {id:0, text:"This is an item"},
                {id:1, text:"Another item" }
            ]
        }
    }

    addTodo() {
        // IMPLEMENT ME!
        var inputBlank = document.getElementById("newTODO");
        const text = inputBlank.value;
        inputBlank.value = "";
        this.setState({ todoItems: [
                ...this.state.todoItems, 
                {id:this.nextId++, text}
            ]
        })
    }

    removeTodo(removeId) {
        this.setState({ 
            todoItems: this.state.todoItems.filter(({id, text}) => id != removeId)
        })
    }

    render() { return (
        /*
        <div>
            <ul className="todo">
                <ToDoItem key="1" text="Test Item" remove={() => this.removeTodo(1) } />
            </ul>
        </div>
        */
        // Hint: <input ... ref={ (node) => this.... = node } />
        /*
        h("div", { },
            h("input", { id: "newTODO", type: "text", placeholder: "To Do"}),
            h("button", { onClick: addItem }, "Add Item"),
            h("span", { className: "submit" }, [
                h("a", { href: "https://webdev-rice.herokuapp.com",
                     target: "_blank" }, "Submit your exercise"),
            ]),
            h("ul", { className: "todo" }, listItems)
        )
        */
        <div>
            <input id="newTODO" type="text" placeholder="To Do" />
            <button onClick={ () => this.addTodo() }>Add Item</button>
            <span className="submit">
                <a href="https://webdev-rice.herokuapp.com" target="_blank">Submit your exercise</a>
            </span>
            <ul className="todo">
                { this.state.todoItems.map((item) => <ToDoItem id={item.id} text={item.text} remove={() => this.removeTodo(item.id)} />)}
            </ul>
        </div>

    )}
}

ReactDOM.render(<ToDos/>, document.getElementById('app'));

})()
