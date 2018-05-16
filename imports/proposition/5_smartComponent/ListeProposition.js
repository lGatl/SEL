import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../../6_actions/actions";

import { dateToFormat } from "../../8_libs/date";

import PropositionAnnonce from "../../proposition/4_dumbComponent/PropositionAnnonce";

import { goAnnonce } from "../../8_libs/go";
import { throttle } from "../../8_libs/throttle";

class ListeProposition extends Component {
	//=========INITIALISATION
	constructor(){
		super();
		this.scroll = throttle(this.scroll.bind(this),40);
		this.state = {
			nbpp: 5,
			nump: 0
		};
	}
	componentWillMount(){
		this.props.titrePage("Mes Propositions");
		this.props.activeMenu("Mon Compte");
		this.props.activeMenuMonCompte("Mes propositions");
		this.props.propositionGetSSL({posteur:this.props.active_user._id},{sort:{date:-1},skip:0,limit:this.state.nbpp},(propositions)=>{
			this.setState({nump:1});
			this.props.annonceGet({_id:{$in:propositions.map(proposition=>proposition.annonce_id)}},()=>{
				this.props.propositionCount({posteur:this.props.active_user._id},(nb_propositions)=>{
					this.scroll(propositions,nb_propositions);
				});
			});
		});
	}
	componentDidMount() {
		document.addEventListener("scroll", this.scroll);
	}

	componentWillUnmount() {
		document.removeEventListener("scroll", this.scroll);
	}

	//=========ACTIONS
	effectue(annonce_id, proposition_id){
		this.props.transactionCree(annonce_id,proposition_id);
	}
	supprimer(_id){
		this.props.propositionRm({_id});
	}
	scroll(propositions,nb_propositions){
		if(
			((window.scrollY >= (document.documentElement.scrollHeight - document.documentElement.clientHeight)*0.95)||
			(document.documentElement.scrollHeight - document.documentElement.clientHeight)==0)
			&& ((this.props.propositions.length < this.props.nb_propositions)||(propositions&&nb_propositions&&propositions.length < nb_propositions))
		){
			this.props.propositionGetAddSSL({posteur:this.props.active_user._id},{sort:{date:-1},skip:((this.state.nump)*this.state.nbpp),limit:this.state.nbpp},(nv_propositions)=>{
				this.props.annonceGetAdd({_id:{$in:nv_propositions.map(proposition=>proposition.annonce_id)}},()=>{
					this.props.propositionCount({posteur:this.props.active_user._id},(nb_propositions)=>{
						this.scroll(nv_propositions,nb_propositions);
					});
				});
				this.setState({nump:this.state.nump+1});
			});
		}
	}
	// editer(_id){
	// 	FlowRouter.go("/proposition/"+_id+"/Editer");
	// }
//========RENDU======================
	propositionsListe(){
		let { propositions, annonces, active_user } = this.props;
		console.log("propositions", propositions);
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
					
					effectue = { this. effectue.bind(this,annonce._id,proposition._id)}
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
			nb_propositions: state.proposition.count,
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
		propositionCount: ACTIONS.Proposition.count,
		propositionRm: ACTIONS.Proposition.rm,
		propositionGetSSL: ACTIONS.Proposition.get_SSL,
		propositionGetAddSSL: ACTIONS.Proposition.getAdd_SSL,
		annonceGet: ACTIONS.Annonce.get,
		annonceGetAdd: ACTIONS.Annonce.getAdd,

		transactionCree: ACTIONS.Transaction.cree,
	
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( ListeProposition );
