import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../../6_actions/actions";

import { Segment} from "../../_common/4_dumbComponent/_gat_ui_react";
import ExtraitActu from "../4_dumbComponent/ExtraitActu";


class ActualiteDetaillee extends Component {
	//=========INITIALISATION
	componentWillMount(){
		this.props.actualiteGet1({_id:this.props._id});
	}
	//=========ACTIONS
	
	//==========PREPARATION RENDU
	
	render() {
		let { actualite } = this.props;
		return (
			<Segment style={{minHeight:100, marginBottom:20, justifyContent: "center", alignItems:"center", flex:1}}> 
				<img src="/images/1.jpg" alt="photo annonce" style={{
					width: 400,
					maxHeight:"100%" 
				}}/>
				<div style={{display:"flex", marginLeft:"10%", flexDirection:"column", flex:1, width:"100%"}}>
					
					<div style={{
						fontSize:22, 
						fontWeight:400,
						marginTop:10,
						marginBottom:20
					}}>
						{ actualite.titre }
					</div>
					<div dangerouslySetInnerHTML={{__html:actualite.description}} style={{fontSize:18, color:"grey", flex:1}}/>
					<div style={{
						fontSize:16,
						marginBottom:10
					}}>
						
					</div>
				</div>
			</Segment>
		);
	}
}

function mapStateToProps( state ){
	return (
		{
			actualite: state.actualite.one
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		actualiteGet1: ACTIONS.Actualite.get1,

	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( ActualiteDetaillee );
