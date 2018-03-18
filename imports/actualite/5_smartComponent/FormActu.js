import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../../6_actions/actions";
import { dateToFormat } from "../../8_libs/date";

import { Input, TextArea, Button, Tableau, Dropdown, Titre } from "../../_common/4_dumbComponent/_gat_ui_react";

class FormActu extends Component {

	componentWillMount(){
		this.props.actualiteControle(this.init());
		this.props.actualiteGet({},null,res=>{
			this.props.actualiteControle({actions:res.map((actualite)=>{return{...actualite,action:actualite.publier?"publié":"desactivé"};})});
		});
	}
	init(){
		return{ 
			titre: "",
			description:""	
		};
	}
	//==============CONTROLE====================
	change(e,{ value, name }){
		
		this.props.actualiteControle({ [name]:value });
	}
	changeAction(e,{ value, name }){
		let Actions = this.props.actualite_controle.actions;
		let actions=[...Actions];
		let action = Actions.find((act)=>name==act._id);
		let index = Actions.findIndex((act)=>name==act._id);
		actions.splice(index,1,{...action,action:value});

		this.props.actualiteControle({actions:[...actions]});
	}
	//==============ACTION====================
	actualiteAdd(){
		let {titre, description} = this.props.actualite_controle;

		this.props.actualiteAdd(
			{
				titre, description, date:Date.now(), publier:false
			},
			(res)=>{
				let Actions = this.props.actualite_controle.actions;
				let actions=[...Actions];
				actions.push({_id:res,titre,description,action:"publier"});
				this.props.actualiteControle({...this.init(),actions:[...actions]});
			});
		
	}
	actualiteAppliquer(){
		let { actions } = this.props.actualite_controle;

		this.actualitesSupprimer(actions.reduce((total, action)=>action.action=="supprimer"?[...total,action._id]:total,[]));
		this.actualitesUp(actions.filter(action=>action.action=="desactiver"||action.action=="publier"));
	}
	actualitesSupprimer(ids){
		this.props.actualiteRm({_id:{$in:ids}});
	}
	actualitesUp(actions){
		if(actions&&actions.length>0){
			actions.forEach((action)=>{
				this.props.actualiteUp({_id:action._id},{publier:action.action=="publier"?true:false});
			});
		}
	}
	//========================Preparation du rendu========================
	
	render(){

		let {titre, description, actions} = this.props.actualite_controle;
		
		return (
			<div>
				<Titre>Gerer les actualites</Titre>
				<form>
					
					<Input
						label = 'Titre'
						name = 'titre'
						value = { titre||"" }
						onChange = { this.change.bind( this ) } 
					/>
					<TextArea
						label = 'Description'
						name = 'description'
						value = { description||"" }
						onChange = { this.change.bind( this ) } 
					/>
				
					<Button
						onClick = { this.actualiteAdd.bind( this ) }
					>Ajouter la actualite</Button>
					<Tableau
						ligne1sur2
						border_line
						border_table
						s_col = {[{col:3,style:{flex:2}}]}
						donnees={[
							{thead:[["Date","Titre","Action"]]},
							{tbody:this.props.actualites.map((actualite)=>{
								let value = actions?actions.find((act)=>act._id==actualite._id).action:{};
								let date = new Date(actualite.date);

								return[dateToFormat(date),actualite.titre,
									<Dropdown
										placeholder = 'Action'
										name = {actualite._id}
										onChange = { this.changeAction.bind ( this ) } 
										options = { [
											{ value: "publier", text: "publier" },
											{ value: "desactiver", text: "desactiver" },
											{ value: "supprimer", text: "supprimer" }
										]}
										style_choice = {{backgroundColor:value == "supprimer"?"red":!actualite.publier&&value =="publier"?"AliceBlue":actualite.publier&&value=="desactiver"?"Cornsilk":"white" }}
										value = { actualite.publier&&value == "publier"?"publié":(!actualite.publier)&&value == "desactiver"?"desactivé":value||"" }
									/>];})},
						]}
					/>
					<Button onClick={this.actualiteAppliquer.bind(this)}>Appliquer</Button>
					
				</form>
			</div>
		);
	}
}

function mapStateToProps( state ){
	return (
		{
			actualite_controle: state.actualite.controle,
			actualites: state.actualite.all,
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		actualiteGet: ACTIONS.Actualite.get,
		actualiteControle: 	ACTIONS.Actualite.controle,
		actualiteAdd:	ACTIONS.Actualite.add,
		actualiteRm: 	ACTIONS.Actualite.rm,
		actualiteUp: 	ACTIONS.Actualite.up,

	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( FormActu );
