import React, {Component} from 'react'
import { Button, Form,Select,Rating } from 'semantic-ui-react'

import Titre from '../4_dumbComponent/Titre.js'

export default class CreerUnCompte extends Component {

	constructor(){
		super()
	
		this.state={
			username:"",
			email:"",
			password:"",

			prenom:"",
			nom:"",
			tel:"",
			adresse:"",
			respC:false,
			dateValRespC:"",
			note:5,
			soldeSeugnette:120,
			totalCredits:0,
			totalDebits:0,
			role:""
		}
		this.handleChange = (e,{value}) =>this.etatDrop(value)
	}
	changeNote(e,{name,rating}){
		this.setState({[name]:rating})
	}
	change(e){
		e.preventDefault()
		this.setState({[e.target.name]:e.target.value})
		if(e.target.name=="email"){this.setState({username:e.target.value})}
	}

	etatDrop(val){
			 this.setState({role:val})
	}
	recupState(){

		return(
			{
				username:this.state.username,
				email:this.state.email,
				password:this.state.password,
				profile:{
					prenom:this.state.prenom,
					nom:this.state.nom,
					tel:this.state.tel,
					adresse:this.state.adresse,
					respC:this.state.respC,
					dateValRespC:this.state.dateValRespC,
					note:this.props.acces=="public"?5:this.state.note,
					soldeSeugnette:this.props.acces=="public"?"120":this.state.soldeSeugnette,
					totalCredits:this.state.totalCredits,
					totalDebits:this.state.totalDebits,
					role:this.props.acces=="public"?"se":this.state.role
				}
			}
		)
	}

	changeCompte(e){
		e.preventDefault()

		this.props.usr.changeCompte(this.recupState(),()=>{
			Bert.alert({
					title:"Sauvegarde effectuée",
					message:"Vos modifications sur "+this.state.username+" ont été sauvegardées" ,
					type:'success'
				})
		})
		if(this.props.remiseA0){this.props.remiseA0()}
	}
	supprimeCompte(e){
		e.preventDefault()
		this.props.usr.supprimer(this.recupState())
		if(this.props.remiseA0){this.props.remiseA0()}
	}

	creerCompte(e){
		e.preventDefault()

		this.props.usr.creer(this.recupState())
		if(this.props.remiseA0){this.props.remiseA0()}
		if(this.props.acces=="public"){FlowRouter.go('/')}
	}

	nePasModifier(){
		if(this.props.remiseA0){this.props.remiseA0()}
	}
	componentWillMount() {
				if(this.props.donnees){

					this.setState({
						username:this.props.donnees.username,
						email:this.props.donnees.username,
						password:this.props.donnees.password,

							prenom:this.props.donnees.profile.prenom,
							nom:this.props.donnees.profile.nom,
							tel:this.props.donnees.profile.tel,
							adresse:this.props.donnees.profile.adresse,
							respC:this.props.donnees.profile.respC,
							dateValRespC:this.props.donnees.profile.dateValRespC,
							note:this.props.donnees.profile.note,
							soldeSeugnette:this.props.donnees.profile.soldeSeugnette,
							totalCredits:this.props.donnees.profile.totalCredits,
							totalDebits:this.props.donnees.profile.totalDebits,
							role:this.props.donnees.profile.role

					})
				}
		}
	role(){
		if(this.props.acces){
			if(this.props.acces=="admin"){
				return(
					<Select
						label="Role"
						options={this.roles}
						placeholder="role"
						onChange={this.handleChange}
						value={this.state.role}
					/>
				)
			}
		}
	}

	solde(){
		if(this.props.acces){
			if(this.props.acces=="admin"){
				return(
					<Form.Input
						label="Solde des Seugnettes"
						name="soldeSeugnette"
						onChange={this.change.bind(this)}
						value={this.state.soldeSeugnette}
					/>
				)
			}
		}
	}

		note(){
		if(this.props.acces){
			if(this.props.acces=="admin"){
				return(
					<Rating
					label="note"
					name="note"
					icon='star'
					rating={this.state.note}
					maxRating={5}
					onRate={this.changeNote.bind(this)}
					/>

				)
			}
		}
	}

	pass(){
		if(this.props.action){
			if(this.props.action=="creer"){
				return(
					<Form.Input
						label="Mot de passe"
						name="password"
						type="password"
						placeholder='Mot de passe'
						onChange={this.change.bind(this)}
						value={this.state.password}
					/>
				)
			}
		}
	}
	boutonAAff(){
		if(this.props.action){
			if(this.props.action=="editer"){
				return(<div>
					<Button type='submit' onClick={this.changeCompte.bind(this)}>Editer ce compte</Button>
					<Button type='submit' onClick={this.supprimeCompte.bind(this)}>Supprimer ce compte</Button>
					<Button type='submit' onClick={this.nePasModifier.bind(this)}>Ne pas modifier</Button>
				</div>)
			}
			if(this.props.action=="creer"){
				return(<Button type='submit' onClick={this.creerCompte.bind(this)}>Valider</Button>)
			}

		}
	}

	render(){
		titre=""
		if(this.props.action=="editer"){titre=<Titre nom={"EDITER UN COMPTE"}></Titre>}else{titre=<Titre nom={"Créer un Compte".toUpperCase()}></Titre>}
		if(this.props.usr.logged&&this.props.acces=="public"){
			return(<div>Vous etes deja connecté!!</div>)
		}else{
		return(
			<div className="contact">
			 <Form id="contact">
				<label>{titre}</label> <br/>
					<Form.Input
						label="Email"
						name="email"
						placeholder='exemple@exemple.com'
						onChange={this.change.bind(this)}
						value={this.state.email}
					/>
					{this.pass()}


					<Form.Input
						label="Nom"
						name="nom"
						placeholder='Nom'
						onChange={this.change.bind(this)}
						value={this.state.nom}
					/>

					<Form.Input
						label="Prénom"
						name="prenom"
						placeholder='Prénom'
						onChange={this.change.bind(this)}
						value={this.state.prenom}
					/>

					<Form.Input
						label="Téléphone"
						name="tel"
						placeholder='Téléphone'
						onChange={this.change.bind(this)}
						value={this.state.tel}
					/>

					<Form.TextArea
						name='adresse'
						label='Adresse'
						placeholder='Veuillez indiquer votre adresse'
						rows='3'
						onChange={this.change.bind(this)}
						value={this.state.adresse}
					/>



					<Form.Input
						label="Date de validité de votre responsabilité civil"
						name="dateValRespC"
						placeholder='Date de validité de votre responsabilité civil'
						onChange={this.change.bind(this)}
						value={this.state.dateValRespC}
					/>
					{this.solde()}
					{this.role()}
					<br/>
					{this.note()}

			</Form>
			<br/>
			{this.boutonAAff()}
			</div>

			)
		}
	}
}


 
