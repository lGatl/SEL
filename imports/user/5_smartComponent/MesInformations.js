/*C'est le bouton qu'on voit en premier ou lorsque on
 se deconnecte et qui nous permet de nous logguer avec github*/
import React,{ Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { ACTIONS } from "../../6_actions/actions";

import { Titre, Button } from "../../_common/4_dumbComponent/_gat_ui_react";

import CardUser from "../../user/4_dumbComponent/CardUser";



class MesInformations extends Component{

	componentWillMount(){
		
	}
	editer(){
		FlowRouter.go("/user/"+this.props.active_user._id+"/edit")
	}
	render(){
		if(this.props.active_user){
			let { emails, profile } = this.props.active_user;
			
			return(	
				<div>
					<Titre>Mes informations</Titre>
					<CardUser
						nom = { profile?profile.nom:"" }
						prenom = { profile?profile.prenom:"" }
						note = {5}
						categories = {['cuisine','menage']}
						email = {emails&&emails.length>0?emails[0].address:""}
						telephone = {profile?profile.telephone:""}
						adresse = { profile?profile.adresse:"" }
					/>
					<Button onClick={this.editer.bind(this)}>Editer</Button>
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
		
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( MesInformations );
