import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Page.css';

class ProjectComponent extends Component {
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

const Project = connect()(ProjectComponent);

export default Project;
