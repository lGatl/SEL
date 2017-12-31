/*C'est le bouton qu'on voit en premier ou lorsque on
 se deconnecte et qui nous permet de nous logguer avec github*/
import React,{ Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { ACTIONS } from "../../6_actions/actions";
import Connexion from '../../4_pages/Connexion';
import { Segment } from "semantic-ui-react";



class IsLogged extends Component{

	componentWillMount(){
		this.props.getActiveUser();
	}
	aAfficher(){
		return this.props.active_user && this.props.active_user._id ? this.props.children : <div> <Segment> Vous n'etes pas connecté </Segment> <Connexion /> </div>;
	}
	render(){
					
		return(	
			<div>{this.aAfficher()}</div>
		);
	}
}

function mapStateToProps( state ){
	return (
		{
			active_user: 	state.users.active_user
		}
	);

}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		getActiveUser: ACTIONS.Users.getActiveUser
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( IsLogged );
