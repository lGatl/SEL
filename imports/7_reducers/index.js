/*Rassemble tous les reducers chaque fichier dans un objet differant du state*/
import { combineReducers } from "redux";

import { REDUCERS } from "./reducer";
import  MenuREDUCER from "./menu_reducer";

const ROOT_REDUCER = combineReducers({
	...REDUCERS,
	menu: MenuREDUCER,
});
export default ROOT_REDUCER;
