import React, {Component} from 'react';
import { Segment, Grid } from 'semantic-ui-react';

export default class ExtraitActu extends Component {



	render(){
		const { _id, titre, description, onClick } = this.props;
		return(

			<Segment> 
				<Grid>
					<Grid.Column width = {14}>
						{ titre } <br/> <br/> { description }
					</Grid.Column>
					<Grid.Column width = {2} onClick = { onClick.bind( this, _id ) }>
						Supprimer
					</Grid.Column>
				</Grid> 
			</Segment>

		);
	}
}
