var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

var TodoApp = require('TodoApp');

var actions = require('actions');
var store = require('configureStore').configure();
var TodoAPI = require('TodoAPI');

store.subscribe(() => {
	var state = store.getState();
	console.log('New state', store.getState());
	TodoAPI.setTodos(state.todos);
});

// var initialTodos = {text: 'hi'};//TodoAPI.getTodos();
store.dispatch(actions.toggleShowCompleted());
// store.dispatch(actions.addTodos())
store.dispatch(actions.addTodo('hi'));
store.dispatch(actions.addTodo('salut'));
store.dispatch(actions.addTodo('test'));
// Load foundation
$(document).foundation();

// Load app.css
require('style!css!sass!applicationStyles');

ReactDOM.render(
	<Provider store={store}>
		<TodoApp/>
	</Provider>,
	document.getElementById('app')
);
