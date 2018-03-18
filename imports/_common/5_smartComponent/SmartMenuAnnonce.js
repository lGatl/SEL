/*le menu noir de gauche ou en haut(mobile) il permet de selectionner le widget qu"on veut afficher*/
import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } 				from "react-redux";

import { ACTIONS } from "../../6_actions/actions";

import { Menu } from "../../_common/4_dumbComponent/_gat_ui_react";

class SmartMenuAnnonce extends Component {

	menus(){return[
		{
			title: "Toutes",
			url: "/annonce",
			display:true
			
		},
		{
			title: "Offres",
			url: "/annonce/offre",
			display:true
		},
		{
			title: "Demandes",
			url: "/annonce/demande",
			display:true
		},];
	}
	
	activeMenuAnnonce( title, url, e ){
		e.preventDefault();
		this.props.activeMenuAnnonce(title);
		FlowRouter.go(url);
	}

	render() {
		/*La constante prepare le style des items (de types meteo ou non)*/
		return (
			
			<Menu row style = {{color:"auto", borderRadius:"5px 5px 0 0 ", borderBottom:"none"}}>
				{ 
					this.menus().map(({title, url, display}, i)=> {
						if(display){
							return	<Menu.Item
								style ={{paddingLeft:10, paddingRight:10}}
								active={this.props.active_menu_annonce == title }
								onClick={this.activeMenuAnnonce.bind(this,title,url)}
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
			active_menu_annonce: state.menu.active_menu_annonce,
			active_user: state.users.active_user
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		activeMenuAnnonce: ACTIONS.Menu.activeMenuAnnonce,
		logOut: ACTIONS.Users.logOut
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( SmartMenuAnnonce );
