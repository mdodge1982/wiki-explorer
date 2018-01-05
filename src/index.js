import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import './index.css';
import reducer from './reducers';
import Projects from './components/Projects';

let store = createStore(
	reducer,
	applyMiddleware(thunk)
);

render(
	<Provider store={store}>
		<Projects />
	</Provider>,
	document.getElementById('root')
);
