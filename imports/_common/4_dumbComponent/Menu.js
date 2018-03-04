import React, {Component} from "react";

import MenuItem from "./Item";



export default class Menu extends Component {
	style(){
		return{
			s_container:{
				display:"flex",
				flexDirection:this.props.row ? "row" : "column",
				border: "1px solid rgba(150,150,150,0.5)",
				alignItems:"strecth",
			},
		};
	}
	static Item = MenuItem;

	click(e){
		e.preventDefault();
		this.props.onClick();
	}
	render(){
		let {s_container} = this.style();
		return (
			<div style={{...s_container, ...this.props.style}}>

				{this.props.children}
				
			</div>
			
		);
	}
}

