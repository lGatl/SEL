import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../../6_actions/actions";

import { Input, TextArea, Button, Dropdown } from "../../_common/4_dumbComponent/_gat_ui_react";

import CardUser from "../../user/4_dumbComponent/CardUser";




class FormulaireDInscription extends Component {
//Initialisation
	constructor(){
		super();
		this.roles=[
			{ key: 'in', value: 'in', text: 'inscrit' },
			{ key: 'se', value: 'se', text: 'seliste' },
			{ key: 'mo', value: 'mo', text: 'moderateur' },
			{ key: 'ad', value: 'ad', text: 'admin' }
		];
	}
	init(props){
		if(props.active_user){let { emails, profile } = props.active_user;

			return {
				email: emails&&emails.length>0?emails[0].address:"",
				nom:profile?profile.nom:"",
				prenom:profile?profile.prenom:"",
				telephone:profile?profile.telephone:"",
				adresse:profile?profile.adresse:"",
				date_val_resp:profile?profile.date_val_resp:"",
				categories:profile&&profile.categories?profile.categories:[]
			};}
	}
	componentWillMount(){
		this.props.usersControle(this.init(this.props));
		this.props.categorieGet({publier:true});

	}
	componentWillReceiveProps(news){

		if(this.props.active_user!= news.active_user){this.props.usersControle(this.init(news))}
	}
	//Controle
	change(e,{ value, name }){

		this.props.usersControle({ [name]:value });
	}
	changeMulti(e,{ value, name }){

		if(this.props.controle.categories.indexOf(value)<0){
			this.props.usersControle({ [name]:[...this.props.controle.categories,value] });
		}
	}
	categorieSupprime(categorie){
		let index = this.props.controle.categories.indexOf(categorie);
		if(index>=0){
			this.props.usersControle({ [name]:this.props.controle.categories.splice(index,1) });
		}
	}
	//Action
	usersUp(){
		let {email,password,nom,prenom,telephone,adresse,date_val_resp, categories} = this.props.controle;
		if(this.props.edit){
			let usermodifi = {
				emails:[{...this.props.active_user.emails[0],address:email}],
				username:email,
				password,
				profile:{
					nom,
					prenom,
					telephone,
					adresse,
					categories,
					date_val_resp
				}
			};
			this.props.usersUp({
				_id:this.props._id},usermodifi, (res)=>{
				this.props.usersControle(this.init(usermodifi));
				FlowRouter.go("/user/"+this.props._id);
			});
		}else{
			FlowRouter.go("/user/"+this.props._id+"/edit");
		}
		
		
	}
	//Preparation du rendu
	nom(nom){
		let { edit } = this.props;
		return edit?<Input style={{flex:1}}
			name = 'nom'
			value = { nom || "" }
			onChange = { this.change.bind( this ) } 
		/>:nom;
	}
	prenom(prenom){
		let { edit } = this.props;
		return edit?<Input style={{flex:1}}
			name = 'prenom'
			value = { prenom || "" }
			onChange = { this.change.bind( this ) } 
		/>:prenom;
	}
	telephone(telephone){
		let { edit } = this.props;
		return edit?<Input style={{flex:1}}
			name = 'telephone'
			value = { telephone || "" }
			onChange = { this.change.bind( this ) } 
		/>:telephone;
	}
	adresse(adresse){
		let { edit } = this.props;
		return edit?<TextArea style={{flex:1}}
			name = 'adresse'
			value = { adresse || "" }
			onChange = { this.change.bind( this ) } 
		/>:adresse;
	}
	email(email){
		let { edit } = this.props;
		return edit?<Input style={{flex:1}}
			name = 'email'
			value = { email || "" }
			onChange = { this.change.bind( this ) } 
		/>:email;
	}
	dateValResp(date_val_resp){
		let { edit } = this.props;
		return edit?<Input style={{flex:1}}
			name = 'date_val_resp'
			value = { date_val_resp || "" }
			onChange = { this.change.bind( this ) } 
		/>:date_val_resp;
	}
	categories(categories){
		let { edit } = this.props;
		return edit?<div>
			<Dropdown
				placeholder = 'Categories'
				name = 'categories'
				onChange = { this.changeMulti.bind ( this ) } 
				options = { this.props.categories.map(cat=>{return{value:cat._id,text:cat.titre};}) }
				value = { "" }
			/>
			<ul>
				{
					categories&&categories.length>0?categories.reduce((total,categorie,i)=>{
						let find = this.props.categories.find(cat=>cat._id==categorie);
						return find?[...total,
							<li key={i} onClick={this.categorieSupprime.bind(this,categorie)} style={{cursor:"pointer"}}>
								{find.titre}
							</li>]:total;
					},[]):""
				}
			</ul>
		</div>:<ul>
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
	render() {
		let { emails, profile } = this.props.active_user;
		let {email,password,nom,prenom,telephone,adresse,date_val_resp,categories} = this.props.controle;
		return (
			<div>
				<CardUser
					nom = { this.nom(nom) }
					prenom = { this.prenom(prenom) }
					note = {5}
					categories = {this.categories(categories)}
					email = {this.email(email)}
					telephone = {this.telephone(telephone)}
					adresse = {this.adresse(adresse)}
					date_val_resp={this.dateValResp(date_val_resp)}
				/>
					
				<Button
					onClick = { this.usersUp.bind( this ) }
				>
					{this.props.edit?"Sauvegarder":"Editer"}
				</Button>
			</div>
		);
	}
}

function mapStateToProps( state ){
	return (
		{
			active_user: state.users.active_user,
			controle: state.users.controle,
			categories: state.categorie.all

		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		usersControle: ACTIONS.Users.controle,
		usersUp: ACTIONS.Users.up,
		categorieGet: ACTIONS.Categorie.get,

	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( FormulaireDInscription );