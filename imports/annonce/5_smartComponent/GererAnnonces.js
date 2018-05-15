import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../../6_actions/actions";


import { dateToFormat } from "../../8_libs/date";
import { hrefUser, hrefAnnonce } from "../../8_libs/go";

import { Input, TextArea, Button, Tableau, Dropdown, Titre, A } from "../../_common/4_dumbComponent/_gat_ui_react";


class GererAnnonces extends Component {

	componentWillMount(){
		this.props.titrePage("Gerer les annonces");
		this.props.activeMenu("Mon Compte");
		this.props.activeMenuMonCompte("Gerer les annonces");
		this.props.annonceGetSSL({},{sort:{date:-1}},res=>{
			this.props.usersGet({_id:{$in:res.map(annonce=>annonce.user_id)}});
			this.props.categorieGet({_id:{$in:res.map(annonce=>annonce.categorie)}});
			res.map(annonce=>{
			});
			this.props.annonceControle({actions:res.map((annonce)=>{return{_id:annonce._id,action:annonce.etat};})});
		});
	}
	
	//==============CONTROLE====================
	changeAction(e,{ value, name }){
		let Actions = this.props.annonce_controle.actions;
		let actions=[...Actions];
		let action = Actions.find((act)=>name==act._id);
		let index = Actions.findIndex((act)=>name==act._id);
		actions.splice(index,1,{...action,action:value});

		this.props.annonceControle({actions:[...actions]});
	}
	//==============ACTION====================

	annonceAdd(){
		let {titre} = this.props.annonce_controle;

		this.props.annonceAdd(
			{
				titre, publier:true
			},
			(res)=>{
				let Actions = this.props.annonce_controle.actions;
				let actions=[...Actions];
				actions.push({_id:res,titre,action:"publier"});
				this.props.annonceControle({...this.init(),actions:[...actions]});
				this.annonceCount(res);
			});
		
	}
	annonceAppliquer(){
		let { actions } = this.props.annonce_controle;
		let { annonces } = this.props;

		this.annoncesSupprimer(actions.reduce((total, action)=>action.action=="supprimer"?[...total,action._id]:total,[]));
		this.annoncesUp(actions.filter((action,i)=>
			(action.action == "en_attente" && annonces[i].etat != "en attente")||
			(action.action == "valider" && annonces[i].etat != "valider")||
			(action.action == "refuser" && annonces[i].etat != "refuser")));
	}
	annoncesSupprimer(ids){
		this.props.annonceRm({_id:{$in:ids}});
	}
	annoncesUp(actions){
		if(actions&&actions.length>0){
			actions.forEach((action)=>{
				this.props.annonceUp({_id:action._id},{etat:action.action});
			});
		}
	}

	//========================Preparation du rendu========================
	
	render(){
		let { annonces_count } = this.props;
		let {titre, des, actions} = this.props.annonce_controle;
		
		return (
			<div>
				<Tableau
					ligne1sur2
					border_line
					border_table
					s_col = {[]}
					donnees={[
						{thead:[["Date","Seliste","Type","Categorie","Titre de l'annonce","Action"]]},
						{tbody:this.props.annonces?this.props.annonces.map((annonce)=>{
							let value = actions&&actions.find((act)=>act._id==annonce._id)?actions.find((act)=>act._id==annonce._id).action:"";
							let user = this.props.users.find(luser=>luser._id==annonce.user_id);
							let categorie = this.props.categories.find(luser=>luser._id==annonce.categorie);
							let date = new Date(annonce.date);
							return[dateToFormat(date),user?<A href = {hrefUser(user._id)}>{user.username}</A>:"",
								annonce.type,categorie?categorie.titre:"",
								<A href = {hrefAnnonce(annonce._id)}>{annonce.titre}</A>,
								<Dropdown
									placeholder = 'Action'
									name = {annonce._id}
									onChange = { this.changeAction.bind ( this ) } 
									options = { [
										{ value: "en_attente", text: "en attente" },
										{ value: "valider", text: "valider" },
										{ value: "refuser", text: "refuser" },
										{ value: "supprimer", text: "supprimer" }
									]}
									value = { 
										annonce.etat=="en_attente"&&value=="en_attente"?"en attente":annonce.etat!="en_attente"&&value=="en_attente"?"mettre en attente":
											annonce.etat=="valider"&&value=="valider"?"validé":annonce.etat!="valider"&&value=="valider"?"valider":
												annonce.etat=="refuser"&&value=="refuser"?"refusé":annonce.etat!="refuser"&&value=="refuser"?"refuser":
													value
									}
									style_choice = {{ 
										backgroundColor:annonce.etat=="en_attente"&&value=="en_attente"?"":annonce.etat!="en_attente"&&value=="en_attente"?"AntiqueWhite":
											annonce.etat=="valider"&&value=="valider"?"":annonce.etat!="valider"&&value=="valider"?"LimeGreen":
												annonce.etat=="refuser"&&value=="refuser"?"":annonce.etat!="refuser"&&value=="refuser"?"Orange":
													"red"
									}}
								/>];}):[]},
					]}
				/>
				<Button onClick={this.annonceAppliquer.bind(this)}>Appliquer</Button>
				
			</div>
		);
	}
}

function mapStateToProps( state ){
	return (
		{
			annonce_controle: state.annonce.controle,
			annonces: state.annonce.all,
			users: state.users.all,
			categories: state.categorie.all,
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		titrePage: ACTIONS.Titre.titrePage,
		activeMenu: ACTIONS.Menu.activeMenu,
		activeMenuMonCompte: ACTIONS.Menu.activeMenuMonCompte,
		annonceGetSSL: ACTIONS.Annonce.get_SSL,
		annonceControle: 	ACTIONS.Annonce.controle,
		annonceAdd:	ACTIONS.Annonce.add,
		annonceRm: 	ACTIONS.Annonce.rm,
		annonceUp: 	ACTIONS.Annonce.up,

		usersGet: 	ACTIONS.Users.get,
		categorieGet: ACTIONS.Categorie.get,

	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( GererAnnonces );
