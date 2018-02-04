import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../../6_actions/actions";

import { Input, TextArea, Button } from "../../_common/4_dumbComponent/gat_ui_react";

class FormAnnone extends Component {

	componentWillMount(){
		this.props.annonceControle(this.init());
	}
	init(){
		return{ 
			titre: "",
			description: ""
			
		};
	}
	//Controle
	change(e,{ value, name }){

		this.props.annonceControle({ [name]:value });
	}
	//Action
	annonceAdd(){
		let {titre, description} = this.props.annonce_controle;
		this.props.annonceAdd(
			{
				titre,
				description
			}
		);
		this.props.annonceControle(this.init());
	}
	//Preparation du rendu
	
	render() {
		let {titre, description} = this.props.annonce_controle;
		return (
			<form style={{}}>
				
				<Input
					label = 'Titre'
					name = 'titre'
					value = { titre||"" }
					onChange = { this.change.bind( this ) } 
				/>
				<TextArea
					label = 'Description'
					name = 'description'
					value = { description||"" }
					onChange = { this.change.bind( this ) }
				/>

				<Button
					onClick = { this.annonceAdd.bind( this ) }
				>
				Sauvegarder l'annonce
				</Button>
			</form>
		);
	}
}

function mapStateToProps( state ){
	return (
		{
			annonce_controle: state.annonce.controle
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		annonceControle: 	ACTIONS.Annonce.controle,
		annonceAdd: 			ACTIONS.Annonce.add
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( FormAnnone );
