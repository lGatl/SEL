	const BD_PROPOSITION = new Mongo.Collection("proposition")

	Meteor.methods({
		addProposition:(obj)=>{	 
			return BD_PROPOSITION.insert(obj)
		},
		getPropositions:()=>{
			return BD_PROPOSITION.find().fetch()
		},
		get1Proposition: (obj)=>{
			 return BD_PROPOSITION.findOne(obj);
		},
		rmProposition:(obj)=>{
			BD_PROPOSITION.remove(obj)
		},
		upProposition:(obj)=>{		
			BD_PROPOSITION.update({_id:obj._id},{$set:obj})
		}
	})

