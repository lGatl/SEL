Meteor.methods({
	getUsers: (obj) => {
		return Meteor.users.find(obj).fetch();
	},
	get1User: (obj) => {
		return Meteor.users.findOne(obj);
	},
	rmUser: (obj) => {
		return Meteor.users.remove(obj);
	},
	/*Modifie un utilisateur*/
	upUser: (aSauver) => {
		Meteor.users.update({_id:obj._id},{$set:obj});
	},

});
