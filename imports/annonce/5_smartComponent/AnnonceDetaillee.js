import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../../6_actions/actions";
import FicheAnnonce from "../4_dumbComponent/FicheAnnonce";
import { dateToFormat } from "../../8_libs/date";

class AnnonceDetaillee extends Component {
	componentWillMount(){
		this.props.annonceGet1({_id:this.props._id},null,annonce=>{
			this.props.categorieGet1({_id:annonce.categorie});

			this.props.usersGet1({_id:annonce.user_id});

		});
	}
	change(e,{ value, name, checked }){

		this.props.annonceControle({ [name]:value||checked });
	}
	propositionAdd(){

	}
	render(){
		let { annonce, user } = this.props;
		let { proposition, commentaire } = this.props.annonce_controle;
		
		return (

			<FicheAnnonce 
				categorie = { this.props.categorie.titre }
				date = { annonce.date?dateToFormat( annonce.date ):"" }
				date_de_fin = { annonce.date?dateToFormat( annonce.date_de_fin ):"" }
				titre = { annonce.titre?annonce.titre:"" }
				description = { annonce.description?annonce.description:"" }
				email_display= { annonce.email }
				email = { user&&user.emails&&user.emails.length>0?user.emails[0].address:"" }
				telephone_display= { annonce.telephone }
				telephone = { user&&user.profile&&user.profile.telephone?user.profile.telephone:"" }
				adresse_display= { annonce.adresse }
				adresse = { user&&user.profile&&user.profile.adresse?user.profile.adresse:"" }
				proposition = { proposition }
				commentaire = { commentaire }
				identifiant = {user&&user.username?user.username:""}
				propositionAdd = { this.propositionAdd }
				change = { this.change.bind(this) }
			/>
		);
	}
}

function mapStateToProps( state ){
	return (
		{
			annonce_controle: state.annonce.controle,
			annonce: state.annonce.one,
			categorie: state.categorie.one,
			user: state.users.one,
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		annonceControle: 	ACTIONS.Annonce.controle,
		annonceGet1: ACTIONS.Annonce.get1,
		categorieGet1: ACTIONS.Categorie.get1,
		usersGet1: ACTIONS.Users.get1,

	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( AnnonceDetaillee );
// adresse={false}
				// categorie = "GJP39fuJraE3a6azq"
				// date = Sat Mar 17 2018 21:08:22 GMT+0100 (CET) {}
				// date_de_fin = "12/02/2011"
				// description = "Pour un mariage ou une autre occasion, sucré salé tout ca tout ca ...  ZEZ R zre zRez rze rz"
				// email = true
				// etat = "valider"
				// telephone = true
				// titre = "je fais a manger"
				// type = "offre"
				// user_id = "A3NQJ93ptdD2kFJpn"
				// _id = "RMX97pH8CJobBrGfZ" 
