import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPage} from '../actions';
import './Page.css';

class PageComonent extends Component {
	render() {
		return (
			<li className="Page"><h5 onClick={() => this.handleClick()}>{this.props.page.title}</h5></li>
		);
	}
	handleClick() {
		this.props.dispatch(fetchPage(this.props.page));
	}
}

const Page = connect()(PageComonent);

export default Page;
