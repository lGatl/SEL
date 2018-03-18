import React, {Component} from "react";

import { Segment } from "../../_common/4_dumbComponent/_gat_ui_react";

export default class CardUser extends Component {
	render(){
		let { nom, prenom, telephone, adresse, note, categories , email} = this.props;

		return (
			<Segment style={{overflow:"hidden"}}>
				<div style={{display:"flex",flexDirection:"column"}}>
					<div style={{display:"flex"}}>
						<div alt="user image" style={{width:80, height:80, background:"url('/images/1.jpg') no-repeat center", backgroundSize: "cover", margin:10}}></div>
						<div style={{display:"flex", flex:1,flexDirection:"column"}}> 
							<div style={{display:"flex", }}>
								<span style={{margin:5}}>{prenom}</span>
								<span style={{margin:5}}>{nom}</span>
							</div>
							<span>{note}</span> 
						</div>
					</div>
					<ul>
						Categories : <br/>
						{categories.map((categorie,i)=><li key={i}>{categorie}</li>)}
					</ul>
					<div style={{display:"flex",flexDirection:"column", padding:10, borderTop:"1px solid rgba(150,150,150,0.5)"}}>
						<div>courriel : {email}</div>
						<div>telephone : {telephone}</div>
						<div>adresse : {adresse}</div>
					</div>
				</div>

			</Segment>
		);
	}
}

