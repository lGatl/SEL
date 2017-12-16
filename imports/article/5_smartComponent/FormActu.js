import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../../actions/actions";

import { Form } from "semantic-ui-react";




class FormActu extends Component {

	change(e,{ value, name }){

		this.props.articleControle({[name]:value});
	}
	articleAdd(){
		this.props.articleAdd(
			{
				titre: this.props.titre,
				description: this.props.description
			}
		);
	}

	render() {
		

		return (
			<Form>
				<Form.Input
					label = 'Titre'
					name = 'titre'
					value = { this.props.titre }
					onChange = { this.change.bind( this ) } 
				>
					
				</Form.Input>
				<Form.TextArea
					label = 'Description'
					name = 'description'
					value = { this.props.description }
					onChange = { this.change.bind( this ) }
				>
					
				</Form.TextArea>
				<Form.Button
				onClick = { this.articleAdd.bind( this ) }
				>
				Sauvegarder l'article
				</Form.Button>
			</Form>
		);
	}
}

function mapStateToProps( state ){
	return (
		{
			titre: state.article.titre,
			description: state.article.description
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		articleControle: 	ACTIONS.Article.controle,
		articleAdd: 			ACTIONS.Article.add
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( FormActu );
