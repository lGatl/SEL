import { CONSTANTES } from "../../6_actions/actions";

const DEFAULTS = {
	all:[],
	one:{}
};
export const REDUCER_proposition_add = ( state , action ) =>{
	var all = [ ...state.all ] ;
	let up;
	switch ( action.type ) {
	case CONSTANTES.Transaction.CREE:
		up = all.find(allu=>allu._id==action.payload.proposition._id);
		all.splice(all.indexOf(up),1,{...up,...action.payload.proposition});
		return {...state, all, one:{...state.one,...action.payload.proposition}};
		break;
	}
	return {...DEFAULTS, ...state};
};
