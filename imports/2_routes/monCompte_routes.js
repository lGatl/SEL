import React from "react";
import {mount} from "react-mounter";

import {Layout, LayoutMonCompte} from "../3_layout/layout";

import MonCompte from "../4_pages/MonCompte";
import FormAnnonce from "../annonce/5_smartComponent/FormAnnonce";
import ListeAnnonce from "../annonce/5_smartComponent/ListeAnnonce";
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
		mount(LayoutMonCompte, { content: <MonCompte type = "informations"/> });
		window.scrollTo(0, 0);
	}
});
mon_compteRoutes.route( "/releve", {
	name: "mon_compte",
	action: function() {
		mount(LayoutMonCompte, { content: <MonCompte type = "releve" /> });
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
		mount(LayoutMonCompte, { content: <ListeAnnonce type="offre" mon_compte/> });
		window.scrollTo(0, 0);
	}
});
mon_compteRoutes.route( "/annonce/demande", {
	name: "mon_compte",
	action: function() {
		mount(LayoutMonCompte, { content: <ListeAnnonce type="demande" mon_compte/> });
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
