import React, {Component} from 'react'

import { bindActionCreators }	from 'redux';
import { connect } from 'react-redux';

import { ACTIONS } from "../6_actions/actions";

import { Segment } from "../_common/4_dumbComponent/_gat_ui_react";

class LesSelistes extends Component {

	componentWillMount(){
		this.props.titrePage("Les Selistes");
		this.props.activeMenu("Les Selistes");
	}

	render(){

		return <div>sfrfefzef</div>
	//<UsersListe/>;
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
