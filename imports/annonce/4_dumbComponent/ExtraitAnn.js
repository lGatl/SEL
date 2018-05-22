import React, {Component} from 'react';
import { Segment, Button, A } from "../../_common/4_dumbComponent/_gat_ui_react";

export default class ExtraitAnn extends Component {



	render(){
		const { _id, type, categorie, titre, description, date, statut, montree } = this.props;

		return(

			<Segment row style={{height:200,...this.props.style}} > 
				<img src="/images/1.jpg" draggable="false" alt="photo annonce" style = {{cursor:"pointer"}} onClick={this.props.goAnnonce.bind(this)}/>
				<div style = {{display: "flex", flex:2, flexDirection:"column", justifyContent:"center", alignItems:"center", 
					cursor:"pointer" }} 
				onClick={this.props.nb_prop && (statut == "en attente"||statut == "en cours")?this.props.montrerPropositions.bind(this):this.props.goAnnonce.bind(this)}>
					{
						this.props.nb_prop && statut == "en attente"?<label style = {{
							textAlign:"center",
							fontSize:14,
							margin:"5%",
							cursor:"pointer"
						}} >Nombre de propositions : </label>:""
					}
					{
						this.props.nb_prop && statut == "en attente"?<label 
							style = {{
								cursor: "pointer",
								padding:20, 
								borderRadius:5,
								fontSize:20,
								backgroundColor: "rgba(150,150,150,0.5)",
								boxShadow: "1px 1px 1px rgba(150,150,150,0.3)",}} >{this.props.nb_prop}</label>:""
					}
					{
						this.props.nb_prop && statut == "en cours"?<label style = {{
							textAlign:"center",
							fontSize:14,
							margin:"5%",
							cursor:"pointer"
						}} >Proposition acceptée : </label>:""
					}
					{
						this.props.nb_prop && statut == "en cours"?<label 
							style = {{
								cursor: "pointer",
								padding:10, 
								borderRadius:5,
								fontSize:16,
								backgroundColor: "rgba(150,150,150,0.5)",
								boxShadow: "1px 1px 1px rgba(150,150,150,0.3)",}} ><span style = {{float:"right", transform:montree?"rotate(90deg)":"rotate(0deg)",transition:"0.5s"}}>></span></label>:""
					}
				</div>
				<div style={{display:"flex", flexDirection:"column", flex:7, cursor:"pointer"}} onClick={this.props.goAnnonce.bind(this)}>
					<div style={{
						fontSize:16,
						marginTop:5,
						marginBottom:5
						
					}}>
						{ type } - { categorie }
					</div>
					
					<A 
						href={this.props.href} 
						style={{
							fontSize:18,
							fontWeight:400,
							marginBottom:20
						}}>{ titre } </A>
					
					<div style={{fontSize:14, color:"grey", flex:1}}>
						{ description }
					</div>
					<div style={{
						fontSize:14,
						marginBottom:10
					}}>
						{ date }
					</div>
				</div>
				<div style={{display:"flex", flexDirection:"column", width:40}}>
					<div style={{position:"absolute",float:"right", width:30,height:30, 
						backgroundColor:statut == "en attente"?"green":statut == "en cours"?"orange":"red",
						margin:5,borderRadius:"50%"}}></div>
				</div>
				<div>
				</div>
			</Segment>

		);
	}
}
