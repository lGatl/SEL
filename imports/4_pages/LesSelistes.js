import React, {Component} from "react";

import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../6_actions/actions";

import { Segment } from "../_common/4_dumbComponent/_gat_ui_react";

import UsersList from "../user/5_smartComponent/UsersList";

class LesSelistes extends Component {

	componentWillMount(){
		this.props.titrePage("Les Selistes");
		this.props.activeMenu("Les Selistes");
	}

	render(){

		return <UsersList/>;
	}
}


function mapStateToProps(state){
	return ({

	});
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		titrePage: ACTIONS.Titre.titrePage,
		activeMenu: ACTIONS.Menu.activeMenu,

	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( LesSelistes );
