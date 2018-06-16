import React, { Component }	from "react";

import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../../6_actions/actions";
import { dateToFormat } from "../../8_libs/date";

import { Input, TextArea, Button, Dropdown, Titre, A } from "../../_common/4_dumbComponent/_gat_ui_react";

import { hrefActualite } from "../../8_libs/go";
import { throttle } from "../../8_libs/throttle";

import FixedLayoutMonCompte from "../../_common/4_dumbComponent/FixedLayoutMonCompte";
import RTE from "../../_common/4_dumbComponent/RTE";

class FormActu extends Component {

	componentWillMount(){
		this.props.titrePage("Gerer les actualités");
		this.props.activeMenu("Mon Compte");
		this.props.activeMenuMonCompte("Gerer les actualites");
		this.props.actualiteControle({titre:"",description:""});
	}

	//==============CONTROLE====================
	change(e,{ value, name }){
		
		this.props.actualiteControle({ [name]:value });
	}
	//==============ACTION====================

	
	actualiteAdd(){
		let {titre, description} = this.props.actualite_controle;

		this.props.actualiteAdd(
			{
				titre, description, date: new Date(Date.now()), publier:false
			},
			(res)=>{
				this.props.actualiteControle({titre:"",description:""});
				FlowRouter.go("/admin/actualite/");
			});
		
	}
	onChange(a){
		this.props.actualiteControle({description:a});

	}
	//========================Preparation du rendu========================
	
	render(){

		let {titre, description,image,test} = this.props.actualite_controle;
		
		return (
	
			<form id="form" style={{display:"flex", flex:1, flexDirection:"column"}}>
				<Button
					onChange = { ()=>{} } 
				>Inserer une Image</Button>
				<Input
					label = "Image"
					placeholder = "Image"
					name = "image"
					value = { image||"" }
					onChange = { this.change.bind( this ) } 
				/>
				<div style={{width:80, height:80, background:"url('/images/1.jpg') no-repeat center", backgroundSize: "cover"}}></div>
				<Input
					label = 'Titre'
					name = 'titre'
					value = { titre||"" }
					onChange = { this.change.bind( this ) } 
				/>

				<RTE onChange={this.onChange.bind(this)}></RTE>
				<Button
					style = {{marginLeft:8,marginRight:8}}
					onClick = { this.actualiteAdd.bind( this ) }
				>Ajouter l'actualité</Button>	
			</form>
		);
	}
}

function mapStateToProps( state ){
	return (
		{
			actualite_controle: state.actualite.controle,
			actualites: state.actualite.all,
			nb_actualites: state.actualite.count,
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		titrePage: ACTIONS.Titre.titrePage,
		activeMenu: ACTIONS.Menu.activeMenu,
		activeMenuMonCompte: ACTIONS.Menu.activeMenuMonCompte,
		actualiteGetSSL: ACTIONS.Actualite.get_SSL,
		actualiteGetAddSSL: ACTIONS.Actualite.getAdd_SSL,
		actualiteCount: ACTIONS.Actualite.count,
		actualiteControle: 	ACTIONS.Actualite.controle,
		actualiteAdd:	ACTIONS.Actualite.add,
		actualiteRm: 	ACTIONS.Actualite.rm,
		actualiteUp: 	ACTIONS.Actualite.up,

	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( FormActu );
