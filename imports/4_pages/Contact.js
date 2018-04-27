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
			titre:"Coordonnées de la Croix Rouge de Damvillers",
			details:["6 rue des Remparts",
				"55150 DAMVILLERS",
				"Mme CHALUPKA M.L.",
				"Tél : 09 71 44 27 87",
				"Mail : mchalupka@wanadoo.fr"]
		};
		this.horaires={
			titre:"Horaires de permanence de la Croix Rouge",
			details:["Mardi de 13h30 à 16h30 et le Vendredi de 10 h à 12h."]
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
