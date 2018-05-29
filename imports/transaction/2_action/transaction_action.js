export const CONSTANTE_Transaction = { 
	CREE: "Transaction_CREE",
};

function cree(annonce_id, proposition_id, note, cbk = ()=>{}){
	console.log("annonce_id, proposition_id, note", annonce_id, proposition_id, note);
	let p = new Promise(( resolve, reject ) =>{
		Meteor.call("creeTransaction",annonce_id,proposition_id,note,(err,res)=>{
			if(err){reject(err);}else{
				cbk(res);
				resolve(res);
			}
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
