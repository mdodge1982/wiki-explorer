import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import PageDetail from './PageDetail';
import {Provider} from 'react-redux';
import store from '../store';
import {selectPage} from '../actions';
import renderer from 'react-test-renderer';

jest.mock('../actions/websocket');

const page = {
	"pageid": 9020,
	"title": "Daisy Duck",
	"pagelanguage": "en",
	"pagelanguagedir": "ltr",
	"length": 37954,
	"lastrevid": 797710133,
	"revisions": [
		{
			"revid": 797710133,
			"parentid": 797709597,
			"user": "XXX.YYY.ZZZ.WWW",
			"timestamp": "2017-08-28T19:03:35Z",
			"comment": "Test Comment"
		}
	]
};

test('Test render', () => {
	store.dispatch(selectPage(page));
	const component = renderer.create(
		<Provider store={store}>
			<PageDetail/>
		</Provider>
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();

});

test('Button closes modal', () => {
	expect(store.getState().selectedPage.pageid).toEqual(9020);
	const component = ReactTestUtils.renderIntoDocument(
		<Provider store={store}>
			<PageDetail/>
		</Provider>
	);
	const button = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'button');
	ReactTestUtils.Simulate.click(button);
	expect(store.getState().selectedPage.pageid).toBeUndefined();
});
