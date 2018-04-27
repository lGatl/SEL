import React, {Component} from "react";

import { bindActionCreators }	from 'redux';
import { connect } from 'react-redux';

import { ACTIONS } from "../6_actions/actions";

import { Segment } from "../_common/4_dumbComponent/_gat_ui_react";

import FormContact from "../_common/4_dumbComponent/FormContact.js";
import CoordonneesHoraires from "../_common/4_dumbComponent/CoordonneesHoraires.js";



class Contact extends Component {
	constructor(){
		super();
		this.infos={
			titre:"Coordonnées de la collectivité",
			details:[" 9 rue des Meninges",
				"52250 LARGONI",
				"Mr GRIGON F.",
				"Tél : 06 95 84 48 03",
				"Mail : fgrigon@gmail.fr"]
		};
		this.horaires={
			titre:"Horaires :",
			details:["du Lundi au Vendredi 9h à 16h30"]
		};
	}

	componentWillMount(){
		this.props.activeMenu("Contact");
	}

	render(){
		return (
			<div>
				<Segment><CoordonneesHoraires contenu={this.infos}></CoordonneesHoraires></Segment>
				<Segment><CoordonneesHoraires contenu={this.horaires}></CoordonneesHoraires></Segment>
				<FormContact></FormContact>

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

export default connect( mapStateToProps, mapDispatchToProps )( Contact );
