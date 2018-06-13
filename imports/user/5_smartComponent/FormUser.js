import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../../6_actions/actions";

import { Input, TextArea, Button, Dropdown, Note, Checkbox } from "../../_common/4_dumbComponent/_gat_ui_react";

import CardUser from "../../user/4_dumbComponent/CardUser";

import { goUser, goUserEdit } from "../../8_libs/go";




class FormulaireDInscription extends Component {
//Initialisation
	constructor(){
		super();
		this.roles=[
			{ key: "in", value: "in", text: "inscrit" },
			{ key: "se", value: "se", text: "seliste" },
			{ key: "mo", value: "mo", text: "moderateur" },
			{ key: "ad", value: "ad", text: "admin" }
		];
	}
	componentWillMount(){
		
		this.init(this.props);
		this.props.categorieGet({publier:true});

	}
	componentWillReceiveProps(news){

		if((this.props.active_user != news.active_user)||(this.props.edit != news.edit)||(this.props._id != news._id)){this.init(news);}
	}
	init(props){
		this.props.titrePage(props.edit?"Editer un utilisateur":"Fiche utilisateur");
		this.props.usersGet1({_id:props._id},user=>{
			let { emails, profile, username } = user;
			this.props.usersControle({
				username: username?username:"",
				email: emails&&emails.length>0?emails[0].address:"",
				note: profile?profile.note:[],
				nom:profile?profile.nom:"",
				prenom:profile?profile.prenom:"",
				telephone:profile?profile.telephone:"",
				adresse:profile?profile.adresse:"",
				date_val_resp:profile?profile.date_val_resp:"",
				categories:profile&&profile.categories?profile.categories:[]
			});});
			
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
		let {username, email,password,nom,prenom,telephone,adresse,date_val_resp,categories} = this.props.controle;
		if(this.props.edit){
			let usermodifi = {
				emails:[{...this.props.active_user.emails[0],address:email}],
				username:email,
				password,
				profile:{
					...this.props.user.profile,
					username,
					nom,
					prenom,
					telephone,
					adresse,
					categories,
					date_val_resp
				}
			};
			this.props.usersUp({_id:this.props._id},usermodifi, (res)=>{
				goUser(this.props._id);
			});
		}else{
			goUserEdit(this.props._id);
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
	username(username){
		let { edit } = this.props;
		return edit?<Input style={{flex:1}}
			name = 'username'
			value = { username || "" }
			onChange = { this.change.bind( this ) } 
		/>:username;
	}
	telephone(telephone, show_telephone){
		let { edit } = this.props;
		return edit?<div style = {{display:"flex", flex:1}}><Input style={{flex:1}}
			name = 'telephone'
			value = { telephone || "" }
			onChange = { this.change.bind( this ) } 
		/><Checkbox
			name = "show_telephone"
			checked = { show_telephone||"" }
			onChange = { this.change.bind( this ) }
		/></div>:show_telephone?telephone:"";
	}
	adresse(adresse,show_adresse){
		let { edit } = this.props;
		return edit?<div style = {{display:"flex", flex:1}}><TextArea style={{flex:1}}
			name = 'adresse'
			value = { adresse || "" }
			onChange = { this.change.bind( this ) } 
		/><Checkbox
			name = "show_adresse"
			checked = { show_adresse||"" }
			onChange = { this.change.bind( this ) }
		/></div>:show_adresse?adresse:"";
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
		return edit?<div style = {{}}>
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

		let {username,email,password,nom,prenom,telephone,adresse,show_adresse,date_val_resp,categories, note} = this.props.controle;
		return (
			<div style = {{flex:1}}>
				<CardUser
					edit
					username = {this.username(username)}
					nom = { this.nom(nom) }
					prenom = { this.prenom(prenom) }
					note = {note?<Note note={note.reduce((total,note)=>total+note,0)/note.length}/>:<Note note={[].reduce((total,note)=>total+note,0)/[].length}/>}
					categories = {this.categories(categories)}
					email = {this.email(email)}
					telephone = {this.telephone(telephone)}
					adresse = {this.adresse(adresse, show_adresse)}
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
			user: state.users.one,
			active_user: state.users.active_user,
			controle: state.users.controle,
			categories: state.categorie.all

		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		titrePage: ACTIONS.Titre.titrePage,
		usersControle: ACTIONS.Users.controle,
		usersUp: ACTIONS.Users.up,
		usersGet1: ACTIONS.Users.get1,
		categorieGet: ACTIONS.Categorie.get,

	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( FormulaireDInscription );
