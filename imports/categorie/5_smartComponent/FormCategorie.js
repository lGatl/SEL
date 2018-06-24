import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../../6_actions/actions";

import { Input, TextArea, Button, Tableau, Dropdown, Titre } from "../../_common/4_dumbComponent/_gat_ui_react";

import FixedLayoutMonCompte from "../../_common/4_dumbComponent/FixedLayoutMonCompte";
import ScrollInfini from "../../_common/5_smartComponent/ScrollInfini";

class FormCategorie extends Component {
	
	constructor(){
		super();
		this.state={suppr:0};
	}
	componentWillMount(){
		this.props.titrePage("Gérer les catégories");
		this.props.activeMenu("Mon Compte");
		this.props.activeMenuMonCompte("Gerer les categories");
		this.props.categorieControle(this.init());
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

	fnt(nv_elts){	
		
		this.props.categorieControle({actions:[...this.props.categorie_controle.actions||[],...nv_elts.map((categorie)=>{return{...categorie,action:categorie.publier?"publié":"desactivé"};})]});				
		nv_elts.map(categorie=>{
			this.annonceCount(categorie._id);
		});
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
		this.setState({suppr:this.state.suppr+1});
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
				<ScrollInfini 
					nbpp = {4}
					reload={"categorieListe"+this.state.suppr}
					nb_charge={this.props.categories.length}
					nb_total={this.props.nb_categories}
					initFnt = {this.props.categorieGetSSL.bind(this)}
					addFnt = {this.props.categorieGetAddSSL.bind(this)}
					countFnt = {this.props.categorieCount.bind(this)}
					fnt={this.fnt.bind(this)}
					condition = {{}}
				/>
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
									{thead:[[this.props.resize.windowwidth<700?"Categorie".substr(0, 3)+"...":"Categorie","Offre","Demande",<Button onClick={this.categorieAppliquer.bind(this)}>Appliquer</Button>]]}]}/>
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
								return[
									categorie?this.props.resize.windowwidth<700&&categorie.titre.length>7?categorie.titre.substr(0, 7)+"...":categorie.titre:"",
									offres_count,demandes_count,
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
			page: state.controle.page,
			resize: state.controle.resize,
			categorie_controle: state.categorie.controle,
			categories: state.categorie.all,
			annonces_count: state.annonce.count,
			nb_categories: state.categorie.count,
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		changePage: ACTIONS.Controle.changePage,
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
