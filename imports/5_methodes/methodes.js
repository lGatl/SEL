import SimpleSchema from 'simpl-schema';
export const COLLECTIONS = ["Actualite","Annonce"];

const SCHEMA ={
	Actualite : new SimpleSchema({
		titre: { type: String },
		description: { type: String },
	}),
	Annonce : new SimpleSchema({
		titre: { type: String },
		description: { type: String },
	})
};

COLLECTIONS.forEach((COLLECTION) =>{
	var BD = {};
	BD[COLLECTION] = new Mongo.Collection(COLLECTION.toLowerCase());
		
	Meteor.methods({
		[ "add" + COLLECTION ]:(obj)=>{ 
			return BD[COLLECTION].insert(obj); // retourne l'id du nouvel objet
		},
		[ "get" + COLLECTION+"s" ]:()=>{
			return BD[COLLECTION].find().fetch(); // retourne un tableau d'objets trouvés
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

	BD[COLLECTION].attachSchema(SCHEMA[COLLECTION]);

});
