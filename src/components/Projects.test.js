import React from 'react';
import Projects from './Projects';
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
			<Projects />
		</Provider>
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();

});
