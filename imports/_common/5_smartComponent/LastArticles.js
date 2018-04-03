/*C'est le bouton qu'on voit en premier ou lorsque on
 se deconnecte et qui nous permet de nous logguer avec github*/
import React,{ Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { ACTIONS } from "../../6_actions/actions";




class LastArticle extends Component{

	componentWillMount(){
		this.props.annonceGet({},{limit:4,sort:{date:-1}},"last_ann");
		this.props.actualiteGet({},{limit:4,sort:{date:-1}},"last_act");
	}
	
	render(){
		return(	
			<div></div>
		);
	}
}

function mapStateToProps( state ){
	return (
		{
			
		}
	);

}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		annonceGet: ACTIONS.Annonce.get,
		actualiteGet: ACTIONS.Actualite.get,
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( LastArticle );
