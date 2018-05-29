import React, {Component} from "react";

export default class Note extends Component {
	constructor(){
		super();
		this.state = {temp:0};
	}
	style(){
		return {
			full:{
				color:"yellow",
				textShadow: "1px 1px 2px grey",
			},
			empty:{
				color:"grey",
				textShadow: "1px 1px 2px grey",
			},
			over:{
				color:"orange",
				textShadow: "1px 1px 2px grey",
			}
		};
	}
	over(a){
		this.setState({temp:a});
	}
	out(){
		this.setState({temp:0});
	}
	click(){

		this.props.onClick?this.props.onClick(this,this.state.temp):()=>{};
	}
	render(){
		let { full, empty, over } = this.style();
		let { note } = this.props;
		let { temp } = this.state;
		return (
			<div style = {{display:"flex"}}>
				<div style = {{display:"flex", cursor:this.props.onClick?"pointer":"default"}} onClick = {this.click.bind(this)}>
					{[1,2,3,4,5].map(nb=><div key={nb} 
						onMouseOut={this.props.onClick?this.out.bind(this):()=>{}} 
						onMouseOver={this.props.onClick?this.over.bind(this,nb):()=>{}} 
						style = {temp>(nb-.5)?over:note>(nb-.5)?full:empty}>★</div>)}
				</div>
			</div>
		);
	}
}

//★
//☆
