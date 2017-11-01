	const BD_CATEGORIE = new Mongo.Collection("categorie")

	Meteor.methods({
		addCategorie:(obj)=>{ 
			return BD_CATEGORIE.insert(obj)
		},
		getCategories:()=>{
			return BD_CATEGORIE.find().fetch()
		},
		get1Categorie: (obj)=>{
			 return BD_CATEGORIE.findOne(obj);
		},
		rmCategorie:(obj)=>{
			BD_CATEGORIE.remove(obj)
		},
		upCategorie:(obj)=>{		
			BD_CATEGORIE.update({_id:obj._id},{$set:obj})
		}
	})

