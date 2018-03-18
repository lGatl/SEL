import React, {Component} from 'react';
import { Segment,Button } from "../../_common/4_dumbComponent/_gat_ui_react";

export default class ExtraitAnn extends Component {



	render(){
		const { _id, type, categorie, titre, description, date, onClick } = this.props;

		return(

			<Segment row style={{height:200, marginBottom:20}}> 
				<img src="/images/1.jpg" alt="photo annonce"/>
				<div style={{display:"flex", marginLeft:"10%", flexDirection:"column", flex:1}}>
					<div style={{
						fontSize:16,
						marginTop:5,
						marginBottom:5

					}}>
						{ type } - { categorie }
					</div>
					<div style={{
						fontSize:22, 
						fontWeight:400,
						marginBottom:20
					}}>
						{ titre }
					</div>
					<div style={{fontSize:18, color:"grey", flex:1}}>
						{ description }
					</div>
					<div style={{
						fontSize:16,
						marginBottom:10
					}}>
						{ date }
					</div>
				</div>
				<div>
				</div>
			</Segment>

		);
	}
}
