/*le menu noir de gauche ou en haut(mobile) il permet de selectionner le widget qu"on veut afficher*/
import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } 				from "react-redux";

import { ACTIONS } from "../../6_actions/actions";

import { Menu } from "../../_common/4_dumbComponent/_gat_ui_react";

class SmartMenu extends Component {
	constructor(){
		super();
		this.state={
			open:false
		};
	}

	open(){
		this.setState({open:true});
	}
	close(){
		this.setState({open:false});
	}
	menusL(){return[
		{
			title: "Menu",
			action:this.open.bind(this),
			display:true
			
		},
	]}
	menusD(){return[
		{
			title: "Accueil",
			url: "/",
			display:true,
			style: {justifyContent:"center"},
			action:this.close.bind(this)
		},
		{
			title: "Actualité",
			url: "/actualite",
			display:true,
			style: {justifyContent:"center"},
			action:this.close.bind(this)
		},
		{
			title: "Annonce",
			url: "/annonce",
			display:true,
			style: {justifyContent:"center"},
			action:this.close.bind(this)
		},
		{
			title: "Contact",
			url: "/contact",
			display:true,
			style: {justifyContent:"center"},
			action:this.close.bind(this)
		},
		{
			title: "Kesako",
			url: "/kesako",
			display:true,
			style: {justifyContent:"center"},
			action:this.close.bind(this)
		},	
		{
			title: "Les Selistes",
			url: "/les_selistes",
			display:true,
			style: {justifyContent:"center"},
			action:this.close.bind(this)
		},
	]}
	menusM(){return[	
		{
			title: <span>SEL</span>,
			display:true,
			style: {backgroundColor:"none", cursor:"default", flex:1,fontSize:25, textAlign:"center", justifyContent:"center"}

		},
	]}
	menusR(){return[
		
		{
			title: "Connexion",
			url: "/connexion",
			display:!(this.props.active_user)
		},
		{
			title: "Mon Compte",
			text: this.props.active_user?this.props.active_user.username:"",
			//img: "/images/profile.png",
			src: "profile",
			url: "/mon_compte/informations",
			display:this.props.active_user
		},
		{
			title: "Logout",
			url: "/logout",
			img: "/images/logout.png",
			src: "logout",
			display:this.props.active_user
		}
	
	]}
	
	activeMenu( title, url, action, e ){
		e.preventDefault();

		if(title == "Logout"){
			this.props.logOut(()=>{FlowRouter.go("/");});
			
		}else if (url){
			this.props.activeMenu(title);
			FlowRouter.go(url);
		}
		if(action){
			action();
		}
	}
	items(tab){
		return tab.map(({title, text, url, display, img, src, action, style}, i)=> {
			if(display){
				return	<Menu.Item
					img = {img?img:""}
					src = {src?src:""}
					active={this.props.active_menu == title }
					onClick={this.activeMenu.bind(this,title,url, action)}
					key = { i }
					style = {style?style:""}>
					{ text?text:title }
				</Menu.Item>;
			}
		})
	}
	render() {
		/*La constante prepare le style des items (de types meteo ou non)*/
		return (
			<div>
				<Menu className = {this.props.className} style = {{
					position:"fixed", 
					flexDirection:"column",
					color:"white", 
					top:this.state.open?40:-200,
					backgroundColor:"red",
					zIndex:998,
					left:10,
					right:10,
					borderBottomLeftRadius: "10px",
					borderBottomRightRadius: "10px",
					transition:"1s"
				}}>
					{ 
						this.items(this.menusD())
					}
				</Menu>
				<Menu row className = {this.props.className} style = {{color:"white", backgroundColor:"red", flexWrap: "wrap", justifyContent:"space-between", ...this.props.style }}>
					
					<div style = {{display:"flex"}}>
						{ 
							this.items(this.menusL())
						}
					</div>
					<div style = {{display:"flex", flex:1, justifyContent: "center"}}>
						{ 
							this.items(this.menusM())
						}
					</div>
					<div style = {{display:"flex"}}>
						{ 
							this.items(this.menusR())
						}
					</div>
					
				</Menu>
			</div>
		);
	}
}

function mapStateToProps(state){
	return (
		{
			active_menu: state.menu.active_menu,
			active_user: state.users.active_user
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		activeMenu: ACTIONS.Menu.activeMenu,
		logOut: ACTIONS.Users.logOut
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( SmartMenu );
