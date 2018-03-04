import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../../6_actions/actions";

import { Input, TextArea, Button, Dropdown, Titre, Checkbox } from "../../_common/4_dumbComponent/_gat_ui_react";

class FormAnnone extends Component {

	componentWillMount(){
		this.props.annonceControle(this.init());
	}
	init(){
		return{ 
			titre: "",
			description: "",
			categorie: "",
			date_de_fin:"",
			e_mail:false,
			telephone:false,
			adresse:false,
			
		};
	}
	//Controle
	change(e,{ value, name, checked }){

		this.props.annonceControle({ [name]:value||checked });
	}
	//Action
	annonceAdd(){
		let {titre, description} = this.props.annonce_controle;
		this.props.annonceAdd(
			{
				titre,
				description,
				type: this.props.type,
				user_id:this.props.active_user._id

			}
		);
		this.props.annonceControle(this.init());
	}
	//Preparation du rendu
	render() {
		let { titre, description, categorie, date_de_fin, e_mail, adresse, telephone } = this.props.annonce_controle;
		return (
			<form style={{}}>
				<Titre>Deposer une {this.props.type}</Titre>
				<Dropdown
					label = 'Categorie'
					placeholder = 'Categorie'
					name = 'categorie'
					onChange = { this.change.bind ( this ) } 
					options = { [
						{ value: 'lien', text: 'lien' },
						{ value: 'lien2', text: 'lien2' },
						{ value: 'lien3', text: 'lien3' }
					] }
					value = { categorie||"" }
				/>
				<Input
					label = 'Titre'
					placeholder = 'Titre'
					name = 'titre'
					value = { titre||"" }
					onChange = { this.change.bind( this ) } 
				/>
				<TextArea
					label = 'Description'
					placeholder = 'Description'
					name = 'description'
					value = { description||"" }
					onChange = { this.change.bind( this ) }
				/>
				<div>Informations de contact</div>
				<Checkbox
					label = 'e-mail'
					name = 'e_mail'
					checked = { e_mail||"" }
					onChange = { this.change.bind( this ) }
				/>
				<Checkbox
					label = 'Téléphone'
					name = 'telephone'
					checked = { telephone||"" }
					onChange = { this.change.bind( this ) }
				/>
				<Checkbox
					label = 'Adresse'
					name = 'adresse'
					checked = { adresse||"" }
					onChange = { this.change.bind( this ) }
				/>
				<Input
					label = 'Date de fin'
					placeholder = 'Date de fin'
					name = 'date_de_fin'
					value = { date_de_fin||"" }
					onChange = { this.change.bind( this ) } 
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
			annonce_controle: state.annonce.controle
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({ 
		activeMenu: ACTIONS.Menu.activeMenu,
		activeMenuMonCompte: ACTIONS.Menu.activeMenuMonCompte,

		annonceControle: 	ACTIONS.Annonce.controle,
		annonceAdd: 			ACTIONS.Annonce.add,
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( FormAnnone );
