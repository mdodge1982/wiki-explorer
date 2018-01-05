import {connect} from 'react-redux';
import {listentoSocket,fetchProjects} from '../actions';
import Projects from '../components/Projects';

const mapStateToProps = ({projects}) => {
	console.log(projects);
	return {
		projects: projects.allNames
	};
}

export default connect(
	mapStateToProps,
	{listentoSocket,fetchProjects}
)(Projects);
