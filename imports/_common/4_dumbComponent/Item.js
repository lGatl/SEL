import React, {Component} from "react";

export default class Item extends Component {
	constructor(){
		super();
		this.state = {hover:false};
	}
	onMouseOver(){
		this.setState({hover:true});
	}
	onMouseOut(){
		this.setState({hover:false});
	}
	//================CSS======================
	style(){

		return{

			s_item:{
				display:"flex",
				alignItems: "center",
				textDecoration:"none",
				color: "inherit",
				width:"auto",
				minHeight: 40,
				paddingLeft:10,
				paddingRight:10,
				cursor:"pointer",
				backgroundColor:this.state.hover||this.props.active?this.props.active?"rgba(0,0,0,0.1)":"rgba(255,255,255,0.5)":"rgba(255,255,255,0)",
				borderleft: "1px solid rgba(150,150,150,0.5)",
				borderRight: "1px solid rgba(150,150,150,0.5)",
				boxShadow: "1px 1px 1px rgba(150,150,150,0.3)",
			},
		};
	}
	render(){
		let {s_item} = this.style();
		let {style} = this.props;
		return (
			
			<a style={{...s_item, ...style}} href="#" onMouseOver = { this.onMouseOver.bind(this) } onMouseOut={ this.onMouseOut.bind(this) } onClick = {this.props.onClick?this.props.onClick.bind(this):()=>{}} >
				{this.props.children}
			</a>

		);
	}
}

