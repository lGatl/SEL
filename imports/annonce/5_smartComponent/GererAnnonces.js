import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../../6_actions/actions";


import { dateToFormat } from "../../8_libs/date";
import { hrefUser, hrefAnnonce } from "../../8_libs/go";

import { Input, TextArea, Button, Tableau, Dropdown, Titre, A } from "../../_common/4_dumbComponent/_gat_ui_react";

import FixedLayoutMonCompte from "../../_common/4_dumbComponent/FixedLayoutMonCompte";
import ScrollInfini from "../../_common/5_smartComponent/ScrollInfini";
import Resize from "../../_common/5_smartComponent/Resize";

class GererAnnonces extends Component {

	componentWillMount(){
		this.props.titrePage("Gerer les annonces");
		this.props.activeMenu("Mon Compte");
		this.props.activeMenuMonCompte("Gerer les annonces");
		this.props.categorieGet({});
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
	
	fnt(nv_elts){	
		let { actions } = this.props.annonce_controle;
		let { annonces } = this.props;
		
		this.props.annonceControle(
			{actions:[
				...this.props.annonce_controle.actions||[], ...nv_elts.reduce((total,annonce)=>{
					return this.props.annonce_controle.actions&&this.props.annonce_controle.actions.findIndex(act=>act._id==annonce._id)>=0? total :
						[...total,{_id:annonce._id,action:annonce.etat}];	
				},[])
			]});
		this.props.usersGetAdd({_id:{$in:nv_elts.map(annonce=>annonce.user_id)}},()=>{});		
	}
	annonceAppliquer(){
		let { actions } = this.props.annonce_controle;
		let { annonces } = this.props;


		this.annoncesSupprimer(actions.reduce((total, action)=>action.action=="supprimer"?[...total,action._id]:total,[]));
		this.annoncesUp(actions.filter((action,i)=>{
			return(action.action == "en_attente" && annonces[i].etat != "en attente")||
			(action.action == "valider" && annonces[i].etat != "valider")||
			(action.action == "refuser" && annonces[i].etat != "refuser")

		}));
	}
	annoncesSupprimer(ids){
		this.props.annonceRm({_id:{$in:ids}},this.props.annonceCount.bind(this,{}));
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
			<div style={{display:"flex", flexDirection:"column", flex:1 }}>
				<ScrollInfini 
					nbpp = {4}
					reload={"gererAnnonces"+this.props.nb_annonces}
					nb_charge={this.props.annonces.length}
					nb_total={this.props.nb_annonces}
					initFnt = {this.props.annonceGetSSL.bind(this)}
					addFnt = {this.props.annonceGetAddSSL.bind(this)}
					countFnt = {this.props.annonceCount.bind(this)}
					condition = {{}}
					fnt = {this.fnt.bind(this)}
				/>
				<FixedLayoutMonCompte>
					<div style={{display:"flex", flexDirection:"column", flex:1 }}>
						<Tableau
							style = {{flex:1, marginBottom:0, borderBottom:"none",borderBottomLeftRadius: "0px 0px",borderBottomRightRadius: "0px 0px",}}
							ligne1sur2
							border_line
							border_table
							s_col = {[
								{col:0,style:{flex:1}},
								{col:1,style:{flex:1}},
								{col:2,style:{flex:Resize.comp(700,"none",1),width:Resize.comp(700,30,"auto")}},
								{col:3,style:{flex:1}},
								{col:4,style:{flex:1}},
								{col:5,style:{flex:"none"}},

							]}
							donnees={[
								{thead:[[
									"Date",
									"Seliste",
									Resize.ellipsis("Type",700,1) ,
									Resize.ellipsis("Categorie",700,3),
									Resize.ellipsis("Titre de l'annonce",700,5),
									<Button style = {{minWidth:100}}onClick={this.annonceAppliquer.bind(this)}>Appliquer</Button>]]} ]}/>
					</div>
					
				</FixedLayoutMonCompte>
								

				<Tableau
					style ={{flex:1, marginTop:50,borderTopLeftRadius: "0px 0px",borderTopRightRadius: "0px 0px",}}
					ligne1sur2
					border_line
					border_table
					s_col = {[
						{col:0,style:{flex:1}},
						{col:1,style:{flex:1}},
						{col:2,style:{flex:Resize.comp(700,"none",1),width:Resize.comp(700,30,"auto")}},
						{col:3,style:{flex:1}},
						{col:4,style:{flex:1}},
						{col:5,style:{flex:"none"}},

					]}
					donnees={[
						{tbody:this.props.annonces?this.props.annonces.map((annonce)=>{
							let value = actions&&actions.find((act)=>act._id==annonce._id)?actions.find((act)=>act._id==annonce._id).action:"";
							let user = this.props.users.find(luser=>luser._id==annonce.user_id);
							let categorie = this.props.categories.find(luser=>luser._id==annonce.categorie);
							let date = new Date(annonce.date);
							return[
								Resize.ellipsis(dateToFormat(date),700,5,"",true),
								user?<A href = {hrefUser(user._id)}>{Resize.ellipsis(user.username,700,5,"...")}</A>:"",
								Resize.comp(700,annonce.type.substr(0, 1).toUpperCase(),annonce.type),
								categorie?Resize.ellipsis(categorie.titre,700,5,"..."):"",
								<A href = {hrefAnnonce(annonce._id)}>{Resize.ellipsis(annonce.titre.length>20?annonce.titre.substr(0, 20)+"...":annonce.titre,700,7,"...")}</A>,
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
			</div>
		);
	}
}

function mapStateToProps( state ){
	return (
		{
			resize: state.controle.resize,
			annonce_controle: state.annonce.controle,
			annonces: state.annonce.all,
			nb_annonces: state.annonce.count,
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
		annonceGetAddSSL: ACTIONS.Annonce.getAdd_SSL,
		annonceCount: ACTIONS.Annonce.count,

		annonceControle: 	ACTIONS.Annonce.controle,
		annonceRm: 	ACTIONS.Annonce.rm,
		annonceUp: 	ACTIONS.Annonce.up,

		usersGet: 	ACTIONS.Users.get,
		usersGetAdd: 	ACTIONS.Users.getAdd,
		categorieGet: ACTIONS.Categorie.get,

	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( GererAnnonces );
