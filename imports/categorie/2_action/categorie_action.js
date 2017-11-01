
const NOM 			= "_CATEGORIE"
const ADD 			= "ADD"		+ NOM;
const GET 			= "GET"			+ NOM;
const GET1 			= "GET1"		+ NOM;
const RM 			= "RM"			+ NOM;
const UP 			= "UP"			+ NOM;

function add(obj, cbk=()=>{}){
	let p = new Promise( ( resolve, reject ) => {
		Meteor.call('addCategorie', obj ,(err)=>{
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
		Meteor.call('getCategories',(err,res)=>{
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
		Meteor.call('getCategorie',obj,(err,res)=>{
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
		Meteor.call('rmCategorie', obj ,(err)=>{
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
		Meteor.call('upCategorie',obj,(err)=>{
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

export const CATEGORIE = {
	ADD,
	RM,
	GET,
	GET1,
	UP,	
}

export const categorie = {
	add,
	rm,
	get,
	get1,
	up,	
}
