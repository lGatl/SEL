import { CONSTANTES } from "../6_actions/actions";
const DEFAULTS = {
	active_menu:'Accueil'
};

export default function (  state = DEFAULTS, action ) {
	switch ( action.type ) {
		
	case CONSTANTES.Menu.ACTIVE_MENU:
		return { ...state, active_menu: action.payload  };
		break;	
	}
	return state;
}
