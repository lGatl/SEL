import React, {Component} from "react";

export default class FixedLayoutMonCompte extends Component {
	render(){
		return (
			<div style = {{ display:"flex", position:"fixed", zIndex:997, width:"100%", left:0, top:96, backgroundColor:"white", paddingTop:10}}>
				<div style = {{flex:1}} className = "supprmobile" ></div>
				<div style={{display: "flex", flexDirection: "column", flex:5, marginTop:0}}>
					<div style={{display: "flex", justifyContent:"center",flex:1 }}>
						<div style={{flex:1,display:"flex", maxWidth: 800, minWidth:"40%"}}>				
							{this.props.children}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

