import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../../actions/actions";

import { Form } from "semantic-ui-react";




class FormActu extends Component {

	componentWillMount(){
		this.props.articleControle({ 
			titre: "",
			description: ""
			
		});
	}
	change(e,{ value, name }){

		this.props.articleControle({ [name]:value });
	}
	articleAdd(){
		this.props.articleAdd(
			{
				titre: this.props.titre,
				description: this.props.description
			}
		);
		this.props.articleControle({ 
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
