import { COLLECTIONS } from "../methodes/methodes";

const CONSTANTE = {};
const ACTION = {};

COLLECTIONS.forEach((COLLECTION)=>{

	CONSTANTE[ COLLECTION ] ={ 
		ADD : COLLECTION+"_ADD",
		GET : COLLECTION+"_GET",
		GET1 : COLLECTION+ "_GET1",
		RM : COLLECTION+"_RM",
		UP : COLLECTION+"_UP",
		CONTROLE : COLLECTION+"_CONTROLE",
	};

	function add(obj, cbk=()=>{}){
		let p = new Promise( ( resolve, reject ) => {
			Meteor.call("add" + COLLECTION, obj ,(err,res)=>{
				if(err){
					reject(err);
				}else{
					cbk( res );
					resolve( { ...obj, _id:res } );
				}
			});
		});
		return {
			type: 		CONSTANTES[ COLLECTION ].ADD,
			payload: 	p
		};
	}
	function get(cbk = ()=>{}){
		let p = new Promise( ( resolve, reject ) =>{
			Meteor.call("get" + COLLECTION+"s",(err,res)=>{
				if(err){
					reject( err );
				}else{
					cbk( res );
					resolve( res );
				}
			});
		});
		return {
			type: 		CONSTANTES[ COLLECTION ].GET,
			payload: 	p
		};
	}
	function get1(obj, cbk = () => {}){
		let p = new Promise( ( resolve, reject ) => {
			Meteor.call("get" + COLLECTION,obj,(err,res)=>{
			if(err){
					reject(err);
				}else{
					cbk(res);
					resolve(res);
				}
			});
		});
		return {
			type: 		CONSTANTES[ COLLECTION ].GET1,
			payload: 	p
		};
	}
	function rm(obj, cbk =()=>{}){
		let p = new Promise( ( resolve, reject ) => {
			Meteor.call("rm" + COLLECTION, obj ,(err)=>{
				if(err){
					reject(err);
				}else{
					cbk();
					resolve( obj );
				}
			});
		});
		return {
			type: 		CONSTANTES[ COLLECTION ].RM,
			payload: 	p
		};

	}
	function up(obj, cbk = ()=>{}){
		let p = new Promise( ( resolve, reject ) => {
			Meteor.call("up" + COLLECTION,obj,(err)=>{
				if(err){
					reject(err);
				}else{
					cbk(res);
					resolve(res);
				}
			});
		});
		return {
			type: 		CONSTANTES[ COLLECTION ].UP,
			payload: 	p
		};
	}
	//=========================================================
	function controle(val){
		return {
			type: 		CONSTANTES[ COLLECTION ].CONTROLE,
			payload: 	val
		};
	}
	function controleInit(val){
		return {
			type: 		CONSTANTES[ COLLECTION ].CONTROLE_INIT,
			payload: 	val
		};
	}

	ACTION[COLLECTION] = {
		add,
		rm,
		get,
		get1,
		up,	
		controle,
	};

});
export const CONSTANTES = CONSTANTE;
export const ACTIONS = ACTION;

