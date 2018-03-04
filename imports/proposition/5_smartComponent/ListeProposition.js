import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../../6_actions/actions";



class ListeProposition extends Component {
	//=========INITIALISATION
	componentWillMount(){
	
	}
		
	init(){
	
	}
	//=========ACTIONS
	



	//==========PREPARATION RENDU
	
	
	render() {
		return (
			<div>
				Liste Propositions
				
			</div>
		);
		
	}
}
function mapStateToProps( state ){
	return (
		{
		
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
	
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( ListeProposition );
