import React, {Component} from "react";
import { Segment, Button, A } from "../../_common/4_dumbComponent/_gat_ui_react";

export default class ExtraitAnn extends Component {


	strip_tags(html){
		//PROCESS STRING
		if(arguments.length < 3) {
			html=html.replace(/<\/?(?!\!)[^>]*>/gi, "");
		} else {
			var allowed = arguments[1];
			var specified = eval("["+arguments[2]+"]" );
			if(allowed){
				var regex="</?(?!(" + specified.join("|") + "))\b[^>]*>";
				html=html.replace(new RegExp(regex, "gi"), "");
			} else{
				var regex="</?(" + specified.join("|") + ")\b[^>]*>";
				html=html.replace(new RegExp(regex, "gi"), "");
			}
		}
		//CHANGE NAME TO CLEAN JUST BECAUSE  
		var clean_string = html;
		//RETURN THE CLEAN STRING
		return clean_string;
	}
	render(){
		const {  titre, description } = this.props;

		return(

			<Segment row onClick={this.props.goActualite.bind(this)} style={{height:133, marginBottom:20, cursor:"pointer"}}> 
				<img src="/images/1.jpg" alt="photo actualite" style={{
					width: 133,
					maxHeight:"100%" 
				}}/>
				<div style={{display:"flex", marginLeft:"10%", flexDirection:"column", flex:1}}>
					
					<div style={{
						fontSize:16, 
						fontWeight:400,
						marginTop:10,
						marginBottom:20
					}}>
						<A href = { this.props.href }>{ titre }</A>
					</div>
					<div style={{fontSize:18, color:"grey", flex:1, overflow:"hidden" }}>
						{ this.strip_tags(description) }
					</div>
					<div style={{
						fontSize:14,
						marginBottom:10
					}}>
						
					</div>
				</div>
			</Segment>

		);
	}
}
