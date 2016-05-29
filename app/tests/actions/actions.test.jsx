var expect = require('expect');
var actions = require('actions');

describe('Actions', () => {
	it('Should generate search text action', () => {
		var action = {
			type: 'SET_SEARCH_TEXT',
			searchText: 'Some search text'
		};
		var res = actions.setSearchText(action.searchText);

		expect(res).toEqual(action);
	});

	it('Should generate add todo action', () => {
		var action = {
			type: 'ADD_TODO',
			text: 'Thing to do'
		};
		var res = actions.addTodo(action.text);
		expect(res).toEqual(action);
	});
	
	it('Should generate toggleShowCompleted action', () => {
		var action = {
			type: 'TOGGLE_SHOW_COMPLETED'
		};
		var res = actions.toggleShowCompleted();
		expect(res).toEqual(action);
	});
	
	it('Should generate add todos action object', () => {
		var todos = [{
			id: '111',
			text: 'anything',
			completed: false,
			completedAt: undefined,
			createdAt: 33000
		}];
		var action = {
			type: 'ADD_TODOS',
			todos
		};
		var res = actions.addTodos(todos);

		expect(res).toEqual(action);
	});

	it('Should generate toggleTodo action', () => {
		var action = {
			type: 'TOGGLE_TODO',
			id: 1
		};
		var res = actions.toggleTodo(action.id);
		expect(res).toEqual(action);
	});
	
	it('Should generate deleteTodo action', () => {
		var todos = [{
			id: '1',
			text: 'anything',
			completed: false,
			completedAt: undefined,
			createdAt: 33000
		}, {
			id: '2',
			text: 'test2',
			completed: false,
			completedAt: undefined,
			createdAt: 33000
		}, {
			id: '3',
			text: 'test3',
			completed: false,
			completedAt: undefined,
			createdAt: 33000
		}];

		var action = {
			type: 'DELETE_TODO',
			id: 1
		};
		var res = actions.deleteTodo(action.id);
		expect(res).toEqual(action);
	});

	it('Should generate editTodo action', () => {
		var todo = {
			id: '1',
			text: 'anything',
			completed: false,
			completedAt: undefined,
			createdAt: 33000,
			edit: false,
			edited: false,
			editedAt: undefined
		};
		var action = {
			type: 'EDIT_TODO',
			id: '1',
			text: 'todo has been edidted'
		};
		var res = actions.editTodo(action.id, action.text);
		expect(res).toEqual(action);	
	});
});