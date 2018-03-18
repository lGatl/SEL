import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../../6_actions/actions";

import { Input, TextArea, Button, Tableau, Dropdown, Titre } from "../../_common/4_dumbComponent/_gat_ui_react";

class FormCategorie extends Component {

	componentWillMount(){
		this.props.categorieControle(this.init());
		this.props.categorieGet({},null,res=>{
			res.map(categorie=>{
				this.annonceCount(categorie._id);
			});
			this.props.categorieControle({actions:res.map((categorie)=>{return{...categorie,action:categorie.publier?"publié":"desactivé"};})});
		});
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
	annonceCount(categorie_id){
		this.props.annonceCount({categorie:categorie_id, type: "offre"},"offre"+categorie_id);
		this.props.annonceCount({categorie:categorie_id, type: "demande"},"demande"+categorie_id);
	}
	categorieAdd(){
		let {titre} = this.props.categorie_controle;

		this.props.categorieAdd(
			{
				titre, publier:false
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
		let {titre, des, actions} = this.props.categorie_controle;
		
		return (
			<div>
			<Titre>Gerer les categories</Titre>
				<form>
					
					<Input
						label = 'Titre'
						name = 'titre'
						value = { titre||"" }
						onChange = { this.change.bind( this ) } 
					/>
				
					<Button
						onClick = { this.categorieAdd.bind( this ) }
					>Ajouter la categorie</Button>
					<Tableau
						ligne1sur2
						border_line
						border_table
						s_col = {[{col:3,style:{flex:2}}]}
						donnees={[
							{thead:[["Categorie","Offre","Demande","Action"]]},
							{tbody:this.props.categories.map((categorie)=>{
								let value = actions?actions.find((act)=>act._id==categorie._id).action:{};
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
					<Button onClick={this.categorieAppliquer.bind(this)}>Appliquer</Button>
					
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
			annonces_count: state.annonce.count
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		categorieGet: ACTIONS.Categorie.get,
		categorieControle: 	ACTIONS.Categorie.controle,
		categorieAdd:	ACTIONS.Categorie.add,
		categorieRm: 	ACTIONS.Categorie.rm,
		categorieUp: 	ACTIONS.Categorie.up,

		annonceCount: ACTIONS.Annonce.count,
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( FormCategorie );
