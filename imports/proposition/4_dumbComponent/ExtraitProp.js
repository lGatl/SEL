import React, {Component} from 'react';
import { Segment,Button } from "../../_common/4_dumbComponent/_gat_ui_react";

export default class ExtraitAnn extends Component {



	render(){
		const { _id, titre, description, onClick } = this.props;
		return(

			<Segment row> 
				<div style={{flex:1}}>
					{ titre } <br/> <br/> { description }
				</div>
				<div>
					<Button width = {2} onClick = { onClick.bind( this, _id ) }>
					Supprimer
					</Button>
				</div>
			</Segment>

		);
	}
}
