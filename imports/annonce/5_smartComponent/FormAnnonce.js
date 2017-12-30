import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../../6_actions/actions";

import { Form } from "semantic-ui-react";




class FormAnnone extends Component {

	componentWillMount(){
		this.props.annonceControle({ 
			titre: "",
			description: ""
			
		});
	}
	//Controle
	change(e,{ value, name }){

		this.props.annonceControle({ [name]:value });
	}
	//Action
	annonceAdd(){
		this.props.annonceAdd(
			{
				titre: this.props.titre,
				description: this.props.description
			}
		);
		this.props.annonceControle({ 
			titre: "",
			description: ""
		});
	}
		//Preparation du rendu
	titre(){
		return !(this.props.titre == undefined) ? <Form.Input
			label = 'Titre'
			name = 'titre'
			value = { this.props.titre }
			onChange = { this.change.bind( this ) } 
		/> : "";
	}
	description(){
		return !(this.props.description == undefined) ? <Form.TextArea
			label = 'Description'
			name = 'description'
			value = { this.props.description }
			onChange = { this.change.bind( this ) }
		/>:"";
	}
	render() {

		return (
			<Form>
				
				{ this.titre() }
				{ this.description() }

				<Form.Button
					onClick = { this.annonceAdd.bind( this ) }
				>
				Sauvegarder l'annonce
				</Form.Button>
			</Form>
		);
	}
}

function mapStateToProps( state ){
	return (
		{
			titre: state.annonce.titre,
			description: state.annonce.description
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
