export const CONSTANTE_Menu = { 
	ACTIVE_MENU: "Menu_ACTIVE_MENU"
};

function activeMenu(val){
	return {
		type: 		CONSTANTE_Menu.ACTIVE_MENU,
		payload: 	val
	};
}

export const ACTION_Menu = { 
	
	activeMenu
};
