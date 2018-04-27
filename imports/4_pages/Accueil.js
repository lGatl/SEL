import React, {Component} from "react";

import { bindActionCreators }	from 'redux';
import { connect } from 'react-redux';

import { ACTIONS } from "../6_actions/actions";

import { Titre } from "../_common/4_dumbComponent/_gat_ui_react";

import GoogleMap from "../_common/4_dumbComponent/GoogleMap";

class Accueil extends Component {

	componentWillMount(){
		this.props.titrePage("Bienvenue Futur Seliste");
		
		this.props.activeMenu("Accueil");
	}

	render(){

		return (
			<div>
				<Titre> Partagez des services et des savoirs... Créez des liens </Titre>
				<div>CArrousel 3 annonces</div>
				<Titre> Trouvez un SEL près de chez vous ! C'est simple avec la carte des sélistes </Titre>
				<GoogleMap/>

			</div>
		);
	}
}


function mapStateToProps(state){
	return (
		{
			
			
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		titrePage: ACTIONS.Titre.titrePage,
		activeMenu: ACTIONS.Menu.activeMenu,
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( Accueil );
