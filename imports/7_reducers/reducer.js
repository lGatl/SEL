
import { CONSTANTES } from "../6_actions/actions";
import { COLLECTIONS } from "../5_methodes/methodes";

import { REDUCER_users_add } from "../user/3_reducer/user_reducer";

var REDUCER = {};
COLLECTIONS.forEach((COLLECTION)=>
{
	const DEFAULTS = {
		all: [],
		one: {},
		
	};

	REDUCER[COLLECTION.toLowerCase()] = function (  state = DEFAULTS, action ) {
		var all = [ ...state.all ] ;
		switch ( action.type ) {	
		case  CONSTANTES[COLLECTION].ADD:
			all.push( action.payload );
			return { ...state, all };
			break;
		case CONSTANTES[COLLECTION].GET:
			return { ...state, all: action.payload };
			break;
		case CONSTANTES[COLLECTION].GET1:
			return { ...state, one: action.payload };
			break;
		case CONSTANTES[COLLECTION].RM:
			all.splice(all.indexOf(all.find((act)=>act._id == action.payload._id)),1);
			return { ...state, all };
			break;
		case CONSTANTES[COLLECTION].CONTROLE:
			return { ...state, ...action.payload };
			break;
			
		}
		return state;
	};

});
const user = REDUCER['ser'];
REDUCER['user']=function(){return{...user(),...REDUCER_users_add()}}
export const REDUCERS = REDUCER;

