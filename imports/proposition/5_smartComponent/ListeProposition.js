import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../../6_actions/actions";

import { dateToFormat } from "../../8_libs/date";

import { Popop, Note, Button } from "../../_common/4_dumbComponent/_gat_ui_react";

import PropositionAnnonce from "../../proposition/4_dumbComponent/PropositionAnnonce";

import { goAnnonce } from "../../8_libs/go";

import ScrollInfini from "../../_common/5_smartComponent/ScrollInfini";

let nbpp = 5;

class ListeProposition extends Component {
	//=========INITIALISATION
	constructor(){
		super();
		this.state = {
			open:false, annonce_id:"",proposition_id:"",
		};
	}
	componentWillMount(){
		this.props.titrePage("Mes Propositions");
		this.props.activeMenu("Mon Compte");
		this.props.activeMenuMonCompte("Mes propositions");
		this.props.usersControle({note:5});
		
	}

	//=========ACTIONS
	clickNote(e,a){

		let { note } = this.props.user_controle;
		this.props.usersControle({note:a==note?0:a});
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
	fnt(nv_elts){	
		this.props.annonceGetAdd({_id:{$in:nv_elts.map(proposition=>proposition.annonce_id)}},()=>{});
	}

	
	// editer(_id){
	// 	FlowRouter.go("/proposition/"+_id+"/Editer");
	// }
	//========RENDU======================
	propositionsListe(){
		let { propositions, annonces, active_user } = this.props;
		let user = active_user;
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
					
					effectue = { this. effectue.bind(this,annonce._id,proposition._id)}
				/>]:total);},[]);

		// editer = {this.editer.bind(this)}
	}
	
	render() {
		let { note } = this.props.user_controle;
		let { open } = this.state;
		return (
			<div style={{display:"flex", flex:1, flexDirection:"column"}}>
				<ScrollInfini 
					nbpp = {4}
					reload={"propositionListe"}
					nb_charge={this.props.propositions.length}
					nb_total={this.props.nb_propositions}
					fnt = {this.fnt.bind(this)}
					initFnt = {this.props.propositionGetSSL.bind(this)}
					addFnt = {this.props.propositionGetAddSSL.bind(this)}
					countFnt = {this.props.propositionCount.bind(this)}
					condition = {{posteur:this.props.active_user._id}}
				/>
				<Popop style={{flexDirection:"column"}} open = {open}>
					<div style ={{display: "flex", alignItems:"center"}}>
						<span style ={{margin:10}}>Salut !</span>
						<Button onClick = {this.noter.bind(this)}>noter</Button>
					</div>
					
					<Note onClick = {this.clickNote.bind(this)} note={note}/>
				</Popop>
				{this.propositionsListe()}
			</div>
		);
		
	}
}
function mapStateToProps( state ){
	return (
		{
			page: state.controle.page,
			active_user: state.users.active_user,
			propositions: state.proposition.all,
			nb_propositions: state.proposition.count,
			user_controle: state.users.controle,
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
		changePage: ACTIONS.Controle.changePage,

		propositionGet: ACTIONS.Proposition.get,
		propositionCount: ACTIONS.Proposition.count,
		propositionRm: ACTIONS.Proposition.rm,
		propositionGetSSL: ACTIONS.Proposition.get_SSL,
		propositionGetAddSSL: ACTIONS.Proposition.getAdd_SSL,
		annonceGet: ACTIONS.Annonce.get,
		annonceGetAdd: ACTIONS.Annonce.getAdd,
		usersControle: ACTIONS.Users.controle,

		transactionCree: ACTIONS.Transaction.cree,
	
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( ListeProposition );
