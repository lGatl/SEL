import SimpleSchema from 'simpl-schema';
export const COLLECTIONS = ["Users","Actualite","Annonce","Categorie"];

const SCHEMA ={
	Actualite : new SimpleSchema({
		titre: { type: String },
		description: { type: String },
		publier:{ type:Boolean },
		date: { type: Date }
	}),
	Annonce : new SimpleSchema({
		titre: { type: String },
		type: { type:String },
		etat: { type:String },
		user_id: { type:String },
		description: { type: String },
		categorie:{ type:String },
		date_de_fin:{type:String},
		email:{type:Boolean},
		telephone:{type:Boolean},
		adresse:{type:Boolean},
		date: {type: Date}
	})
};

COLLECTIONS.forEach((COLLECTION) =>{
	var BD = {};
	COLLECTION.toLowerCase() == "users" ? BD[COLLECTION] = Meteor[COLLECTION.toLowerCase()] : BD[COLLECTION] = new Mongo.Collection(COLLECTION.toLowerCase());
		
	Meteor.methods({
		[ "add" + COLLECTION ]:(obj)=>{ 
			return BD[COLLECTION].insert(obj); // retourne l'id du nouvel objet
		},
		[ "get" + COLLECTION+"s" ]:(obj)=>{
			return BD[COLLECTION].find(obj).fetch(); // retourne un tableau d'objets trouvés
		},
		[ "get1" + COLLECTION ]: (obj)=>{
			return BD[COLLECTION].findOne(obj); // retourne l'objet trouvé
		},
		[ "count" + COLLECTION+"s" ]:(obj)=>{
			return BD[COLLECTION].find(obj).count(); // retourne le compte d'éléments qui correspond à la condition de find
		},
		[ "rm" + COLLECTION ]:(obj)=>{
			return BD[COLLECTION].remove(obj); // retourne 1 si l'objet à été supprimé
		},
		[ "up" + COLLECTION ]:(reco,modif)=>{		
			let succed = BD[COLLECTION].update(reco,{$set:modif}); //retourne l'id de l'objet updaté => res.insertedId
			return succed == 1 ? BD[COLLECTION].findOne(reco)._id:false;
		},
		[ "upm" + COLLECTION ]:(obj)=>{		
			return BD[COLLECTION].update(obj,{multi:true}); //retourne l'id de l'objet updaté => res.insertedId
		},
		[ "ups"+COLLECTION ]:(obj)=>{		
			return BD[COLLECTION].upsert(obj); //retourne l'id de l'objet upserté => res.insertedId
		},
	});

	SCHEMA[COLLECTION]?BD[COLLECTION].attachSchema(SCHEMA[COLLECTION]):"";

});
