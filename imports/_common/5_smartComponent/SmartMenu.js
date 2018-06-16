/*le menu noir de gauche ou en haut(mobile) il permet de selectionner le widget qu"on veut afficher*/
import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } 				from "react-redux";

import { ACTIONS } from "../../6_actions/actions";

import { Menu } from "../../_common/4_dumbComponent/_gat_ui_react";

class SmartMenu extends Component {

	menusL(){return[
		{
			title: "Accueil",
			url: "/",
			display:true
			
		},
		{
			title: "Actualité",
			url: "/actualite",
			display:true
		},
		{
			title: "Annonce",
			url: "/annonce",
			display:true
		},
		{
			title: "Contact",
			url: "/contact",
			display:true
		},
		{
			title: "Kesako",
			url: "/kesako",
			display:true
		},	
		{
			title: "Les Selistes",
			url: "/les_selistes",
			display:this.props.active_user
		},
	]}
	// menusM(){return[	
	// 	{
	// 		title: <span>SEL</span>,
	// 		display:true,
	// 		style: {backgroundColor:"none", cursor:"default", flex:1,fontSize:25, textAlign:"center", justifyContent:"center"}

	// 	},
	// ]}
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
			display:this.props.active_user,
			style: {padding:0}
		}
	
	]}
	
	activeMenu( title, url, e ){
		e.preventDefault();
		if(title == "Logout"){
			this.props.logOut(()=>{FlowRouter.go("/");});
			
		}else if (url){
			this.props.activeMenu(title);
			FlowRouter.go(url);
		}
	}
	items(tab){
		return tab.map(({title, text, url, display, img, src, action, style}, i)=> {
			if(display){
				return	<Menu.Item
					img = {img?img:""}
					src = {src?src:""}
					active={this.props.active_menu == title }
					onClick={this.activeMenu.bind(this,title,url)}
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
			
			<Menu row className = {this.props.className} style = {{color:"white", borderTop:"none", backgroundColor:"red", flexWrap: "wrap", justifyContent:"space-between", ...this.props.style }}>
				<div style = {{display:"flex"}}>
					{ 
						this.items(this.menusL())
					}
				</div>
				
				<div style = {{display:"flex"}}>
					{ 
						this.items(this.menusR())
					}
				</div>
				
			</Menu>
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
