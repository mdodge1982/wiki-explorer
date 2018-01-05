import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Page.css';

class PageComonent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false
		};
	}
	render() {
		return (
			<li className="Page"><h5>{this.props.page.title}</h5></li>
		);
	}
}

const Page = connect()(PageComonent);

export default Page;
