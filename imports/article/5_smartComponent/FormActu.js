import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../../6_actions/actions";

import { Form } from "semantic-ui-react";




class FormActu extends Component {

	componentWillMount(){
		this.props.actualiteControle({ 
			titre: "",
			description: ""
			
		});
	}
	//Controle
	change(e,{ value, name }){

		this.props.actualiteControle({ [name]:value });
	}
	//Action
	actualiteAdd(){
		this.props.actualiteAdd(
			{
				titre: this.props.titre,
				description: this.props.description
			}
		);
		this.props.actualiteControle({ 
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
	render(){
		return (
			<Form>
				
				{ this.titre() }
				{ this.description() }
				
				<Form.Button
					onClick = { this.actualiteAdd.bind( this ) }
				>
				Sauvegarder l'actualite
				</Form.Button>
			</Form>
		);
	}
}

function mapStateToProps( state ){
	return (
		{
			titre: state.actualite.titre,
			description: state.actualite.description
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
