import { CONSTANTES } from "../6_actions/actions";
const DEFAULTS = {

};

export default function (  state = DEFAULTS, action ) {
	
	switch ( action.type ) {
		
	case CONSTANTES.Controle.RESIZE:
		return { ...state, resize: action.payload  };
		break;	
	case CONSTANTES.Controle.SCROLL:
		return { ...state, scroll: action.payload  };
		break;	
	case CONSTANTES.Controle.CHANGE_PAGE:
		return { ...state, page: {...state.page, ...action.payload}  };
		break;	
	
	
	}
	return state;
}
