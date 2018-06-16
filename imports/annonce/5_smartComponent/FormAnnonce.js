import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../../6_actions/actions";

import { dateToFormat } from "../../8_libs/date";

import { Input, TextArea, Button, Dropdown, Titre, Checkbox, Calendrier } from "../../_common/4_dumbComponent/_gat_ui_react";

class FormAnnone extends Component {

	componentWillMount(){
		this.props.titrePage(this.props.edit?"Editer une annonce":"Déposer une "+ this.props.type);
		this.props.activeMenu("Mon Compte");
		this.props.activeMenuMonCompte(this.props.type=="offre"?"Déposer une offre":"Déposer une demande");
		
		this.props.categorieGet({publier:true});
		if(this.props.edit&&this.props._id){
			this.props.annonceGet1({_id:this.props._id},(res)=>{
				this.props.annonceControle({ 
					titre: res.titre,
					description: res.description,
					categorie: res.categorie,
					date_de_fin:res.date_de_fin,
					email:res.email,
					telephone:res.telephone,
					adresse:res.adresse,
					image:res.image,
					etat: res.etat,
					date: res.date,
					
				});
			});
		}else{
			this.props.annonceControle(this.init());
		}
	}
	init(){
		return{ 
			titre: "",
			description: "",
			categorie: "",
			date_de_fin:Date.now(),
			email:false,
			telephone:false,
			adresse:false,
			image:"/images/1.jpg",
			etat: "en_attente",
			date: Date.now(),
			
		};
	}
	//Controle
	change(e,{ value, name, checked }){

		this.props.annonceControle({ [name]:value||checked });
	}
	//Action
	soumettre(){
		let {titre, description, categorie, email, telephone, adresse, date_de_fin} = this.props.annonce_controle;
		if(this.props.edit&&this.props._id){
			this.props.annonceUp({_id:this.props._id},
				{
					titre,
					description,
					etat: "en_attente",
					statut: "en attente",
					date: Date.now(),
					type: this.props.type,
					user_id:this.props.active_user._id,
					categorie,
					email,
					telephone,
					adresse,
					date_de_fin: date_de_fin
				});
			this.props.annonceControle(this.init());
			FlowRouter.go("/annonce/"+this.props._id);
			
		}else{
			
			this.props.annonceAdd(
				{
					titre,
					description,
					etat: "en_attente",
					statut: "en attente",
					date: Date.now(),
					type: this.props.type,
					user_id:this.props.active_user._id,
					categorie,
					email,
					telephone,
					adresse,
					date_de_fin: date_de_fin
				}
			);
			this.props.annonceControle(this.init());
		}
		

	}
	//Preparation du rendu
	render() {
		let { active_user } = this.props;
		let { titre, description, categorie, date_de_fin, image} = this.props.annonce_controle;
		return (
			
			<form style={{display:"flex", flex:1, flexDirection:"column"}}>
				<Dropdown
					label = "Categorie"
					placeholder = "Categorie"
					name = "categorie"
					onChange = { this.change.bind ( this ) } 
					options = { this.props.categories.map(cat=>{return{value:cat._id,text:cat.titre};}) }
					value = { categorie?categorie:"" }
				/>
				<Button
					onChange = { ()=>{} } 
				>Inserer une Image</Button>
				<Input
					label = "Image"
					placeholder = "Image"
					name = "image"
					value = { image||"" }
					onChange = { this.change.bind( this ) } 
				/>
				<div style={{width:80, height:80, background:"url('/images/1.jpg') no-repeat center", backgroundSize: "cover"}}></div>
				<Input
					label = "Titre"
					placeholder = "Titre"
					name = "titre"
					value = { titre||"" }
					onChange = { this.change.bind( this ) } 
				/>
				<TextArea
					label = "Description"
					placeholder = "Description"
					name = "description"
					value = { description||"" }
					onChange = { this.change.bind( this ) }
				/>
			
				<Calendrier
					label='Date de fin'
					name = 'date_de_fin'
					onChange = { this.change.bind( this ) }
					date={ date_de_fin||0 }
				/>
				<br/>
				<Button
					onClick = { this.soumettre.bind( this ) }
				>
				Sauvegarder {this.props.type=="offre"?"l'offre":"la demande"}
				</Button>
			</form>
				
		);
	}
}

function mapStateToProps( state ){
	return (
		{
			active_user: state.users.active_user,
			annonce_controle: state.annonce.controle,
			categories: state.categorie.all
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({ 
		titrePage: ACTIONS.Titre.titrePage,
		activeMenu: ACTIONS.Menu.activeMenu,
		activeMenuMonCompte: ACTIONS.Menu.activeMenuMonCompte,
	
		annonceControle: 	ACTIONS.Annonce.controle,
		annonceAdd: 			ACTIONS.Annonce.add,
		annonceUp: 			ACTIONS.Annonce.up,
		annonceGet1: 			ACTIONS.Annonce.get1,
		categorieGet: 			ACTIONS.Categorie.get,
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( FormAnnone );
