import React from "react";
import {mount} from "react-mounter";

import {Layout, LayoutMonCompte} from "../3_layout/layout";

import MonReleveDeCompte from "../user/5_smartComponent/MonReleveDeCompte";
import MesInformations from "../user/5_smartComponent/MesInformations";
import FormAnnonce from "../annonce/5_smartComponent/FormAnnonce";
import ListeAnnonceMonCompte from "../annonce/5_smartComponent/ListeAnnonceMonCompte";
import ListeProposition from "../proposition/5_smartComponent/ListeProposition";


var mon_compteRoutes = FlowRouter.group({
	prefix: "/mon_compte",
	name: "mon_compte",
	triggersEnter: [function(context, redirect) {
		if (!Meteor.userId()) {
			console.log("Désolé, cette page n'existe pas ou vous tu n'as pas la permission d'y accéder");
			redirect("/connexion");
		}
	}],
});

mon_compteRoutes.route( "/informations", {
	name: "mon_compte",
	action: function() {
		mount(LayoutMonCompte, { content: <MesInformations/> });
		window.scrollTo(0, 0);
	}
});
mon_compteRoutes.route( "/releve", {
	name: "mon_compte",
	action: function() {
		mount(LayoutMonCompte, { content: <MonReleveDeCompte/> });
		window.scrollTo(0, 0);
	}
});
mon_compteRoutes.route( "/annonce/offre/creer", {
	name: "mon_compte",
	action: function() {
		mount(LayoutMonCompte, { content: <FormAnnonce type="offre" /> });
		window.scrollTo(0, 0);
	}
});
mon_compteRoutes.route( "/annonce/demande/creer", {
	name: "mon_compte",
	action: function() {
		mount(LayoutMonCompte, { content: <FormAnnonce type="demande" /> });
		window.scrollTo(0, 0);
	}
});
mon_compteRoutes.route( "/annonce/offre", {
	name: "mon_compte",
	action: function() {
		mount(LayoutMonCompte, { content: <ListeAnnonceMonCompte type="offre" mon_compte/> });
		window.scrollTo(0, 0);
	}
});
mon_compteRoutes.route( "/annonce/demande", {
	name: "mon_compte",
	action: function() {
		mount(LayoutMonCompte, { content: <ListeAnnonceMonCompte type="demande" mon_compte/> });
		window.scrollTo(0, 0);
	}
});
mon_compteRoutes.route( "/annonce/proposition", {
	name: "mon_compte",
	action: function() {
		mount(LayoutMonCompte, { content: <ListeProposition /> });
		window.scrollTo(0, 0);
	}
});

