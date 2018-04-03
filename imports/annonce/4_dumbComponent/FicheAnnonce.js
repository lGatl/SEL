import React, {Component} from "react";
import { Input, TextArea, Button } from "../../_common/4_dumbComponent/_gat_ui_react";

export default class FicheAnnonce extends Component {
	style(){
		return{
			s_container:{
				margin:100,
				flex:1,
				display:"flex", 
				flexDirection:"column",
				border:"1px solid rgba(150,150,150,0.3)",
				boxShadow: "1px 1px 1px rgba(150,150,150,0.3)",
				borderRadius:5,
				boxSizing: "content-box",
				overflow:"hidden"
			},
			s_titre:{
				flex:1,
				fontWeight:400,
				fontSize:18,
				padding:10,
				display:"flex", 
				flexDirection:"column",
				textAlign:"center",
				backgroundColor:"red",
				color:"white"
			},
			s_colonne:{
				flex:1,
				display:"flex", 
				flexDirection:"column"
			},
			s_ligne:{
				display:"flex"
			},
			s_cellule:{
				padding:8,
				flex:1,
				textAlign:"center"
			},

		};
	}
	render(){
		let { s_container, s_titre, s_colonne, s_ligne, s_cellule } = this.style();
		let { categorie, date, date_de_fin, identifiant,email_display, email, telephone_display, telephone,adresse_display, adresse } = this.props;
		let s_border = "1px solid rgba(150,150,150,0.3)";
		return (
			<div style={{...s_container}}>
				<div style={{...s_titre}}>
						Informations de l'annonce
				</div>
				<div style={{...s_ligne}}>
					<div style={{...s_colonne, borderRight:"1px solid rgba(150,150,150,0.3)"}}>
						<div style={{...s_cellule,padding:0,display:"flex", height:300,justifyContent:"center" }}>
							<div style={{...s_cellule,padding:0,maxWidth:500, height:"100%", background:"url('/images/1.jpg') no-repeat center", backgroundSize: "cover"}}>
								
							</div>
						</div>
						<div style={{...s_ligne, borderTop:s_border}}>
							<div style={{...s_cellule, borderRight:s_border}}>
								Categorie
							</div>
							<div style={{...s_cellule}}>
								{ categorie }
							</div>
						</div>
						<div style={{...s_ligne, borderTop:s_border}}>
							<div style={{...s_cellule, borderRight:s_border}}>
								Date de début
							</div>
							<div style={{...s_cellule}}>
								{ date }
							</div>
						</div>
						<div style={{...s_ligne, borderTop:s_border}}>
							<div style={{...s_cellule, borderRight:s_border}}>
								Date de fin
							</div>
							<div style={{...s_cellule}}>
								{ date_de_fin }
							</div>
						</div>
						<div style={{...s_ligne, borderTop:s_border}}>
							<div style={{...s_cellule, borderRight:s_border}}>
								Statut
							</div>
							<div style={{...s_cellule}}>
								
							</div>
						</div>
					</div>
					<div style={{...s_colonne,alignItems:"center",justifyContent:"center"}}>
						<span style = {{ fontWeight:400, fontSize:20, marginTop:10,marginBottom:10 }}>{ this.props.titre }</span>
						<span style = {{ fontWeight:300, fontSize:16 }}>{ this.props.description }</span>
					</div>
				</div>
				<div style={{...s_titre}}>
						Informations séliste
				</div>
				<div style={{...s_ligne}}>
					<div style={{...s_cellule, borderRight:s_border}}>
						Identifiant
					</div>
					<div style={{...s_cellule}}>
						{ identifiant }
					</div>
				</div>
				{email_display?<div style={{...s_ligne, borderTop:s_border}}>
					<div style={{...s_cellule, borderRight:s_border}}>
						email
					</div>
					<div style={{...s_cellule}}>
						{ email }
					</div>
				</div>:""}
				{telephone_display?<div style={{...s_ligne, borderTop:s_border}}>
					<div style={{...s_cellule, borderRight:s_border}}>
						Telephone
					</div>
					<div style={{...s_cellule}}>
						{ telephone }
					</div>
				</div>:""}
				{adresse_display?<div style={{...s_ligne, borderTop:s_border}}>
					<div style={{...s_cellule, borderRight:s_border}}>
						Adresse
					</div>
					<div style={{...s_cellule}}>
						{ adresse }
					</div>
				</div>:""}
				<div style={{...s_titre}}>
						Proposition
				</div>
				<div style={{...s_ligne}}>
					<div style={{...s_colonne, borderRight:s_border}}>
						<div style={{padding:8, textAlign:"center", borderBottom:s_border}}>
							Faire une proposition
						</div>
						<div style={{...s_cellule, alignItems:"center", display:"flex"}}>
							<Input
								placeholder = "proposition"
								name = "proposition"
								value = { this.props.proposition||"" }
								onChange = { this.props.change.bind( this ) } 
							/>
						</div>
					</div>
					<div style={{...s_colonne, borderRight:s_border}}>
						<div style={{padding:8, textAlign:"center", borderBottom:s_border}}>
							Commentaire
						</div>
						<div style={{...s_cellule, alignItems:"center", display:"flex"}}>
							<TextArea
								placeholder = "commentaire"
								name = "commentaire"
								value = { this.props.commentaire||"" }
								onChange = { this.props.change.bind( this ) } 
							/>
						</div>
					</div>
					<div style={{...s_colonne}}>
						<div style={{padding:8, textAlign:"center", borderBottom:s_border}}>
							Validation
						</div>
						<div style={{...s_cellule, alignItems:"center", display:"flex", justifyContent:"center"}}>
							<Button
								onClick = { this.props.propositionAdd.bind( this ) }
							>
							Sauvegarder
							</Button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

