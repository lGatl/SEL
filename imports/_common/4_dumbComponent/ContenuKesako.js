import React,{Component} from "react";
import {   Titre} from "../../_common/4_dumbComponent/_gat_ui_react";

/*Pour la page kesako*/
export default class ContenuKesako extends Component {
	render(){
		return <div style={{...this.props.style}}>
			<div style ={{flex:1,display:"flex", flexDirection:"column", padding:10}}>
				<p style={{textAlign:"center"}} >
						Le principe d’un SEL (Système d’Echange Local) est basé sur le constat que tout individu possède <br/>des compétences,  des moyens ou/et du temps qu’il peut échanger avec les autres sans utiliser d’euros.<br/>
				Le SEL est une association de personnes qui mettent des services, des savoirs et des biens à la disposition des unes et des autres. <br/>
				Les échanges sont valorisés au moyen d’un unité d’échange choisie par les membres du SEL.
				</p>

				<div className="ui grid middle centered">
					<a href="/pdf/cahier_des_charges_SEL_-_Feuille_1.pdf" target="_blank" > RÈGLEMENT INTÉRIEUR</a>
					<a href="/pdf/cahier_des_charges_SEL_-_Feuille_1.pdf" target="_blank" > CHARTE</a>
					<a href="/pdf/cahier_des_charges_SEL_-_Feuille_1.pdf" target="_blank" > FICHE D'INSCRIPTION</a>
				</div>

			</div>
			<br/><br/>
		</div>;
	}
}



