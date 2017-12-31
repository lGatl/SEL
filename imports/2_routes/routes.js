import React from 'react';
import {mount} from 'react-mounter';

import {Layout} from '../3_layout/layout';

import Accueil from '../4_pages/Accueil';
import Actualite from '../4_pages/Actualite';
import Annonce from '../4_pages/Annonce';
import Connexion from '../4_pages/Connexion';
import Contact from '../4_pages/Contact';
import Kesako from '../4_pages/Kesako';
import LesSelistes from '../4_pages/LesSelistes';
import MonCompte from '../4_pages/MonCompte';

FlowRouter.route( '/', {
	name: 'home',
	action: function() {
		mount(Layout, { content: <Accueil /> });
		 window.scrollTo(0, 0);
	}
});
FlowRouter.route( '/actualite', {
	name: 'actualite',
	action: function() {
		mount(Layout, { content: <Actualite /> });
		 window.scrollTo(0, 0);
	}
});
FlowRouter.route( '/annonce', {
	name: 'annonce',
	action: function() {
		mount(Layout, { content: <Annonce /> });
		 window.scrollTo(0, 0);
	}
});
FlowRouter.route( '/connexion', {
	name: 'connexion',
	action: function() {
		mount(Layout, { content: <Connexion /> });
		 window.scrollTo(0, 0);
	}
});
FlowRouter.route( '/contact', {
	name: 'contact',
	action: function() {
		mount(Layout, { content: <Contact /> });
		 window.scrollTo(0, 0);
	}
});
FlowRouter.route( '/kesako', {
	name: 'kesako',
	action: function() {
		mount(Layout, { content: <Kesako /> });
		 window.scrollTo(0, 0);
	}
});
FlowRouter.route( '/les_selistes', {
	name: 'les_selistes',
	action: function() {
		mount(Layout, { content: <LesSelistes /> });
		 window.scrollTo(0, 0);
	}
});
FlowRouter.route( '/mon_compte', {
	name: 'mon_compte',
	action: function() {
		mount(Layout, { content: <MonCompte /> });
		 window.scrollTo(0, 0);
	}
});
