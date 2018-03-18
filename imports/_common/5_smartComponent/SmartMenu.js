/*le menu noir de gauche ou en haut(mobile) il permet de selectionner le widget qu"on veut afficher*/
import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } 				from "react-redux";

import { ACTIONS } from "../../6_actions/actions";

import { Menu } from "../../_common/4_dumbComponent/_gat_ui_react";

class SmartMenu extends Component {

	menus(){return[
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
			title: "Connexion",
			url: "/connexion",
			display:!(this.props.active_user&&this.props.active_user._id)
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
			display:true
		},
		{
			title: "Mon Compte",
			url: "/mon_compte/informations",
			display:this.props.active_user&&this.props.active_user._id
		},
		{
			title: "Logout",
			url: "/logout",
			display:this.props.active_user&&this.props.active_user._id
		}
	
	]}
	
	activeMenu( title, url, e ){
		e.preventDefault();
		if(title == "Logout"){
			this.props.logOut(()=>{FlowRouter.go("/");});
			
		}else{
			this.props.activeMenu(title);
			FlowRouter.go(url);
		}
	}

	render() {
		/*La constante prepare le style des items (de types meteo ou non)*/
		return (
			
			<Menu row style = {{color:"white", backgroundColor:"red" }}>
				{ 
					this.menus().map(({title, url, display}, i)=> {
						if(display){
							return	<Menu.Item
								active={this.props.active_menu == title }
								onClick={this.activeMenu.bind(this,title,url)}
								key = { i }>
								{ title }
							</Menu.Item>;
						}
					})
				}
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
