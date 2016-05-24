var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

import {configure} from 'configureStore';
import ConnectedTodoList, {TodoList} from 'TodoList';
import ConnectedTodo, {Todo} from 'Todo';

describe('TodoList', () => {
	it('Should exist', () => {
		expect(TodoList).toExist();
	});

	it('Should render one Todo component for each todo item', () => {
		var todos =[{
			id:1,
			text:'test1',
			completed: false,
			completedAt: undefined,
			createdAt: 500
		}, {
			id:2,
			text:'test2',
			completed: false,
			completedAt: undefined,
			createdAt: 500
		}];
		var store = configure({
			todos
		});
		var provider = TestUtils.renderIntoDocument(
			<Provider store={store}>
				<ConnectedTodoList/>
			</Provider>
		);

		var todoList = TestUtils.scryRenderedComponentsWithType(provider, ConnectedTodoList)[0];
		var todosComponents = TestUtils.scryRenderedComponentsWithType(todoList, ConnectedTodo);

		expect(todosComponents.length).toBe(todos.length);
	});

	it('Should render empty message if no todos', () => {
		var todos = [];
		var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos}/>);
		var $el = $(ReactDOM.findDOMNode(todoList));

		expect($el.find('.container__message').length).toBe(1);
	});
});