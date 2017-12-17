
import { CONSTANTES } from "../../actions/actions";
import { COLLECTIONS } from "../../methodes/methodes";

var REDUCER = {};
COLLECTIONS.forEach((COLLECTION)=>
{
	const DEFAULTS = {
		les: [],
		le: {},
		
	};

	REDUCER[COLLECTION.toLowerCase()] = function (  state = DEFAULTS, action ) {
		var les = [ ...state.les ] ;
		var controle = { ...state.controle };
		switch ( action.type ) {	
		case  CONSTANTES[COLLECTION].ADD:
			les.push( action.payload );
			return { ...state, les };
			break;
		case CONSTANTES[COLLECTION].GET:
			return { ...state, les: action.payload };
			break;
		case CONSTANTES[COLLECTION].GET1:
			return { ...state, le: action.payload };
			break;
		case CONSTANTES[COLLECTION].RM:
			les.splice(les.indexOf(les.find((art)=>art._id == action.payload._id)),1);
			return { ...state, les };
			break;
		case CONSTANTES[COLLECTION].CONTROLE:
			return { ...state, ...action.payload };
			break;

			
		}
		return state;
	};

});

export const REDUCERS = REDUCER;

