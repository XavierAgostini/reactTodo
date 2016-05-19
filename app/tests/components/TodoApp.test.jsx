var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var TodoApp = require('TodoApp');

describe('TodoApp', () => {
	it('Should exist', () => {
		expect(TodoApp).toExist();
	});

	it('Should add todo to the todos state on handleAddTodo', ()=> {
		var todoText = 'test text';
		var todoApp = TestUtils.renderIntoDocument(<TodoApp/>);

		todoApp.setState({todos: []});
		todoApp.handleAddTodo(todoText);

		expect(todoApp.state.todos[0].text).toBe(todoText);
	});

	it('Should toggle completed value when handleToggle called', () => {
		var todoData = {
			id: 11,
			text: 'Test Features',
			completed: false
		};
		var todoApp = TestUtils.renderIntoDocument(<TodoApp/>);
		todoApp.setState({todos: [todoData]});
		
		var firstTodo = todoApp.state.todos[0];
		expect(firstTodo.completed).toBe(false);
		todoApp.handleToggle(11);
		expect(firstTodo.completed).toBe(true);
	});
});