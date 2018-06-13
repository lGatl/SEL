import React, {Component} from "react";

export default class Carrousel extends Component {
	constructor(){
		super();
		this.state = {
			page:0
		};
	}
	style(){
		return{
			rond:{
				userSelect:"none",
				display:"flex",
				alignItems:"center",
				justifyContent:"center",
				cursor:"pointer",
				fontSize:30,
				width:60,
				height:60,
				
				borderRadius:"50%",
				border: "1px solid rgba(150,150,150,0.5)",
				boxShadow: "1px 1px 1px rgba(150,150,150,0.3)",
			},
			short:{
				flex:1,
			},
			avant:{

			},
			milieu:{

			},
			apres:{

			}
		};
	}
	click(a){
		let { page } = this.state;
		if(page+a<0){
			this.setState({page:2});
		}else if(page+a>2){
			this.setState({page:0});
		}else{
			this.setState({page:page+a});
		}
	}
	render(){
		let { rond, avant, milieu, apres, short } = this.style();
		let { tableau } = this.props;
		let { page } = this.state;
		return (
			
			<div style={{flex:1,display:"flex", alignItems:"stretch",flexDirection:"column"}}>
				
				<div style={{display:"flex",position:"relative",alignItems:"center", height:210, overflow:"hidden", boxShadow:"-8px 0 8px -10px #000000,8px 0 8px -10px #000000"}}>
					<div style={{position:"absolute", width:"300%",left:page==0?0:page==1?"-100%":"-200%", display:"flex", transition:"0.5s" }}>
						<div style={{...short,...avant}}>
							{tableau&&tableau.length>0?tableau[0]:""}
						</div>
						<div style={{...short,...milieu}}>
							{tableau&&tableau.length>1?tableau[1]:""}
						</div>
						<div style={{...short,...apres}}>
							{tableau&&tableau.length>2?tableau[2]:""}
						</div>
						
					</div>
					
				</div>
				<div style={{display:"flex", justifyContent:"center"}}>
					<div onClick={this.click.bind(this,-1)}style={{...rond,marginRight:20}}><span>{"<"}</span></div>
					<div onClick={this.click.bind(this,1)}style={{...rond,marginLeft:20}}><span>{">"}</span></div>
				</div>
				
			</div>
		);
	}
}

