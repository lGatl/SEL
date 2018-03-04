import React, {Component} from 'react';

import { bindActionCreators }	from 'redux';
import { connect } from 'react-redux';

import { ACTIONS } from "../6_actions/actions";

import ContenuKesako from '../_common/4_dumbComponent/ContenuKesako';

class Kesako extends Component {
	componentWillMount(){
		this.props.activeMenu("Kesako");
	}


	render(){
		return (

			<div className="">
				<ContenuKesako/>

			</div>
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
		activeMenu: ACTIONS.Menu.activeMenu,
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( Kesako );
