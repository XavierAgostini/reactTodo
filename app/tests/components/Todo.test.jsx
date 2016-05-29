var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jquery');
var TestUtils = require('react-addons-test-utils');

var {Todo} = require('Todo');

describe('Todo', () => {
	it('Should exist', () => {
		expect(Todo).toExist();
	});

	it('Should dispatch toggleTodo action on click', () => {
		var todoData = {
			id: 100,
			text: 'Test',
			completed: true
		};
		var spy = expect.createSpy();
		var todo = TestUtils.renderIntoDocument(<Todo {...todoData} dispatch={spy}/>)
		var $el = $(ReactDOM.findDOMNode(todo));

		TestUtils.Simulate.click($el[0]);

		expect(spy).toHaveBeenCalledWith({
			type: 'TOGGLE_TODO',
			id: todoData.id
		});
	});

	it('Should dispatch deleteTodo action on deleted button click', () => {
		var todoData = {
			id: 100,
			text: 'Test',
			completed: true
		};
		var spy = expect.createSpy();
		var todo = TestUtils.renderIntoDocument(<Todo {...todoData} dispatch={spy}/>)
		var $el = $(ReactDOM.findDOMNode(todo));
		
		expect(todo.refs.delBtn).toExist();
		TestUtils.Simulate.click(todo.refs.delBtn);
		expect(spy).toHaveBeenCalledWith({
			type: 'DELETE_TODO',
			id: todoData.id
		});
	})
});