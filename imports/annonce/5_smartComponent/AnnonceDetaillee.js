import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../../6_actions/actions";
import FicheAnnonce from "../4_dumbComponent/FicheAnnonce";
import Proposition from "../../proposition/4_dumbComponent/Proposition";

import { dateToFormat } from "../../8_libs/date";

import Alert from "react-s-alert";

class AnnonceDetaillee extends Component {
	componentWillMount(){
		this.props.titrePage("Annonce Detaillée");
		this.props.annonceGet1({_id:this.props._id},annonce=>{
			this.props.categorieGet1({_id:annonce.categorie});
			this.props.propositionGet({annonce_id:annonce._id},(propositions)=>{
				this.props.usersGet({_id:{$in:propositions.map(prop=>annonce.type=="offre"?prop.payeur:prop.prestataire)}});
			});
			this.props.usersGet1({_id:annonce.user_id});

		});
	}
	change(e,{ value, name, checked }){

		this.props.propositionControle({ [name]:value||checked });
	}
	propositionAdd(){
		let { annonce, active_user, user } = this.props;
		let { proposition, commentaire } = this.props.proposition_controle;
		
		if(proposition && Number.isInteger(parseFloat(proposition))){
			this.props.propositionAdd({
				annonce_id:annonce._id,
				prestataire:annonce.type == "offre"?user._id:active_user._id,
				payeur:annonce.type == "offre"?active_user._id:user._id,
				prix:parseFloat(proposition),
				commentaire,
				etat: "en attente",
				date:new Date(Date.now())
			});
			this.props.propositionControle({proposition:"",commentaire:""});
		}else{
			Alert.error("Erreur");
		}
	}
	propositionsListe(){
		let { propositions, annonce, users } = this.props;
		return propositions.map((proposition,i)=>{
			let user = users.find(user=>user._id==(annonce.type=="offre"?proposition.payeur:proposition.prestataire))
			return <Proposition 
				date = { dateToFormat(proposition.date) }
				prix = { proposition.prix }
				user_nom = { user? user.profile.nom:"" }
				user_prenom = { user? user.profile.prenom:"" }
				user_username = { user? user.username:"" }
				commentaire = { proposition.commentaire }
				etat = { proposition.etat }
				key = {i}
			/>});

	}
	reediter(){
		FlowRouter.go("/annonce/"+this.props.annonce._id+"/edit");
	}
	render(){
		let { annonce, user } = this.props;
		let { proposition, commentaire } = this.props.proposition_controle;
		
		return (

			<FicheAnnonce 
				categorie = { this.props.categorie.titre }
				date = { annonce.date?dateToFormat( annonce.date ):"" }
				date_de_fin = { annonce.date?dateToFormat( annonce.date_de_fin ):"" }
				titre = { annonce.titre?annonce.titre:"" }
				description = { annonce.description?annonce.description:"" }
				email_display= { annonce.email }
				email = { user&&user.emails&&user.emails.length>0?user.emails[0].address:"" }
				telephone_display= { annonce.telephone }
				telephone = { user&&user.profile&&user.profile.telephone?user.profile.telephone:"" }
				adresse_display= { annonce.adresse }
				adresse = { user&&user.profile&&user.profile.adresse?user.profile.adresse:"" }
				proposition = { proposition }
				nbpropositions = {this.propositionsListe().length}
				commentaire = { commentaire }
				identifiant = {user&&user.username?user.username:""}
				propositionAdd = { this.propositionAdd.bind(this) }
				change = { this.change.bind(this) }
				propositionsListe =  { this.propositionsListe() }
				moi = { this.props.user&&this.props.user._id == this.props.active_user._id||false }
				editable = {this.propositionsListe().length==0}
				reediter = {this.reediter.bind(this)}
			/>
		);
	}
}

function mapStateToProps( state ){
	return (
		{
			active_user: state.users.active_user,
			proposition_controle: state.proposition.controle,
			annonce: state.annonce.one,
			categorie: state.categorie.one,
			user: state.users.one,
			users: state.users.all,
			propositions: state.proposition.all,
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		titrePage: ACTIONS.Titre.titrePage,

		propositionControle: 	ACTIONS.Proposition.controle,
		propositionGet: ACTIONS.Proposition.get,
		annonceGet1: ACTIONS.Annonce.get1,
		categorieGet1: ACTIONS.Categorie.get1,
		usersGet1: ACTIONS.Users.get1,
		usersGet: ACTIONS.Users.get,
		propositionAdd: ACTIONS.Proposition.add,

	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( AnnonceDetaillee );
