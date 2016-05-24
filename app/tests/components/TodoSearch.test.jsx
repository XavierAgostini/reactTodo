var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

import {TodoSearch} from 'TodoSearch';
describe('TodoSearch', () => {
	it('Should exist', () => {
		expect(TodoSearch).toExist();
	});

	it('Shoulddispatch SET_SEARCH_TEXT on input change', () => {
		var searchText = 'Dog';
		var action = {
			type: 'SET_SEARCH_TEXT',
			searchText
		};
		var spy = expect.createSpy();
		var todoSearch = TestUtils.renderIntoDocument(<TodoSearch dispatch={spy}/>);

		todoSearch.refs.searchText.value = searchText;
		TestUtils.Simulate.change(todoSearch.refs.searchText);

		expect(spy).toHaveBeenCalledWith(action);
	});

	it('Should dispatch TOGGLE_SHOW_COMPLETED when checkbox checked', () => {
		var spy = expect.createSpy();
		var action = {
			type: 'TOGGLE_SHOW_COMPLETED',
		};
		var todoSearch = TestUtils.renderIntoDocument(<TodoSearch dispatch={spy}/>);

		todoSearch.refs.showCompleted.checked = true;
		TestUtils.Simulate.change(todoSearch.refs.showCompleted);

		expect(spy).toHaveBeenCalledWith(action);
	});
})