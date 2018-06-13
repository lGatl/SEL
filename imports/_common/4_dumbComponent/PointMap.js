import React, { Component } from "react";

export default class PointMap extends Component {
	constructor(){
		super();
		this.state = {over:false};
	}
	mouseOut() {
		this.setState({over: false});
	}
	
	mouseOver() {
		this.setState({over: true});
	}

	render(){
		let { text } = this.props;
		let { over } = this.state;
		return <div style={{position:"relative"}} >
			<div 
				onMouseOut={this.mouseOut.bind(this)} onMouseOver={this.mouseOver.bind(this)}
				style={{
					position:"absolute",
					width:20, 
					height:20,
					border:"transparent solid blue", 
					display:"flex", 
					alignItems:"center",
					justifyContent:"center", 
					backgroundColor:"red", 
					boxShadow: "2px 1px 1px rgba(100,50,50,0.5)",
					borderRadius:"50%"}}>
			</div>
			<div style={{
				pointerEvents:"none",
				position:"absolute",
				left:over?-6:10,
				top:over?-3:10,
				width:1,
				height:1,
				border:"1px solid #069",
				borderColor:" rgba(80,90,80,0.8) transparent transparent transparent ",
				borderWidth:over?15:0,
				display:"flex", 
				alignItems:"center",
				justifyContent:"center", 
				transition:"0.5s",
				zIndex:25
			}}>
			</div>
			<div style={{
				pointerEvents:"none",
				position:"absolute",
				overflow:"hidden",
				left:over?-40:10,
				top:over?-43:10,
				width:over?100:0, 
				height:over?40:0,  
				display:"flex", 
				alignItems:"center",
				justifyContent:"center", 
				fontWeight:400,
				color:"white",
				boxShadow: "3px 3px 4px 0px rgba(50,50,50,0.8)",
				backgroundColor:"rgba(60,70,60,0.8)", 
				borderRadius:"10px 10px 10px 10px",
				transition:"0.5s",
				zIndex:20
			}}>
				{text}
			</div>		
		</div>;
	} 
}



