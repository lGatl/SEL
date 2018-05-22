import React, {Component} from "react";

export default class Segment extends Component {
	style(){
		return{

			s_container:{
				display:"flex",
				alignItems:"center",
				padding:5,
				margin:5,
				fontSize:20,
			},
			s_label:{
				marginLeft:5,
				display:"flex",
			},
		};
	}
	change(e){
		let {label, name, onChange} = this.props;
		onChange(e,{label, name, checked:e.target.checked});
	}
	render(){
		let {s_container, s_label} = this.style();
		let {style} = this.props;
		return (
			<div style={{...s_container}}>
				<input type="checkbox" name={this.props.name} checked={this.props.checked} onChange={this.change.bind(this)}/>
				<label style={{...s_label}}>{this.props.label}</label>
			</div>
		);
	}
}

