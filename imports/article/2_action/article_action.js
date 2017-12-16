import { COLLECTIONS } from "../../methodes/methodes";
console.log(COLLECTIONS)
const _ARTICLE   = "_ARTICLE";
const ADD 			= "ADD" + _ARTICLE;
const GET			= "GET" + _ARTICLE;
const GET1 			= "GET1" + _ARTICLE;
const RM 				= "RM" + _ARTICLE;
const UP 				= "UP" + _ARTICLE;
const CONTROLE 	= "CONTROLE" + _ARTICLE;

export const ARTICLE = {
	ADD,
	RM,
	GET,
	GET1,
	UP,	
	CONTROLE
};

function add(obj, cbk=()=>{}){
	let p = new Promise( ( resolve, reject ) => {
		Meteor.call("addArticle", obj ,(err,res)=>{
			if(err){
				reject(err);
			}else{

				cbk( res );
				resolve( { ...obj, _id:res } );

			}
		});
	});
	return {
		type: 		ADD,
		payload: 	p
	};
}
function get(cbk = ()=>{}){
	let p = new Promise( ( resolve, reject ) =>{
		Meteor.call("getArticles",(err,res)=>{
			if(err){
				reject( err );
			}else{
				cbk( res );
				resolve( res );
			}
		});
	});
	return {
		type: 		GET,
		payload: 	p
	};
}
function get1(obj, cbk = () => {}){
	let p = new Promise( ( resolve, reject ) => {
		Meteor.call("getArticle",obj,(err,res)=>{
		if(err){
				reject(err);
			}else{
				cbk(res);
				resolve(res);
			}
		});
	});
	return {
		type: 		GET1,
		payload: 	p
	};
}
function rm(obj, cbk =()=>{}){
	let p = new Promise( ( resolve, reject ) => {
		Meteor.call("rmArticle", obj ,(err)=>{
			if(err){
				reject(err);
			}else{
				cbk();
				resolve( obj );
			}
		});
	});
	return {
		type: 		RM,
		payload: 	p
	};

}
function up(obj, cbk = ()=>{}){
	let p = new Promise( ( resolve, reject ) => {
		Meteor.call("upArticle",obj,(err)=>{
			if(err){
				reject(err);
			}else{
				cbk(res);
				resolve(res);
			}
		});
	});
	return {
		type: 		UP,
		payload: 	p
	};
}
//=========================================================
function controle(val){

	return {
		type: 		CONTROLE,
		payload: 	val
	};
}

export const articleAct = {
	add,
	rm,
	get,
	get1,
	up,	
	controle
};
