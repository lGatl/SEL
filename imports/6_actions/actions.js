import { COLLECTIONS } from "../5_methodes/methodes";

import { CONSTANTE_Users, ACTION_Users } from "../user/2_action/user_action";
import { CONSTANTE_Menu, ACTION_Menu } from "./menu_action";

const CONSTANTE = {};
const ACTION = {};

COLLECTIONS.forEach((COLLECTION)=>{

	CONSTANTE[ COLLECTION ] ={ 
		ADD : COLLECTION+"_ADD",
		GET : COLLECTION+"_GET",
		GET1 : COLLECTION+ "_GET1",
		COUNT : COLLECTION+"_COUNT",
		RM : COLLECTION+"_RM",
		UP : COLLECTION+"_UP",
		UPM : COLLECTION+"_UPM",
		UPS : COLLECTION+"_UPS",
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
			payload: 	p,
		};
	}
	function get(obj, soskli, state, cbk = ()=>{}){
		let p = new Promise( ( resolve, reject ) =>{
			Meteor.call("get" + COLLECTION+"s",obj,soskli,(err,res)=>{
				if(err){
					//console.log(err)
					reject( err );
				}else{
					//console.log(res)
					cbk( res );
					
					resolve( { val:res, state} );
				}
			});
		});
		return {
			type: 		CONSTANTES[ COLLECTION ].GET,
			payload: 	p,
		};
	}
	function get1(obj, state, cbk = () => {}){
		let p = new Promise( ( resolve, reject ) => {
			Meteor.call("get1" + COLLECTION,obj,(err,res)=>{
				if(err){
					reject(err);
				}else{
					cbk( res );
					resolve( { val:res, state} );
				}
			});
		});
		return {
			type: 		CONSTANTES[ COLLECTION ].GET1,
			payload: 	p,
		};
	}
	function count(obj, state, cbk = ()=>{}){
		let p = new Promise( ( resolve, reject ) =>{
			Meteor.call("count" + COLLECTION+"s",obj,(err,res)=>{
				if(err){
					//console.log(err)
					reject( err );
				}else{
					//console.log(res)
					cbk( res );
					
					resolve( { val:res, state} );
				}
			});
		});
		return {
			type: 		CONSTANTES[ COLLECTION ].COUNT,
			payload: 	p,
		};
	}
	function rm(obj, cbk =()=>{}){
		let p = new Promise( ( resolve, reject ) => {
			Meteor.call("rm" + COLLECTION, obj ,(err,res)=>{
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
			payload: 	p,
		};
	}
	function up(reco,modif, cbk = ()=>{}){
		let p = new Promise( ( resolve, reject ) => {
			Meteor.call("up" + COLLECTION,reco,modif,(err,res)=>{
				if(err){
					reject(err);
				}else{

					cbk( res );
					resolve( {...modif,_id:res} );
				}
			});
		});
		return {
			type: 		CONSTANTES[ COLLECTION ].UP,
			payload: 	p,
		};
	}
	function upm(obj, cbk = ()=>{}){
		let p = new Promise( ( resolve, reject ) => {
			Meteor.call("upm" + COLLECTION,obj,(err,res)=>{
				if(err){
					reject(err);
				}else{
					cbk( res );
					resolve( { val:res, state} );
				}
			});
		});
		return {
			type: 		CONSTANTES[ COLLECTION ].UPM,
			payload: 	p,
		};
	}
	function ups(obj, cbk = ()=>{}){
		let p = new Promise( ( resolve, reject ) => {
			Meteor.call("up" + COLLECTION,obj,(err,res)=>{
				if(err){
					reject(err);
				}else{
					cbk( res );
					resolve( { val:res, state} );
				}
			});
		});
		return {
			type: 		CONSTANTES[ COLLECTION ].UP,
			payload: 	p,
		};
	}
	//=========================================================
	function controle(val){
		return {
			type: 		CONSTANTES[ COLLECTION ].CONTROLE,
			payload: 	val
		};
	}

	ACTION[COLLECTION] = {
		add,
		rm,
		get,
		get1,
		count,
		up,
		upm,
		ups,	
		controle,
	};

});



export const CONSTANTES = { ...CONSTANTE, 
	Users:{ ...CONSTANTE.Users, ...CONSTANTE_Users },
	Menu:{...CONSTANTE_Menu}
};
export const ACTIONS = { ...ACTION,
	Users:{ ...ACTION.Users, ...ACTION_Users },
	Menu:{...ACTION_Menu}
};

