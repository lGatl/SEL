const BD_ARTICLE = new Mongo.Collection("article");

Meteor.methods({
	addArticle:(obj)=>{ 
		return BD_ARTICLE.insert(obj);
	},
	getArticles:()=>{
		return BD_ARTICLE.find().fetch();
	},
	get1Article: (obj)=>{
		return BD_ARTICLE.findOne(obj);
	},
	rmArticle:(obj)=>{
		BD_ARTICLE.remove(obj);
	},
	upArticle:(obj)=>{		
		BD_ARTICLE.update({_id:obj._id},{$set:obj});
	}
}
);

