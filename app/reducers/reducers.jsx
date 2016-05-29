var moment = require('moment');
var uuid = require('node-uuid');

export var searchTextReducer = (state = '', action) => {
	switch (action.type) {
		case 'SET_SEARCH_TEXT':
			return action.searchText;
		default:
			return state;
	};
};

export var showCompletedReducer = (state = false, action) => {
	switch (action.type) {
		case 'TOGGLE_SHOW_COMPLETED':
			return !state;
		default:
			return state;
	};
};

export var todosReducer = (state = [], action) => {
	switch (action.type) {
		case 'ADD_TODO':
			return [
				...state,
				{
					id: uuid(),
					text: action.text,
					completed: false,
					createdAt: moment().unix(),
					completedAt: undefined,
					edit: false,
					edited: false,
					editedAt: undefined
				}
			];
		case 'TOGGLE_TODO':
			return state.map((todo) => {
				if (todo.id === action.id) {
					var nextCompleted = !todo.completed;
					return {
						...todo,
						completed: nextCompleted,
						completedAt: nextCompleted ? moment().unix() : undefined
					};

				} else {
					return todo;
				}
			});
		case 'ADD_TODOS':
			return [
				...state,
				...action.todos
			];
		case 'EDIT_TODO':
			return state.map((todo) => {
				if (todo.id === action.id) {
					if (action.text.length > 0) {
						return {
							...todo,
							edit: !todo.edit,
							edited: true,
							editedAt: moment().unix(),
							text: action.text,
						}
					} else {
						return {
							...todo,
							edit: !todo.edit
						}
					}
				} else {
					return todo;
				}
			});
		case 'DELETE_TODO':
			var deleteIndex;
			state.map((todo) => {
				if (todo.id === action.id) {
					deleteIndex = state.indexOf(todo);
				}
			});
			var todos = [
				...state.slice(0,deleteIndex),
				...state.slice(deleteIndex+1)
			];
			return todos;

		default:
			return state;
	}

};


