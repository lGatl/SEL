import { CONSTANTES } from "../../6_actions/actions";

const DEFAULTS = {
	active_user:{},
	all:[],
	one:{}
};
export const REDUCER_users_add = ( state , action ) =>{
	var all = [ ...state.all ] ;
	let prestataire_index;
	let payeur_index;
	let one;
	let active_user;
	switch ( action.type ) {
	case CONSTANTES["Users"].GET_ACTIVE_USER:
		return { ...state, active_user: action.payload  };
		break;
	case CONSTANTES["Users"].LOG_IN:
		return { ...state, active_user: action.payload  };
		break;
	case CONSTANTES["Users"].LOG_OUT:
		return { ...state, active_user: action.payload  };
		break;
	
	case CONSTANTES.Transaction.CREE:

		prestataire_index = all.findIndex(allu=>allu._id==action.payload.prestataire._id);
		payeur_index = all.findIndex(allu=>allu._id==action.payload.prestataire._id);
		if(prestataire_index>=0){all.splice(prestataire_index,1,{...all.find(allu=>allu._id==action.payload.prestataire._id),...action.payload.prestataire});}
		if(payeur_index>=0){all.splice(payeur_index,1,{...all.find(allu=>allu._id==action.payload.prestataire._id),...action.payload.payeur});}
		one = (state.one._id==action.payload.prestataire._id)?{...state.one,...action.payload.prestataire}:
			(state.one._id==action.payload.payeur._id)?{...state.one,...action.payload.payeur}:state.one;
		active_user = (state.active_user._id==action.payload.prestataire._id)?{...state.active_user,...action.payload.prestataire}:
			(state.active_user._id==action.payload.payeur._id)?{...state.active_user,...action.payload.payeur}:state.active_user;
		return {...state, all, one, active_user};
		break;
	}
	return {...DEFAULTS, ...state};
};
