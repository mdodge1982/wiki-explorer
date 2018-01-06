import React, {Component} from 'react';
import './Pages.css';
import Page from './Page';

class Pages extends Component {
	render() {
		return (
			<ul className="Pages">
				{this.props.pages.map(page => {
					return (<Page key={page.pageid} page={page}/>)
				})}
			</ul>
		);
	}
}

export default Pages;
