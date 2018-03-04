import React, {Component} from "react";

import { bindActionCreators }	from 'redux';
import { connect } from 'react-redux';

import { ACTIONS } from "../6_actions/actions";

import { Titre } from "../_common/4_dumbComponent/_gat_ui_react";



import FormActu from "../article/5_smartComponent/FormActu";
import SmartActualites from "../article/5_smartComponent/SmartActualites";

class Actualite extends Component {

	componentWillMount(){
		this.props.activeMenu("Actualité");
	}

	render(){

		return (
			<div>
				<Titre> Actualites </Titre>
				<SmartActualites/>
				<FormActu/>
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

export default connect( mapStateToProps, mapDispatchToProps )( Actualite );
