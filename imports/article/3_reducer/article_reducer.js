
import {
	ARTICLE
} from "../2_action/article_action";

const DEFAULTS = {
	articles: [],
	article: {},
	titre: "",
	description: ""
};

export default function (  state = DEFAULTS, action ) {
	
	
	switch ( action.type ) {

	case  ARTICLE.ADD:
		let articles = [ ...state.articles ];
		articles.push( action.payload );
		return { ...state, articles, titre: "", description: "" };
		break;
	case ARTICLE.GET:
		return { ...state, articles: action.payload };
		break;
	case ARTICLE.GET1:
		return { ...state, article: action.payload };
		break;
	case ARTICLE.RM:
		let articlesr = [ ...state.articles ];

		articlesr.splice(articlesr.indexOf(articlesr.find((art)=>art._id == action.payload._id)),1);
		return { ...state, articles: articlesr };
		break;
	case ARTICLE.CONTROLE:

		return { ...state, ...action.payload };
		break;
		
	}
	return state;
}
