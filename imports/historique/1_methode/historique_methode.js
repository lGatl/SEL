	const BD_HISTORIQUE = new Mongo.Collection("historique")

	Meteor.methods({
		addHistorique:(obj)=>{ 
			return BD_HISTORIQUE.insert(obj)
		},
		getHistoriques:()=>{
			return BD_HISTORIQUE.find().fetch()
		},
		get1Historique: (obj)=>{
			 return BD_HISTORIQUE.findOne(obj);
		},
		rmHistorique:(obj)=>{
			BD_HISTORIQUE.remove(obj)
		},
		upHistorique:(obj)=>{		
			BD_HISTORIQUE.update({_id:obj._id},{$set:obj})
		}
	})

