/*C'est le bouton qu'on voit en premier ou lorsque on
 se deconnecte et qui nous permet de nous logguer avec github*/
import React,{ Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Segment, Button } from "../../_common/4_dumbComponent/_gat_ui_react";

import { ACTIONS } from "../../6_actions/actions";




class IsLogged extends Component{

	// componentWillMount(){
	// 	this.props.getActiveUser();
	// }
	pageConnexion(){
		FlowRouter.go('/Connexion');
	}
	aAfficher(){
		//return this.props.active_user && this.props.active_user._id ? this.props.children : <div> <Segment> Vous n'etes pas connecté </Segment> <Button onClick={this.pageConnexion.bind(this)}> Page de connexion</Button> </div>;
		return this.props.children
	}
	render(){
					
		return(	
			<div style={{...this.props.style}}>{this.aAfficher()}</div>
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
