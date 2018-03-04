import React, {Component} from "react";
import FormInput from "./Input";
import FormTextArea from "./TextArea";
import FormButton from "./Button";

export default class Form extends Component {
	static Input = FormInput;
	static TextArea = FormTextArea;
	static Button = FormButton;
	render(){
		return (
			<form>
				
					{ this.props.children||"" }
		
			</form>
		);
	}
}

