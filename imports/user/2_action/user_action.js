import {
	Accounts
} from "meteor/accounts-base";

export const CONSTANTE_Users = { 
	CREE_COMPTE: "User_CREE_COMPTE",
	GET_ACTIVE_USER: "User_GET_ACTIVE_USER",
	LOG_IN: "Users_LOG_IN"
};

function creeCompte(user, cbk = ()=>{}){
	let p = new Promise( ( resolve, reject ) =>{
		Accounts.createUser(user, (err)=>{
			if(err){ console.log(err); }else{
				resolve(user);
			}
		});
	});
	return {
		type: 		CONSTANTE_Users.CREE_COMPTE,
		payload: 	p
	};
}
function logIn(user, password, cbk = ()=>{}){
	let p = new Promise( ( resolve, reject ) =>{
		Meteor.loginWithPassword(user, password, (err)=>{
			if(err){ console.log(err); }else{
				resolve(user);
			}
		});
	});
	return {
		type: 		CONSTANTE_Users.LOG_IN,
		payload: 	p
	};
}

export function getActiveUser( cbk = ()=>{} ){ /*on recupere des infos sur l'user actif, renseigné donc en partie par github*/
	
	let p = new Promise( ( resolve, reject ) => {
		Meteor.call(
			"getUser", Meteor.userId(), 
			( err, res ) => {
				if ( err ) {
					
					reject( err );
				}else{
					cbk(res);
					resolve( res );/*on renvoi la reponse, elle finira dans active_user*/

				}
			}
		);
	});
	return {
		type: 		CONSTANTE_Users.GET_ACTIVE_USER,
		payload: 	p
	};
}
export const ACTION_Users = { 
	creeCompte,
	logIn,
	getActiveUser
};
