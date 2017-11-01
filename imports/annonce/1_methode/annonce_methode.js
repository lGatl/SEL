	const BD_ANNONCE = new Mongo.Collection("annonce")

	Meteor.methods({
		addAnnonce:(obj)=>{
			 
			return BD_ANNONCE.insert(obj)
		},
		getAnnonces:()=>{
			return BD_ANNONCE.find().fetch()
		},
		get1Annonce: (obj)=>{
			 return BD_ANNONCE.findOne(obj);
		},
		rmAnnonce:(obj)=>{
			BD_ANNONCE.remove(obj)
		},
		upAnnonce:(obj)=>{		
			BD_ANNONCE.update({_id:obj._id},{$set:obj})
		}
	})

