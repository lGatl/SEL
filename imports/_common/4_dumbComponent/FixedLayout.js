import React, {Component} from "react";

export default class FixedLayout extends Component {
	render(){
		return (
			<div style = {{ display:"flex", position:"fixed", zIndex:980, width:"100%", left:0, top:0, backgroundColor:"white", paddingTop:106, ...this.props.style}}>
				
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
							maxWidth: 800,
							minWidth:"40%",
						}}>	
							{this.props.children}
						</div>
					</div>
				</div>
				<div className = "supprmobile" style={{flex:1}}></div>
			</div>
		);
	}
}

