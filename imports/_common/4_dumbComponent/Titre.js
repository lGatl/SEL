import React, {Component} from "react";

export default class Titre extends Component {
	render(){
		return (
			<div>
				<h1 style = {{ 
					padding:10,
					margin: 10,
					textAlign:"center",
					color:"red",
					borderBottom:" 1px solid red"

				}}>
					{ this.props.children||"" }
				</h1>
			</div>
		);
	}
}

