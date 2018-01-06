import React from 'react';
import Pages from './Pages';
import {Provider} from 'react-redux';
import store from '../store';
import renderer from 'react-test-renderer';

jest.mock('../actions/websocket');

test('Test render', () => {
	const pages = [
		{
			pageid: 1
		}, {
			pageid: 2
		}, {
			pageid: 3
		}
	];
	const component = renderer.create(
		<Provider store={store}>
			<Pages pages={pages}/>
		</Provider>
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();

});
