import React, {Component} from "react";

import { bindActionCreators }	from 'redux';
import { connect } from 'react-redux';

import { ACTIONS } from "../../6_actions/actions";

import { Titre, Menu } from "../../_common/4_dumbComponent/_gat_ui_react";




class MenuMonCompte extends Component {

	items(){return[
		{
			title: "Mes informations",
			url: "/mon_compte/informations",
			display:true,	
			
		},
		{
			title: "Mon relevé de compte",
			url: "/mon_compte/releve",
			display:true,
		},
		{
			title: "Déposer une offre",
			url: "/mon_compte/annonce/offre/creer",
			display:true,
		},
		{
			title: "Déposer une demande",
			url: "/mon_compte/annonce/demande/creer",
			display:true,
		},
		{
			title: "Mes offres",
			url: "/mon_compte/annonce/offre",
			display:true,
		},
		{
			title: "Mes demandes",
			url: "/mon_compte/annonce/demande",
			display:true,
		},
		{
			title: "Mes proposition",
			url: "/mon_compte/annonce/proposition",
			display:true,
		},];
	}
	items_admin(){return[
		{
			title: "Gerer les comptes",
			url: "/admin/",
			display:true,
		},
		{
			title: "Gerer les annonces",
			url: "/admin/annonce",
			display:true,	
			
		},
		{
			title: "Gerer les actualites",
			url: "/admin/actualite",
			display:true,
		},
		{
			title: "Gerer les categories",
			url: "/admin/categorie",
			display:true,
		},
		{
			title: "Configuration",
			url: "/admin/configuration",
			display:true,
		},
		{
			title: "Statistiques",
			url: "/admin/statistique",
			display:true,
		},
	];
	}
	activeMenu(title,url,e){
		e.preventDefault();
		if(title == "Logout"){
			this.props.logOut();
		}else{
			this.props.activeMenuMonCompte(title);
			this.props.titrePage(title);
			FlowRouter.go(url);
		}
	}
	render(){
		let { Item } =  Menu;
		return (
			<div style = {{display:"flex", flexDirection:"column", flex:1}}>
				
				<Menu style = {{color:"white", backgroundColor:"rgba(23, 189, 224,1"}}>
					{this.items().map(({title, url, display},i)=>{
						if(display){
							return	<Item 
								active = { this.props.active_menu_mon_compte == title }  
								key = {i} 
								onClick={this.activeMenu.bind(this,title,url)}
							>{title}</Item>;
						}
					})}
				</Menu>
				<br/>
				<Menu style = {{color:"white", backgroundColor:"rgba(23, 189, 224,1"}}>
					{this.items_admin().map(({title, url, display},i)=>{
						if(display){
							return	<Item 
								active = { this.props.active_menu_mon_compte == title }  
								key = {i} 
								onClick={this.activeMenu.bind(this,title,url)}
							>{title}</Item>;
						}
					})}
				</Menu>
			</div>				
		);
	}
}

function mapStateToProps(state){
	return (
		{
			active_menu_mon_compte: state.menu.active_menu_mon_compte,
			active_user: state.users.active_user
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		activeMenuMonCompte: ACTIONS.Menu.activeMenuMonCompte,
		titrePage: ACTIONS.Titre.titrePage,
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( MenuMonCompte );

