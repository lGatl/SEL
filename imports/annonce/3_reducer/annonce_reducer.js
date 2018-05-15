import { CONSTANTES } from "../../6_actions/actions";

const DEFAULTS = {
	all:[],
	one:{}
};
export const REDUCER_annonce_add = ( state , action ) =>{
	var all = [ ...state.all ] ;
	let up;
	switch ( action.type ) {
	case CONSTANTES.Transaction.CREE:
		up = all.find(allu=>allu._id==action.payload.annonce._id);
		all.splice(all.indexOf(up),1,{...up,...action.payload.annonce});
		return {...state, all, one:{...state.one,...action.payload.annonce}};
		break;
	}
	return {...DEFAULTS, ...state};
};
