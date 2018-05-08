/*C'est le bouton qu'on voit en premier ou lorsque on
 se deconnecte et qui nous permet de nous logguer avec github*/
import React,{ Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { ACTIONS } from "../../6_actions/actions";

import MiniArticle from "../4_dumbComponent/MiniArticle";

import {  goAnnonce } from "../../8_libs/go";


class LastArticle extends Component{

	componentWillMount(){
		let limit = this.props.actualite&&this.props.annonce?2:4;
		this.props.annonceGet_SSL_state({etat:"valider"},{limit,sort:{date:-1}},"last");
		this.props.actualiteGet_SSL_state({publier: true},{limit,sort:{date:-1}},"last");
	}
	miniArticle(article, type, i){
		return <MiniArticle
			key= {i}
			image = { "/images/1.jpg" }
			lien = {type=="actu"?()=>{}:goAnnonce.bind(this,article._id)}
			titre = { article.titre }
		/>
	}
	render(){
		let {actu_last,ann_last} = this.props;
		return(	
			<div style={{boxShadow: "2px 2px 3px rgba(150,150,150,0.3)",border:"1px solid rgba(150,150,150,0.1)",borderRadius:5}}>
				{this.props.actualite?
					<div style={{boxShadow: "2px 2px 3px rgba(150,150,150,0.3)",border:"1px solid rgba(150,150,150,0.1)",borderRadius:5,padding:10, margin:10}}>{actu_last?actu_last.map((actu,i)=>this.miniArticle(actu,'actu',i)):""}</div>:""
				}
				{this.props.annonce?
					<div style={{boxShadow: "2px 2px 3px rgba(150,150,150,0.3)",border:"1px solid rgba(150,150,150,0.1)",borderRadius:5,padding:10, margin:10}}>{ann_last?ann_last.map((ann,i)=>this.miniArticle(ann,'ann',i)):""}</div>:""
				}
			</div>
		);
	}
}

function mapStateToProps( state ){
	return (
		{
			actu_last: state.actualite.last,
			ann_last: state.annonce.last 
		}
	);

}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		annonceGet_SSL_state: ACTIONS.Annonce.get_SSL_state,
		actualiteGet_SSL_state: ACTIONS.Actualite.get_SSL_state,
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( LastArticle );
