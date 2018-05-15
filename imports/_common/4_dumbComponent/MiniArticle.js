import React, {Component} from "react";

export default class MiniArticle extends Component {
	
	render(){
		let {image, titre, lien, i} = this.props;
		return (
			<div key={i} style={{margin:5, cursor:"pointer", display:"flex", flexDirection:"column"}} onClick = {this.props.lien.bind(this)}>
				<img src={image} alt="photo article" style={{width:"100%"}}/>
				<span style={{padding:5,textAlign:"center"}}>{titre}</span>

			</div>
		);
	}
}

