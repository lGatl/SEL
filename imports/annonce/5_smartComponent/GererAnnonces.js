import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../../6_actions/actions";


import { dateToFormat } from "../../8_libs/date";
import { hrefUser, hrefAnnonce } from "../../8_libs/go";
import { throttle } from "../../8_libs/throttle";

import { Input, TextArea, Button, Tableau, Dropdown, Titre, A } from "../../_common/4_dumbComponent/_gat_ui_react";

import FixedLayoutMonCompte from "../../_common/4_dumbComponent/FixedLayoutMonCompte";



class GererAnnonces extends Component {
	constructor(){
		super();
		this.resize = throttle(this.resize.bind(this),40);
		this.scroll = throttle(this.scroll.bind(this),40);
		this.state = {
			windowwidth:window.innerWidth,
			nbpp: 10,
			nump: 0
		};
	}

	componentWillMount(){
		this.props.titrePage("Gerer les annonces");
		this.props.activeMenu("Mon Compte");
		this.props.activeMenuMonCompte("Gerer les annonces");
		this.props.categorieGet({});
		this.props.annonceGetSSL({},{sort:{date:-1},skip:0,limit:this.state.nbpp},annonces=>{
			this.setState({nump:1});
			this.props.usersGet({_id:{$in:annonces.map(annonce=>annonce.user_id)}},()=>{
				this.props.annonceCount({},(nb_annonces)=>{
					this.scroll(annonces,nb_annonces);
				});
			});
			
			this.props.annonceControle({actions:annonces.map((annonce)=>{return{_id:annonce._id,action:annonce.etat};})});
		});
	}
	componentDidMount() {
		document.addEventListener("scroll", this.scroll);
		window.addEventListener("resize", this.resize);
	}

	componentWillUnmount() {
		document.removeEventListener("scroll", this.scroll);
		window.removeEventListener("resize", this.resize);
	}
	//==============CONTROLE====================
	resize(){
		this.setState({windowwidth:window.innerWidth});
	}
	changeAction(e,{ value, name }){
		let Actions = this.props.annonce_controle.actions;
		let actions=[...Actions];
		let action = Actions.find((act)=>name==act._id);
		let index = Actions.findIndex((act)=>name==act._id);
		actions.splice(index,1,{...action,action:value});

		this.props.annonceControle({actions:[...actions]});
	}
	//==============ACTION====================
	scroll(annonces,nb_annonces){
		if(
			((window.scrollY >= (document.documentElement.scrollHeight - document.documentElement.clientHeight)*0.95)||
			(document.documentElement.scrollHeight - document.documentElement.clientHeight)==0)
			&& ((this.props.annonces.length < this.props.nb_annonces)||(annonces&&nb_annonces&&annonces.length < nb_annonces))
		){
			this.props.annonceGetAddSSL({},{sort:{date:-1},skip:((this.state.nump)*this.state.nbpp),limit:this.state.nbpp},(nv_annonces)=>{
				this.props.usersGetAdd({_id:{$in:nv_annonces.map(annonce=>annonce.user_id)}},()=>{
					this.props.annonceCount({},(nb_annonces)=>{
						this.scroll(annonces,nb_annonces);
					});
					this.props.annonceControle({actions:[...this.props.annonce_controle.actions, ...nv_annonces.map((annonce)=>{return{_id:annonce._id,action:annonce.etat};})]});
				});
				
			});
			this.setState({nump:this.state.nump+1});
		}
	}
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
			<div style={{display:"flex", flexDirection:"column", flex:1 }}>
				
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
								{col:2,style:{flex:this.state.windowwidth<700?"none":1,width:this.state.windowwidth<700?30:"auto"}},
								{col:3,style:{flex:1}},
								{col:4,style:{flex:1}},
								{col:5,style:{flex:"none"}},

							]}
							donnees={[
								{thead:[[
									"Date",
									"Seliste",
									this.state.windowwidth<700?"Type".substr(0, 1):"Type", 
									this.state.windowwidth<700?"Categorie".substr(0, 3)+"...":"Categorie",
									this.state.windowwidth<700?"Titre":"Titre de l'annonce",
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
						{col:2,style:{flex:this.state.windowwidth<700?"none":1,width:this.state.windowwidth<700?30:"auto"}},
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
								this.state.windowwidth<700?dateToFormat(date).substr(0, dateToFormat(date).length-5):dateToFormat(date),
								user?<A href = {hrefUser(user._id)}>{this.state.windowwidth<700?user.username.substr(0, 5)+"...":user.username}</A>:"",
								this.state.windowwidth<700?annonce.type.substr(0, 1).toUpperCase():annonce.type,
								categorie?this.state.windowwidth<700?categorie.titre.substr(0, 3)+"...":categorie.titre:"",
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
			</div>
		);
	}
}

function mapStateToProps( state ){
	return (
		{
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
		annonceAdd:	ACTIONS.Annonce.add,
		annonceRm: 	ACTIONS.Annonce.rm,
		annonceUp: 	ACTIONS.Annonce.up,

		usersGet: 	ACTIONS.Users.get,
		usersGetAdd: 	ACTIONS.Users.getAdd,
		categorieGet: ACTIONS.Categorie.get,

	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( GererAnnonces );
