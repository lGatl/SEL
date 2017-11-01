
const NOM 			= "_ANNONCE"
const ADD 			= "ADD"		+ NOM;
const GET 			= "GET"			+ NOM;
const GET1 			= "GET1"		+ NOM;
const RM 			= "RM"			+ NOM;
const UP 			= "UP"			+ NOM;

function add(obj, cbk=()=>{}){
	let p = new Promise( ( resolve, reject ) => {
		Meteor.call('addAnnonce', obj ,(err)=>{
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
		Meteor.call('getAnnonces',(err,res)=>{
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
		Meteor.call('getAnnonce',obj,(err,res)=>{
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
		Meteor.call('rmAnnonce', obj ,(err)=>{
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
		Meteor.call('upAnnonce',obj,(err)=>{
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

export const ANNONCE = {
	ADD,
	GET,
	GET1,
	RM,
	UP,	
}

export const annonce = {
	add,
	rm,
	get,
	get1,
	up,	
}
