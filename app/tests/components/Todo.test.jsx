var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var Todo = require('Todo');

describe('Todo', () => {
	it('Should exist', () => {
		expect(Todo).toExist();
	});

	it('Should call onToggle prop with an id on click', () => {
		var todoData = {
			id: 100,
			text: 'Test',
			completed: true
		};
		var spy = expect.createSpy();
		var todo = TestUtils.renderIntoDocument(<Todo {...todoData} onToggle={spy}/>)
	});
});