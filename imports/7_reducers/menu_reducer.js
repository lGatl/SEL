import { CONSTANTES } from "../6_actions/actions";
const DEFAULTS = {
	active_menu:"Accueil",
	active_menu_mon_compte:"MesInformations",
	active_menu_annonce:"Toutes"
};

export default function (  state = DEFAULTS, action ) {
	switch ( action.type ) {
		
	case CONSTANTES.Menu.ACTIVE_MENU:
		return { ...state, active_menu: action.payload  };
		break;	
	
	case CONSTANTES.Menu.ACTIVE_MENU_MON_COMPTE:
		return { ...state, active_menu_mon_compte: action.payload  };
		break;	
		
	case CONSTANTES.Menu.ACTIVE_MENU_ANNONCE:
		return { ...state, active_menu_annonce: action.payload  };
		break;	
	}
	return state;
}
