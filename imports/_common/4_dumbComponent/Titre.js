import React, {Component} from "react";
import { Segment } from "semantic-ui-react";



export default class Titre extends Component {
	render(){
		return (
			<Segment basic >
				<h1 style = {{ 
					textAlign:"center" 
				}}>
					{ this.props.children||"" }
				</h1>
				<hr/>
				<br/>
			</Segment>
		);
	}
}

