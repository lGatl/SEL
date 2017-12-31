import React 								from "react";
import { Provider } 							from "react-redux";
import { composeWithDevTools } 			from "redux-devtools-extension";
import { createStore, applyMiddleware } 	from "redux";
import ReduxPromise 						from "redux-promise";

import reducers from "../7_reducers";

import Menu from "../_common/5_smartComponent/Menu";
import Footer from "../_common/4_dumbComponent/Footer";


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
			<div className="main-layout">

				<div className="bodyLay">
					<Menu></Menu>

					<div id="content">
					
						{content}
					
					</div>
				</div>
				<Footer></Footer>

			</div>
		</Provider>
	);
};
