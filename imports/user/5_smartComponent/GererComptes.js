import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../../6_actions/actions";



import { Input, TextArea, Button, Tableau, Dropdown, Titre } from "../../_common/4_dumbComponent/_gat_ui_react";

class FormUsers extends Component {

	componentWillMount(){
		this.props.usersControle(this.init());
		this.props.usersGet({},null,res=>{});
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

		this.userssSupprimer(actions.reduce((total, action)=>action.action=="supprimer"?[...total,action._id]:total,[]));
		this.userssUp(actions.filter(action=>action.action=="desactiver"||action.action=="publier"));
	}
	userssSupprimer(ids){
		this.props.usersRm({_id:{$in:ids}});
	}
	userssUp(actions){
		if(actions&&actions.length>0){
			actions.forEach((action)=>{
				this.props.usersUp({_id:action._id},{publier:action.action=="publier"?true:false});
			});
		}
	}
	goEdit(_id){
		FlowRouter.go("/user/"+_id+"/edit");
	}
	//========================Preparation du rendu========================
	
	render(){
		let {filtre} = this.props.users_controle;
		
		return (
			<div>
				<Titre>Gerer les Comptes</Titre>
				<form>
					
					<Input
						label = 'filtre'
						name = 'filtre'
						value = { filtre||"" }
						onChange = { this.change.bind( this ) } 
					/>
				
					<Tableau
						ligne1sur2
						border_line
						border_table
						s_col = {[{col:3,style:{flex:2}}]}
						donnees={[
							{thead:[["Login","ID","Action"]]},
							{tbody:this.props.userss.reduce((total,user)=>{
								console.log(user);
								return user.username.indexOf(filtre)>=0?
									[...total,[user.username, user._id,<Button onClick={this.goEdit.bind(this, user._id)}>Editer</Button>]]:total;
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
			users_controle: state.users.controle,
			userss: state.users.all,
			annonces_count: state.annonce.count
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		usersGet: ACTIONS.Users.get,
		usersControle: 	ACTIONS.Users.controle,
		usersAdd:	ACTIONS.Users.add,
		usersRm: 	ACTIONS.Users.rm,
		usersUp: 	ACTIONS.Users.up,

		annonceCount: ACTIONS.Annonce.count,
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( FormUsers );
