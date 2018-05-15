import React, {Component} from 'react';
import { Segment, Button, A } from "../../_common/4_dumbComponent/_gat_ui_react";

export default class ExtraitAnn extends Component {



	render(){
		const {  titre, description } = this.props;

		return(

			<Segment row style={{minHeight:100, marginBottom:20}}> 
				<img src="/images/1.jpg" alt="photo annonce" style={{
					width: 133,
					maxHeight:"100%" 
				}}/>
				<div style={{display:"flex", marginLeft:"10%", flexDirection:"column", flex:1}}>
					
					<div style={{
						fontSize:16, 
						fontWeight:400,
						marginTop:10,
						marginBottom:20
					}}>
						<A href = { this.props.href }>{ titre }</A>
					</div>
					<div style={{fontSize:18, color:"grey", flex:1}}>
						{ description }
					</div>
					<div style={{
						fontSize:14,
						marginBottom:10
					}}>
						
					</div>
				</div>
			</Segment>

		);
	}
}
