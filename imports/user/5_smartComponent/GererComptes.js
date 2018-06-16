import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../../6_actions/actions";

import { Input, TextArea, Button, Tableau, Dropdown, Titre, A } from "../../_common/4_dumbComponent/_gat_ui_react";

import { hrefUser, goUserEdit } from "../../8_libs/go";
import { throttle } from "../../8_libs/throttle";

import FixedLayoutMonCompte from "../../_common/4_dumbComponent/FixedLayoutMonCompte";

class FormUsers extends Component {
	constructor(){
		super();
		this.scroll = throttle(this.scroll.bind(this),40);
		this.state = {
			nbpp: 10,
			nump: 0
		};
	}
	componentWillMount(){
		this.props.titrePage("Gerer les comptes");
		this.props.activeMenu("Mon Compte");
		this.props.activeMenuMonCompte("Gerer les comptes");
		this.props.usersControle(this.init());
		this.props.usersGetSSL({},{sort:{createdAt:-1},skip:0,limit:this.state.nbpp},(users)=>{
			this.setState({nump:1});
			this.props.usersCount({},(nb_users)=>{
				this.scroll(users,nb_users);
			});
		})
	}
	componentDidMount() {
		document.addEventListener("scroll", this.scroll);
	}

	componentWillUnmount() {
		document.removeEventListener("scroll", this.scroll);
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
	scroll(users,nb_users){
		if(
			((window.scrollY >= (document.documentElement.scrollHeight - document.documentElement.clientHeight)*0.95)||
			(document.documentElement.scrollHeight - document.documentElement.clientHeight)==0)
			&& ((this.props.users.length < this.props.nb_users)||(users&&nb_users&&users.length < nb_users))
		){
			this.props.usersGetAddSSL({},{sort:{date:-1},skip:((this.state.nump)*this.state.nbpp),limit:this.state.nbpp},(nv_users)=>{
				this.scroll(nv_users,this.props.nb_users);
			});
			this.setState({nump:this.state.nump+1});
		}
	}
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
								return user.username.indexOf(filtre)>=0?
									[...total,[<A href={hrefUser(user._id)}>{user.username}</A>, user._id,<Button onClick={goUserEdit.bind(this, user._id)}>Editer</Button>]]:total;
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
			nb_users: state.users.count,
			users: state.users.all,
			annonces_count: state.annonce.count
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
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
