import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import Projects from './components/Projects';
import './index.css';

render(
	<Provider store={store}>
		<Projects />
	</Provider>,
	document.getElementById('root')
);
