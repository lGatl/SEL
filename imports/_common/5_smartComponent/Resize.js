import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../../6_actions/actions";

import { throttle } from "../../8_libs/throttle";

class Resize extends Component {
	constructor(){
		super();
		this.resize = throttle(this.resize.bind(this),40);
	}
	componentWillMount(){
		this.props.resize({windowwidth:window.innerWidth});		
	}
	componentDidMount() {
		window.addEventListener("resize", this.resize);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.resize);
	}
	//==============CONTROLE====================
	resize(){
		this.props.resize({windowwidth:window.innerWidth});
	}
	
	//========================Preparation du rendu========================
	static ellipsis = (texte,ww,lengt,force,toend)=>{
		let text = toend?texte.substr(0, texte.length-lengt):texte.substr(0, lengt)
		
		return window.innerWidth<ww&&texte.length>lengt?force?(text+force):(text):texte;
	}
	static comp = (comp,True,False)=>{
		return window.innerWidth<comp?True:False
	};
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
			resize: state.controle.resize,
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		resize: ACTIONS.Controle.resize,

	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( Resize );
