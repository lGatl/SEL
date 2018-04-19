
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
			if(typeof action.payload.state=="string"){
				return { ...state, [action.payload.state]:[...state[action.payload.state],action.payload.val]};
			}else if((typeof action.payload.state=="object" ) && (action.payload.state != null)){
				let obj = Object.keys(action.payload.state)[0];
				return { ...state, [obj]:{...state[obj],[action.payload.state[obj]]:[...state[action.payload.state[obj]],action.payload.val]}};
			}else if(action.payload.state == null||action.payload.state == undefined){
				return { ...state, all: [...state.all,action.payload.val] };
			}			
			break;
		case CONSTANTES[COLLECTION].GET:
			if(typeof action.payload.state=="string"){
				return { ...state, [action.payload.state]:action.payload.val};
			}else if((typeof action.payload.state=="object" ) && (action.payload.state != null)){
				let obj = Object.keys(action.payload.state)[0];
				return { ...state, [obj]:{...state[obj],[action.payload.state[obj]]:action.payload.val}};
			}else if(action.payload.state == null||action.payload.state == undefined){
				return { ...state, all: action.payload.val };
			}			
			break;
		case CONSTANTES[COLLECTION].GET1:
			if(typeof action.payload.state=="string"){
				return { ...state, [action.payload.state]:action.payload.val};
			}else if((typeof action.payload.state=="object") && (action.payload.state != null)){
				let obj = Object.keys(action.payload.state)[0];
				return { ...state, [obj]:{...state[obj],[action.payload.state[obj]]:action.payload.val}};
			}else if(action.payload.state == null||action.payload.state == undefined){
				return { ...state, one: action.payload.val };
			}			
			break;
		case CONSTANTES[COLLECTION].COUNT:

			if(typeof action.payload.state=="string"){
				return { ...state, [action.payload.state]:action.payload.val};
			}else if((typeof action.payload.state=="object") && (action.payload.state != null)){
				let obj = Object.keys(action.payload.state)[0];
				return { ...state, [obj]:{...state[obj],[action.payload.state[obj]]:action.payload.val}};
			}else if(action.payload.state == null||action.payload.state == undefined){
				return { ...state, count: action.payload.val };
			}			
			break;
		case CONSTANTES[COLLECTION].RM:
			var ALL;
			if(typeof action.payload.state=="string"){
				all = [...state[action.payload.state]];
				ALL = (typeof action.payload.val._id)=="string"? all.reduce((total,al)=>al._id == action.payload.val._id?total:[...total,al],[]):
					(typeof action.payload.val._id)=="object"? all.reduce((total,al)=>action.payload.val._id.$in.indexOf(al._id)>=0?total:[...total,al],[]):all
				return { ...state, [action.payload.state]:ALL};
			}else if((typeof action.payload.state=="object" ) && (action.payload.state != null)){
				let obj = Object.keys(action.payload.state)[0];
				all = [...state[action.payload.state][obj]];
				ALL = (typeof action.payload.val._id)=="string"? all.reduce((total,al)=>al._id == action.payload.val._id?total:[...total,al],[]):
					(typeof action.payload.val._id)=="object"? all.reduce((total,al)=>action.payload.val._id.$in.indexOf(al._id)>=0?total:[...total,al],[]):all
				return { ...state, [obj]:{...state[obj],[action.payload.state[obj]]:ALL}};
			}else if(action.payload.state == null||action.payload.state == undefined){

				ALL = (typeof action.payload.val._id)=="string"? all.reduce((total,al)=>al._id == action.payload.val._id?total:[...total,al],[]):
					(typeof action.payload.val._id)=="object"? all.reduce((total,al)=>action.payload.val._id.$in.indexOf(al._id)>=0?total:[...total,al],[]):all
				return {...state, all:ALL};	
			}			
			
			break;
		case CONSTANTES[COLLECTION].UP:
			var up;
			if(typeof action.payload.state=="string"){
				all = [...state[action.payload.state]];
				up = all.find(allu=>allu._id==action.payload.val._id);
				all.splice(all.indexOf(up),1,{...up,...action.payload.val});
				return { ...state, [action.payload.state]:all};
			}else if((typeof action.payload.state=="object" ) && (action.payload.state != null)){
				let obj = Object.keys(action.payload.state)[0];
				all = [...state[action.payload.state][obj]];
				up = all.find(allu=>allu._id==action.payload.val._id);
				all.splice(all.indexOf(up),1,{...up,...action.payload.val});
				return { ...state, [obj]:{...state[obj],[action.payload.state[obj]]:all}};
			}else if(action.payload.state == null||action.payload.state == undefined){
				up = all.find(allu=>allu._id==action.payload.val._id);
				all.splice(all.indexOf(up),1,{...up,...action.payload.val});
				return {...state, all};	
			}			
			
			
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

