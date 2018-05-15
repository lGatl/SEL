/*C'est le bouton qu'on voit en premier ou lorsque on
 se deconnecte et qui nous permet de nous logguer avec github*/
import React,{ Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Segment, Button } from "../../_common/4_dumbComponent/_gat_ui_react";

import { ACTIONS } from "../../6_actions/actions";

import CardUser from "../../user/4_dumbComponent/CardUser";

import { hrefUser, goUserEdit } from "../../8_libs/go";

class UsersList extends Component{

	componentWillMount(){
		this.props.usersGet({});
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

	render(){
		return <div style = {{display:"flex", flex:1, justifyContent:"space-around", flexWrap: "wrap", alignItems:"flex-start", alignContent:"flex-start"}}> {
			this.props.users.map((user,i)=><div key = {i} style = {{padding:20}}><CardUser
				style = {{maxWidth: 300}}
				username = { user.username }
				nom = { user.profile.nom }
				prenom = { user.profile.prenom }
				note = {5}
				categories = {this.categories(user.profile.categories)}
				href_user = {hrefUser(user._id)}
				editer = {goUserEdit.bind(this,user._id)}
				email = {user.emails[0].address}
				telephone = {user.profile.telephone}
				adresse = {user.profile.adresse}
				date_val_resp={user.profile.date_val_resp}
			/></div>)
		} </div>;
	}
}

function mapStateToProps( state ){
	return (
		{
			users: state.users.all,

			categories: state.categorie.all

		}
	);

}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		usersGet: ACTIONS.Users.get,
		categorieGet: ACTIONS.Categorie.get,

	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( UsersList );
