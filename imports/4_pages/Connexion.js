import React, {Component} from "react";

import { bindActionCreators }	from 'redux';
import { connect } from 'react-redux';

import { ACTIONS } from "../6_actions/actions";

import { Segment, Button } from "../_common/4_dumbComponent/_gat_ui_react";

import FormulaireConnexion from "../user/5_smartComponent/FormulaireConnexion";
import FormulaireDInscription from '../user/5_smartComponent/FormulaireDInscription';


class Connexion extends Component {
//initialisation
	constructor(){
		super();
		this.state = {
			cree:false
		};
	}

	componentWillMount(){
		this.props.activeMenu("Connexion");
	}
	//action
	cree(val){
		this.setState({cree:val});
	}
	//preparation rendu
	aAfficher(){
		return this.state.cree ? <FormulaireDInscription/> : <FormulaireConnexion/>;
	}

	render(){

		return (
			<div>
				<div style = {{display:"flex"}}>
					<Button onClick = {this.cree.bind(this, false)}>Connexion</Button>
					<Button onClick = {this.cree.bind(this, true)}>Creer un compte</Button>
				</div>

		
				{this.aAfficher()}
				
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

export default connect( mapStateToProps, mapDispatchToProps )( Connexion );

