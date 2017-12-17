/*Rassemble tous les reducers chaque fichier dans un objet differant du state*/
import { combineReducers } from "redux";

import { REDUCERS } from "../article/3_reducer/article_reducer";

import user from "../user/3_reducer/user_reducer";

const ROOT_REDUCER = combineReducers({
	...REDUCERS,
	user
});
export default ROOT_REDUCER;
