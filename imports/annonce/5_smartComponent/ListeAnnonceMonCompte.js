import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../../6_actions/actions";
import { dateToFormat } from "../../8_libs/date";

import { Menu } from "../../_common/4_dumbComponent/_gat_ui_react";

import SmartMenuAnnonce from "../../_common/5_smartComponent/SmartMenuAnnonce";

import ExtraitAnn from "../4_dumbComponent/ExtraitAnn";
import Proposition from "../../proposition/4_dumbComponent/Proposition";

import { hrefUser, hrefAnnonce } from "../../8_libs/go";

class ListeAnnonce extends Component {
	//=========INITIALISATION
	constructor(){
		super();
		this.state = {};
	}
	componentWillMount(){
		this.props.titrePage("Annonces");
		this.init(this.props);
	}
	componentWillReceiveProps(nextp){
		
		if((nextp.type!=this.props.type)||(this.props.active_user != nextp.active_user)){
			this.init(nextp);
		}
	}
		
	init(props){
		this.props.activeMenu(props.mon_compte?"Mon Compte":"Annonce");
		this.props.activeMenuMonCompte(props.type=="offre"?"Mes offres":"Mes demandes");
		this.props.activeMenuAnnonce(props.type=="offre"?"Offres":props.type=="demande"? "Demandes": "Toutes");

		let CONDITION = {etat:"valider"};
		CONDITION = props.mon_compte?{...CONDITION,user_id:props.active_user._id}:CONDITION;
		CONDITION = props.type?{...CONDITION,type:props.type}:CONDITION;
		this.props.annonceGet(CONDITION,(annonces)=>{
			
			annonces.forEach(annc=>this.setState({[annc._id]:false}));
			

			this.props.propositionGet({annonce_id:{$in:annonces.map(annonce=>annonce._id)}},(propositions=>
				this.props.usersGet({_id:{$in:propositions.map(prop=>prop.posteur)}})
			));
		});
		this.props.categorieGet({});
	}
	//=========ACTIONS
	annonceRm( id ){
		this.props.annonceRm({ _id: id });
	}
	accepter(proposition_id, annonce_id){
		this.props.annonceGet1({_id:annonce_id},annonce=>{
			if(annonce && annonce.statut && annonce.statut == "en attente"){
				this.props.propositionUp({_id:proposition_id}, {etat:"accepte"},()=>{
					this.props.propositionUpm({_id:{$in:this.props.propositions.reduce((total,pro)=>pro._id != proposition_id?[...total,pro._id]:total,[])}}, {etat:"refuse"});
					this.props.annonceUp({_id:annonce_id}, {statut:"en cours"});
				});
			}	
		});
	}
	refuser(_id){
		this.props.propositionUp({_id:_id}, {etat:"refuse"},()=>{});
	}
	effectue(annonce_id, proposition_id){
		this.props.transactionCree(annonce_id,proposition_id);
	}
	montrerPropositions(_id){
		this.setState({[_id]:!this.state[_id]});
	}
	//==========PREPARATION RENDU
	propositions(annonce,propositions){
		let active_user = this.props.active_user;
		return propositions.reduce((total,proposition,i)=>{
			let user = this.props.users.find(user=>user._id == proposition.posteur);
			return this.state[annonce._id]&&(proposition.etat=="en attente"||proposition.etat=="accepte")?
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
					accepter = { this.accepter.bind(this,proposition._id,annonce._id) }
					refuser = { this.refuser.bind(this,proposition._id,annonce._id) }
					effectue = { this.effectue.bind(this,annonce._id,proposition._id)}
					moi = { annonce && active_user && (annonce.user_id == active_user._id) }
					href_posteur = { user?hrefUser(user._id):"#"}

				/>]:total;},[]);
	}
	annonces(anns, categories){//anns = [{},...] => [<Comps/>,...]
	
		return anns && anns.length > 0 ? anns.reduce((total, ann, i )=>{
			let categorie = categories&&categories.length>0?categories.find(cat=>cat._id==ann.categorie):null;
			let date = new Date(ann.date);
			let propositions = this.props.propositions.reduce((total,proposition)=>proposition.annonce_id == ann._id?[...total,proposition]:total,[]);

			return[...total, <div key = {i}><ExtraitAnn 
				style = {{marginTop:i!=0?20:0}}
				type = {ann.type}
				categorie = {categorie?categorie.titre:""}
				montrerPropositions = { this.montrerPropositions.bind(this, ann._id) }
				montree = {this.state[ann._id]}
				_id = { ann._id }
				nb_prop = {this.props.mon_compte?propositions.length:null}
				titre = { ann.titre }
				description = { ann.description }
				date = { dateToFormat(date) }
				onClick = { this.annonceRm.bind(this) }
				statut = { ann.statut }
				href = {hrefAnnonce(ann._id)}
			/><div style = {{backgroundColor:"pink",paddingTop:this.state[ann._id]?10:0,paddingBottom:this.state[ann._id]?10:0}}>{this.propositions(ann, propositions)}</div></div>];}
			,[]):"";
		// return [<Comps/>,...]
	}
	
	render() {
		let { annonces, categories} = this.props;
		return (
			<div style={{display:"flex", flexDirection:"column"}}>
				
				{/*	<Comp/>   [<Comps/>,...]  			[{},...]   */}
				{ this.annonces(annonces, categories) }
				
			</div>
		);
		
	}
}
function mapStateToProps( state ){
	return (
		{
			active_user: state.users.active_user,
			users: state.users.all,
			annonces: state.annonce.all,
			categories: state.categorie.all,
			active_menu_annonce: state.menu.active_menu_annonce,
			propositions: state.proposition.all,
			proposition: state.proposition.one,

		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		titrePage: ACTIONS.Titre.titrePage,
		activeMenu: ACTIONS.Menu.activeMenu,
		activeMenuMonCompte: ACTIONS.Menu.activeMenuMonCompte,
		activeMenuAnnonce: ACTIONS.Menu.activeMenuAnnonce,

		annonceGet: ACTIONS.Annonce.get,
		annonceRm: ACTIONS.Annonce.rm,
		annonceGet1: ACTIONS.Annonce.get1,
		annonceUp: ACTIONS.Annonce.up,
		
		propositionGet: ACTIONS.Proposition.get,
		propositionGet1: ACTIONS.Proposition.get1,
		propositionUp: ACTIONS.Proposition.up,
		propositionUpm: ACTIONS.Proposition.upm,

		categorieGet: ACTIONS.Categorie.get,

		usersGet: ACTIONS.Users.get,

		transactionCree: ACTIONS.Transaction.cree,

	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( ListeAnnonce );
