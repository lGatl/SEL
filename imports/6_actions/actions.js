import { COLLECTIONS } from "../5_methodes/methodes";

import { CONSTANTE_Users, ACTION_Users } from "../user/2_action/user_action";
import { CONSTANTE_Menu, ACTION_Menu } from "./menu_action";
import { CONSTANTE_Titre, ACTION_Titre } from "./titre_action";


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
					resolve( { val:{ ...obj, _id:res }, state:null } );
				}
			});
		});
		return {
			type: 		CONSTANTES[ COLLECTION ].ADD,
			payload: 	p,
		};
	}
	function add_state(obj,state, cbk=()=>{}){
		let p = new Promise( ( resolve, reject ) => {
			Meteor.call("add" + COLLECTION, obj ,(err,res)=>{
				if(err){
					reject(err);
				}else{
					cbk( res );
					resolve( { val:{ ...obj, _id:res }, state } );
				}
			});
		});
		return {
			type: 		CONSTANTES[ COLLECTION ].ADD,
			payload: 	p,
		};
	}
	function get(obj, cbk = ()=>{}){
		let p = new Promise( ( resolve, reject ) =>{
			Meteor.call("get" + COLLECTION+"s",obj,null,(err,res)=>{
				if(err){
					//console.log(err)
					reject( err );
				}else{
					//console.log(res)
					cbk( res );
					
					resolve( { val:res, state:null} );
				}
			});
		});
		return {
			type: 		CONSTANTES[ COLLECTION ].GET,
			payload: 	p,
		};
	}
	function get_SSL(obj, soskli = null, cbk = ()=>{}){
		let p = new Promise( ( resolve, reject ) =>{
			Meteor.call("get" + COLLECTION+"s",obj,soskli,(err,res)=>{
				if(err){
					//console.log(err)
					reject( err );
				}else{
					//console.log(res)
					cbk( res );
					
					resolve( { val:res, state:null} );
				}
			});
		});
		return {
			type: 		CONSTANTES[ COLLECTION ].GET,
			payload: 	p,
		};
	}
	function get_state(obj, state =  null, cbk = ()=>{}){
		let p = new Promise( ( resolve, reject ) =>{
			Meteor.call("get" + COLLECTION+"s",obj,null,(err,res)=>{
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
	function get_SSL_state(obj, soskli = null, state =  null, cbk = ()=>{}){
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
	function get_state_SSL(obj, state =  null, soskli = null, cbk = ()=>{}){
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

	function get1(obj, cbk = () => {}){
		let p = new Promise( ( resolve, reject ) => {
			Meteor.call("get1" + COLLECTION,obj,(err,res)=>{
				if(err){
					reject(err);
				}else{
					cbk( res );
					resolve( { val:res, state:null} );
				}
			});
		});
		return {
			type: 		CONSTANTES[ COLLECTION ].GET1,
			payload: 	p,
		};
	}
	function get1_state(obj, state, cbk = () => {}){
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
	function count(obj, cbk = ()=>{}){
		let p = new Promise( ( resolve, reject ) =>{
			Meteor.call("count" + COLLECTION+"s",obj,(err,res)=>{
				if(err){
					//console.log(err)
					reject( err );
				}else{
					//console.log(res)
					cbk( res );
					
					resolve( { val:res, state:null} );
				}
			});
		});
		return {
			type: 		CONSTANTES[ COLLECTION ].COUNT,
			payload: 	p,
		};
	}
	function count_state(obj, state, cbk = ()=>{}){
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
	function rm(obj, cbk = ()=>{}){
		let p = new Promise( ( resolve, reject ) => {
			Meteor.call("rm" + COLLECTION, obj ,(err,res)=>{
				if(err){
					reject(err);
				}else{
					cbk();
					resolve( { val:obj, state:null} );
				}
			});
		});
		return {
			type: 		CONSTANTES[ COLLECTION ].RM,
			payload: 	p,
		};
	}
	function rm_state(obj, state, cbk = ()=>{}){
		let p = new Promise( ( resolve, reject ) => {
			Meteor.call("rm" + COLLECTION, obj ,(err,res)=>{
				if(err){
					reject(err);
				}else{
					cbk();
					resolve( { val:obj, state } );
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
					resolve( { val:{...modif,_id:res},state:null} );
				}
			});
		});
		return {
			type: 		CONSTANTES[ COLLECTION ].UP,
			payload: 	p,
		};
	}
	function up_state(reco,modif,state, cbk = ()=>{}){
		let p = new Promise( ( resolve, reject ) => {
			Meteor.call("up" + COLLECTION,reco,modif,(err,res)=>{
				if(err){
					reject(err);
				}else{

					cbk( res );
					resolve( { val:{...modif,_id:res},state} );
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
					resolve( { val:res, state:null} );
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
					resolve( { val:res, state:null} );
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
		add_state,
		rm,
		rm_state,
		get,
		get_SSL,
		get_state,
		get_SSL_state,
		get_state_SSL,
		get1,
		get1_state,
		count,
		count_state,
		up,
		up_state,
		upm,
		ups,	
		controle,
	};

});



export const CONSTANTES = { ...CONSTANTE, 
	Users:{ ...CONSTANTE.Users, ...CONSTANTE_Users },
	Menu:{...CONSTANTE_Menu},
	Titre:{...CONSTANTE_Titre}
};
export const ACTIONS = { ...ACTION,
	Users:{ ...ACTION.Users, ...ACTION_Users },
	Menu:{...ACTION_Menu},
	Titre:{...ACTION_Titre}
};

