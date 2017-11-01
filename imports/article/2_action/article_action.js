
const NOM 			= "_ARTICLE"
const ADD 			= "ADD"		+ NOM;
const GET 			= "GET"			+ NOM;
const GET1 			= "GET1"		+ NOM;
const RM 			= "RM"			+ NOM;
const UP 			= "UP"			+ NOM;

function add(obj, cbk=()=>{}){
	let p = new Promise( ( resolve, reject ) => {
		Meteor.call('addArticle', obj ,(err)=>{
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
		Meteor.call('getArticles',(err,res)=>{
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
		Meteor.call('getArticle',obj,(err,res)=>{
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
		Meteor.call('rmArticle', obj ,(err)=>{
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
		Meteor.call('upArticle',obj,(err)=>{
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

export const ARTICLE = {
	ADD,
	RM,
	GET,
	GET1,
	UP,	
}

export const article = {
	add,
	rm,
	get,
	get1,
	up,	
}
