import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../../6_actions/actions";
import { dateToFormat } from "../../8_libs/date";

import { Menu } from "../../_common/4_dumbComponent/_gat_ui_react";

import ListeComp from "../../_common/4_dumbComponent/ListeComp";
import ExtraitAnn from "../4_dumbComponent/ExtraitAnn";


class ListeAnnonce extends Component {
	//=========INITIALISATION
	componentWillMount(){
		
		this.init(this.props);
	}
	componentWillReceiveProps(next){
		
		if(next.type!=this.props.type){this.init(next);}
	}
		
	init(props){
		this.props.activeMenu(props.mon_compte?"Mon Compte":"Annonce");
		this.props.activeMenuMonCompte(props.type=="offre"?"Mes offres":"Mes demandes");
		this.props.activeMenuAnnonce(props.type=="offre"?"Offres":props.type=="demande"? "Demandes": "Toutes");

		let CONDITION = {etat:"valider"};
		CONDITION = props.mon_compte?{...CONDITION,user_id:props.active_user._id}:CONDITION;
		CONDITION = props.type?{...CONDITION,type:props.type}:CONDITION;
		this.props.annonceGet(CONDITION);
		this.props.categorieGet({});
	}
	//=========ACTIONS
	annonceRm( id ){
		this.props.annonceRm({ _id: id });
	}
	
	//==========PREPARATION RENDU
	annonces(anns, categories){//anns = [{},...] => [<Comps/>,...]
	
		return anns && anns.length > 0 ? anns.reduce((total, ann, i )=>{
			let categorie = categories&&categories.length>0?categories.find(cat=>cat._id==ann.categorie):null;
			let date = new Date(ann.date);
			
			return[...total, <ExtraitAnn 
				type = {ann.type}
				categorie = {categorie?categorie.titre:""}
				key = {i}
				_id = { ann._id }
				titre = { ann.titre }
				description = { ann.description }
				date = { dateToFormat(date) }
				onClick = { this.annonceRm.bind(this) }
			/>]}
			,[]):"";
		// return [<Comps/>,...]
	}
	liste(tableau){// tableau = [<Comps/>,...] => <Comp/>
		return tableau && tableau.length > 0 ? <ListeComp donnees = { tableau } /> : "";
		//return <Comp/>
	}
	render() {
		let { annonces, categories} = this.props;
		return (
			<div>
				
				{/*	<Comp/>   [<Comps/>,...]  			[{},...]   */}
				{ this.liste(this.annonces(annonces, categories)) }
				
			</div>
		);
		
	}
}
function mapStateToProps( state ){
	return (
		{
			active_user: state.users.active_user,
			annonces: state.annonce.all,
			categories: state.categorie.all,
			active_menu_annonce: state.menu.active_menu_annonce,
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		activeMenu: ACTIONS.Menu.activeMenu,
		activeMenuMonCompte: ACTIONS.Menu.activeMenuMonCompte,
		activeMenuAnnonce: ACTIONS.Menu.activeMenuAnnonce,

		annonceGet: ACTIONS.Annonce.get,
		annonceRm: ACTIONS.Annonce.rm,

		categorieGet: ACTIONS.Categorie.get,
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( ListeAnnonce );
