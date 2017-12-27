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
	change(e,{ value, name }){

		this.props.actualiteControle({ [name]:value });
	}
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

	render() {
		const TITRE = !(this.props.titre == undefined) ? <Form.Input
			label = 'Titre'
			name = 'titre'
			value = { this.props.titre }
			onChange = { this.change.bind( this ) } 
		/> : "";
		const DESCRIPTION = !(this.props.description == undefined) ? <Form.TextArea
			label = 'Description'
			name = 'description'
			value = { this.props.description }
			onChange = { this.change.bind( this ) }
		/>:"";
		return (
			<Form>
				
				{ TITRE }
				{ DESCRIPTION }
				
				
					

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
