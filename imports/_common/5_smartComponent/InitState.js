/*C'est le bouton qu'on voit en premier ou lorsque on
 se deconnecte et qui nous permet de nous logguer avec github*/
import React,{ Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { ACTIONS } from "../../6_actions/actions";




class InitState extends Component{

	componentWillMount(){
		this.props.getActiveUser();
	}
	
	render(){
		return(	
			<div></div>
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

export default connect( mapStateToProps, mapDispatchToProps )( InitState );
