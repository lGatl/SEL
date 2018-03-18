import React from "react";
import {mount} from "react-mounter";

import {Layout, LayoutMonCompte} from "../3_layout/layout";

import MonCompte from "../4_pages/MonCompte";
import FormCategorie from "../categorie/5_smartComponent/FormCategorie";
import FormActu from "../actualite/5_smartComponent/FormActu";
import GererAnnonces from "../annonce/5_smartComponent/GererAnnonces";


var adminRoutes = FlowRouter.group({
	prefix: "/admin",
	name: "admin",
	triggersEnter: [function(context, redirect) {
		if (!Meteor.userId()) {
			console.log("Désolé, cette page n'existe pas ou vous tu n'as pas la permission d'y accéder");
			redirect("/");
		}
	}],
});

adminRoutes.route("/", {
	name: "admin",
	action(){
		mount(LayoutMonCompte, {content: <MonCompte />});
		window.scrollTo(0, 0);
	},
});
adminRoutes.route("/annonce", {
	name: "admin",
	action(){
		mount(LayoutMonCompte, {content: <GererAnnonces />});
		window.scrollTo(0, 0);
	},
});
adminRoutes.route("/actualite", {
	name: "admin",
	action(){
		mount(LayoutMonCompte, {content: <FormActu />});
		window.scrollTo(0, 0);
	},
});
adminRoutes.route("/categorie", {
	name: "admin",
	action(){
		mount(LayoutMonCompte, {content: <FormCategorie />});
		window.scrollTo(0, 0);
	},
});
adminRoutes.route("/configuration", {
	name: "admin",
	action(){
		mount(LayoutMonCompte, {content: <MonCompte />});
		window.scrollTo(0, 0);
	},
});
adminRoutes.route("/statistique", {
	name: "admin",
	action(){
		mount(LayoutMonCompte, {content: <MonCompte />});
		window.scrollTo(0, 0);
	},
});


