import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../../6_actions/actions";

import { throttle } from "../../8_libs/throttle";

let nbpp = 10;

class Scroll extends Component {
	constructor(){
		super();
		this.scroll = throttle(this.scroll.bind(this),40);
	}
	componentWillMount(){
		this.props.scroll({scrollY:window.scrollY});		
	}
	componentDidMount() {
		document.addEventListener("scroll", this.scroll);
	}

	componentWillUnmount() {
		document.removeEventListener("scroll", this.scroll);
	}
	//==============CONTROLE====================
	scroll(){
		this.props.scroll({scrollY:window.scrollY});
		this.props.fonction();
	}
	
	//========================Preparation du rendu========================
	
	render(){
		return (
			<div style={{}}>	
			</div>
		);
	}
}

function mapStateToProps( state ){
	return (
		{
			page: state.controle.page,
			scroll: state.controle.scroll,
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		changePage: ACTIONS.Controle.changePage,
		scroll: ACTIONS.Controle.scroll,

	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( Scroll );
