import React from 'react';
import Loading from './Loading';
import renderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils';

test('Loader starts empty', () => {
	const component = renderer.create(<Loading/>);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();

});

test('Loader adds dots', () => {

	jest.useFakeTimers();

	const component = ReactTestUtils.renderIntoDocument(<Loading/>)
	jest.runTimersToTime(100);
	expect(component.state.content).toEqual('.');
	jest.runTimersToTime(100);
	expect(component.state.content).toEqual('..');
	jest.runTimersToTime(100);
	expect(component.state.content).toEqual('...');

});
