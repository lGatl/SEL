import React, {Component} from "react";

export default class Popop extends Component {

	render(){
		return (
			<div style = {{
				backgroundColor:"rgba(50,50,50,0.5)",
				position:"fixed", 
				display:this.props.open?"flex":"none",
				zIndex:9999,
				top:0,
				bottom:0,
				left:0,
				right:0,
				justifyContent:"center",
				alignItems:"center",
				alignContent:"center",

				
			}}>
				<div style = {{
					backgroundColor:"white",
					minWidth:300,
					minHeight:150, 
					display:"flex", 
					justifyContent:"center", 
					alignItems:"center",
					...this.props.style
				}}>
					{this.props.children}
				</div>
			</div>
		);
	}
}

