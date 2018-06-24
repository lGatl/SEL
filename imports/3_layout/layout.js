import React 								from "react";
import { Provider } 							from "react-redux";
import { composeWithDevTools } 			from "redux-devtools-extension";
import { createStore, applyMiddleware } 	from "redux";
import ReduxPromise 						from "redux-promise";

import reducers from "../7_reducers";

import { Titre } from "../_common/4_dumbComponent/_gat_ui_react";

import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import "react-s-alert/dist/s-alert-css-effects/scale.css";
import "react-s-alert/dist/s-alert-css-effects/bouncyflip.css";
import "react-s-alert/dist/s-alert-css-effects/flip.css";
import "react-s-alert/dist/s-alert-css-effects/genie.css";
import "react-s-alert/dist/s-alert-css-effects/jelly.css";
import "react-s-alert/dist/s-alert-css-effects/stackslide.css";
import Alert from "react-s-alert";

import Banderole from "../_common/4_dumbComponent/Banderole";
import SmartMenu from "../_common/5_smartComponent/SmartMenu";
import SmartMenuSmall from "../_common/5_smartComponent/SmartMenuSmall";
import SmartMenuMonCompte from "../_common/5_smartComponent/SmartMenuMonCompte";
import TitrePage from "../_common/5_smartComponent/TitrePage";

import Footer from "../_common/4_dumbComponent/Footer";
import InitState from "../_common/5_smartComponent/InitState";
import LastArticles from "../_common/5_smartComponent/LastArticles";
import Resize from "../_common/5_smartComponent/Resize";

import IsLogged from "../user/5_smartComponent/IsLogged";

/*import Alert from 'react-s-alert';*/
/*import 'react-s-alert/dist/s-alert-default.css';*/
var store={};

const composeEnhancers = composeWithDevTools({});

store = createStore(reducers,composeEnhancers(
	applyMiddleware(ReduxPromise)
));


export const Layout = ({ content }) => {

	return(
		<Provider store={store}>	
			<div style={{
				display: "flex",
				minHeight: "100vh",
				flexDirection: "column"
			}}>
				<InitState/>
				<Resize/>
				<Banderole className = "supprmobile" style = {{position:"fixed",left:0,right:0,top:0,height:40,zIndex:1000}}/>
				<SmartMenu className = "supprmobile" style = {{position:"fixed",left:0,right:0,top:40, zIndex:999}}/>
				<SmartMenuSmall className = "supprbig" style = {{position:"fixed",left:0,right:0,top:0, zIndex:999}}/>
				<TitrePage className = "supprmobile" style = {{position:"fixed",left:0,width:"80%",top:80,zIndex:990}} />
				<TitrePage className = "supprbig" style = {{position:"fixed",left:0,right:0,top:40,zIndex:990}} />
				<div className = "supprmobile" 
					style={{
						position:"fixed",right:0, top:100,zIndex:997,
						width:"20%",
						display: "flex",
						flexDirection: "column",
						
					}}>		
					<LastArticles/>
				</div>
				<div className = "supprmobile" style = {{height:40,width:"100%"}}></div>
				<div style={{display: "flex", flex:1, flexWrap:"wrap",marginTop:105}}>
					<div style={{
						flex:4,
						display: "flex",
						justifyContent:"center",
						flexDirection: "column",

					}}>
						
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
								<IsLogged style={{flex:1,display:"flex"}}>{content}</IsLogged>
							</div>
						</div>
					</div>
					<div className = "supprmobile" style={{flex:1}}></div>
				</div>

				<Alert stack={{limit: 3}} effect='slide' timeout={2500} position='bottom-right'/>
				<Footer style = {{flex:"none"}}/>
			</div>
		</Provider>
	);
};
export const LayoutSA = ({ content }) => {

	return(
		<Provider store={store}>	
			<div style={{
				display: "flex",
				minHeight: "100vh",
				flexDirection: "column"
			}}>
				<InitState/>
				<Resize/>
				
				<Banderole className = "supprmobile" style = {{position:"fixed",left:0,right:0,top:0,height:40,zIndex:1000}}/>
				<SmartMenu className = "supprsmallmenu" style = {{position:"fixed",left:0,right:0,top:40, zIndex:999}}/>
				<SmartMenuSmall className = "supprbigmenu" style = {{position:"fixed",left:0,right:0,top:0, zIndex:999}}/>
				<TitrePage className = "supprmobile" style = {{position:"fixed",left:0,right:0,top:80,zIndex:997}} />
				<TitrePage className = "supprbig" style = {{position:"fixed",left:0,right:0,top:40,zIndex:997}} />
				
				<div className = "supprmobile" style = {{height:40,width:"100%"}}></div>
				<div style={{display: "flex", flex:1, flexWrap:"wrap",marginTop:105}}>
					<div style={{
						flex:4,
						display: "flex",
						justifyContent:"center",
						flexDirection: "column",
					}}>
						
						<div style={{
							flex:1,
							display: "flex",
							justifyContent:"center",
						}}>
							<div style={{
								flex:1,
								display: "flex",
								maxWidth: 1250,
							}}>	
								<IsLogged style={{flex:1,display:"flex"}}>{content}</IsLogged>
							</div>
						</div>
					</div>
				</div>
				<Alert stack={{limit: 3}} effect='slide' timeout={2500} position='bottom-right'/>
				<Footer style = {{flex:"none"}}/>
			</div>
		</Provider>
	);
};

export const LayoutMonCompte = ({ content }) => {

	return(
		<Provider store={store}>	
			<div style={{
				display: "flex",
				minHeight: "100vh",
				flexDirection: "column"
			}}>
				<InitState/>
				<Resize/>
				<Banderole className = "supprmobile" style = {{position:"fixed",left:0,right:0,top:0,height:40,zIndex:1000}}/>
				<SmartMenu className = "supprsmallmenu" style = {{position:"fixed",left:0,right:0,top:40, zIndex:999}}/>
				<SmartMenuSmall className = "supprbigmenu" style = {{position:"fixed",left:0,right:0,top:0, zIndex:999}}/>
				<TitrePage className = "supprmobile" style = {{position:"fixed",left:0,width:"83%",top:80,zIndex:997}} />
				<TitrePage className = "supprbig" style = {{position:"fixed",left:0,right:0,top:40,zIndex:997}} />
	
				<div style={{display:"flex", flexDirection: "column", flex:1}}>
					<div className = "supprmobile" style = {{height:40,width:"100%"}}></div>
					<div style={{display:"flex", flexWrap:"wrap", flex:1,marginTop:100}}>

						<div style={{display: "flex", flexDirection: "column", flex:5, marginTop:0}}>
							<div style={{display: "flex", justifyContent:"center", flex:1 }}>
								<IsLogged verouille style={{flex:1,display:"flex",maxWidth: 800,
									minWidth:"40%"}}>{content}</IsLogged>
							</div>	
						</div>
							
						<div className = "supprmobile"  style={{display: "flex", flex:1}}>	</div>

					</div>
				</div>
				<Footer style = {{flex:"none"}}/>
				<Alert stack={{limit: 3}} effect='slide' timeout={2500} position='bottom-right'/>
			</div>
		</Provider>
	);
};

//<SmartMenuMonCompte style={{
///					position:"fixed", top:100,
//					zIndex:998,
//					display: "flex",
//					flexDirection: "column",
//					backgroundColor:"rgba(250,250,250,0.7)",
//					borderRadius:5,
//				}}/>
