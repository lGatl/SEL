import React, {Component} from "react";

import { Grid } from "semantic-ui-react";

import Titre from "../_common/4_dumbComponent/Titre";
import FormulaireConnexion from "../user/5_smartComponent/FormulaireConnexion";
import FormulaireDInscription from '../user/5_smartComponent/FormulaireDInscription';
import { Segment } from "semantic-ui-react";
export default class Connexion extends Component {
//initialisation
	constructor(){
		super();
		this.state = {
			cree:false
		};
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
				<Segment.Group horizontal>
					<Segment onClick = {this.cree.bind(this, false)}>Connexion</Segment>
					<Segment onClick = {this.cree.bind(this, true)}>Creer un compte</Segment>
				</Segment.Group>
				{this.aAfficher()}
				
			</div>
			
		);
	}
}


