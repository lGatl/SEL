import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../../6_actions/actions";
import { dateToFormat } from "../../8_libs/date";

import { Input, TextArea, Button, Tableau, Dropdown, Titre, A } from "../../_common/4_dumbComponent/_gat_ui_react";

import { hrefActualite } from "../../8_libs/go";

import FixedLayoutMonCompte from "../../_common/4_dumbComponent/FixedLayoutMonCompte";
import ScrollInfini from "../../_common/5_smartComponent/ScrollInfini";


class GererActu extends Component {

	constructor(){
		super();
		this.state={suppr:0};
	}
	componentWillMount(){
		this.props.titrePage("Gerer les actualités");
		this.props.activeMenu("Mon Compte");
		this.props.activeMenuMonCompte("Gerer les actualites");
		this.props.actualiteControle(this.init());
		
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

	fnt(nv_elts){
		this.props.actualiteControle(
			{actions:[
				...this.props.actualite_controle.actions||[], ...nv_elts.reduce((total,actualite)=>{
					return this.props.actualite_controle.actions&&this.props.actualite_controle.actions.findIndex(act=>act._id==actualite._id)>=0? total :
						[...total,{_id:actualite._id,action:actualite.publier?"publié":"desactivé"}];	
				},[])
			]});
	}
	creeActu(){
		FlowRouter.go("/admin/actualite/creer");
	}
	actualiteAppliquer(){
		let { actions } = this.props.actualite_controle;

		this.actualitesSupprimer(actions.reduce((total, action)=>action.action=="supprimer"?[...total,action._id]:total,[]));
		this.actualitesUp(actions.filter(action=>action.action=="desactiver"||action.action=="publier"));
	}
	actualitesSupprimer(ids){
		this.setState({suppr:this.state.suppr+1});
		ids.length>0?this.props.actualiteRm({_id:{$in:ids}}):"";
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
	
			<form id="form" style={{display:"flex", flex:1, flexDirection:"column"}}>
				<ScrollInfini 
					nbpp = {4}
					reload={"gererActualites"+this.state.suppr}
					nb_charge={this.props.actualites.length}
					nb_total={this.props.nb_actualites}
					initFnt = {this.props.actualiteGetSSL.bind(this)}
					addFnt = {this.props.actualiteGetAddSSL.bind(this)}
					countFnt = {this.props.actualiteCount.bind(this)}
					condition = {{}}
					fnt = {this.fnt.bind(this)}
				/>
				<FixedLayoutMonCompte>
					<div style={{display:"flex", flex:1, flexDirection:"column"}}>
						<Button
							style = {{marginLeft:8,marginRight:8}}
							onClick = { this.creeActu.bind(this) }
						>Ajouter une actualité</Button>
						<Tableau
							style={{ marginBottom:0, borderBottom:"none",borderBottomLeftRadius: "0px 0px",borderBottomRightRadius: "0px 0px",}}
							ligne1sur2
							border_line
							border_table
							s_col = {[{col:3,style:{flex:2}}]}
							donnees={[
								{thead:[["Date","Titre",<Button onClick={this.actualiteAppliquer.bind(this)}>Appliquer</Button>]]},]}/>
					</div>
				</FixedLayoutMonCompte>
				
				<Tableau
					style={{marginTop:90,borderTopLeftRadius: "0px 0px",borderTopRightRadius: "0px 0px", }}
					ligne1sur2
					border_line
					border_table
					s_col = {[{col:3,style:{flex:2}}]}
					donnees={[
						{tbody:this.props.actualites.map((actualite)=>{
							let value = actions&&actions.find((act)=>act._id==actualite._id)?actions.find((act)=>act._id==actualite._id).action:"";
							let date = new Date(actualite.date);

							return[
								this.props.resize.windowwidth<700?dateToFormat(date).substr(0, dateToFormat(date).length-5):dateToFormat(date),
								<A href = {hrefActualite(actualite._id)}>{actualite.titre}</A>,
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
				
			</form>
		);
	}
}

function mapStateToProps( state ){
	return (
		{
			resize: state.controle.resize,
			actualite_controle: state.actualite.controle,
			actualites: state.actualite.all,
			nb_actualites: state.actualite.count,
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		titrePage: ACTIONS.Titre.titrePage,
		activeMenu: ACTIONS.Menu.activeMenu,
		activeMenuMonCompte: ACTIONS.Menu.activeMenuMonCompte,
		actualiteGetSSL: ACTIONS.Actualite.get_SSL,
		actualiteGetAddSSL: ACTIONS.Actualite.getAdd_SSL,
		actualiteCount: ACTIONS.Actualite.count,
		actualiteControle: 	ACTIONS.Actualite.controle,
		actualiteAdd:	ACTIONS.Actualite.add,
		actualiteRm: 	ACTIONS.Actualite.rm,
		actualiteUp: 	ACTIONS.Actualite.up,

	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( GererActu );
