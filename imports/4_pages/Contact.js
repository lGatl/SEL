import React, {Component} from "react";
import FormContact from "../_common/4_dumbComponent/FormContact.js";
import CoordonneesHoraires from "../_common/4_dumbComponent/CoordonneesHoraires.js";

import { Grid,Segment } from "semantic-ui-react";

export default class Contact extends Component {
	constructor(){
		super();
		this.infos={
			titre:"Coordonnées de la Croix Rouge de Damvillers",
			details:["6 rue des Remparts",
				"55150 DAMVILLERS",
				"Mme CHALUPKA M.L.",
				"Tél : 09 71 44 27 87",
				"Mail : mchalupka@wanadoo.fr"]
		};
		this.horaires={
			titre:"Horaires de permanence de la Croix Rouge",
			details:["Mardi de 13h30 à 16h30 et le Vendredi de 10 h à 12h."]
		};
	}
	render(){
		return (
			<div>
				<Segment.Group horizontal>
					<Segment><CoordonneesHoraires contenu={this.infos}></CoordonneesHoraires></Segment>
					<Segment><CoordonneesHoraires contenu={this.horaires}></CoordonneesHoraires></Segment>
				</Segment.Group>
				<Grid>
					<Grid.Column mobile={16} tablet={16} computer={2} only="computer"></Grid.Column>
					<Grid.Column mobile={16} tablet={16} computer={12}>
						<FormContact></FormContact>
					</Grid.Column>
					<Grid.Column mobile={16} tablet={16} computer={2} only="computer"></Grid.Column>
				</Grid>

			</div>
		);
	}
}

