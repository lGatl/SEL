import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../../6_actions/actions";
import { dateToFormat } from "../../8_libs/date";

import { Input, TextArea, Button, Tableau, Dropdown, Titre, A } from "../../_common/4_dumbComponent/_gat_ui_react";

import { hrefActualite } from "../../8_libs/go";
import { throttle } from "../../8_libs/throttle";

import FixedLayoutMonCompte from "../../_common/4_dumbComponent/FixedLayoutMonCompte";

class FormActu extends Component {

	constructor(){
		super();
		this.scroll = throttle(this.scroll.bind(this),40);
		this.state = {
			nbpp: 10,
			nump: 0
		};
	}

	componentWillMount(){
		this.props.titrePage("Gerer les actualités");
		this.props.activeMenu("Mon Compte");
		this.props.activeMenuMonCompte("Gerer les actualites");
		this.props.actualiteControle(this.init());
		this.props.actualiteGetSSL({},{sort:{date:-1},skip:0,limit:this.state.nbpp},actualites=>{
			this.setState({nump:1});
			this.props.actualiteControle({actions:actualites.map((actualite)=>{return{...actualite,action:actualite.publier?"publié":"desactivé"};})});
			this.props.actualiteCount({},(nb_actualites)=>{
				this.scroll(actualites,nb_actualites);
			});
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

	scroll(actualites,nb_actualites){
		if(
			((window.scrollY >= (document.documentElement.scrollHeight - document.documentElement.clientHeight)*0.95)||
			(document.documentElement.scrollHeight - document.documentElement.clientHeight)==0)
			&& ((this.props.actualites.length < this.props.nb_actualites)||(actualites&&nb_actualites&&actualites.length < nb_actualites))
		){
			this.props.actualiteGetAddSSL({},{sort:{date:-1},skip:((this.state.nump)*this.state.nbpp),limit:this.state.nbpp},(nv_actualites)=>{
				this.props.actualiteControle({actions:[...this.props.actualite_controle.actions,...nv_actualites.map((actualite)=>{return{...actualite,action:actualite.publier?"publié":"desactivé"};})]});				

				this.props.actualiteCount({},(nb_actualites)=>{
					this.scroll(actualites,nb_actualites);
				});
			});
			this.setState({nump:this.state.nump+1});
		}
	}
	actualiteAdd(){
		let {titre, description} = this.props.actualite_controle;

		this.props.actualiteAdd(
			{
				titre, description, date: new Date(Date.now()), publier:false
			},
			(res)=>{
				//document.getElementById("form").reset();
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
				<FixedLayoutMonCompte>
					<div style={{display:"flex", flex:1, flexDirection:"column"}}>
						<Input
							label = 'Titre'
							name = 'titre'
							value = { titre||"" }
							onChange = { this.change.bind( this ) } 
						/>
						<TextArea
							style = {{resize:"vertical", minHeight:46}}
							label = 'Description'
							name = 'description'
							value = { description||"" }
							onChange = { this.change.bind( this ) } 
						/>
					
						<Button
							style = {{marginLeft:8,marginRight:8}}
							onClick = { this.actualiteAdd.bind( this ) }
						>Ajouter l'actualité</Button>
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
					style={{marginTop:245,borderTopLeftRadius: "0px 0px",borderTopRightRadius: "0px 0px", }}
					ligne1sur2
					border_line
					border_table
					s_col = {[{col:3,style:{flex:2}}]}
					donnees={[
						{tbody:this.props.actualites.map((actualite)=>{
							let value = actions&&actions.find((act)=>act._id==actualite._id)?actions.find((act)=>act._id==actualite._id).action:"";
							let date = new Date(actualite.date);

							return[dateToFormat(date),<A href = {hrefActualite(actualite._id)}>{actualite.titre}</A>,
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

export default connect( mapStateToProps, mapDispatchToProps )( FormActu );
