import { CONSTANTES } from "../../6_actions/actions";

const DEFAULTS = {
		active_user:{}
		};
export const REDUCER_users_add = ( state , action ) =>{
	switch ( action.type ) {
	case CONSTANTES["Users"].GET_ACTIVE_USER:
		return { ...state, active_user: action.payload  };
		break;
	}
	return {...DEFAULTS, ...state};
};
