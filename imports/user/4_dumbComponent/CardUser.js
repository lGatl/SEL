import React, {Component} from "react";

import { Segment, Button, A } from "../../_common/4_dumbComponent/_gat_ui_react";

export default class CardUser extends Component {
	style(){
		return{
			champs:{display:"flex",flex:1, alignItems:"center"},
			s_span:{marginRight:5}
		};
	}
	render(){
		let { champs, s_span } = this.style();
		let { username, nom, prenom, telephone, adresse, note, categories , email,date_val_resp, edit} = this.props;

		return (
			<Segment style={{overflow:"hidden", ...this.props.style, height:edit?"":300}}>
				<div style={{display:"flex"}}>
					<div style={{width:80, height:80, background:"url('/images/1.jpg') no-repeat center", backgroundSize: "cover", margin:10}}></div>
					<div style={{display:"flex", flex:1,flexDirection:"column"}}> 
						
							
						{edit?<A href={this.props.href_user}>{prenom}</A>:<span style={{margin:5}}>{prenom}</span>}
						{edit?<A href={this.props.href_user}>{nom}</A>:<span style={{margin:5}}>{nom}</span>}
						{edit?<A href={this.props.href_user}>{username}</A>:<span style={{margin:5}}>{username}</span>}
							
							
					
						<span>{note}</span> 
					</div>
				</div>
				<div style={{display:"flex",flex:1, alignItems:"flex-start"}}><span> Categories :</span> {categories}</div>
				<div style={{display:"flex",flexDirection:"column", padding:10, borderTop:"1px solid rgba(150,150,150,0.5)"}}>
					<div style={{...champs}}><span style={{...s_span}}> courriel :</span> {email}</div>
					<div style={{...champs}}><span style={{...s_span}}> telephone :</span> {telephone}</div>
					<div style={{...champs}}><span style={{...s_span}}> adresse : </span>{adresse}</div>
				</div>
				<div style={{display:"flex",flexDirection:"column", padding:10}}>
					
				</div>
				{this.props.editer?<Button onClick={this.props.editer.bind(this)}>Editer</Button>:""}
			</Segment>
		);
	}
}

//<div style={{...champs}}><span style={{...s_span}}>Date de validité de votre responsabilité civil :</span> {date_val_resp} </div>
