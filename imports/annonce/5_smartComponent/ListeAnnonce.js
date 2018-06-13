import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../../6_actions/actions";
import { dateToFormat } from "../../8_libs/date";

import { Menu, Dropdown } from "../../_common/4_dumbComponent/_gat_ui_react";

import SmartMenuAnnonce from "../../_common/5_smartComponent/SmartMenuAnnonce";

import ExtraitAnn from "../4_dumbComponent/ExtraitAnn";
import Proposition from "../../proposition/4_dumbComponent/Proposition";

import { hrefUser, hrefAnnonce, goAnnonce } from "../../8_libs/go";
import { throttle } from "../../8_libs/throttle";

import FixedLayout from "../../_common/4_dumbComponent/FixedLayout";

class ListeAnnonce extends Component {
	//=========INITIALISATION
	constructor(){
		super();
		this.scroll = throttle(this.scroll.bind(this),40);
		this.state = {
			nbpp: 5,
			nump: 0
		};
	}
	componentWillMount(){
		this.props.titrePage("Annonces");
		this.props.activeMenu("Annonce");
		this.init(this.props);
		this.props.categorieGet({});
	}
	componentWillReceiveProps(nextp){
		
		if((nextp.type!=this.props.type)||(this.props.active_user != nextp.active_user)){
			this.init(nextp);
		}
	}
	componentDidMount() {
		document.addEventListener("scroll", this.scroll);
		this.props.annonceControle({ categorie:"", distance:null });
	}

	componentWillUnmount() {
		document.removeEventListener("scroll", this.scroll);
		this.props.annonceControle({ categorie:"", distance:null });
	}

	init(props){
		
		this.props.activeMenuAnnonce(props.type=="offre"?"Offres":props.type=="demande"? "Demandes": "Toutes");	
		
		this.props.annonceGetSSL(this.condition(props),{sort:{date:-1},skip:0,limit:this.state.nbpp},(annonces)=>{
			this.props.annonceCount(this.condition(props),(nb_annonces)=>{
				this.scroll(annonces,nb_annonces);
			});
		});
		
		this.setState({nump:1});

		

	}

	//Controle
	change(e,{ value, name, checked }){

		this.props.annonceControle({ [name]:value||checked });
		this.init({...this.props,annonce_controle:{...this.props.annonce_controle, [name]:value||checked }});
	}
	//=========ACTIONS
	condition(props){
		let CONDITION = {etat:"valider"};
		CONDITION = props.type?{...CONDITION,type:props.type}:CONDITION;
		CONDITION = props.annonce_controle.categorie?{...CONDITION,categorie:props.annonce_controle.categorie}:CONDITION;
		return CONDITION;
	}

	scroll(annonces,nb_annonces){
		if(
			((window.scrollY >= (document.documentElement.scrollHeight - document.documentElement.clientHeight)*0.95)||
			(document.documentElement.scrollHeight - document.documentElement.clientHeight)==0)
			&& ((this.props.annonces.length < this.props.nb_annonces)||(annonces&&nb_annonces&&annonces.length < nb_annonces))
		){
			this.props.annonceGetAddSSL(this.condition(this.props),{sort:{date:-1},skip:((this.state.nump)*this.state.nbpp),limit:this.state.nbpp},(nv_annonces)=>{
				this.scroll(nv_annonces,nb_annonces);
			});
			this.setState({nump:this.state.nump+1});
		}
	}
	
	//==========PREPARATION RENDU
	
	annonces(){//annonces = [{},...] => [<Comps/>,...]
		let { annonces, categories} = this.props;
		return annonces && annonces.length > 0 ? annonces.reduce((total, ann, i )=>{
			let categorie = categories&&categories.length>0?categories.find(cat=>cat._id==ann.categorie):null;
			let date = new Date(ann.date);
			return[...total, <ExtraitAnn 
				key = { i }
				style = {{marginTop:i!=0?20:0}}
				type = {ann.type}
				categorie = {categorie?categorie.titre:""}
				_id = { ann._id }
				titre = { ann.titre }
				description = { ann.description }
				date = { dateToFormat(date) }
				statut = { ann.statut }
				href = {hrefAnnonce(ann._id)}
				goAnnonce = { goAnnonce.bind(this,ann._id) }

			/>];}
			,[]):"";
		// return [<Comps/>,...]
	}
	
	render() {
		let { categorie, distance } = this.props.annonce_controle;

		return (
			<div style={{display:"flex", flexDirection:"column", flex:1 }}>

				<FixedLayout>
					<div style={{display:"flex", flexDirection:"column", flex:1,
						borderBottom: "1px solid rgba(150,150,150,0.5)",
						boxShadow: "0 4px 2px -2px rgba(150,150,150,0.3)"}}> 
						<div style={{display:"flex", }}>
							<Dropdown
								label = "Categorie"
								placeholder = "Categorie"
								name = "categorie"
								onChange = { this.change.bind ( this ) } 
								options = { [...this.props.categories.reduce((total,cat)=>{return cat.publier==true?[...total,{value:cat._id,text:cat.titre}]:total;},[]),{value:"",text:"Pas de categorie"} ]}
								value = { categorie?categorie:"" }
							/>
							<Dropdown
								label = "Distance"
								placeholder = "Distance"
								name = "distance"
								onChange = { this.change.bind ( this ) } 
								options = {[ {value:5,text:"0-5km"},{value:10,text:"5-10km"},{value:15,text:"10-15km"},{value:20,text:"15-20km"} ]}
								value = { distance?distance:"" }
							/>
						</div>
						<div style={{display:"flex", marginLeft:20}}>				
							<SmartMenuAnnonce style= {{}}/>
						</div>
					</div>
				</FixedLayout>
				
				
				{/*	<Comp/>   [<Comps/>,...]  			[{},...]   */}
				<div style={{display:"flex", flexDirection:"column", flex:1, marginTop:108 }}>
					{ this.annonces() }
				</div>
			</div>
		);
		
	}
}
function mapStateToProps( state ){
	return (
		{
			active_user: state.users.active_user,
			annonces: state.annonce.all,
			categories: state.categorie.all,
			active_menu_annonce: state.menu.active_menu_annonce,
			nb_annonces: state.annonce.count,
			annonce_controle: state.annonce.controle,

		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		titrePage: ACTIONS.Titre.titrePage,
		activeMenu: ACTIONS.Menu.activeMenu,
		activeMenuMonCompte: ACTIONS.Menu.activeMenuMonCompte,
		activeMenuAnnonce: ACTIONS.Menu.activeMenuAnnonce,

		annonceGetSSL: ACTIONS.Annonce.get_SSL,
		annonceGetAddSSL: ACTIONS.Annonce.getAdd_SSL,
		annonceCount: ACTIONS.Annonce.count,

		categorieGet: ACTIONS.Categorie.get,
		annonceControle: ACTIONS.Annonce.controle,

	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( ListeAnnonce );
