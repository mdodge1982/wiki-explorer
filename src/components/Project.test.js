import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import Project from './Project';
import {Provider} from 'react-redux';
import store from '../store';
import renderer from 'react-test-renderer';

jest.mock('../actions/websocket');

test('Test render', () => {
	store.dispatch({
		type: 'PROJECT.LIST',
		data: ['My Fun Project']
	});
	const component = renderer.create(
		<Provider store={store}>
			<Project projectName="My Fun Project" />
		</Provider>
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();

});

test('Click selects project', () => {
	const component = ReactTestUtils.renderIntoDocument(
		<Provider store={store}>
			<Project projectName="My Fun Project" />
		</Provider>
	);
	const h4 = ReactTestUtils.findRenderedDOMComponentWithTag(component,'h4');
	ReactTestUtils.Simulate.click(h4);
	expect(store.getState().byName.selected).toEqual('My Fun Project');
});
