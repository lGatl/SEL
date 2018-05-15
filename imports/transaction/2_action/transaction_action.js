export const CONSTANTE_Transaction = { 
	CREE: "Transaction_CREE",
};

function cree(annonce_id, proposition_id, cbk = ()=>{}){
	let p = new Promise(( resolve, reject ) =>{
		Meteor.call("creeTransaction",annonce_id,proposition_id,(err,res)=>{
			if(err){reject(err);}else{resolve(res);}
		});
	});
	return {
		type: 		CONSTANTE_Transaction.CREE,
		payload: 	p
	};
}

export const ACTION_Transaction = { 
	cree,
};
