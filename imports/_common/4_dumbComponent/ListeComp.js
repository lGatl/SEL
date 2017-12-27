import React, {Component} from 'react';
import { Segment } from 'semantic-ui-react';

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
