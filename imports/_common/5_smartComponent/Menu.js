/*le menu noir de gauche ou en haut(mobile) il permet de selectionner le widget qu'on veut afficher*/
import React, { Component }	from 'react';
import { bindActionCreators }	from 'redux';
import { connect } 				from 'react-redux';

/*import { activeItemMenu } from '../actions/menu_actions';*/

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
		title: 'Actualités',
		url: '/actualites',
		role: null,
		group: null,
		icon: null,
	},
	{
		title: 'Connexion',
		url: '/connexion',
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
		title: 'Creer Un Compte',
		url: '/compte',
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
		url: '/lesSelistes',
		role: null,
		group: null,
		icon: null,
	},
	{
		title: 'Mon Compte',
		url: '/monCompte',
		role: null,
		group: null,
		icon: null,
	}

];


class Menus extends Component {

	

	ITEMS(){
		return menus.map(({title, url}, i)=> {
			return(
				<Menu.Item
					className={this.props.active_menu == title ? 'item active' : 'item'}
					href={ url }
					onClick={()=>{}/*this.props.activeItemMenu.bind(this, title)*/}
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

		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
	
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( Menus );
