import React, {Component} from "react";

export default class Note extends Component {
	render(){
		return (
			<div style = {{display:"flex"}}>
				<div style = {{display:"flex"}}>
					<div style = {{height:"20px", width:"20px", borderRadius:"50%", margin:"10px", border:"1px solid black"}}></div>
					<div style = {{height:"20px", width:"20px", borderRadius:"50%", margin:"10px", border:"1px solid black"}}></div>
					<div style = {{height:"20px", width:"20px", borderRadius:"50%", margin:"10px", border:"1px solid black"}}></div>
					<div style = {{height:"20px", width:"20px", borderRadius:"50%", margin:"10px", border:"1px solid black"}}></div>
					<div style = {{height:"20px", width:"20px", borderRadius:"50%", margin:"10px", border:"1px solid black"}}></div>	
				</div>
			</div>
		);
	}
}

