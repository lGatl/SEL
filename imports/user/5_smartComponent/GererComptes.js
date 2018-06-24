import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../../6_actions/actions";

import { Input, TextArea, Button, Tableau, Dropdown, Titre, A } from "../../_common/4_dumbComponent/_gat_ui_react";

import { hrefUser, goUserEdit } from "../../8_libs/go";
import FixedLayoutMonCompte from "../../_common/4_dumbComponent/FixedLayoutMonCompte";
import ScrollInfini from "../../_common/5_smartComponent/ScrollInfini";

class FormUsers extends Component {

	componentWillMount(){
		this.props.titrePage("Gerer les comptes");
		this.props.activeMenu("Mon Compte");
		this.props.activeMenuMonCompte("Gerer les comptes");
		this.props.usersControle(this.init());
	}
	init(){
		return{ 
			filtre: "",	
		};
	}
	//==============CONTROLE====================
	change(e,{ value, name }){
		
		this.props.usersControle({ [name]:value });
	}
	
	//==============ACTION====================
	usersAdd(){
		let {titre} = this.props.users_controle;

		this.props.usersAdd(
			{
				titre, publier:false
			},
			(res)=>{
				let Actions = this.props.users_controle.actions;
				let actions=[...Actions];
				actions.push({_id:res,titre,action:"publier"});
				this.props.usersControle({...this.init(),actions:[...actions]});
			});
		
	}
	usersAppliquer(){
		let { actions } = this.props.users_controle;

		this.usersSupprimer(actions.reduce((total, action)=>action.action=="supprimer"?[...total,action._id]:total,[]));
		this.usersUp(actions.filter(action=>action.action=="desactiver"||action.action=="publier"));
	}
	usersSupprimer(ids){
		this.props.usersRm({_id:{$in:ids}});
	}
	usersUp(actions){
		if(actions&&actions.length>0){
			actions.forEach((action)=>{
				this.props.usersUp({_id:action._id},{publier:action.action=="publier"?true:false});
			});
		}
	}

	//========================Preparation du rendu========================
	
	render(){
		let {filtre} = this.props.users_controle;
		
		return (
			<div style={{display:"flex", flex:1, flexDirection:"column"}}>
				<ScrollInfini 
					nbpp = {4}
					reload={"comptesListe"}
					nb_charge={this.props.users.length}
					nb_total={this.props.nb_users}
					initFnt = {this.props.usersGetSSL.bind(this)}
					addFnt = {this.props.usersGetAddSSL.bind(this)}
					countFnt = {this.props.usersCount.bind(this)}
					condition = {filtre?{ username: { $regex: filtre } }:{}}//VOIR INDEXATION !!!!!!!!!!!!!!!
				/>
				<form>
					<FixedLayoutMonCompte>
						<div style={{display:"flex", flexDirection:"column", flex:1 }}>
							<Input
								label = 'filtre'
								name = 'filtre'
								value = { filtre||"" }
								onChange = { this.change.bind( this ) } 
							/>
							<Tableau
								style={{ marginBottom:0, borderBottom:"none",borderBottomLeftRadius: "0px 0px",borderBottomRightRadius: "0px 0px",}}
								ligne1sur2
								border_line
								border_table
								s_col = {[
									{col:0,style:{overflow:"hidden"}},
									{col:1,style:{overflow:"hidden"}},
									{col:2,style:{overflow:"hidden"}}
								]}
								donnees={[
									{thead:[["Login","ID","Action"]]}]}/>
						</div>
						
					</FixedLayoutMonCompte>
				
					<Tableau
						style={{marginTop:120,borderTopLeftRadius: "0px 0px",borderTopRightRadius: "0px 0px", }}
						ligne1sur2
						border_line
						border_table
						s_col = {[
							
							{col:0,style:{overflow:"hidden"}},
							{col:1,style:{overflow:"hidden"}},
							{col:2,style:{overflow:"hidden"}}
						]}
						donnees={[
							{tbody:this.props.users.reduce((total,user)=>{
								return [...total,[
									user?<A href = {hrefUser(user._id)}>{this.props.resize.windowwidth<700&&user.username.length>10?user.username.substr(0, 10)+"...":user.username}</A>:"",
									user?<A href = {hrefUser(user._id)}>{this.props.resize.windowwidth<700?user._id.substr(0, 8)+"...":user._id}</A>:"",
									<Button onClick={goUserEdit.bind(this, user._id)}>Editer</Button>
								]];
							},[])
							},
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
			users_controle: state.users.controle,
			nb_users: state.users.count,
			users: state.users.all,
			annonces_count: state.annonce.count
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		changePage: ACTIONS.Controle.changePage,
		titrePage: ACTIONS.Titre.titrePage,
		activeMenu: ACTIONS.Menu.activeMenu,
		activeMenuMonCompte: ACTIONS.Menu.activeMenuMonCompte,
		usersGetSSL: ACTIONS.Users.get_SSL,
		usersGetAddSSL: ACTIONS.Users.getAdd_SSL,
		usersCount: ACTIONS.Users.count,
		usersControle: 	ACTIONS.Users.controle,
		usersAdd:	ACTIONS.Users.add,
		usersRm: 	ACTIONS.Users.rm,
		usersUp: 	ACTIONS.Users.up,

		annonceCount: ACTIONS.Annonce.count,
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( FormUsers );
