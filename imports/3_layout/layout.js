import React 								from "react";
import { Provider } 							from "react-redux";
import { composeWithDevTools } 			from "redux-devtools-extension";
import { createStore, applyMiddleware } 	from "redux";
import ReduxPromise 						from "redux-promise";

import reducers from "../7_reducers";

import { Titre } from "../_common/4_dumbComponent/_gat_ui_react";

import SmartMenu from "../_common/5_smartComponent/SmartMenu";
import SmartMenuAnnonce from "../_common/5_smartComponent/SmartMenuAnnonce";
import SmartMenuMonCompte from "../_common/5_smartComponent/SmartMenuMonCompte";
import Footer from "../_common/4_dumbComponent/Footer";
import InitState from "../_common/5_smartComponent/InitState";
import LastArticles from "../_common/5_smartComponent/LastArticles";


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
					<div style={{display: "flex", flex:1, minWidth:145, maxWidth: 1280, marginLeft: "auto"}}>
						<div style={{
							flex:4,
							display: "flex",
							flexDirection: "column"
						}}>		
							{content}
						</div>
						<div style={{
							display: "flex",
							flexDirection: "column",
							flex:1
						}}>		
							<LastArticles/>
						</div>
					</div>
				</div>
				<Footer style = {{flex:"none"}}/>

			</div>
		</Provider>
	);
};
export const LayoutAnnonce = ({ content }) => {

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
					<Titre>Annonces</Titre>
					<div style={{display:"flex", marginTop:20, marginLeft:20}}>		
						
						<SmartMenuAnnonce/>
					</div>
					<div style={{display: "flex", flexDirection: "column", flex:4, minWidth:550}}>
						{content}
					</div>
				</div>
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
				<div style={{display:"flex", flexDirection: "column", flex:1}}>
					<SmartMenu/>
					<div style={{display:"flex", flexWrap:"wrap", flex:1}}>		
						<div style={{display: "flex", flex:1, minWidth:145}}>
							<SmartMenuMonCompte/>
						</div>
						<div style={{display: "flex", flexDirection: "column", flex:4, minWidth:550, margin:10}}>
							{content}
						</div>
						
					</div>
				</div>
				<Footer style = {{flex:"none"}}/>

			</div>
		</Provider>
	);
};
