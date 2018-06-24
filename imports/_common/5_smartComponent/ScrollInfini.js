import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../../6_actions/actions";

import { throttle } from "../../8_libs/throttle";

class ScrollInfini extends Component {
	constructor(){
		super();
		this.scroll = throttle(this.scroll.bind(this),40);
	}
	componentWillMount(){
		this.init(this.props);
	}
	componentWillReceiveProps(newp){
	
		if((this.props.reload&&newp.reload&&newp.reload!=this.props.reload)||(JSON.stringify(this.props.condition)!=JSON.stringify(newp.condition))){
			this.init(newp);	
		}		
	}
	init(props){
		window.scroll(0, 0);
		this.props.changePage({nump:0,nbpp:this.props.nbpp});
		this.props.scroll({scrollY:window.scrollY});	
		this.props.initFnt(props.condition,{sort:{date:-1},skip:((0)*this.props.nbpp),limit:this.props.nbpp},(nv_elts)=>{
			this.props.changePage({nump:1});
			this.props.countFnt(props.condition,(nb_annonces)=>{	
				if(this.props.fnt){this.props.fnt(nv_elts);}
				this.scroll(props);
			});
		});
	}
	componentDidMount() {
		document.addEventListener("scroll", this.scroll);
	}

	componentWillUnmount() {
		document.removeEventListener("scroll", this.scroll);
	}
	//==============CONTROLE====================
	scroll(props){


		if(
			((window.scrollY >= (document.documentElement.scrollHeight - document.documentElement.clientHeight)*0.90)||
			(document.documentElement.scrollHeight - document.documentElement.clientHeight)==0)&&
			(this.props.nb_total!=undefined?this.props.nb_total==0?false:(this.props.nb_charge < this.props.nb_total):true)
		){
			this.props.addFnt(this.props.condition,{sort:{date:-1},skip:((this.props.page?this.props.page.nump:1)*this.props.nbpp),limit:this.props.nbpp},(nv_elts)=>{
				if(this.props.fnt){this.props.fnt(nv_elts);}
				this.props.changePage({nump:this.props.page?this.props.page.nump+1:1});
				this.scroll(props);
			});
				
			

		}
		this.props.scroll({scrollY:window.scrollY});
		
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

export default connect( mapStateToProps, mapDispatchToProps )( ScrollInfini );
