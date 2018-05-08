/*C'est le bouton qu'on voit en premier ou lorsque on
 se deconnecte et qui nous permet de nous logguer avec github*/
import React,{ Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { ACTIONS } from "../../6_actions/actions";

import { Titre, Button } from "../../_common/4_dumbComponent/_gat_ui_react";

import CardUser from "../../user/4_dumbComponent/CardUser";

import { goUserEdit } from "../../8_libs/go";


class MesInformations extends Component{

	componentWillMount(){
		
		this.props.activeMenu("Mon Compte");
		this.props.activeMenuMonCompte("Mes informations");
		this.props.titrePage("Mes Informations");
	}
	
	render(){
		if(this.props.active_user){
			let { emails, profile, _id } = this.props.active_user;
			
			return(	
				<div>
					<CardUser
						nom = { profile?profile.nom:"" }
						prenom = { profile?profile.prenom:"" }
						note = {5}
						categories = {["cuisine","menage"]}
						email = {emails&&emails.length>0?emails[0].address:""}
						telephone = {profile?profile.telephone:""}
						adresse = { profile?profile.adresse:"" }
						date_val_resp={ profile?profile.date_val_resp:"" }
						editer = {goUserEdit.bind(this,_id)}
					/>
					<Titre>Mes Seugnettes</Titre>
				</div>
			);
		}return (<div>wait</div>);
	}
}

function mapStateToProps( state ){
	return (
		{
			active_user: 	state.users.active_user
		}
	);

}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		titrePage: ACTIONS.Titre.titrePage,
		activeMenu: ACTIONS.Menu.activeMenu,
		activeMenuMonCompte: ACTIONS.Menu.activeMenuMonCompte,
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( MesInformations );
