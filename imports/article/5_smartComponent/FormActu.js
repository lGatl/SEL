import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../../6_actions/actions";

import { Input, TextArea, Button } from "../../_common/4_dumbComponent/_gat_ui_react";




class FormActu extends Component {

	componentWillMount(){
		this.props.actualiteControle(this.init());
	}
	init(){
		return{ 
			titre: "",
			description: ""
			
		};
	}
	//Controle
	change(e,{ value, name }){

		this.props.actualiteControle({ [name]:value });
	}
	//Action
	actualiteAdd(){
		let {titre, description} = this.props.actualite_controle;

		this.props.actualiteAdd(
			{
				titre,
				description
			}
		);
		this.props.actualiteControle(this.init());
	}
	//Preparation du rendu
	
	render(){
		let {titre, description} = this.props.actualite_controle;

		return (
			<form>
				
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
					onClick = { this.actualiteAdd.bind( this ) }
				>
				Sauvegarder l'actualite
				</Button>
			</form>
		);
	}
}

function mapStateToProps( state ){
	return (
		{
			actualite_controle: state.actualite.controle
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		actualiteControle: 	ACTIONS.Actualite.controle,
		actualiteAdd: 			ACTIONS.Actualite.add
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( FormActu );
