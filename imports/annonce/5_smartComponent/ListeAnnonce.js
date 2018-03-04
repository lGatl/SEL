import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../../6_actions/actions";

import ListeComp from "../../_common/4_dumbComponent/ListeComp";
import ExtraitAnn from "../4_dumbComponent/ExtraitAnn";


class ListeAnnonce extends Component {
	//=========INITIALISATION
	componentWillMount(){
		
		this.init(this.props);
	}
	componentWillReceiveProps(next){
		
		if(next!=this.props){this.init(next);}
	}
		
	init(props){
		this.props.activeMenu(props.mon_compte?"Mon Compte":"Annonce");
		this.props.activeMenuMonCompte(props.type=="offre"?"Mes offres":"Mes demandes");

		let CONDITION = {};
		CONDITION = props.mon_compte?{...CONDITION,user_id:props.active_user._id}:CONDITION;
		CONDITION = props.type?{...CONDITION,type:props.type}:CONDITION;
		this.props.annonceGet(CONDITION);
	}
	//=========ACTIONS
	annonceRm( id ){
		this.props.annonceRm({ _id: id });
	}
	//==========PREPARATION RENDU
	annonces(anns){//anns = [{},...] => [<Comps/>,...]
		return anns && anns.length > 0 ? anns.reduce((total, ann, i )=>[...total, <ExtraitAnn 
			key = {i}
			_id = { ann._id }
			titre = { ann.titre }
			description = { ann.description }
			onClick = { this.annonceRm.bind(this) }
		/>]
			,[]):"";
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
			active_user: state.users.active_user,
			annonces: state.annonce.all
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		activeMenu: ACTIONS.Menu.activeMenu,
		activeMenuMonCompte: ACTIONS.Menu.activeMenuMonCompte,

		annonceGet: 			ACTIONS.Annonce.get,
		annonceRm: 				ACTIONS.Annonce.rm
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( ListeAnnonce );
