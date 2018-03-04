import React, {Component} from "react";

import { bindActionCreators }	from 'redux';
import { connect } from 'react-redux';

import { ACTIONS } from "../6_actions/actions";

import { Titre } from "../_common/4_dumbComponent/_gat_ui_react";

import ListeAnnonce from "../annonce/5_smartComponent/ListeAnnonce";
import FormAnnonce from "../annonce/5_smartComponent/FormAnnonce";
class Annonce extends Component {

	componentWillMount(){
		this.props.activeMenu("Annonce");
	}

	render(){

		return (
			<div>
				<Titre> Annonce </Titre>
				<ListeAnnonce/>
			</div>
		);
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
