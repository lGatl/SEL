import React, {Component} from "react";

import { bindActionCreators }	from 'redux';
import { connect } from 'react-redux';

import { ACTIONS } from "../../6_actions/actions";

import { Titre, Menu } from "../../_common/4_dumbComponent/_gat_ui_react";

import { throttle } from "../../8_libs/throttle";


class MenuMonCompte extends Component {
	constructor(){
		super();
		this.mousedown = this.mousedown.bind(this);
		this.mouseup = this.mouseup.bind(this);
		this.mousemove = throttle(this.mousemove.bind(this),40);
		this.resize = throttle(this.resize.bind(this),40);
		this.state = {
			windowwidth:window.innerWidth,
			transition:false,
			down:0,
			right:-200,
			nbpp: 10,
			nump: 0
		};
	}
	componentDidMount() {
		document.addEventListener("mousedown", this.mousedown);
		document.addEventListener("mouseup", this.mouseup);
		document.addEventListener("mousemove", this.mousemove);
		document.addEventListener("touchstart", this.mousedown);
		document.addEventListener("touchend", this.mouseup);
		document.addEventListener("touchmove", this.mousemove);
		window.addEventListener("resize", this.resize);

	}

	componentWillUnmount() {
		document.removeEventListener("mousedown", this.mousedown);
		document.removeEventListener("mouseup", this.mouseup);
		document.addEventListener("mousemove", this.mousemove);
		document.removeEventListener("touchstart", this.mousedown);
		document.removeEventListener("touchend", this.mouseup);
		document.addEventListener("touchmove", this.mousemove);
		window.addEventListener("resize", this.resize);
	}
	resize(){
		this.setState({windowwidth:window.innerWidth});
	}
	mousedown(event){
		if(window.innerWidth<=700){
			event.preventDefault();
		}
		
		if(this.state.right!=0){
			this.setState({down:(event.clientX||event.touches[0].clientX),transition:false});
		}
		
	}
	mouseup(event){
		if((this.state.down>0)&&(this.state.right)>-20){
			this.setState({down:0,right:0,transition:"1s"});
		}else{
			this.setState({down:0,right:-200,transition:"1s"});
		}
	}
	mousemove(event){

		if(this.state.down>0){
			this.setState({right:(-200+this.state.down-(event.clientX||event.touches[0].clientX))>0?0:(-200+this.state.down-(event.clientX||event.touches[0].clientX))});
		}
	}
	
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
			title: "Mes propositions",
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
			<div style = {{display:"flex", flexDirection:"column", flex:1,...this.props.style,
				right:this.state.windowwidth<=700?this.state.right:0, 
				width:this.state.windowwidth<=700?200:"17%",
				transition:this.state.transition?this.state.transition:"0.1s"}}>
				
				<Menu style = {{marginBottom:5, borderRadius:5,backgroundColor:"white"}}>
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
				
				<Menu style = {{marginTop:5, borderRadius:5,backgroundColor:"white"}}>
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

