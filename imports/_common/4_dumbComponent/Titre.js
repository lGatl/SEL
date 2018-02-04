import React, {Component} from "react";

export default class Titre extends Component {
	render(){
		return (
			<div>
				<h1 style = {{ 
					textAlign:"center" 
				}}>
					{ this.props.children||"" }
				</h1>
				<hr/>
				<br/>
			</div>
		);
	}
}

