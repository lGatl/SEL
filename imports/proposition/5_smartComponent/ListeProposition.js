import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../../6_actions/actions";

import { dateToFormat } from "../../8_libs/date";

import PropositionAnnonce from "../../proposition/4_dumbComponent/PropositionAnnonce";

import { goAnnonce } from "../../8_libs/go";

class ListeProposition extends Component {
	//=========INITIALISATION
	componentWillMount(){
		this.props.titrePage("Mes Propositions");
		this.props.activeMenu("Mon Compte");
		this.props.activeMenuMonCompte("Mes propositions");
		this.props.propositionGet({$or:[{prestataire:this.props.active_user._id},{payeur:this.props.active_user._id}]},(propositions)=>{
			this.props.annonceGet({_id:{$in:propositions.map(proposition=>proposition.annonce_id)}})
		});
	}

	//=========ACTIONS
	effectue(){

	}
	supprimer(_id){
		this.props.propositionRm({_id});
	}
	// editer(_id){
	// 	FlowRouter.go("/proposition/"+_id+"/Editer");
	// }
//========RENDU======================
	propositionsListe(){
		let { propositions, annonces, active_user } = this.props;
		let user = active_user
		return propositions.reduce((total,proposition,i)=>{
			let annonce = annonces.find(annonce=>annonce._id==proposition.annonce_id)||{};
			return (
				annonce.user_id!=active_user._id?[...total,<PropositionAnnonce 
					key = { i }
					_id = { proposition._id }
					date = { dateToFormat(proposition.date) }
					prix = { proposition.prix }
					type = { annonce.type }
					moi = {proposition.posteur==active_user._id}
					annonce_titre = { annonce.titre }
					annonce_description = { annonce.description }
					annonce_image = { annonce.image }
					routeAnnonce = {goAnnonce.bind(this,annonce._id)}
					user_nom = { user? user.profile.nom:"" }
					user_prenom = { user? user.profile.prenom:"" }
					user_username = { user? user.username:"" }
					commentaire = { proposition.commentaire }
					etat = { proposition.etat }
					supprimer = {this.supprimer.bind(this)}
					
					effectue = { this. effectue.bind(this)}
				/>]:total);},[]);

		// editer = {this.editer.bind(this)}
	}
	
	render() {
		return (
			<div>{this.propositionsListe()}</div>
		);
		
	}
}
function mapStateToProps( state ){
	return (
		{
			active_user: state.users.active_user,
			propositions: state.proposition.all,
			annonces: state.annonce.all,
			categories: state.categorie.all,
			
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		titrePage: ACTIONS.Titre.titrePage,
		activeMenu: ACTIONS.Menu.activeMenu,
		activeMenuMonCompte: ACTIONS.Menu.activeMenuMonCompte,

		propositionGet: ACTIONS.Proposition.get,
		propositionRm: ACTIONS.Proposition.rm,
		annonceGet: ACTIONS.Annonce.get,
	
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( ListeProposition );
