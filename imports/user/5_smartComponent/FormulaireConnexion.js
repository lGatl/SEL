import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../../6_actions/actions";

import { Input, TextArea, Button } from "../../_common/4_dumbComponent/_gat_ui_react";

class FormulaireConnexion extends Component {
	//Initialisation

	init(){
		return { 
			email: "",
			password: ""
		};
	}
	componentWillMount(){
		
		this.props.usersControle(this.init());
	}
	//Controle
	change(e,{ value, name }){

		this.props.usersControle({ [name]:value });
	}
	//Action
	usersLogIn(){
		let {email, password} = this.props.users_controle;
		this.props.usersLogIn( email, password, ()=>{
			this.props.usersGetActiveUser();
			this.props.usersControle(this.init());
			FlowRouter.go("/mon_compte/informations");
		} );
		
		
	}
	//Preparation du rendu
	
	render() {
		let {email, password} = this.props.users_controle;
		
		return (
			<form style={{flex:1}}>
				<Input
					label = 'E mail'
					name = 'email'
					value = { email||"" }
					onChange = { this.change.bind( this ) } 
				/>
				<Input
					label = 'Mot de passe'
					name = 'password'
					value = { password||"" }
					onChange = { this.change.bind( this ) }
				/>
				<Button
					onClick = { this.usersLogIn.bind( this ) }
				>
				Se Connecter
				</Button>
			</form>
		);
	}
}

function mapStateToProps( state ){
	return (
		{
			users_controle: state.users.controle
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		usersControle: 	ACTIONS.Users.controle,
		usersLogIn: 		ACTIONS.Users.logIn,
		usersGetActiveUser:	ACTIONS.Users.getActiveUser,
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( FormulaireConnexion );
