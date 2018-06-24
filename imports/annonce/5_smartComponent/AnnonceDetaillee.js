import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../../6_actions/actions";
import FicheAnnonce from "../4_dumbComponent/FicheAnnonce";
import PropositionForm from "../4_dumbComponent/PropositionForm";
import Proposition from "../../proposition/4_dumbComponent/Proposition";

import {  Button, Popop, Note } from "../../_common/4_dumbComponent/_gat_ui_react";

import { dateToFormat } from "../../8_libs/date";

import Alert from "react-s-alert";

import { goAnnonceEdit, hrefUser } from "../../8_libs/go";

class AnnonceDetaillee extends Component {
	constructor(){
		super();
		this.state = {open:false, annonce_id:"",proposition_id:""};
	}
	componentWillReceiveProps(news){
		if(news._id != this.props._id){
			this.init(news);
		}
	}
	componentWillMount(){
		this.props.usersControle({note:5});
		this.props.titrePage("Annonce Detaillée");

		this.init(this.props);
	}
	init(props){
		this.props.annonceGet1({_id:props._id},annonce=>{
			if(annonce ){
				props.usersGet1({_id:annonce.user_id});
				props.categorieGet1({_id:annonce.categorie});
				if(this.props.active_user){
					if(annonce.user_id == props.active_user._id){
						props.propositionGet({annonce_id:annonce._id},(propositions)=>{
							props.usersGet({_id:{$in:propositions.map(prop=>prop.posteur)}});
						});
						
					}else if(annonce.user_id!= props.active_user._id){
						props.propositionGet({annonce_id:annonce._id,posteur:props.active_user._id});
					}
				}
			}
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
				posteur: active_user._id,
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
	accepter(_id){
		this.props.annonceGet1({_id:this.props._id},annonce=>{
			if(annonce && annonce.statut && annonce.statut == "en attente"){
				this.props.propositionUp({_id:_id}, {etat:"accepte"},()=>{
					this.props.propositionUpm({_id:{$in:this.props.propositions.reduce((total,pro)=>pro._id != _id?[...total,pro._id]:total,[])}}, {etat:"refuse"});
					this.props.annonceUp({_id:this.props._id}, {statut:"en cours"});
				});
			}	
		});
	}
	refuser(_id){
		this.props.propositionUp({_id:_id}, {etat:"refuse"},()=>{});
	}
	
	effectue(annonce_id, proposition_id){
		this.setState({open:true,annonce_id,proposition_id});
		
	}
	noter(){
		this.setState({open:false});
		let { note } = this.props.user_controle;
		this.props.transactionCree(this.state.annonce_id,this.state.proposition_id,note);
	}
	supprimer(_id){
		this.props.propositionRm({_id});
	}
	// editer(_id){
	// 	FlowRouter.go("/proposition/"+_id+"/Editer");
	// }
	connexion(){
		FlowRouter.go("/connexion/");
	}
	reediter(){
		goAnnonceEdit(this.props.annonce._id);
	}
	clickNote(e,a){

		let { note } = this.props.user_controle;
		this.props.usersControle({note:a==note?0:a});
	}
	//========RENDU======================
	moi(){
		return ((this.props.user && this.props.active_user && this.props.user._id == this.props.active_user._id))||false;
	}
	editable(){
		return this.props.propositions.length == 0;
	}
	form_proposition(){
		let { proposition, commentaire } = this.props.proposition_controle;
		if(this.props.active_user){
			if(this.props.user){
				return this.moi()?
					this.editable()?<Button style = {{flex:1}} onClick={this.reediter.bind(this)}>Rééditer</Button>:
						this.propositionsListe(): <div><PropositionForm
						change = { this.change.bind(this) }
						proposition = { proposition }
						commentaire = { commentaire }
						propositionAdd = { this.propositionAdd.bind(this) }/>{this.propositionsListe()}</div>;
			}else{
				return(<div>l'utilisateur n'est plus inscrit cette annonce sera bientot supprimée</div>);
			}
		} else {
			return <Button style = {{flex:1}} onClick={this.connexion.bind(this)}>Connectez vous pour faire une proposition</Button>;
		}
	}
	propositionsListe(){
		let { propositions, annonce, users, active_user } = this.props;
		return <div style = {{display:"flex",flexDirection: "column", backgroundColor:"pink"}}>
			{propositions.reduce((total,proposition,i)=>{
				let user = users.find(user=>user._id==proposition.posteur);
				return (this.props.annonce.statut != "en attente" && proposition.etat == "accepte")||this.props.annonce.statut == "en attente"? 
					[...total,<Proposition 
						key = {i}
						date = { dateToFormat(proposition.date) }
						prix = { proposition.prix }
						type = { annonce.type }
						user_nom = { user? user.profile.nom:active_user?active_user.profile.nom : "" }
						user_prenom = { user? user.profile.prenom:active_user?active_user.profile.prenom : "" }
						user_username = { user? user.username:active_user?active_user.username : "" }
						commentaire = { proposition.commentaire }
						etat = { proposition.etat }
						accepter = { this.accepter.bind(this,proposition._id) }
						refuser = { this.refuser.bind(this,proposition._id) }
						supprimer = {this.supprimer.bind(this,proposition._id)}
						effectue = { this.effectue.bind(this,this.props._id,proposition._id,user,this.props.user)}
						moi = { annonce && active_user && (annonce.user_id == active_user._id) }
						href_posteur = {user?hrefUser(user._id):active_user?hrefUser(active_user._id):"/#"}
					/>]:total;},[])}
		</div>;
		
	//editer = {this.editer.bind(this)}
	}

	render(){
		let { open } = this.state;
		let { note } = this.props.user_controle;
		let { propositions, annonce, user } = this.props;
		
		return (
			<div style = {{display:"flex", flexDirection:"column", flex:1}}>
				<Popop style={{flexDirection:"column"}} open = {open}>
					<div style ={{display: "flex", alignItems:"center"}}>
						<span style ={{margin:10}}>Salut !</span>
						<Button onClick = {this.noter.bind(this)}>noter</Button>
					</div>
					
					<Note onClick = {this.clickNote.bind(this)} note={note}/>
				</Popop>

				<FicheAnnonce 
					categorie = { this.props.categorie.titre }
					date = { annonce.date?dateToFormat( annonce.date ):"" }
					date_de_fin = { annonce.date?dateToFormat( annonce.date_de_fin ):"" }
					statut = { annonce.statut?annonce.statut:"" }
					titre = { annonce.titre?annonce.titre:"" }
					description = { annonce.description?annonce.description:"" }
					email_display= { annonce.email }
					email = { user&&user.emails&&user.emails.length>0?user.emails[0].address:"" }
					telephone_display= { annonce.telephone }
					telephone = { user&&user.profile&&user.profile.telephone?user.profile.telephone:"" }
					adresse_display= { annonce.adresse }
					adresse = { user&&user.profile&&user.profile.adresse?user.profile.adresse:"" }
					form_proposition = { this.form_proposition.bind(this) }
					nbpropositions = {propositions.length}
					connexion = {this.connexion.bind(this)}
					identifiant = {user&&user.username?user.username:""}
					propositionsListe =  { this.propositionsListe() }
					actif={ this.props.active_user }
					moi = { this.moi() }
					type = {annonce.type?annonce.type:""}
					href_annonceur = {user?hrefUser(user._id):"#"}
				/>
				
			</div>
			
		);
	}
}

function mapStateToProps( state ){
	return (
		{
			active_user: state.users.active_user,
			proposition_controle: state.proposition.controle,
			annonce_controle: state.annonce.controle,
			annonce: state.annonce.one,
			categorie: state.categorie.one,
			user: state.users.one,
			user_controle: state.users.controle,
			users: state.users.all,
			propositions: state.proposition.all,
			proposition: state.proposition.one,
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		titrePage: ACTIONS.Titre.titrePage,

		annonceGet1: ACTIONS.Annonce.get1,
		annonceUp: ACTIONS.Annonce.up,
		annonceControle: ACTIONS.Annonce.controle,

		propositionControle: 	ACTIONS.Proposition.controle,
		propositionGet: ACTIONS.Proposition.get,
		propositionGet1: ACTIONS.Proposition.get1,
		propositionAdd: ACTIONS.Proposition.add,
		propositionUp: ACTIONS.Proposition.up,
		propositionUpm: ACTIONS.Proposition.upm,
		propositionRm: ACTIONS.Proposition.rm,

		categorieGet1: ACTIONS.Categorie.get1,
		usersGet1: ACTIONS.Users.get1,
		usersGet1State: ACTIONS.Users.get1_state,
		usersGet: ACTIONS.Users.get,
		usersControle: ACTIONS.Users.controle,
		transactionCree: ACTIONS.Transaction.cree,
		

	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( AnnonceDetaillee );
