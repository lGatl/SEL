/*C'est le bouton qu'on voit en premier ou lorsque on
 se deconnecte et qui nous permet de nous logguer avec github*/
import React,{ Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { ACTIONS } from "../../6_actions/actions";

import { Tableau, Titre, Button, Segment,A } from "../../_common/4_dumbComponent/_gat_ui_react";

import CardUser from "../../user/4_dumbComponent/CardUser";

import { goUserEdit } from "../../8_libs/go";

import { dateToFormat } from "../../8_libs/date";
import { hrefUser, hrefAnnonce } from "../../8_libs/go";



class MonReleveDeCompte extends Component{

	componentWillMount(){
		
		this.props.activeMenu("Mon Compte");
		this.props.activeMenuMonCompte("Mon relevé de compte");
		this.props.titrePage("Mon relevé de compte");
		this.props.transactionGetState({$or:[{"proposition.payeur":this.props.active_user._id},{"proposition.prestataire":this.props.active_user._id}]});
		this.props.categorieGet({});
	}
	
	render(){
		let { transactions, categories, active_user } = this.props;
		if(active_user){
			let { emails, profile, _id } = this.props.active_user;

			return(	
				
				<div style={{display:"flex", flex:1, flexDirection:"column"}}>
					<div style={{display:"flex",justifyContent:"flex-end"}}>
						<Segment row style = {{padding:10}}>
							<span style = {{fontWeight:600, paddingRight:10}}>Solde :</span> {profile?profile.solde:""}
						</Segment>
						
					</div>
					
					<span style = {{fontWeight:600, paddingRight:10}}>Débit</span>
					<Tableau
						ligne1sur2
						border_line
						border_table
						s_col = {[]}
						donnees={[
							{thead:[[
								"Date", 
								"Prestataire", 
								this.props.resize.windowwidth<700?"Categorie".substr(0, 3)+"...":"Categorie",
								"Titre de l'annonce", 
								"Prix"]]},
							{tbody:this.props.transactions.reduce((total,transaction)=>{
								let categorie = categories.find(categorie=>categorie._id == transaction.annonce.categorie)
								let user = transaction.prestataire
								return transaction.proposition.payeur==_id?
									[...total, [
										this.props.resize.windowwidth<700?dateToFormat(transaction.date).substr(0, dateToFormat(transaction.date).length-5):dateToFormat(transaction.date),
										user?<A href = {hrefUser(user._id)}>{this.props.resize.windowwidth<700?user.username.substr(0, 5)+"...":user.username}</A>:"",
										categories&&categories.find(categorie=>categorie._id == transaction.annonce.categorie)?categorie?this.props.resize.windowwidth<700?categorie.titre.substr(0, 3)+"...":categorie.titre:"":"",
										transaction.annonce.titre,
										transaction.proposition.prix
									]]:total;
							},[])
							},
						]}
					/>
					<span style = {{fontWeight:600, paddingRight:10}}>Crédit</span>
					<Tableau
						ligne1sur2
						border_line
						border_table
						s_col = {[]}
						donnees={[
							{thead:[["Date", "Payeur",this.props.resize.windowwidth<700?"Categorie".substr(0, 3)+"...":"Categorie","Titre de l'annonce", "Prix"]]},
							{tbody:this.props.transactions.reduce((total,transaction)=>{
								let categorie = categories.find(categorie=>categorie._id == transaction.annonce.categorie)
								let user = transaction.payeur
								return transaction.proposition.prestataire==_id?
									[...total, 
										[this.props.resize.windowwidth<700?dateToFormat(transaction.date).substr(0, dateToFormat(transaction.date).length-5):dateToFormat(transaction.date),
											user?<A href = {hrefUser(user._id)}>{this.props.resize.windowwidth<700?user.username.substr(0, 5)+"...":user.username}</A>:"",
											categories&&categories.find(categorie=>categorie._id == transaction.annonce.categorie)?categorie?this.props.resize.windowwidth<700?categorie.titre.substr(0, 3)+"...":categorie.titre:"":"",
											transaction.annonce.titre,
											transaction.proposition.prix
										]]:total;
							},[])
							},
						]}
					/>
				</div>
			);
		}return (<div>wait</div>);
	}
}

function mapStateToProps( state ){
	return (
		{
			resize: state.controle.resize,
			active_user: 	state.users.active_user,
			transactions: state.transaction.all,
			categories: state.categorie.all,

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

export default connect( mapStateToProps, mapDispatchToProps )( MonReleveDeCompte );
