import React, {Component} from "react";

import { Grid } from "semantic-ui-react";

import Titre from "../_common/4_dumbComponent/Titre";
import FormActu from "../article/5_smartComponent/FormActu";
import SmartActualites from "../article/5_smartComponent/SmartActualites";

export default class Actualite extends Component {

	render(){

		return (
			<div>
				<Titre> Actualites </Titre>
				<SmartActualites/>
				<FormActu/>
			</div>
		);
	}
}


