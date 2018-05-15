import React, {Component} from "react";

export default class TextArea extends Component {
	style(){
		return{
			s_container:{
				margin:5,
				display:"flex",
				alignItems:this.props.compact?"flex-start":"stretch",
				flexDirection:"column"
			},
			s_label:{
				margin:5,
				display:"flex",
			},
			s_textarea:{
				padding:5,
				border: "1px solid rgba(150,150,150,0.5)",
				borderRadius:5,
				fontSize:14,
				boxShadow: "1px 1px 1px rgba(150,150,150,0.3)",
			},
		};
	}
	change(e){
		let {label, name, onChange} = this.props;
		onChange(e,{label, name, value:e.target.value});
	}
	render(){
		let {label, name, value, placeholder} = this.props;
		let {s_container, s_label, s_textarea} = this.style();
		return (
			<div style={{...s_container,...this.props.style}}>
				<label style={s_label}>{label}</label>
				<textarea 
					placeholder={placeholder}
					name={name}
					value={value}
					onChange={this.change.bind(this)}
					style={s_textarea}
				/>
				
			</div>
		);
	}
}

