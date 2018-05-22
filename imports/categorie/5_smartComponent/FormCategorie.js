import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../../6_actions/actions";

import { Input, TextArea, Button, Tableau, Dropdown, Titre } from "../../_common/4_dumbComponent/_gat_ui_react";

import { throttle } from "../../8_libs/throttle";

import FixedLayoutMonCompte from "../../_common/4_dumbComponent/FixedLayoutMonCompte";

class FormCategorie extends Component {
	constructor(){
		super();
		this.scroll = throttle(this.scroll.bind(this),40);
		this.state = {
			nbpp: 5,
			nump: 0
		};
	}
	componentWillMount(){
		this.props.titrePage("Gérer les catégories");
		this.props.activeMenu("Mon Compte");
		this.props.activeMenuMonCompte("Gerer les categories");
		this.props.categorieControle(this.init());
		this.props.categorieGetSSL({},{sort:{date:-1},skip:0,limit:this.state.nbpp},categories=>{
			this.setState({nump:1});
			this.props.categorieControle({actions:categories.map((categorie)=>{return{...categorie,action:categorie.publier?"publié":"desactivé"};})});
			this.props.categorieCount({},(nb_categories)=>{
				this.scroll(categories,nb_categories);
			});
			categories.map(categorie=>{
				this.annonceCount(categorie._id);
			});
			this.props.categorieControle({actions:categories.map((categorie)=>{return{...categorie,action:categorie.publier?"publié":"desactivé"};})});
		});
	}
	componentDidMount() {
		document.addEventListener("scroll", this.scroll);
	}

	componentWillUnmount() {
		document.removeEventListener("scroll", this.scroll);
	}
	init(){
		return{ 
			titre: "",	
		};
	}
	//==============CONTROLE====================
	change(e,{ value, name }){
		
		this.props.categorieControle({ [name]:value });
	}
	changeAction(e,{ value, name }){
		let Actions = this.props.categorie_controle.actions;
		let actions=[...Actions];
		let action = Actions.find((act)=>name==act._id);
		let index = Actions.findIndex((act)=>name==act._id);
		actions.splice(index,1,{...action,action:value});

		this.props.categorieControle({actions:[...actions]});
	}
	//==============ACTION====================

	scroll(categories,nb_categories){
		if(
			((window.scrollY >= (document.documentElement.scrollHeight - document.documentElement.clientHeight)*0.95)||
			(document.documentElement.scrollHeight - document.documentElement.clientHeight)==0)
			&& ((this.props.categories.length < this.props.nb_categories)||(categories&&nb_categories&&categories.length < nb_categories))
		){
			this.props.categorieGetAddSSL({},{sort:{date:-1},skip:((this.state.nump)*this.state.nbpp),limit:this.state.nbpp},(nv_categories)=>{
				this.props.categorieControle({actions:[...this.props.categorie_controle.actions,...nv_categories.map((categorie)=>{return{...categorie,action:categorie.publier?"publié":"desactivé"};})]});				
				nv_categories.map(categorie=>{
					this.annonceCount(categorie._id);
				});
				this.props.categorieCount({},(nb_categories)=>{
					this.scroll(nv_categories,nb_categories);
				});
			});
			this.setState({nump:this.state.nump+1});
		}
	}
	annonceCount(categorie_id){
		this.props.annonceCount_state({categorie:categorie_id, type: "offre"},{count: "offre"+categorie_id});
		this.props.annonceCount_state({categorie:categorie_id, type: "demande"},{count: "demande"+categorie_id});
	}
	categorieAdd(){
		let {titre} = this.props.categorie_controle;

		this.props.categorieAdd(
			{
				titre, date:new Date(Date.now()), publier:false
			},
			(res)=>{
				let Actions = this.props.categorie_controle.actions;
				let actions=[...Actions];
				actions.push({_id:res,titre,action:"publier"});
				this.props.categorieControle({...this.init(),actions:[...actions]});
				this.annonceCount(res);
			});
		
	}
	categorieAppliquer(){
		let { actions } = this.props.categorie_controle;

		this.categoriesSupprimer(actions.reduce((total, action)=>action.action=="supprimer"?[...total,action._id]:total,[]));
		this.categoriesUp(actions.filter(action=>action.action=="desactiver"||action.action=="publier"));
	}
	categoriesSupprimer(ids){
		this.props.categorieRm({_id:{$in:ids}});
	}
	categoriesUp(actions){
		if(actions&&actions.length>0){
			actions.forEach((action)=>{
				this.props.categorieUp({_id:action._id},{publier:action.action=="publier"?true:false});
			});
		}
	}
	//========================Preparation du rendu========================
	
	render(){
		let { annonces_count } = this.props;
		let {titre, actions} = this.props.categorie_controle;
		
		return (
			<div style = {{flex:1,display:"flex", flexDirection:"column"}}>
				<form>
					<FixedLayoutMonCompte>
						<div style = {{flex:1,display:"flex", flexDirection:"column"}}>
							<Input
								label = 'Titre'
								name = 'titre'
								value = { titre||"" }
								onChange = { this.change.bind( this ) } 
							/>
						
							<Button
								onClick = { this.categorieAdd.bind( this ) }
							>Ajouter la catégorie</Button>
						
							<Tableau
								style={{ marginBottom:0, borderBottom:"none",borderBottomLeftRadius: "0px 0px",borderBottomRightRadius: "0px 0px",}}
								ligne1sur2
								border_line
								border_table
								s_col = {[{col:3,style:{flex:2}}]}
								donnees={[
									{thead:[["Catégorie","Offre","Demande",<Button onClick={this.categorieAppliquer.bind(this)}>Appliquer</Button>]]}]}/>
						</div>
					</FixedLayoutMonCompte>
				
					
					
					<Tableau
						style={{marginTop:155,borderTopLeftRadius: "0px 0px",borderTopRightRadius: "0px 0px", }}
						ligne1sur2
						border_line
						border_table
						s_col = {[{col:3,style:{flex:2}}]}
						donnees={[
							{tbody:this.props.categories.map((categorie)=>{
								let value = actions&&actions.find((act)=>act._id==categorie._id)?actions.find((act)=>act._id==categorie._id).action:"";
								let offres_count = annonces_count&&categorie?annonces_count["offre"+categorie._id]:"";
								let demandes_count = annonces_count&&categorie?annonces_count["demande"+categorie._id]:"";
								return[categorie.titre,offres_count,demandes_count,
									<Dropdown
										placeholder = 'Action'
										name = {categorie._id}
										onChange = { this.changeAction.bind ( this ) } 
										options = { [
											{ value: "publier", text: "publier" },
											{ value: "desactiver", text: "desactiver" },
											{ value: "supprimer", text: "supprimer" }
										]}
										style_choice = {{backgroundColor:value == "supprimer"?"red":!categorie.publier&&value =="publier"?"AliceBlue":categorie.publier&&value=="desactiver"?"Cornsilk":"white" }}
										value = { categorie.publier&&value == "publier"?"publié":(!categorie.publier)&&value == "desactiver"?"desactivé":value||"" }
									/>];})},
						]}
					/>	
				</form>
			</div>
		);
	}
}

function mapStateToProps( state ){
	return (
		{
			categorie_controle: state.categorie.controle,
			categories: state.categorie.all,
			annonces_count: state.annonce.count,
			nb_categories: state.categorie.count,
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		titrePage: ACTIONS.Titre.titrePage,
		activeMenu: ACTIONS.Menu.activeMenu,
		activeMenuMonCompte: ACTIONS.Menu.activeMenuMonCompte,
		categorieGetSSL: ACTIONS.Categorie.get_SSL,
		categorieGetAddSSL: ACTIONS.Categorie.getAdd_SSL,
		categorieControle: 	ACTIONS.Categorie.controle,
		categorieAdd:	ACTIONS.Categorie.add,
		categorieRm: 	ACTIONS.Categorie.rm,
		categorieUp: 	ACTIONS.Categorie.up,
		categorieCount: ACTIONS.Categorie.count,

		annonceCount_state: ACTIONS.Annonce.count_state,
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( FormCategorie );
