import React, {Component} from 'react';
import { Segment } from "../../_common/4_dumbComponent/_gat_ui_react";

export default class ListeComp extends Component {



	render(){
		const LISTE = this.props.donnees.map(( donn )=> donn);
		return(

			<Segment>
				{LISTE}
			</Segment>

		);
	}
}
