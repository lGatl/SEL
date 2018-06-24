import React, {Component} from "react";

import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../6_actions/actions";

import ContenuKesako from "../_common/4_dumbComponent/ContenuKesako";

class Kesako extends Component {
	componentWillMount(){
		this.props.titrePage("LE SEL C'EST QUOI ?");
		this.props.activeMenu("Kesako");
	}


	render(){
		return (
				<ContenuKesako style = {{marginTop:15, flex:1, display:"flex", flexDirection:"column"}}/>
		);
	}
}

function mapStateToProps(state){
	return (
		{
			
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		titrePage: ACTIONS.Titre.titrePage,
		activeMenu: ACTIONS.Menu.activeMenu,
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( Kesako );
