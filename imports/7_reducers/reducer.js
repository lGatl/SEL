
import { CONSTANTES } from "../6_actions/actions";
import { COLLECTIONS } from "../5_methodes/methodes";

import { REDUCER_users_add } from "../user/3_reducer/user_reducer";

var REDUCER = {};
COLLECTIONS.forEach((COLLECTION)=>{
	const DEFAULTS = {
		all: [],
		one: {},
		controle:{}
		
	};

	REDUCER[COLLECTION.toLowerCase()] = function (  state = DEFAULTS, action ) {
		var all = [ ...state.all ] ;
		switch ( action.type ) {	
		case  CONSTANTES[COLLECTION].ADD:
			all.push( action.payload );
			return { ...state, all };
			break;
		case CONSTANTES[COLLECTION].GET:
			return action.payload.state?{ ...state, all:{...state.count,[action.payload.state]:action.payload.val}}:{ ...state, all: action.payload.val };
			break;
		case CONSTANTES[COLLECTION].GET1:
			return action.payload.state?{ ...state, all:{...state.count,[action.payload.state]:action.payload.val}}:{ ...state, all: action.payload.val };
			break;
		case CONSTANTES[COLLECTION].COUNT:
			return action.payload.state?{ ...state, count:{...state.count,[action.payload.state]:action.payload.val}}:{ ...state, count: action.payload.val };
			
			break;
		case CONSTANTES[COLLECTION].RM:
			
			let ALL = (typeof action.payload._id)=="string"? all.reduce((total,al)=>al._id == action.payload._id?total:[...total,al],[]):
				(typeof action.payload._id)=="object"? all.reduce((total,al)=>action.payload._id.$in.indexOf(al._id)>=0?total:[...total,al],[]):all;
			return { ...state, all: ALL };
			break;
		case CONSTANTES[COLLECTION].UP:

			let ALLU = [...state.all]
			let up = ALLU.find(allu=>allu._id==action.payload._id)
			ALLU.splice(ALLU.indexOf(up),1,{...up,...action.payload})

			return {...state, all:ALLU}
			
			break;
		case CONSTANTES[COLLECTION].CONTROLE:
			return { ...state, controle:{...state.controle,...action.payload} };
			break;
		}
		return COLLECTION == "Users" ?
			{...state, ...REDUCER_users_add(state, action) } :
			state;
	};

});

export const REDUCERS = REDUCER;

