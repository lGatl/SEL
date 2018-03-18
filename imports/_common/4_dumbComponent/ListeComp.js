import React, {Component} from 'react';
import { Segment } from "../../_common/4_dumbComponent/_gat_ui_react";

export default class ListeComp extends Component {



	render(){
		return(

			<div>
				{this.props.donnees}
			</div>

		);
	}
}
