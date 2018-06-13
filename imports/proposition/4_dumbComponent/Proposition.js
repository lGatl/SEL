import React, {Component} from 'react';
import { Segment, Button, A } from "../../_common/4_dumbComponent/_gat_ui_react";

export default class Proposition extends Component {

	render(){
		const { prix, commentaire, date,user_prenom, user_nom, user_username, etat, type, moi  } = this.props;
		return(

			<Segment column style ={{ minHeight:150, margin:10, backgroundColor: "white"}}> 
				<div style={{flex:1, display:"flex", flexDirection:this.props.small?"column":"row"}}>
					<div style = {{minWidth:0,flex:this.props.small?3:"1 1 0", display:"flex", flexDirection: "column", justifyContent:"center", alignItems:"center", padding:5}}>
						<span >{user_prenom + " " + user_nom}</span>
						<A style = {{display: "inline-block", wordBreak: "break-word"}} href={this.props.href_posteur}>{user_username}</A>
					</div>
					<div style = {{flex:3, display:"flex"}}>
						<div style= {{flex:3, display:"flex", flexDirection: "column"}}>
							<span>etat : {etat}</span>
							<span>date : {date}</span>
							<span>prix : {prix}</span>
						</div>	
						<div style= {{flex:4, backgroundColor:"rgba(200,200,200,0.4)"}}>
							{commentaire}	
						</div>	
					</div>
				</div>
				<div style={{display:"flex"}}>
					<div style={{flex:1}}>
						
					</div>
					<div style={{flex:1, display:"flex"}}>
						{
							moi && (etat == "en attente") && this.props.accepter?
								<Button style = {{flex:1, backgroundColor:"green",color:"white"}} onClick = { this.props.accepter.bind(this) }>
								Accepter
								</Button>:""
						}
						{
							moi && etat == "en attente"&&this.props.refuser?
								<Button style={{flex:1, backgroundColor:"red",color:"white"}} onClick = { this.props.refuser.bind(this) }>
									Refuser
								</Button>:""
						}
						{(moi && type == "demande" && (etat == "accepte"))||(!moi && type == "offre" && (etat == "accepte")) && this.props.effectue ?
							<Button style = {{flex:1, backgroundColor:"aqua",color:"blue"}} onClick = { this.props.effectue.bind(this) }>
								Tache effectuée
							</Button>:""
						}
						{
							!moi && etat == "en attente"&&this.props.editer?
								<Button style={{flex:1, backgroundColor:"green",color:"white"}} onClick = { this.props.editer.bind(this) }>
									Editer
								</Button>:""
						}
						{
							( !moi&&(etat =="en attente"|| etat == "refuse"))&&this.props.supprimer?
								<Button style={{flex:1, backgroundColor:"red",color:"white"}} onClick = { this.props.supprimer.bind(this) }>
									Supprimer
								</Button>:""
						}
					</div>
					
				</div>
			</Segment>

		);
	}
}
