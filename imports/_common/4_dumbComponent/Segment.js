import React, {Component} from "react";

export default class Segment extends Component {
	style(){
		return{

			s_segment:{
				display:"flex",
				flexDirection:this.props.row?"row":"column",
				padding:5,
				margin:5,
				borderRadius:5,
				fontSize:20,
				border: "1px solid rgba(150,150,150,0.5)",
				boxShadow: "1px 1px 1px rgba(150,150,150,0.3)",
			},
		};
	}
	render(){
			let {s_segment} = this.style();
			let {style} = this.props;
		return (
			<div style={{...s_segment, ...style}}>
				{this.props.children}
			</div>
		);
	}
}

