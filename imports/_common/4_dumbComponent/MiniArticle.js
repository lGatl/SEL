import React, {Component} from "react";
import { Segment } from "../../_common/4_dumbComponent/_gat_ui_react";


export default class MiniArticle extends Component {
	
	render(){
		let {image, titre, lien, i} = this.props;
		return (
			<Segment key={i} style={{margin:5, cursor:"pointer", overflow:"hidden"}} onClick = {this.props.lien.bind(this)}>
				<img src={image} alt="photo article" style={{width:"100%"}}/>
				<span style={{padding:5,textAlign:"center"}}>{titre}</span>

			</Segment>
		);
	}
}

