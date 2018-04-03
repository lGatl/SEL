import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../../6_actions/actions";

import { Input, TextArea, Button, Dropdown, Titre, Checkbox, Calendrier } from "../../_common/4_dumbComponent/_gat_ui_react";

class FormAnnone extends Component {

	componentWillMount(){
		this.props.annonceControle(this.init());
		this.props.categorieGet({publier:true});
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
			image:"/images/1.jpg"
			
		};
	}
	//Controle
	change(e,{ value, name, checked }){

		this.props.annonceControle({ [name]:value||checked });
	}
	//Action
	annonceAdd(){
		let {titre, description, categorie, email, telephone, adresse, date_de_fin} = this.props.annonce_controle;
		this.props.annonceAdd(
			{
				titre,
				description,
				etat: "en_attente",
				date: Date.now(),
				type: this.props.type,
				user_id:this.props.active_user._id,
				categorie,
				email,
				telephone,
				adresse,
				date_de_fin: new Date(date_de_fin)

			}
		);
		this.props.annonceControle(this.init());
	}
	//Preparation du rendu
	render() {
		let { titre, description, categorie, date_de_fin, email, adresse, telephone } = this.props.annonce_controle;
		return (
			<form style={{}}>
				<Titre>Deposer une {this.props.type}</Titre>
				<Dropdown
					label = "Categorie"
					placeholder = "Categorie"
					name = "categorie"
					onChange = { this.change.bind ( this ) } 
					options = { this.props.categories.map(cat=>{return{value:cat._id,text:cat.titre};}) }
					value = { this.props.categories.find(cat=>cat._id==categorie)?this.props.categories.find(cat=>cat._id==categorie).titre:"" }
				/>
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
				<div>Informations de contact</div>
				<Checkbox
					label = "email"
					name = "email"
					checked = { email||"" }
					onChange = { this.change.bind( this ) }
				/>
				<Checkbox
					label = "Téléphone"
					name = "telephone"
					checked = { telephone||"" }
					onChange = { this.change.bind( this ) }
				/>
				<Checkbox
					label = "Adresse"
					name = "adresse"
					checked = { adresse||"" }
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
					onClick = { this.annonceAdd.bind( this ) }
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
		activeMenu: ACTIONS.Menu.activeMenu,
		activeMenuMonCompte: ACTIONS.Menu.activeMenuMonCompte,

		annonceControle: 	ACTIONS.Annonce.controle,
		annonceAdd: 			ACTIONS.Annonce.add,
		categorieGet: 			ACTIONS.Categorie.get,
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( FormAnnone );
