/*le menu noir de gauche ou en haut(mobile) il permet de selectionner le widget qu"on veut afficher*/
import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } 				from "react-redux";

import { ACTIONS } from "../../6_actions/actions";

import { Menu } from "../../_common/4_dumbComponent/_gat_ui_react";

import { throttle } from "../../8_libs/throttle";

class SmartMenuSmall extends Component {
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
			left:-200,
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
		document.removeEventListener("mousemove", this.mousemove);
		document.removeEventListener("touchstart", this.mousedown);
		document.removeEventListener("touchend", this.mouseup);
		document.removeEventListener("touchmove", this.mousemove);
		window.removeEventListener("resize", this.resize);
	}
	resize(){
		this.setState({windowwidth:window.innerWidth});
	}
	mousedown(event){
		if(this.state.right!=0&&this.state.left!=0){
			this.setState({down:(event.clientX||event.touches[0].clientX),transition:false});
		}

	}
	mouseup(event){
		if((this.state.down>0)&&this.state.right>-20){
			this.setState({down:0,right:0,transition:"1s"});
			
		}else if((this.state.down>0)&&this.state.left>-20){
			
			this.setState({down:0,left:0,transition:"1s"});
		}else{
			this.setState({down:0,right:-200,left:-200,transition:"1s"});
		}
	}
	mousemove(event){

		if(this.state.down>0){
			this.setState({right:(-200+this.state.down-(event.clientX||event.touches[0].clientX))>0?0:(-200+this.state.down-(event.clientX||event.touches[0].clientX))});
			this.setState({left:(-200+(event.clientX||event.touches[0].clientX)-this.state.down)>0?0:(-200+(event.clientX||event.touches[0].clientX)-this.state.down)});
		}
	}
	//MENU TOP
	
	//_______
	menusMC(){return[
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
	menusAD(){return[
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

	menusL(){return[
		{
			title: "Menu",
			action:(()=>{this.setState({left:0});}).bind(this),
			display:true
			
		},
	]}
	menusD(){return[
		{
			title: "Accueil",
			url: "/",
			display:true,
			style: {justifyContent:"center"},
		},
		{
			title: "Actualité",
			url: "/actualite",
			display:true,
			style: {justifyContent:"center"},
		},
		{
			title: "Annonce",
			url: "/annonce",
			display:true,
			style: {justifyContent:"center"},
		},
		{
			title: "Contact",
			url: "/contact",
			display:true,
			style: {justifyContent:"center"},
		},
		{
			title: "Kesako",
			url: "/kesako",
			display:true,
			style: {justifyContent:"center"},
		},	
		{
			title: "Les Selistes",
			url: "/les_selistes",
			display:this.props.active_user,
			style: {justifyContent:"center"},
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
			display:this.props.active_user,
			action:(()=>{this.setState({right:0});}).bind(this)
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
			
		}else {
			if (url){
				
				if((url.substr(0,7)=="/admin/"||url.substr(0,12)=="/mon_compte/")&&title!="Mon Compte"){
					this.props.activeMenuMonCompte(title);
					this.props.titrePage(title);
				}else{
					this.props.activeMenu(title);
				}
				if(this.props.active_menu=="Mon Compte"&&title=="Mon Compte"){}else{FlowRouter.go(url);}
				
			}
			if(action){
				action();
			}	
		}
	}

	items(tab,active){
		return tab.map(({title, text, url, display, img, src, action, style}, i)=> {
			if(display){
				return	<Menu.Item
					img = {img?img:""}
					src = {src?src:""}
					active={ active == title }
					onClick={this.activeMenu.bind(this,title,url, action)}
					key = { i }
					style = {style?style:""}>
					{ text?text:title }
				</Menu.Item>;
			}
		})
	}
	prevclick(event){
		event.preventDefault()
	}
	render() {

		/*La constante prepare le style des items (de types meteo ou non)*/
		return (
			<div style ={{userSelect:"none"}}>
				<div onTouchEnd={this.prevclick.bind(this)} style ={{
					display:(this.state.right>-20||this.state.left>-20)&&(this.props.active_menu=="Mon Compte")?"flex":"none", 
					position:"fixed", 
					left:0, top:0,right:0,bottom:0,zIndex:997 }}></div>
				<div style = {{position:"fixed",display:this.props.active_menu=="Mon Compte"?"flex":"none", flexDirection:"column", flex:1, zIndex:998,top:40,
					right:this.props.active_menu=="Mon Compte"&&this.state.windowwidth>700?0:this.state.right, 
					width:this.state.windowwidth>700?"16%":200,
					maxWidth:200,
					transition:this.state.transition?this.state.transition:"0.1s"}}>
					<div className = "supprmobile" style = {{height:40,width:"100%"}}></div>
					<Menu style = {{marginBottom:5, borderRadius:5,backgroundColor:"white"}}>
						{this.items(this.menusMC(),this.props.active_menu_mon_compte)}
					</Menu>
					
					<Menu style = {{marginTop:5, borderRadius:5,backgroundColor:"white"}}>
						{this.items(this.menusAD(),this.props.active_menu_mon_compte)}
					</Menu>
				</div>				
				<Menu className = {this.props.className} style = {{
					position:"fixed", 
					flexDirection:"column",
					color:"white", 
					width:200,
					backgroundColor:"red",
					zIndex:998,
					left:this.state.windowwidth<=700?this.state.left:0, 
					top:40,
					borderBottomLeftRadius: "10px",
					borderBottomRightRadius: "10px",
					transition:this.state.transition?this.state.transition:"0.1s"
				}}>
					{ 
						this.items(this.menusD(),this.props.active_menu)
					}
				</Menu>
				<Menu row className = {this.props.className} style = {{color:"white", backgroundColor:"red", flexWrap: "wrap", justifyContent:"space-between", ...this.props.style }}>
					
					<div style = {{display:"flex"}}>
						{ 
							this.items(this.menusL(),this.props.active_menu)
						}
					</div>
					<div style = {{display:"flex", flex:1, justifyContent: "center"}}>
						{ 
							this.items(this.menusM(),this.props.active_menu)
						}
					</div>
					<div style = {{display:"flex"}}>
						{ 
							this.items(this.menusR(),this.props.active_menu)
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
			active_menu_mon_compte: state.menu.active_menu_mon_compte,
			active_user: state.users.active_user
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		activeMenu: ACTIONS.Menu.activeMenu,
		activeMenuMonCompte: ACTIONS.Menu.activeMenuMonCompte,
		titrePage: ACTIONS.Titre.titrePage,
		logOut: ACTIONS.Users.logOut
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( SmartMenuSmall );
