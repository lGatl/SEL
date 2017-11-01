import React, {Component} from 'react';
import FormulaireDInscription from '../_common/5_smartComponent/FormulaireDInscription';

export default class CreerUnCompte extends Component {

	render(){
		return(
				<FormulaireDInscription  action={"creer"} acces={"public"}></FormulaireDInscription>
			)
	}
}



