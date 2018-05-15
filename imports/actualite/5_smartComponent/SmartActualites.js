import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../../6_actions/actions";

import { Segment} from "../../_common/4_dumbComponent/_gat_ui_react";
import ExtraitActu from "../4_dumbComponent/ExtraitActu";

import { hrefActualite } from "../../8_libs/go";

class SmartActualites extends Component {
	//=========INITIALISATION
	componentWillMount(){
		this.props.actualiteGet({publier:true});
	}
	//=========ACTIONS
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
			actualites: state.actualite.all
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		actualiteGet: ACTIONS.Actualite.get,
		actualiteRm: 	ACTIONS.Actualite.rm
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( SmartActualites );
