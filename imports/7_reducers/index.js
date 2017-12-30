/*Rassemble tous les reducers chaque fichier dans un objet differant du state*/
import { combineReducers } from "redux";

import { REDUCERS } from "./reducer";

import { REDUCER_users_add } from "../user/3_reducer/user_reducer";

console.log(",...REDUCER_users_add", REDUCER_users_add);

console.log("REDUCERS", REDUCERS);

console.log("REDUCERS", REDUCERS.users);

const ROOT_REDUCER = combineReducers({
	...REDUCERS
});
export default ROOT_REDUCER;

