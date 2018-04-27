import React, {Component} from "react";
import { bindActionCreators }	from "redux";
import { connect } 				from "react-redux";

import { ACTIONS } from "../../6_actions/actions";

import { Titre } from "../../_common/4_dumbComponent/_gat_ui_react";

class TitrePage extends Component {
	render(){
		return (
			<Titre>
				{ this.props.titre_page }
			</Titre>
		);
	}
}

function mapStateToProps(state){
	return (
		{
			titre_page:state.titre.titre_page
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		titrePage: ACTIONS.Titre.titrePage,
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( TitrePage );
