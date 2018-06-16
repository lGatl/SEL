import React, {Component} from "react";

import { bindActionCreators }	from 'redux';
import { connect } from 'react-redux';

import { ACTIONS } from "../6_actions/actions";

import ListeActualites from "../actualite/5_smartComponent/ListeActualites";

class Actualite extends Component {

	componentWillMount(){
		this.props.activeMenu("Actualité");
		this.props.titrePage("Actualité");
	}

	render(){

		return (		
			<ListeActualites/>
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
		titrePage: ACTIONS.Titre.titrePage,
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( Actualite );
