import { CONSTANTES } from "../6_actions/actions";
const DEFAULTS = {
	titre_page:"",
	
};

export default function (  state = DEFAULTS, action ) {
	switch ( action.type ) {
		
	case CONSTANTES.Titre.TITRE_PAGE:
		return { ...state, titre_page: action.payload  };
		break;	
				
	}
	return state;
}
