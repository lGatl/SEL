import React, {Component} from "react";

import { Grid } from "semantic-ui-react";

import Titre from "../_common/4_dumbComponent/Titre";
import SmartAnnonce from "../annonce/5_smartComponent/SmartAnnonce";
import FormAnnonce from "../annonce/5_smartComponent/FormAnnonce";
export default class Annonce extends Component {

	render(){

		return (
			<div>
				<Titre> Annonce </Titre>
				<SmartAnnonce/>
				<FormAnnonce/>
			</div>
		);
	}
}


