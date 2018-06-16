import React, {Component} from "react";

export default class FixedLayoutSA extends Component {
	render(){
		return (
			<div style={{display: "flex", flex:1, flexWrap:"wrap", position:"fixed", zIndex:980, width:"100%", left:0, top:95, backgroundColor:"white", ...this.props.style}}>
				<div style={{
					flex:4,
					display: "flex",
					justifyContent:"center",
					flexDirection: "column",
				}}>
					<div className = "supprmobile" style = {{width:"100%", height:40}}></div>
					<div style={{
						flex:1,
						display: "flex",
						justifyContent:"center",
					}}>
						<div style={{
							flex:1,
							display: "flex",
							maxWidth: 1250,
							minWidth:"40%",
						}}>	
							<div style={{flex:1,display:"flex"}}>{this.props.children}</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

