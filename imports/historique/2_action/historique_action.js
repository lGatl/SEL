
const NOM 			= "_HISTORIQUE"
const ADD 			= "ADD"		+ NOM;
const GET 			= "GET"			+ NOM;
const GET1 			= "GET1"		+ NOM;
const RM 			= "RM"			+ NOM;
const UP 			= "UP"			+ NOM;

function add(obj, cbk=()=>{}){
	let p = new Promise( ( resolve, reject ) => {
		Meteor.call('addHistorique', obj ,(err)=>{
			if(err){
				reject(err)
			}else{
				cbk(res)
				resolve(res)

			}
		})
	})
	return {
		type: 		ADD,
		payload: 	p
	};
}
function get(cbk = ()=>{}){
	
	let p = new Promise( ( resolve, reject ) =>{
		Meteor.call('getHistoriques',(err,res)=>{
			if(err){
				reject( err );
			}else{
				cbk(res)
				resolve( res );
			}
		})
	})
	return {
		type: 		GET,
		payload: 	p
	};
}
function get1(obj, cbk = () => {}){
	let p = new Promise( ( resolve, reject ) => {
		Meteor.call('getHistorique',obj,(err,res)=>{
		if(err){
				reject(err)
			}else{
				cbk(res)
				resolve(res)
			}
		})
	})
	return {
		type: 		GET1,
		payload: 	p
	};
}
function rm(obj, cbk =()=>{}){
	let p = new Promise( ( resolve, reject ) => {
		Meteor.call('rmHistorique', obj ,(err)=>{
			if(err){
				reject(err)
			}else{
				cbk(res)
				resolve(res)
			}
		})
	})
	return {
		type: 		RM,
		payload: 	p
	};

}
function up(obj, cbk = ()=>{}){
	let p = new Promise( ( resolve, reject ) => {
		Meteor.call('upHistorique',obj,(err)=>{
			if(err){
				reject(err)
			}else{
				cbk(res)
				resolve(res)
			}
		})
	})
	return {
		type: 		UP,
		payload: 	p
	};
}

export const HISTORIQUE = {
	ADD,
	RM,
	GET,
	GET1,
	UP,	
}

export const historique = {
	add,
	rm,
	get,
	get1,
	up,	
}
