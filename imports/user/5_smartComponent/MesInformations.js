/*C'est le bouton qu'on voit en premier ou lorsque on
 se deconnecte et qui nous permet de nous logguer avec github*/
import React,{ Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { ACTIONS } from "../../6_actions/actions";

import { Segment, Titre, Button } from "../../_common/4_dumbComponent/_gat_ui_react";

import CardUser from "../../user/4_dumbComponent/CardUser";

import { goUserEdit } from "../../8_libs/go";


class MesInformations extends Component{

	componentWillMount(){
		
		this.props.activeMenu("Mon Compte");
		this.props.activeMenuMonCompte("Mes informations");
		this.props.titrePage("Mes Informations");
		this.props.categorieGet({publier:true});

		this.props.transactionGetState({$or:[{"proposition.payeur":this.props.active_user._id},{"proposition.posteur":this.props.active_user._id}]});
	}

	categories(categories){
		let { edit } = this.props;
		return <ul>
			{
				categories&&categories.length>0?categories.reduce((total,categorie,i)=>{
					let find = this.props.categories.find(cat=>cat._id==categorie);
					return find?[...total,
						<li key={i} >
							{find.titre}
						</li>]:total;
				},[]):""
			}
		</ul>;
	}
	
	render(){
		let { transactions } = this.props;
		if(this.props.active_user){
			let { emails, profile, _id } = this.props.active_user;
			let debit = transactions.reduce((total,transaction)=>transaction.proposition.payeur==_id?transaction.proposition.prix+total:total,0)
			let credit = transactions.reduce((total,transaction)=>transaction.proposition.prestataire==_id?transaction.proposition.prix+total:total,0)
			return(	
				
				<div style={{display:"flex", flex:1, flexDirection:"column"}}>
					<CardUser
						nom = { profile?profile.nom:"" }
						prenom = { profile?profile.prenom:"" }
						note = {5}
						categories = {this.categories(profile.categories)}
						email = {emails&&emails.length>0?emails[0].address:""}
						telephone = {profile?profile.telephone:""}
						adresse = { profile?profile.adresse:"" }
						date_val_resp={ profile?profile.date_val_resp:"" }
						editer = {goUserEdit.bind(this,_id)}
					/>
					<Titre>Mes Seugnettes</Titre>
					<Segment style ={{padding: 20}}>
						<span>Mon solde : { profile?profile.solde:"" }</span> 
						<span>Total crédit : {credit} </span>
						<span>Total débit : {debit}</span>
					</Segment>
					
				</div>
			);
		}return (<div>wait</div>);
	}
}

function mapStateToProps( state ){
	return (
		{
			active_user: 	state.users.active_user,
			transactions: state.transaction.all,
			categories: state.categorie.all


		}
	);

}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		titrePage: ACTIONS.Titre.titrePage,
		activeMenu: ACTIONS.Menu.activeMenu,
		activeMenuMonCompte: ACTIONS.Menu.activeMenuMonCompte,
		transactionGetState: ACTIONS.Transaction.get_state,
		categorieGet: ACTIONS.Categorie.get,

	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( MesInformations );
