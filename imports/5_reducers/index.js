/*Rassemble tous les reducers chaque fichier dans un objet differant du state*/
import { combineReducers } from "redux";

import annonce from "../annonce/3_reducer/annonce_reducer";
import article from "../article/3_reducer/article_reducer";
import categorie from "../categorie/3_reducer/categorie_reducer";
import historique from "../historique/3_reducer/historique_reducer";
import proposition from "../proposition/3_reducer/proposition_reducer";
import user from "../user/3_reducer/user_reducer";


const ROOT_REDUCER = combineReducers({
	annonce,
	article,
	categorie,
	historique,
	proposition,
	user
});
export default ROOT_REDUCER;
