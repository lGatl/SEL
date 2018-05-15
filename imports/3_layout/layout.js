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

import SmartMenu from "../_common/5_smartComponent/SmartMenu";
import SmartMenuMonCompte from "../_common/5_smartComponent/SmartMenuMonCompte";
import TitrePage from "../_common/5_smartComponent/TitrePage";

import Footer from "../_common/4_dumbComponent/Footer";
import InitState from "../_common/5_smartComponent/InitState";
import LastArticles from "../_common/5_smartComponent/LastArticles";
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
				<div style={{flex:1}}>
					<SmartMenu/>
					<div style={{display: "flex", flex:1, minWidth:145, marginLeft: "auto",flexWrap:"wrap"}}>
						<div style={{
							flex:4,
							display: "flex",
							justifyContent:"center",
							flexDirection: "column",
							padding:20
						}}>
							<TitrePage/>
							<div style={{
								flex:1,
								alignItems:"center",
							}}>
								<div style={{
									flex:1,
									display: "flex",
									justifyContent:"center",
									alignItems:"center",
									maxWidth: 1280
								}}>	
									{content}
								</div>
							</div>
						</div>
						<div style={{
							display: "flex",
							flexDirection: "column",
							flex:1
						}}>		
							<LastArticles annonce actualite/>
						</div>
					</div>
				</div>
				<Footer style = {{flex:"none"}}/>
				<Alert stack={{limit: 3}} effect='slide' timeout={2500} position='bottom-right'/>
			</div>
		</Provider>
	);
};

export const LayoutLAc = ({ content }) => {

	return(
		<Provider store={store}>	
			<div style={{
				display: "flex",
				minHeight: "100vh",
				flexDirection: "column"
			}}>
				<InitState/>
				<div style={{flex:1}}>
					<SmartMenu/>
					<div style={{display: "flex", flex:1, flexWrap:"wrap"}}>
						<div style={{
							flex:4,
							display: "flex",
							justifyContent:"center",
							flexDirection: "column",
							padding:20
						}}>
							<TitrePage/>
							<div style={{
								flex:1,
								display: "flex",
							}}>
								<div style={{
									flex:1,
									display: "flex",
									maxWidth: 1280
								}}>	
									{content}
								</div>
							</div>
						</div>
						<div style={{
							display: "flex",
							flexDirection: "column",
							flex:1
						}}>		
							<LastArticles actualite/>
						</div>
					</div>
					<Alert stack={{limit: 3}} effect='slide' timeout={2500} position='bottom-right'/>
				</div>
				<Footer style = {{flex:"none"}}/>
			</div>
		</Provider>
	);
};
export const LayoutLAn = ({ content }) => {

	return(
		<Provider store={store}>	
			<div style={{
				display: "flex",
				minHeight: "100vh",
				flexDirection: "column"
			}}>
				<InitState/>
				<div style={{flex:1}}>
					<SmartMenu/>
					<div style={{display: "flex", flex:1, flexWrap:"wrap"}}>
						<div style={{
							flex:4,
							display: "flex",
							justifyContent:"center",
							flexDirection: "column",
							padding:20
						}}>
							<TitrePage/>
							<div style={{
								flex:1,
								display: "flex",
							}}>
								<div style={{
									flex:1,
									display: "flex",
									justifyContent:"center",
									alignItems:"center",
									maxWidth: 1280
								}}>	
									{content}
								</div>
							</div>
						</div>
						<div style={{
							display: "flex",
							flexDirection: "column",
							flex:1,
						}}>		
							<LastArticles annonce/>
						</div>
					</div>
				</div>
				<Footer style = {{flex:"none"}}/>
				<Alert stack={{limit: 3}} effect='slide' timeout={2500} position='bottom-right'/>
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
				<div style={{display:"flex", flexDirection: "column", flex:1}}>
					<SmartMenu/>
					<div style={{display:"flex", flexWrap:"wrap", flex:1}}>		
						<div style={{display: "flex", flex:1, minWidth:145}}>
							<SmartMenuMonCompte/>
						</div>
						<div style={{display: "flex", flexDirection: "column", flex:5, margin:10, }}>
							<TitrePage/>
							<IsLogged>{content}</IsLogged>
						</div>
						
					</div>
				</div>
				<Footer style = {{flex:"none"}}/>
				<Alert stack={{limit: 3}} effect='slide' timeout={2500} position='bottom-right'/>
			</div>
		</Provider>
	);
};
