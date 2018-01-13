/*le menu noir de gauche ou en haut(mobile) il permet de selectionner le widget qu'on veut afficher*/
import React, { Component }	from 'react';
import { bindActionCreators }	from 'redux';
import { connect } 				from 'react-redux';

import { ACTIONS } from "../../6_actions/actions";


import { Menu, Grid, Image } from 'semantic-ui-react';

const menus =  [
	{
		title: 'Accueil',
		url: '/',
		role: null,
		group: null,
		icon: null,
	},
	{
		title: 'Actualité',
		url: '/actualite',
		role: null,
		group: null,
		icon: null,
	},
	{
		title: 'Annonce',
		url: '/annonce',
		role: null,
		group: null,
		icon: null,
	},
	{
		title: 'Contact',
		url: '/contact',
		role: null,
		group: null,
		icon: null,
	},
	{
		title: 'Kesako',
		url: '/kesako',
		role: null,
		group: null,
		icon: null,
	},	
	{
		title: 'Les Selistes',
		url: '/les_selistes',
		role: null,
		group: null,
		icon: null,
	},
	{
		title: 'Mon Compte',
		url: '/mon_compte',
		role: null,
		group: null,
		icon: null,
	},
	{
		title: 'Logout',
		url: '/logout',
		role: null,
		group: null,
		icon: null,
	}

];


class Menus extends Component {

	
	activeMenu(title,url){
		if(title == "Logout"){
			this.props.logOut();


		}else{
			this.props.activeMenu(title);
			FlowRouter.go(url);
		}
	}
	ITEMS(){
		return menus.map(({title, url}, i)=> {
			return(
				<Menu.Item
					className={this.props.active_menu == title ? 'item active' : 'item'}
					onClick={this.activeMenu.bind(this,title,url)}
					key = { i }>
					{ title }
				</Menu.Item>
			);
		});
	}


	render() {
		A_AFFICHER =	
		<Menu inverted color = 	'red'>
			
			{ this.ITEMS() }
		</Menu>
				
		/*La constante prepare le style des items (de types meteo ou non)*/
		return (
			<div>
				{ A_AFFICHER }
			</div> );
	}
}

function mapStateToProps(state){
	return (
		{
			active_menu: state.menu.active_menu
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		activeMenu: ACTIONS.Menu.activeMenu,
		getActiveUser: ACTIONS.Users.getActiveUser,
		logOut: ACTIONS.Users.logOut
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( Menus );
