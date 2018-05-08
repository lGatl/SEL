import React, {Component} from 'react';
import { Segment,Button } from "../../_common/4_dumbComponent/_gat_ui_react";

export default class PropositionAnnonce extends Component {

	render(){
		const { _id, prix, commentaire, date,user_prenom, user_nom, user_username, etat, type, annonce_titre, annonce_description,annonce_image } = this.props;
		return(

			<Segment style ={{ minHeight:150, margin:10, backgroundColor: "white" , flexDirection: "row", overflow:"hidden"}}> 
				
				<div style = {{flex:2, display:"flex", cursor:"pointer"}} onClick = {this.props.routeAnnonce.bind(this)}>
					<div style = {{flex:1, background:"url('/images/1.jpg') no-repeat center",backgroundSize: "cover", display:"flex", flexDirection: "column", justifyContent:"flex-end", alignItems:"stretch",alignContent:"flex-end"}}>
						<span style = {{backgroundColor:"rgba(255,255,255,.7)",boxShadow: "0px -2px 5px 0px rgba(255,255,255,.7)",textAlign:"center",border:"none", padding:2}}>{annonce_titre}</span>	
						<span style = {{backgroundColor:"rgba(255,255,255,.7)", fontSize:15, color:"grey",border:"none",textAlign:"center"}}>{annonce_description}</span>
					</div>
				</div>
				<div style= {{flex:2, display:"flex", flexDirection: "column", justifyContent:"center",alignContent:"center"}}>
					
					<div style= {{flex:2, display:"flex", flexDirection: "column", justifyContent:"flex-start",alignContent:"center"}}>
						<span style = {{ fontSize:18}}>type : {type}</span>
						<span style = {{ fontSize:18}}>etat : {etat}</span>
					</div>
					<div style= {{flex:2, display:"flex", flexDirection: "column", justifyContent:"flex-start",alignContent:"center"}}>
						<span style = {{}}>date : {date}</span>
						<span style = {{}}>prix : {prix}</span>
					</div>
				</div>
				<div style= {{flex:5, display:"flex", flexDirection: "column"}}>
					<div style= {{flex:1}}>
						commentaire : {commentaire}	
						
					</div>	
				
					<div style={{ display:"flex"}}>
						{
							etat == "en attente"&&this.props.editer?
								<Button style={{flex:1, backgroundColor:"green",color:"white"}} onClick = { this.props.editer.bind( this, _id ) }>
									Editer
								</Button>:""
						}
						{
							( (etat =="en attente"|| etat == "refuse"))&&this.props.supprimer?
								<Button style={{flex:1, backgroundColor:"red",color:"white"}} onClick = { this.props.supprimer.bind( this, _id ) }>
									Supprimer
								</Button>:""
						}
						{
							type == "offre"&&etat=="accepte"&&this.props.effectue?
								<Button style = {{flex:1, backgroundColor:"aqua",color:"blue"}} onClick = { this.props.effectue.bind( this, _id ) }>
											Tache effectuée
								</Button>:""
						}
					</div>
					
				</div>	
				
					
				
			</Segment>

		);
	}
}
