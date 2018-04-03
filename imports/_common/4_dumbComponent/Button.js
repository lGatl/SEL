import React, {Component} from "react";

export default class Button extends Component {
	style(){
		return{
			s_container:{
				margin:5,
				display:"flex",
				flexDirection:"column",
				alignItems:this.props.compact?"flex-start":"stretch",
			},
			s_button:{
				padding:10,
				cursor:"pointer",
				borderRadius:5,
				fontSize:20,
				border: "1px solid rgba(150,150,150,0.5)",
				boxShadow: "1px 1px 1px rgba(150,150,150,0.5)",
			},
		};
	}
	click(e){
		e.preventDefault();
		this.props.onClick();
	}
	render(){
		let {s_container, s_button} = this.style();
		return (
			<div style={{...s_container}}>
				<button onClick={this.click.bind(this)} style={{...s_button}}>
					{this.props.children}
				</button>
			</div>
			
		);
	}
}

