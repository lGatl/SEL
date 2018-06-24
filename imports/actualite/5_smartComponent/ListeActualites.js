import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../../6_actions/actions";

import { Segment} from "../../_common/4_dumbComponent/_gat_ui_react";
import ExtraitActu from "../4_dumbComponent/ExtraitActu";

import { hrefActualite, goActualite } from "../../8_libs/go";

import ScrollInfini from "../../_common/5_smartComponent/ScrollInfini";



class ListeActualites extends Component {
	
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
			goActualite = { goActualite.bind(this,actu._id) }
		/>):"";
	}
	
	render() {

		return (
			<div style={{display:"flex", flexDirection:"column", flex:1 }}>
				<ScrollInfini 
					nbpp = {4}
					reload={"actualiteListe"}
					nb_charge={this.props.actualites.length}
					nb_total={this.props.nb_actualites}
					initFnt = {this.props.actualiteGetSSL.bind(this)}
					addFnt = {this.props.actualiteGetAddSSL.bind(this)}
					countFnt = {this.props.actualiteCount.bind(this)}
					condition = {{publier:true}}
				/>

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
		actualiteRm: 	ACTIONS.Actualite.rm,
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( ListeActualites );
