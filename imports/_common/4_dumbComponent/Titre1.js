import React, {Component} from "react";

export default class Titre1 extends Component {
	render(){
		return (
			<h2 
				className = {this.props.className}

				style = {{ 
					margin:0,
					padding:5,
					textAlign:"center",
					color:"rgba(80,90,80,1)",
					...this.props.style
				}}>
				{ this.props.children||"" }
			</h2>
		);
	}
}

