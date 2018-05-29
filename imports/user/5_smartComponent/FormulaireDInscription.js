import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../../6_actions/actions";

import { Input, TextArea, Button } from "../../_common/4_dumbComponent/_gat_ui_react";




class FormulaireDInscription extends Component {
//Initialisation
	constructor(){
		super();
		this.roles=[
			{ key: 'in', value: 'in', text: 'inscrit' },
			{ key: 'se', value: 'se', text: 'seliste' },
			{ key: 'mo', value: 'mo', text: 'moderateur' },
			{ key: 'ad', value: 'ad', text: 'admin' }
		];
	}
	init(){
		return {
			email: "",
			password: "",
			nom: "",
			prenom: "",
			telephone:"",
			adresse:"",
			date_val_resp:""
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
	usersCreeCompte(){
		let {email,password,nom,prenom,telephone,adresse,date_val_resp} = this.props.controle;
		this.props.usersCreeCompte({
			email,
			username:email,
			password,
			profile:{
				nom,
				prenom,
				telephone,
				adresse,
				date_val_resp,
				note:[]
			}}, ()=>{
			this.props.usersControle(this.init());
			FlowRouter.go("/mon_compte/informations");
		});
		
	}
	//Preparation du rendu

	render() {
		let {email,password,nom,prenom,telephone,adresse,date_val_resp} = this.props.controle;
		return (
			<form>
				<Input
					label = 'E mail'
					name = 'email'
					value = { email || "" }
					onChange = { this.change.bind( this ) } 
				/>
				<Input
					label = 'Mot de passe'
					name = 'password'
					value = { password || "" }
					onChange = { this.change.bind( this ) }
				/>
				<Input
					label = 'Nom'
					name = 'nom'
					value = { nom || "" }
					onChange = { this.change.bind( this ) } 
				/>
				<Input
					label = 'Prenom'
					name = 'prenom'
					value = { prenom || "" }
					onChange = { this.change.bind( this ) }
				/>
				<Input
					label = 'Telephone'
					name = 'telephone'
					value = { telephone || "" }
					onChange = { this.change.bind( this ) } 
				/>
				<TextArea
					label = 'Adresse'
					name = 'adresse'
					value = { adresse || "" }
					onChange = { this.change.bind( this ) }
				/>
				<Input
					label = 'Date de validité de votre responsabilité civil'
					name = 'date_val_resp'
					value = { date_val_resp || "" }
					onChange = { this.change.bind( this ) } 
				/>
				<Button
					onClick = { this.usersCreeCompte.bind( this ) }
				>
				S'inscrire
				</Button>
			</form>
		);
	}
}

function mapStateToProps( state ){
	return (
		{
			controle: state.users.controle
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		usersControle: 			ACTIONS.Users.controle,
		usersCreeCompte: 		ACTIONS.Users.creeCompte
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( FormulaireDInscription );
