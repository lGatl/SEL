import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../../6_actions/actions";

import { Input, TextArea, Button, Checkbox, Segment } from "../../_common/4_dumbComponent/_gat_ui_react";

import openStreetMapApi from "../../8_libs/openStreetMapApi";
import { debounce } from "../../8_libs/debounce";



class FormulaireDInscription extends Component {
//Initialisation
	constructor(){
		super();
		this.verifAdresse = debounce(this.verifAdresse.bind(this),250);
		this.roles=[
			{ key: "in", value: "in", text: "inscrit" },
			{ key: "se", value: "se", text: "seliste" },
			{ key: "mo", value: "mo", text: "moderateur" },
			{ key: "ad", value: "ad", text: "admin" }
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
			adresse_ok:false,
			verif_adresse:[],
			date_val_resp:""
		};
	}
	
	componentWillMount(){
		this.props.usersControle(this.init());
	}
	//Controle
	change(e,{ value, name }){

		
		if(name == "adresse"){
			this.verifAdresse(value);
			this.props.usersControle({ adresse_ok:false });
		}
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
	verifAdresse(adresse){

		openStreetMapApi.getData(adresse.split(" ").join("+"), (resultat)=>{
			if(resultat){
				//console.log(resultat);
				this.props.usersControle({ verif_adresse:resultat?
					resultat.data.reduce((total,dat)=>dat&&dat.type&&(dat.type=="house"||dat.type=="residential")?[...total,dat]:total,[])
					:[]});
			} else {

			}
		});
	}
	choixAdresse(verif_adresse){

		this.props.usersControle({ adresse_ok:true });

console.log("verif_adresse", verif_adresse);
		this.props.usersControle({ adresse:verif_adresse.display_name });
	}
	//Preparation du rendu
	render() {
		let {email,password,nom,prenom,telephone,adresse, verif_adresse,date_val_resp, adresse_ok} = this.props.controle;
		return (
			<form>
				<Input
					label = "E mail"
					name = "email"
					value = { email || "" }
					onChange = { this.change.bind( this ) } 
				/>
				<Input
					label = "Mot de passe"
					name = "password"
					value = { password || "" }
					onChange = { this.change.bind( this ) }
				/>
				<Input
					label = "Nom"
					name = "nom"
					value = { nom || "" }
					onChange = { this.change.bind( this ) } 
				/>
				<Input
					label = "Prenom"
					name = "prenom"
					value = { prenom || "" }
					onChange = { this.change.bind( this ) }
				/>
				<Input
					label = "Telephone"
					name = "telephone"
					value = { telephone || "" }
					onChange = { this.change.bind( this ) } 
				/>
				<hr/>
				<div>
					<Input
						autoComplete = "user-password"
						style={{marginBottom:0}}
						label = "Adresse"
						name = "adresse"
						value = { adresse || "" }
						onChange = { this.change.bind( this ) }
					/>
					<Checkbox
						name = "adresse"
						disabled="disabled"
						checked = {adresse_ok||""}
						onChange = { ()=>{} }

					/>

				</div>
				
				{
					verif_adresse&&verif_adresse.length>0&&!adresse_ok?<Segment style={{minHeight:20, margin:5, marginTop:0}}>
						{verif_adresse&&verif_adresse.length>0?verif_adresse.map((ver_ad,i)=>
							<div onClick = {this.choixAdresse.bind(this,ver_ad)} key = {i}>{ver_ad.display_name}</div>):""}
					</Segment>:""
				}

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


