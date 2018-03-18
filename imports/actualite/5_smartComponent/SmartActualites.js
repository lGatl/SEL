import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../../6_actions/actions";

import { Segment} from "../../_common/4_dumbComponent/_gat_ui_react";
import ListeComp from "../../_common/4_dumbComponent/ListeComp";
import ExtraitActu from "../4_dumbComponent/ExtraitActu";


class Actualites extends Component {
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
			description = { actu.description }
			onClick = { this.actualiteRm.bind(this) }
		/>):"";
	}
	liste(tableau){ // tableau = [<Comps/>,...] => <Comp/>
		return tableau && tableau.length > 0 ? <ListeComp donnees = { tableau } /> : "";
	}
	render() {
		return (
			<div>
				{/*	<Comp/>  	 [<Comps/>,...]  			[{},...]  		 */}
				{ this.liste(this.actualites(this.props.actualites)) }
				
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

export default connect( mapStateToProps, mapDispatchToProps )( Actualites );
