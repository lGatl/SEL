import React, {Component} from "react";

export default class Tableau extends Component {
	style(){
		return{

			s_table:{
				display:"flex",
				flexDirection:"column",
				margin:5,
				borderRadius:5,
				fontSize:14,				
				border:this.props.border_table?"1px solid rgba(150,150,150,0.5)": "none",
				boxSizing: "border-box"
			},
			s_head:{
				display:"flex",
				flexDirection:"column",
			},
			s_body:{
				display:"flex",
				flexDirection:"column",
			},
			s_trh:{
				
				height:45,
				display:"flex",
				alignItems:"strech",
				borderBottom:this.props.border_line?"1px solid rgba(150,150,150,0.5)": "none",
			},
			s_trb:{
				
				height:45,
				display:"flex",
				alignItems:"strech",
				borderBottom:this.props.border_line?"1px solid rgba(150,150,150,0.5)": "none",
			},
			s_th:{
				
				justifyContent:"space-around",
				padding:1,
				display:"flex",
				flex:1,
				border:this.props.border_cell?"1px solid rgba(150,150,150,0.5)": "none",
				alignItems:"center",
				textOverflow: "ellipsis" 
			},
			s_td:{
				
				justifyContent:"space-around",
				padding:1,
				display:"flex",
				alignItems:"center",
				border:this.props.border_cell?"1px solid rgba(150,150,150,0.5)": "none",
				flex:1,
				textOverflow: "ellipsis" 
			}
		};
	}
	thead(tab,i){
		let {s_head, s_trh, s_th} = this.style();
		return <thead style = {s_head} key={i}>{tab.map((ligne,j)=><tr 
			style = {{
				...s_trh
			}} key={j}>{ligne.map((cellule,k)=><th 
				style = {{
					...s_th,
					...this.props.s_col.reduce((total,col)=>col.col==k?{...total,...col.style}:total,{}),
				}} key={k}>{cellule}</th>)}</tr>)}</thead>; 
	}
	tbody(tab,i){
		let {s_body, s_trb, s_td} = this.style();
		return <tbody style = {s_body} key={i}>{tab.map((ligne,j)=><tr 
			style = {{
				...s_trb, 
				backgroundColor:this.props.ligne1sur2&&(j%2!=0)?"rgba(0,0,0,0.05)":"rgba(0,0,0,0)",
				borderBottom:this.props.border_table&&(j==tab.length-1)?"none":s_trb.borderBottom
			}} key={j}>{ligne.map((cellule,k)=><td 
				style = {{
					...s_td,
					...this.props.s_col.reduce((total,col)=>col.col==k?{...total,...col.style}:total,{}),
				}} key={k}>{cellule}</td>)}</tr>)}</tbody>;
	}
	render(){
		let {s_table} = this.style();
		
		return (
			<table style={{...s_table, ...this.props.style}}>
				{
					this.props.donnees.map((obj,i)=>{
						const key = Object.keys(obj);
						return key=="thead"?this.thead(obj[key],i):this.tbody(obj[key],i);
					})
				}
			</table>
		);
	}
}

