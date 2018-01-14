/*C'est le bouton qu'on voit en premier ou lorsque on
 se deconnecte et qui nous permet de nous logguer avec github*/
import React,{ Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { ACTIONS } from "../../6_actions/actions";




class GetActiveUser extends Component{

	componentWillMount(){
		this.props.getActiveUser();
	}
	aAfficher(){
		this.props.children;
	}	 
	render(){	
		return(	
			<div>{this.aAfficher()}</div>
		);
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		getActiveUser: ACTIONS.Users.getActiveUser
	}, dispatch );
}

export default connect( null, mapDispatchToProps )( IsLogged );
