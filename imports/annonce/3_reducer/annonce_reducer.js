
import {
	ANNONCE
} from "../2_action/annonce_action";

const DEFAULTS = {
	annonces: [],
	annonce:{}
};

export default function (  state = DEFAULTS, action ) {
	
	
	switch ( action.type ) {

		case  ANNONCE.ADD:
			return { ...state, annonces: action.payload};
		break;
		case ANNONCE.GET:
			return { ...state, annonces: action.payload };
		break;
		case ANNONCE.GET1:
			return { ...state, annonce: action.payload };
		break;
		case ANNONCE.RM:
			return { ...state};
		break;
		
	}
	return state;
}
