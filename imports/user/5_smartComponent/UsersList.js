/*C'est le bouton qu'on voit en premier ou lorsque on
 se deconnecte et qui nous permet de nous logguer avec github*/
import React,{ Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Segment, Button, Note } from "../../_common/4_dumbComponent/_gat_ui_react";

import { ACTIONS } from "../../6_actions/actions";

import CardUser from "../../user/4_dumbComponent/CardUser";

import { hrefUser, goUserEdit } from "../../8_libs/go";
import { throttle } from "../../8_libs/throttle";

class UsersList extends Component{

	constructor(){
		super();
		this.scroll = throttle(this.scroll.bind(this),40);
		this.state = {
			nbpp: 4,
			nump: 0
		};
	}
	componentWillMount(){
		this.props.usersGetSSL({},{sort:{createdAt:-1},skip:0,limit:this.state.nbpp},(users)=>{
			this.setState({nump:1});
			this.props.usersCount({},(nb_users)=>{
				this.scroll(users,nb_users);
			});
		})
		this.props.categorieGet({publier:true});
	}
		componentDidMount() {
		document.addEventListener("scroll", this.scroll);
	}

	componentWillUnmount() {
		document.removeEventListener("scroll", this.scroll);
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
	scroll(users,nb_users){

		if(
			((window.scrollY >= (document.documentElement.scrollHeight - document.documentElement.clientHeight)*0.95)||
			(document.documentElement.scrollHeight - document.documentElement.clientHeight)==0)
			&& ((this.props.users.length < this.props.nb_users)||(users&&nb_users&&users.length < nb_users))
		){

			this.props.usersGetAddSSL({},{sort:{createdAt:-1},skip:((this.state.nump)*this.state.nbpp),limit:this.state.nbpp},(nv_users)=>{
				this.setState({nump:this.state.nump+1});
				this.scroll(nv_users,this.props.nb_users);
			});
			
		}
	}
	render(){
		return <div style = {{display:"flex", flex:1, justifyContent:"space-around", flexWrap: "wrap", alignItems:"flex-start", alignContent:"flex-start"}}> {
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
	}
}

function mapStateToProps( state ){
	return (
		{
			users: state.users.all,
			nb_users: state.users.count,
			categories: state.categorie.all

		}
	);

}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		usersGetSSL: ACTIONS.Users.get_SSL,
		usersGetAddSSL: ACTIONS.Users.getAdd_SSL,
		usersCount: ACTIONS.Users.count,
		categorieGet: ACTIONS.Categorie.get,

	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( UsersList );
