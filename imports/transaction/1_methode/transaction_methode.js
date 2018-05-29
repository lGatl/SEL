import { BD } from "../../5_methodes/methodes.js";

Meteor.methods({
	creeTransaction:(annonce_id, proposition_id,note)=>{ 
		let annonce = BD.Annonce.findOne({_id: annonce_id});
		let proposition = BD.Proposition.findOne({_id: proposition_id});
		let prestataire = BD.Users.findOne({_id: proposition.prestataire});
		let payeur = BD.Users.findOne({_id: proposition.payeur});
		if((annonce._id==proposition.annonce_id)&&
			(annonce.etat=="valider")&&
			(proposition.etat=="accepte")&&
			(annonce.statut=="en cours")&&
			prestataire&&
			payeur){
			BD.Annonce.update({_id:annonce._id},{$set:{statut:"termine"}});
			BD.Proposition.update({_id:proposition._id},{$set:{etat:"effectue"}});
			BD.Users.update({_id:prestataire._id},{$set:{
				"profile.solde":(prestataire.profile.solde + proposition.prix),
				"profile.note":[...prestataire.profile.note,note]
			}});
			BD.Users.update({_id:payeur._id},{$set:{"profile.solde":(payeur.profile.solde - proposition.prix)}});
			BD.Transaction.insert({
				note,
				annonce:{...annonce, statut:"termine"},
				proposition:{...proposition, etat:"effectue"},
				prestataire: {...prestataire, profile:{...prestataire.profile,solde:(prestataire.profile.solde + proposition.prix),note:[...prestataire.profile.note,note]}},
				payeur: {...payeur, profile:{...payeur.profile,solde:(payeur.profile.solde - proposition.prix)}},
				date: new Date(Date.now())
			});
			return {
				annonce:{...annonce, statut:"termine"},
				proposition:{...proposition, etat:"effectue"},
				prestataire: {...prestataire, profile:{...prestataire.profile,solde:(prestataire.profile.solde + proposition.prix),note:[...prestataire.profile.note,note]}},
				payeur: {...payeur, profile:{...payeur.profile,solde:(payeur.profile.solde - proposition.prix)}},
				date: new Date(Date.now())
			};
		}else{console.log("probleme: transaction_methode.js");
			return null;
		}

		
	},
});

