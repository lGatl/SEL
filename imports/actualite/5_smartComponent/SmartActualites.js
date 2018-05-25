import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../../6_actions/actions";

import { Segment} from "../../_common/4_dumbComponent/_gat_ui_react";
import ExtraitActu from "../4_dumbComponent/ExtraitActu";

import { hrefActualite } from "../../8_libs/go";

import { throttle } from "../../8_libs/throttle";

class SmartActualites extends Component {
	//=========INITIALISATION
	constructor(){
		super();
		this.scroll = throttle(this.scroll.bind(this),40);
		this.state = {
			nbpp: 5,
			nump: 0
		};
	}
	componentWillMount(){
		this.props.actualiteGetSSL({publier:true},{sort:{date:-1},skip:0,limit:this.state.nbpp},(actualites)=>{
			this.setState({nump:1});
			this.props.actualiteCount({publier:true},(nb_actualites)=>{
				this.scroll(actualites,nb_actualites);
			});
		});
		
		

	}
	componentDidMount() {
		document.addEventListener("scroll", this.scroll);
	}

	componentWillUnmount() {
		document.removeEventListener("scroll", this.scroll);
	}
	//=========ACTIONS
	scroll(actualites,nb_actualites){
		if(
			((window.scrollY >= (document.documentElement.scrollHeight - document.documentElement.clientHeight)*0.95)||
			(document.documentElement.scrollHeight - document.documentElement.clientHeight)==0)
			&& ((this.props.actualites.length < this.props.nb_actualites)||(actualites&&nb_actualites&&actualites.length < nb_actualites))
		){
			this.props.actualiteGetAddSSL({publier:true},{sort:{date:-1},skip:((this.state.nump)*this.state.nbpp),limit:this.state.nbpp},(nv_actualites)=>{
				this.scroll(nv_actualites,nb_actualites);
			});
			this.setState({nump:this.state.nump+1});
		}
	}
	actualiteRm( id ){
		this.props.actualiteRm({ _id: id });
	}
	//==========PREPARATION RENDU
	actualites(actus){//actus = [{},...] => [<Comps/>,...]
		return actus && actus.length > 0 ? actus.map(( actu, i )=><ExtraitActu 
			key = {i}
			_id = { actu._id }
			titre = { actu.titre }
			href = {hrefActualite(actu._id)}
			description = { actu.description }
			onClick = { this.actualiteRm.bind(this) }
		/>):"";
	}
	
	render() {
		return (
			<div style={{display:"flex", flexDirection:"column", flex:1 }}>
				
				{ this.actualites(this.props.actualites) }
				
			</div>
		);
	}
}

function mapStateToProps( state ){
	return (
		{
			actualites: state.actualite.all,
			nb_actualites: state.actualite.count,

		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		actualiteGetSSL: ACTIONS.Actualite.get_SSL,
		actualiteGetAddSSL: ACTIONS.Actualite.getAdd_SSL,
		actualiteCount: ACTIONS.Actualite.count,
		actualiteRm: 	ACTIONS.Actualite.rm
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( SmartActualites );
