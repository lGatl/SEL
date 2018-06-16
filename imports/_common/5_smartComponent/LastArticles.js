/*C'est le bouton qu'on voit en premier ou lorsque on
 se deconnecte et qui nous permet de nous logguer avec github*/
import React,{ Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { ACTIONS } from "../../6_actions/actions";

import MiniArticle from "../4_dumbComponent/MiniArticle";

import {  goAnnonce } from "../../8_libs/go";


class LastArticle extends Component{

	componentWillMount(){
		this.props.annonceGet_SSL_state({etat:"valider"},{limit:4,sort:{date:-1}},"last");
		this.props.actualiteGet_SSL_state({publier: true},{limit:4,sort:{date:-1}},"last");
	}
	miniArticle(article, type, i){
		return <MiniArticle
			key= {i}
			image = { "/images/1.jpg" }
			lien = {type=="actu"?()=>{}:goAnnonce.bind(this,article._id)}
			titre = { article.titre }
		/>;
	}

	render(){
		let {actu_last, ann_last, active_menu} = this.props;
		actu_last = active_menu == "Annonce" ? actu_last : 
			active_menu == "Accueil" || 
			active_menu == "Contact" ||
			active_menu == "Kesako"  ||
			active_menu == "Les Selistes"

				? actu_last&&actu_last.slice(0,2):[];
		ann_last = active_menu == "Actualité" ? ann_last : 
			active_menu == "Accueil" ||
			active_menu == "Contact" ||
			active_menu == "Kesako"  ||
			active_menu == "Les Selistes"
				? ann_last&&ann_last.slice(0,2):[];
		return(	
			<div style={{}}>
				{actu_last&&actu_last.length>0?
					<div style={{display:"flex", flexDirection:"column", alignItems:"center",boxShadow: "2px 2px 3px rgba(150,150,150,0.3)",border:"1px solid rgba(150,150,150,0.1)",borderRadius:5,padding:10, margin:10}}> 
						<span style = {{marginBottom:10, fontWeight:600}}>Actualités</span> 
						{actu_last.map((actu,i)=>this.miniArticle(actu,"actu",i))}
					</div>:""
				}
				{ann_last&&ann_last.length>0?
					<div style={{display:"flex", flexDirection:"column", alignItems:"center",boxShadow: "2px 2px 3px rgba(150,150,150,0.3)",border:"1px solid rgba(150,150,150,0.1)",borderRadius:5,padding:10, margin:10}}>
						<span style = {{marginBottom:10, fontWeight:600}}>Annonces</span> 
						{ann_last.map((ann,i)=>this.miniArticle(ann,"ann",i))}
					</div>:""
				}
			</div>
		);
	}
}

function mapStateToProps( state ){
	return (
		{
			active_user: state.users.active_user,
			active_menu: state.menu.active_menu,
			actu_last: state.actualite.last,
			ann_last: state.annonce.last 
		}
	);

}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		annonceGet_SSL_state: ACTIONS.Annonce.get_SSL_state,
		actualiteGet_SSL_state: ACTIONS.Actualite.get_SSL_state,
		titrePage: ACTIONS.Titre.titrePage,
		activeMenu: ACTIONS.Menu.activeMenu,
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( LastArticle );
