import {
	Accounts
} from "meteor/accounts-base";

export const CONSTANTE_Users = { 
	CREE_COMPTE: "User_CREE_COMPTE",
	GET_ACTIVE_USER: "User_GET_ACTIVE_USER",
	LOG_IN: "Users_LOG_IN",
	LOG_OUT: "Users_LOG_OUT"
};

function creeCompte(user, cbk = ()=>{}){
	let p = new Promise( ( resolve, reject ) =>{
		Accounts.createUser(user, (err)=>{
			if(err){ console.log(err); }else{
				cbk()
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
		Meteor.loginWithPassword(user, password, (err,res)=>{
			if(err){ console.log(err); }else{
				cbk();
				resolve(user);
			}
		});
	});
	return {
		type: 		CONSTANTE_Users.LOG_IN,
		payload: 	p
	};
}
function logOut( cbk = ()=>{}){
	let p = new Promise( ( resolve, reject ) =>{
		Meteor.logout( (err)=>{
			if(err){ console.log(err); }else{
				cbk();
				resolve(null);
			}
		});
	});
	return {
		type: 		CONSTANTE_Users.LOG_OUT,
		payload: 	p
	};
}

export function getActiveUser( cbk = ()=>{} ){ /*on recupere des infos sur l'user actif, renseigné donc en partie par github*/
	//console.log("action");
	let p = new Promise( ( resolve, reject ) => {
		Meteor.call(
			"get1Users", Meteor.userId(), 
			( err, res ) => {
				if ( err ) {
					console.log(err);
					reject( err );
				}else{
					// console.log(res);
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
	logOut,
	getActiveUser
};
