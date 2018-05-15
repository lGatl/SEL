import React, {Component} from "react";

import { bindActionCreators }	from 'redux';
import { connect } from 'react-redux';

import { ACTIONS } from "../6_actions/actions";

import ListeAnnonce from "../annonce/5_smartComponent/ListeAnnonce";
class Annonce extends Component {

	componentWillMount(){
		this.props.activeMenu("Annonce");
	}

	render(){

		return <ListeAnnonce type = {this.props.type}/>;
	}
}


function mapStateToProps(state){
	return (
		{
			
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		activeMenu: ACTIONS.Menu.activeMenu,

	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( Annonce );
