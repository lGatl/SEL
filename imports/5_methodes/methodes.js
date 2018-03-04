import SimpleSchema from 'simpl-schema';
export const COLLECTIONS = ["Users","Actualite","Annonce","Categorie"];

var DateS = {
	type: Date,
	autoValue: () => new Date(Date.now()),
	optional: true
};

const SCHEMA ={
	Actualite : new SimpleSchema({
		titre: { type: String },
		description: { type: String },
		date: DateS
	}),
	Annonce : new SimpleSchema({
		titre: { type: String },
		type: { type:String },
		user_id: { type:String },
		description: { type: String },
		date: DateS
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
		[ "rm" + COLLECTION ]:(obj)=>{
			return BD[COLLECTION].remove(obj); // retourne 1 si l'objet à été supprimé
		},
		[ "up" + COLLECTION ]:(obj)=>{		
			return BD[COLLECTION].update({_id:obj._id},{$set:obj}); //retourne l'id de l'objet updaté => res.insertedId
		},
		[ "ups"+COLLECTION ]:(obj)=>{		
			return BD[COLLECTION].upsert({_id:obj._id},{$set:obj}); //retourne l'id de l'objet upserté => res.insertedId
		}
	});

	SCHEMA[COLLECTION]?BD[COLLECTION].attachSchema(SCHEMA[COLLECTION]):"";

});
