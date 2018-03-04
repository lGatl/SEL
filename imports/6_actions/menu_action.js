export const CONSTANTE_Menu = { 
	ACTIVE_MENU: "Menu_ACTIVE_MENU",
	ACTIVE_MENU_MON_COMPTE: "Menu_ACTIVE_MENU_MON_COMPTE"
};

function activeMenu(val){
	return {
		type: 		CONSTANTE_Menu.ACTIVE_MENU,
		payload: 	val
	};
}
function activeMenuMonCompte(val){
	return {
		type: 		CONSTANTE_Menu.ACTIVE_MENU_MON_COMPTE,
		payload: 	val
	};
}

export const ACTION_Menu = { 
	
	activeMenu,
	activeMenuMonCompte
};
