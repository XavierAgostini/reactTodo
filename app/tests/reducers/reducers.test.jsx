var expect = require('expect');
var df = require('deep-freeze-strict');

var reducers = require('reducers');

describe('Reducers', () => {
	describe('searchTextReducer', () => {
		it('Should set searchText', () => {
			var action = {
				type: 'SET_SEARCH_TEXT',
				searchText: 'dog'
			};
			var res = reducers.searchTextReducer(df(''), df(action));
			expect(res).toEqual(action.searchText);
		});
	});

	describe('showCompletedReducer', () => {
		it('Should toggle showCompleted', () => {
			var action = {
				type: 'TOGGLE_SHOW_COMPLETED'
			};
			var res = reducers.showCompletedReducer(df(false), df(action));
			expect(res).toEqual(true);
		});
	});

	describe('todosReducer', () => {
		it('Should add new todo', () => {
			var action = {
				type: 'ADD_TODO',
				text: 'walk the dog'
			};
			var res = reducers.todosReducer(df([]), df(action));
			expect(res.length).toEqual(1);
			expect(res[0].text).toEqual(action.text);
		});

		it('Should toggle todo completed', () => {
			var todos = [{
				id: '123',
				text: 'something',
				completed: true,
				createdAt: 123,
				completedAt: 125
			}];
			var action = {
				type: 'TOGGLE_TODO',
				id: '123'
			};

			var res = reducers.todosReducer(df(todos), df(action));
			expect(res[0].completed).toEqual(false);
			expect(res[0].completedAt).toEqual(undefined);
		});

		it('Should add existing todos', () => {
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

			var res = reducers.todosReducer(df([]), df(action));
			expect(res.length).toEqual(1);
			expect(res[0]).toEqual(todos[0]);
		});

		it('Should delete selected todo', () => {
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
				id: '1'
			}
			var res = reducers.todosReducer(todos, df(action));
			expect(res[0].id).toEqual('2');
		});
	});
});