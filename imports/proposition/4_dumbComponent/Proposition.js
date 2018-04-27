import React, {Component} from 'react';
import { Segment,Button } from "../../_common/4_dumbComponent/_gat_ui_react";

export default class Proposition extends Component {


	onClick(){

	}

	render(){
		console.log(this.props);
		const { _id, prix, commentaire, date,user_prenom, user_nom, user_username, etat  } = this.props;
		return(

			<Segment column style ={{ minHeight:150, margin:10, backgroundColor: "white"}}> 
				<div style={{flex:1, display:"flex"}}>
					<div style= {{flex:2, display:"flex", flexDirection: "column"}}>
						<span>{user_prenom + " " + user_nom}</span>
						<span>{user_username}</span>
					</div>
					<div style= {{flex:2, display:"flex", flexDirection: "column"}}>
						<span>etat : {etat}</span>
						<span>date : {date}</span>
						<span>prix : {prix}</span>
					</div>	
					<div style= {{flex:5}}>
							commentaire : {commentaire}	
							
					</div>	
				</div>
				<div style={{display:"flex"}}>
					<div style={{flex:1}}>
						
					</div>
					<div style={{flex:1, display:"flex"}}>
						<Button style={{flex:1, backgroundColor:"green",color:"white"}} onClick = { this.onClick.bind( this, _id ) }>
							Accepter
						</Button>
						<Button style={{flex:1, backgroundColor:"red",color:"white"}} onClick = { this.onClick.bind( this, _id ) }>
							Refuser
						</Button>
					</div>
					
				</div>
			</Segment>

		);
	}
}
