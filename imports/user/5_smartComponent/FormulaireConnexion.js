import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../../6_actions/actions";

import { Form } from "semantic-ui-react";

class FormulaireConnexion extends Component {
	//Initialisation
	componentWillMount(){
		console.log(Meteor.userId());
		this.props.userslogIn();
		this.props.usersControle({ 
			email: "",
			password: ""
			
		});
	}
	//Controle
	change(e,{ value, name }){

		this.props.usersControle({ [name]:value });
	}
	//Action
	usersLogIn(){
		this.props.usersLogIn(
			{
				email: this.props.email,
				username: this.props.email,
				password: this.props.password 
			}
		);
		this.props.usersControle({ 
			email: "",
			password: ""
		});
	}
	//Preparation du rendu
	eMail(){
		return !(this.props.email == undefined) ? <Form.Input
			label = 'E mail'
			name = 'email'
			value = { this.props.email }
			onChange = { this.change.bind( this ) } 
		/> : "";
	}
	password(){
		return !(this.props.password == undefined) ? <Form.Input
			label = 'Mot de passe'
			name = 'password'
			value = { this.props.password }
			onChange = { this.change.bind( this ) }
		/>:"";
	}
	render() {
	
		return (
			<Form>
				{ this.eMail() }
				{ this.password() }
				<Form.Button
					onClick = { this.usersLogIn.bind( this ) }
				>
				S'inscrire
				</Form.Button>
			</Form>
		);
	}
}

function mapStateToProps( state ){
	return (
		{
			email: state.users.email,
			password: state.users.password
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		usersControle: 	ACTIONS.Users.controle,
		usersLogIn: 		ACTIONS.Users.logIn
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( FormulaireConnexion );
