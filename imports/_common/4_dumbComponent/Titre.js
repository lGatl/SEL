import React, {Component} from "react";

export default class Titre extends Component {
	render(){
		return (
			<h1 style = {{ 
				margin:0,
				padding:10,
				textAlign:"center",
				color:"red",
				borderBottom:" 1px solid red",
				...this.props.style
			}}>
				{ this.props.children||"" }
			</h1>
		);
	}
}

