import React, {Component} from "react";

import { bindActionCreators }	from 'redux';
import { connect } from 'react-redux';

import { Titre, Menu } from "../../_common/4_dumbComponent/_gat_ui_react";




class Dev extends Component {

	items(){return[
		{
			title: "Mes informations",
			url: "/mon_compte/infos",
			display:true,	
			
		},
		{
			title: "Mon relevé de compte",
			url: "/mon_compte/releve",
			display:true,
		},
		{
			title: "Deposer une offre",
			url: "/mon_compte/annonce/offre/edition",
			display:true,
		},
		{
			title: "Deposer une demande",
			url: "/mon_compte/annonce/demande/edition",
			display:true,
		},
		{
			title: "Mes offres",
			url: "/mon_compte/annonce/offre",
			display:true,
		},
		{
			title: "demande",
			url: "/mon_compte/annonce/demande",
			display:true,
		},
		{
			title: "proposition",
			url: "/mon_compte/annonce/proposition",
			display:true,
		},];
	}
	items_admin(){return[
		{
			title: "Gerer les comptes",
			url: "/admin/compte",
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
			title: "Gerer les Categories",
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
			url: "/mon_compte/statistique",
			display:true,
		},
	];
	}
	activeMenu(title,url){
		if(title == "Logout"){
			this.props.logOut();
		}else{
			this.props.activeMenu(title);
			FlowRouter.go(url);
		}
	}
	render(){
		let { Item } =  Menu;
		return (
			<div>
				<Titre>Page de dev</Titre>
				<Menu style = {{color:"white", backgroundColor:"red", width: "15%"}}>
					{this.items().map(({title, url, display},i)=>{
						if(display){
							return	<Item 
								active = { true }  
								key = {i} 
								onClick={this.activeMenu.bind(this,title,url)}
							>{title}</Item>;
						}
					})}
				</Menu>
				<br/>
				<Menu style = {{color:"white", backgroundColor:"red", width: "15%"}}>
					{this.items_admin().map(({title, url, display},i)=>{
						if(display){
							return	<Item 
								active = { true }  
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
			
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( Dev );

