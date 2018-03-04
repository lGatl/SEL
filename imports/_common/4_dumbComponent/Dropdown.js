import React, {Component} from "react";





export default class Dropdown extends Component {
	constructor(){
		super();
		this.state = {
			show:false,
			hover:null
		};
		this.setWrapperRef = this.setWrapperRef.bind(this);           
		this.handleClickOutside = this.handleClickOutside.bind(this);
	}
	style(){
		return{
				s_container:{
				margin:5,
				display:"flex",
				alignItems:"stretch",
				flexDirection:"column"
			},
			s_label:{
				margin:5,
				display:"flex",
			},
			s_content:{
				position:"relative",
				margin:5,
			},
			s_choice:{
				color:this.props.value.length>0?"rgba(0,0,0,1)":"rgba(0,0,0,0.5)",
				position:"relative",
				padding:5,
				borderRadius:this.state.show ? "5px 5px 0 0" : 5,
				fontSize:20,
				minHeight:32,
				border: "1px solid rgba(150,150,150,0.5)",
				borderBottom:this.state.show ? "none" : "1px solid rgba(150,150,150,0.5)",
				boxShadow: "1px 1px 1px rgba(150,150,150,0.3)",
				z_index:1
			},
			s_fleche:{
				float:"right",
				paddingLeft:5,
				paddingRight:5,
				fontSize:15,
				transform: "rotate(180deg)"
			},
			s_lignes:{
				overflow: "visible",
				position:"absolute",
				left:0,
				width:"100%",
				top:"100%",
				borderRadius:"0 0 5px 5px",
				fontSize:20,
				border: "1px solid rgba(150,150,150,0.5)",
				borderTop:"none",
				boxShadow: "1px 1px 1px rgba(150,150,150,0.3)",
				backgroundColor:"white",
				boxSizing: "border-box",
				z_index:2,
				visibility:this.state.show ? "visible" : "hidden",
			},
			s_ligne:{
				padding:5,
				borderTop:"1px solid rgba(150,150,150,0.1)",

			}
		};
	}
 componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside);
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside);
	}

	setWrapperRef(node) {
		
		this.wrapperRef = node;
	}

	handleClickOutside(event) {
		if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
			this.setState({show:false});
		}else{this.setState({show:true});}
	}

	onMouseOver(i){
		this.setState({hover:i});
	}
	onMouseOut(){
		this.setState({hover:null});
	}
	change(value,e){
		let { name, onChange} = this.props;
		this.setState({show:false});
		onChange(e,{ name, value });
	}
	
	render(){
		let {s_container, s_label, s_content, s_lignes, s_ligne, s_choice, s_fleche} = this.style();
		return (
			<div style={{s_container, ...this.props.style}}>
				<label style={s_label}>{this.props.label}</label>
				<div style={{...s_content }} ref={this.setWrapperRef}>
					<div style={{...s_choice}}>
					{this.props.value.length>0?this.props.value:this.props.placeholder}
					<span style={{...s_fleche}}> ^ </span>
					</div>
					<div style={{...s_lignes}}   >
						{
							this.props.options.map((option,i)=><div 
								key = {i} 
								style={{...s_ligne,backgroundColor:this.state.hover==i?"rgba(0,0,0,0.1)":"rgba(0,0,0,0)",}} 
								onMouseOver = { this.onMouseOver.bind(this,i) } 
								onMouseOut={ this.onMouseOut.bind(this) }
								onClick={this.change.bind(this,option.value)}>{option.text}</div>)
						}
					</div>
				</div>
			</div>
			
		);
	}
}

