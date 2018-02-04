import React, {Component} from "react";
import { Input, TextArea, Button } from "../../_common/4_dumbComponent/gat_ui_react";
import Titre from "../4_dumbComponent/Titre.js";

export default class FormContact extends Component {

	constructor(){
		super();
		this.state = {
			prenom:"",
			nom:"",
			mail:"",
			tel:"",
			sujet:"",
			message:""
		};
	}

	change(e){
		e.preventDefault();
		this.setState({[e.target.name]:e.target.value});
	}

	render(){
		return(
			<form id="contact">
				<br/>
				<Titre>FORMULAIRE DE CONTACT</Titre>
				<br/>
				<Input
					label="Nom"
					name="nom"
					placeholder="Nom"
					onChange={this.change.bind(this)}
					value={this.state.nom}
				/>
				<Input
					label="Prénom"
					name="prenom"
					placeholder="Prénom"
					onChange={this.change.bind(this)}
					value={this.state.prenom}
				/>
				<Input
					label="Email"
					name="mail"
					placeholder="exemple@exemple.com"
					onChange={this.change.bind(this)}
					value={this.state.mail}
				/>
				<Input
					label="Téléphone"
					name="tel"
					placeholder="Téléphone"
					onChange={this.change.bind(this)}
					value={this.state.tel}
				/>
				<TextArea
					name="sujet"
					label="Objet de votre message"
					placeholder="Objet de votre message"
					onChange={this.change.bind(this)}
					value={this.state.sujet}
				/>
				<TextArea
					name="message"
					label="Votre message"
					placeholder="Votre message"
					onChange={this.change.bind(this)}
					value={this.state.message}
				/>
				<Button type="submit" href={
					"mailto:0_never_forever_0@live.fr?subject=" +
					this.state.sujet +
					"&body=" + "Nom et Prénom : " +
					this.state.nom + " " +
					this.state.prenom +
					"%0A" + "Email : " +
					this.state.mail +
					"%0A" +"Téléphone : " +
					this.state.tel +
					"%0A" +"Message : " +
					this.state.message
				}>Envoyer</Button>
			</form>
		)
	}
}

