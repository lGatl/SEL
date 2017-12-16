
import { CONSTANTES } from "../../actions/actions";

const DEFAULTS = {
	articles: [],
	article: {},
	titre: "",
	description: ""
};

export default function (  state = DEFAULTS, action ) {
	
	
	switch ( action.type ) {

	case  CONSTANTES.Article.ADD:
		let articles = [ ...state.articles ];
		articles.push( action.payload );
		return { ...state, articles, titre: "", description: "" };
		break;
	case CONSTANTES.Article.GET:
		return { ...state, articles: action.payload };
		break;
	case CONSTANTES.Article.GET1:
		return { ...state, article: action.payload };
		break;
	case CONSTANTES.Article.RM:
		let articlesr = [ ...state.articles ];

		articlesr.splice(articlesr.indexOf(articlesr.find((art)=>art._id == action.payload._id)),1);
		return { ...state, articles: articlesr };
		break;
	case CONSTANTES.Article.CONTROLE:

		return { ...state, ...action.payload };
		break;
		
	}
	return state;
}
