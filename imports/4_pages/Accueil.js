import React, {Component} from "react";

import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../6_actions/actions";
import { dateToFormat } from "../8_libs/date";
import { hrefUser, hrefAnnonce, goAnnonce } from "../8_libs/go";

import { Titre1, Carrousel } from "../_common/4_dumbComponent/_gat_ui_react";

import ExtraitAnn from "../annonce/4_dumbComponent/ExtraitAnn";
import GoogleMap from "../_common/4_dumbComponent/GoogleMap";

class Accueil extends Component {

	componentWillMount(){
		this.props.categorieGet({});
		this.props.annonceGet_SSL_state({etat:"valider"},{limit:3,sort:{date:-1}},"carrousel");
		this.props.titrePage("Bienvenue " + (this.props.active_user&&this.props.active_user.profile ? (this.props.active_user.profile.prenom + " !") : "Futur Seliste !"));
		
		this.props.activeMenu("Accueil");
	}
	annonces(){//annonces = [{},...] => [<Comps/>,...]
		let { ann_carrousel, categories} = this.props;
		return ann_carrousel && ann_carrousel.length > 0 ? ann_carrousel.reduce((total, ann, i )=>{
			let categorie = categories&&categories.length>0?categories.find(cat=>cat._id==ann.categorie):null;
			let date = new Date(ann.date);
			return[...total, <ExtraitAnn 
				key = { i }
				style = {{flex:1}}
				type = {ann.type}
				categorie = {categorie?categorie.titre:""}
				_id = { ann._id }
				titre = { ann.titre }
				description = { ann.description }
				date = { dateToFormat(date) }
				statut = { ann.statut }
				href = {hrefAnnonce(ann._id)}
				goAnnonce = { goAnnonce.bind(this,ann._id) }

			/>];}
			,[]):"";
		// return [<Comps/>,...]
	}
	render(){

		return (
			<div style={{marginTop:0}}>
				<Titre1> Partagez des services et des savoirs... Créez des liens </Titre1>
				<Carrousel tableau={this.annonces()}/>
				<Titre1> Trouvez un SEL près de chez vous ! C'est simple avec la carte des sélistes </Titre1>
				<GoogleMap/>

			</div>
		);
	}
}

function mapStateToProps( state ){
	return (
		{
			active_user: state.users.active_user,
			active_menu: state.menu.active_menu,
			ann_carrousel: state.annonce.carrousel,
			categories: state.categorie.all,
		}
	);

}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		categorieGet: ACTIONS.Categorie.get,
		annonceGet_SSL_state: ACTIONS.Annonce.get_SSL_state,
		actualiteGet_SSL_state: ACTIONS.Actualite.get_SSL_state,
		titrePage: ACTIONS.Titre.titrePage,
		activeMenu: ACTIONS.Menu.activeMenu,
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( Accueil );
