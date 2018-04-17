import React from "react";
import {mount} from "react-mounter";

import {Layout, LayoutAnnonce, LayoutLAn} from "../3_layout/layout";

import Accueil from "../4_pages/Accueil";
import Actualite from "../4_pages/Actualite";
import ListeAnnonce from "../annonce/5_smartComponent/ListeAnnonce";
import Connexion from "../4_pages/Connexion";
import Contact from "../4_pages/Contact";
import Kesako from "../4_pages/Kesako";
import LesSelistes from "../4_pages/LesSelistes";
import MonCompte from "../4_pages/MonCompte";
import SmartDev from "../_common/5_smartComponent/SmartDev";
import AnnonceDetaillee from "../annonce/5_smartComponent/AnnonceDetaillee";



FlowRouter.route( "/", {
	name: "home",
	action: function() {
		mount(Layout, { content: <Accueil /> });
		 window.scrollTo(0, 0);
	}
});
FlowRouter.route( "/actualite", {
	name: "actualite",
	action: function() {
		mount(LayoutLAn, { content: <Actualite /> });
		 window.scrollTo(0, 0);
	}
});
FlowRouter.route( "/annonce", {
	name: "annonce",
	action: function() {
		mount(LayoutAnnonce, { content: <ListeAnnonce /> });
		 window.scrollTo(0, 0);
	}
});
FlowRouter.route( "/annonce/offre", {
	name: "annonce",
	action: function() {
		mount(LayoutAnnonce, { content: <ListeAnnonce type = "offre"/> });
		 window.scrollTo(0, 0);
	}
});
FlowRouter.route( "/annonce/demande", {
	name: "annonce",
	action: function() {
		mount(LayoutAnnonce, { content: <ListeAnnonce type = "demande" /> });
		 window.scrollTo(0, 0);
	}
});
FlowRouter.route( "/annonce/:_id", {
	name: "annonce",
	action: function(params) {
		mount(LayoutLAc, { content: <AnnonceDetaillee _id={params._id}/> });
		 window.scrollTo(0, 0);
	}
});
FlowRouter.route( "/connexion", {
	name: "connexion",
	action: function() {
		mount(Layout, { content: <Connexion /> });
		 window.scrollTo(0, 0);
	}
});
FlowRouter.route( "/contact", {
	name: "contact",
	action: function() {
		mount(Layout, { content: <Contact /> });
		 window.scrollTo(0, 0);
	}
});
FlowRouter.route( "/kesako", {
	name: "kesako",
	action: function() {
		mount(Layout, { content: <Kesako /> });
		 window.scrollTo(0, 0);
	}
});
FlowRouter.route( "/les_selistes", {
	name: "les_selistes",
	action: function() {
		mount(Layout, { content: <LesSelistes /> });
		 window.scrollTo(0, 0);
	}
});



FlowRouter.route( "/dev", {
	name: "dev",
	action: function() {
		mount(Layout, { content: <SmartDev /> });
		 window.scrollTo(0, 0);
	}
});




