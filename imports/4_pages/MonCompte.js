import React, {Component} from 'react';

import { bindActionCreators }	from 'redux';
import { connect } from 'react-redux';

import { ACTIONS } from "../6_actions/actions";

import { Input, TextArea, Button, Segment } from "../_common/4_dumbComponent/_gat_ui_react";

import IsLogged from "../user/5_smartComponent/IsLogged";

class MonCompte extends Component {

	componentWillMount(){
		this.props.activeMenu("Mon Compte");
	}
	informations(){
		return <div>informations</div>;
	}
	releve(){
		return <div>releve</div>;
	}
	render(){

		return (
			<div>
				{this.props.type=="informations"?this.informations():this.releve()}

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

export default connect( mapStateToProps, mapDispatchToProps )( MonCompte );
