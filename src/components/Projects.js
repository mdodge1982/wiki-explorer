import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Projects.css';
import {listentoSocket,fetchProjects} from '../actions';
import Project from './Project';
import PageDetail from './PageDetail';

class ProjectsComponent extends Component {
	constructor(props) {
		super(props);
		props.dispatch(listentoSocket());
		props.dispatch(fetchProjects());
	}

	render() {
		//Create an index for navigating the long list of projects
		const idxArr = [];
		let curIdx = '';
		//Create the li's
		const projects = this.props.allNames.map(projectName => {
			let isNewIdx = false;
			if(projectName.charAt(0)!==curIdx){
				//New letter for the index
				isNewIdx = true;
				curIdx = projectName.charAt(0);
				idxArr.push(curIdx);
			}
			return (
				//Tell the Project instance whether it needs to add an anchor for the index
				<Project key={projectName} projectName={projectName} isNewIdx={isNewIdx}/>
			);
		});
		return (
			<div>
				<div className="header">
					<p className="right mobile-hide"><small>Front-end code by Meredith Dodge</small></p>
					<h1>Wiki Meta Explorer</h1>
					<a href="#top" className="right">Top</a>
					<div>{idxArr.map(letter => (
						<a key={letter} href={'#'+letter}>{letter}</a>
					))}</div>
				</div>
				<ul className="Projects jump-link" id="top">
					{projects}
				</ul>
				<PageDetail />
			</div>
		);
	}
}

//Use connect to get state and dispatch
const Projects = connect(({allNames}) => ({allNames}))(ProjectsComponent);

export default Projects;
