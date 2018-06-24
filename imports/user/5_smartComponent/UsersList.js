/*C'est le bouton qu'on voit en premier ou lorsque on
 se deconnecte et qui nous permet de nous logguer avec github*/
import React,{ Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Segment, Button, Note, Dropdown } from "../../_common/4_dumbComponent/_gat_ui_react";

import { ACTIONS } from "../../6_actions/actions";

import CardUser from "../../user/4_dumbComponent/CardUser";

import FixedLayoutSA from "../../_common/4_dumbComponent/FixedLayoutSA";

import { hrefUser, goUserEdit } from "../../8_libs/go";

import ScrollInfini from "../../_common/5_smartComponent/ScrollInfini";

let nbpp = 4;

class UsersList extends Component{


	componentWillMount(){
		this.props.categorieGet({publier:true});
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
	change(e,{ value, name, checked }){

		this.props.usersControle({ [name]:value||checked });
	}
	render(){
		let { distance, categorie } = this.props.controle;
		
		return <div style = {{display:"flex", flex:1, flexDirection:"column", marginTop:60}}>
			<ScrollInfini 
				nbpp = {4}
				reload={"usersListe"}
				nb_charge={this.props.users.length}
				nb_total={this.props.nb_users}
				initFnt = {this.props.usersGetSSL.bind(this)}
				addFnt = {this.props.usersGetAddSSL.bind(this)}
				countFnt = {this.props.usersCount.bind(this)}
				condition = {{}}
			/>
			<FixedLayoutSA>
				<Dropdown
					label = "Categorie"
					placeholder = "Categorie"
					name = "categorie"
					onChange = { this.change.bind ( this ) } 
					options = { [...this.props.categories.reduce((total,cat)=>{return cat.publier==true?[...total,{value:cat._id,text:cat.titre}]:total;},[]),{value:"",text:"Pas de categorie"} ]}
					value = { categorie?categorie:"" }
				/>
				<Dropdown
					label = "Distance"
					placeholder = "Distance"
					name = "distance"
					onChange = { this.change.bind ( this ) } 
					options = {[ {value:5,text:"0-5km"},{value:10,text:"5-10km"},{value:15,text:"10-15km"},{value:20,text:"15-20km"} ]}
					value = { distance?distance:"" }
				/>
			</FixedLayoutSA>
					
			<div style = {{display:"flex", flex:1, justifyContent:"space-around", flexWrap: "wrap", alignItems:"flex-start", alignContent:"flex-start"}}>
				{
					this.props.users.map((user,i)=><div key = {i} style = {{padding:5}}><CardUser
						style = {{maxWidth: 300}}
						username = { user.username }
						nom = { user.profile.nom }
						prenom = { user.profile.prenom }
						note = {<Note note={user.profile.note.reduce((total,note)=>total+note,0)/user.profile.note.length}/>}
						categories = {this.categories(user.profile.categories)}
						href_user = {hrefUser(user._id)}
						editer = {goUserEdit.bind(this,user._id)}
						email = {user.emails[0].address}
						telephone = {user.profile.telephone}
						adresse = {user.profile.adresse}
						date_val_resp={user.profile.date_val_resp}
					/></div>)
				} </div>;
		</div>;
	}
}

function mapStateToProps( state ){
	return (
		{
			page: state.controle.page,
			users: state.users.all,
			nb_users: state.users.count,
			controle: state.users.controle,
			categories: state.categorie.all

		}
	);

}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		changePage: ACTIONS.Controle.changePage,
		usersGetSSL: ACTIONS.Users.get_SSL,
		usersGetAddSSL: ACTIONS.Users.getAdd_SSL,
		usersCount: ACTIONS.Users.count,
		categorieGet: ACTIONS.Categorie.get,
		usersControle: ACTIONS.Users.controle,

	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( UsersList );
