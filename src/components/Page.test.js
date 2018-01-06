import React from 'react';
import Page from './Page';
import {Provider} from 'react-redux';
import store from '../store';
import renderer from 'react-test-renderer';

jest.mock('../actions/websocket');

test('Test render', () => {
	const page = {
		title: 'Test Title'
	}
	const component = renderer.create(
		<Provider store={store}>
			<Page page={page}/>
		</Provider>
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();

});
