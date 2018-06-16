import React, {Component} from "react";

export default class Banderole extends Component {
	render(){
		return (
			<div className = {this.props.className} style={{backgroundColor:"red", color:"white", display:"flex", justifyContent:"center",alignItems:"center", fontSize:25, ...this.props.style}}
			><span>SEL</span></div>
		);
	}
}

