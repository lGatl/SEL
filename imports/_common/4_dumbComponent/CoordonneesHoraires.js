import React, {Component} from 'react';
import { Segment} from "../../_common/4_dumbComponent/_gat_ui_react";

export default class CoordonneesHoraires extends Component {



	render(){

		return(

			    <Segment textAlign="center" basic>
			    	<Segment as='h2'>{this.props.contenu.titre}</Segment>
			    	<p >
				{this.props.contenu.details.map((detail,i) => <span key={detail,i}>{detail} <br/></span>)}
				</p>
			    </Segment>

		);
	}
}
