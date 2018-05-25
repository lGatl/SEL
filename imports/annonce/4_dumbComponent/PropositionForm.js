import React, {Component} from "react";

import { Input, TextArea, Button, A } from "../../_common/4_dumbComponent/_gat_ui_react";
 
export default class PropositionForm extends Component {
	style(){
		return{
			s_colonne:{
				flex:1,
				display:"flex", 

				flexDirection:"column"
			},
			s_ligne:{
				
				display:"flex",
			},
			s_cellule:{
				display:"flex",
				justifyContent: "center",
				alignItems:"center",
				padding:8,
				flex:1,
				textAlign:"center"
			},

		};
	}
	render(){
			
		let { s_colonne, s_ligne, s_cellule } = this.style();
		let { proposition, commentaire } = this.props;
		let s_border = "1px solid rgba(150,150,150,0.3)";
		return <div style={{...s_ligne, flex:1, flexWrap:"wrap", borderBottom:s_border}}>
			<div style={{...s_colonne, borderRight:s_border}}>
				<div style={{padding:8, textAlign:"center", borderBottom:s_border}}>
					Faire une proposition
				</div>
				<div style={{...s_cellule, alignItems:"center", display:"flex"}}>
					<Input
						placeholder = "proposition"
						name = "proposition"
						value = { proposition||"" }
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
						value = { commentaire||"" }
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
					Proposer
					</Button>
				</div>
			</div>
		</div>;
	}		
}
