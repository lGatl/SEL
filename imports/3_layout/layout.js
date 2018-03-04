import React 								from "react";
import { Provider } 							from "react-redux";
import { composeWithDevTools } 			from "redux-devtools-extension";
import { createStore, applyMiddleware } 	from "redux";
import ReduxPromise 						from "redux-promise";

import reducers from "../7_reducers";

import SmartMenu from "../_common/5_smartComponent/SmartMenu";
import SmartMenuMonCompte from "../_common/5_smartComponent/SmartMenuMonCompte";
import Footer from "../_common/4_dumbComponent/Footer";
import InitState from "../_common/5_smartComponent/InitState";


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
					<div>		
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
						<div style={{display: "flex", flexDirection: "column", flex:4, minWidth:550}}>
							{content}
						</div>
						
					</div>
				</div>
				<Footer style = {{flex:"none"}}/>

			</div>
		</Provider>
	);
};
