import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../../6_actions/actions";

import { Segment, Grid } from "semantic-ui-react";
import ListeComp from "../../_common/4_dumbComponent/ListeComp";
import ExtraitAnn from "../4_dumbComponent/ExtraitAnn";


class Annonces extends Component {
	//=========INITIALISATION
	componentWillMount(){
		this.props.annonceGet();
	}
	//=========ACTIONS
	annonceRm( id ){
		this.props.annonceRm({ _id: id });
	}
	//==========PREPARATION RENDU
	annonces(anns){//anns = [{},...] => [<Comps/>,...]
		return anns && anns.length > 0 ? anns.map(( ann, i )=><ExtraitAnn 
			key = {i}
			_id = { ann._id }
			titre = { ann.titre }
			description = { ann.description }
			onClick = { this.annonceRm.bind(this) }
		/>):"";
		// return [<Comps/>,...]
	}
	liste(tableau){// tableau = [<Comps/>,...] => <Comp/>
		return tableau && tableau.length > 0 ? <ListeComp donnees = { tableau } /> : "";
		//return <Comp/>
	}
	render() {
		return (
			<div>
				{/*	<Comp/>   [<Comps/>,...]  			[{},...]   */}
				{ this.liste(this.annonces(this.props.annonces)) }
				
			</div>
		);
		
	}
}
function mapStateToProps( state ){
	return (
		{
			annonces: state.annonce.all
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		annonceGet: 			ACTIONS.Annonce.get,
		annonceRm: 				ACTIONS.Annonce.rm
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( Annonces );
