import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../../6_actions/actions";

import { Input, TextArea, Button, Tableau, Dropdown } from "../../_common/4_dumbComponent/_gat_ui_react";




class FormCategorie extends Component {

	componentWillMount(){
		this.props.categorieControle(this.init());
		this.props.categorieGet({},res=>this.props.categorieControle({actions:res.map((categorie)=>{return{...categorie,action:""};})}));
	}
	init(){
		return{ 
			titre: "",
		};
	}
	//Controle
	change(e,{ value, name }){

		this.props.categorieControle({ [name]:value });
	}
	changeAction(e,{ value, name }){
		console.log(e,{ value, name});
		let Actions = this.props.categorie_controle.actions;
		let actions=[...Actions];
		let action = Actions.find((act)=>name==act._id);
		let index = Actions.findIndex((act)=>name==act._id);
		actions.splice(index,1,{...action,action:value});

		this.props.categorieControle({actions:[...actions]});
	}
	//Action
	categorieAdd(){
		let {titre} = this.props.categorie_controle;

		this.props.categorieAdd(
			{
				titre,
			}
		);
		this.props.categorieControle(this.init());
	}
	//Preparation du rendu
	
	render(){
		console.log(this.props);
		let {titre, actions} = this.props.categorie_controle;

		return (
			<form>
				
				<Input
					label = 'Titre'
					name = 'titre'
					value = { titre||"" }
					onChange = { this.change.bind( this ) } 
				/>
			
				<Button
					onClick = { this.categorieAdd.bind( this ) }
				>Sauvegarder la categorie</Button>
				<Tableau
					ligne1sur2
					border_line
					border_table
					s_col = {[{col:3,style:{flex:3}}]}
					donnees={[
						{thead:[["Categorie","Offre","Demande","Action"]]},
						{tbody:this.props.categories.map((categorie)=>[categorie.titre,"0","0",
							<Dropdown
								placeholder = 'Action'
								name = {categorie._id}
								onChange = { this.changeAction.bind ( this ) } 
								options = { [
									{ value: "lien", text: "lien" },
									{ value: "lien2", text: "lien2" },
									{ value: "lien3", text: "lien3" }
								] }
								value = { actions.find((act)=>act._id==categorie._id).action||"" }
							/>])},
					]}
				/>
				
			</form>
		);
	}
}

function mapStateToProps( state ){
	return (
		{
			categorie_controle: state.categorie.controle,
			categories: state.categorie.all
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		categorieGet: ACTIONS.Categorie.get,
		categorieControle: 	ACTIONS.Categorie.controle,
		categorieAdd:	ACTIONS.Categorie.add
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( FormCategorie );
