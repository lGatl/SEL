import React from 'react';
import {mount} from 'react-mounter';

import {Layout} from '../3_layout/layout';

import Accueil from '../4_pages/Accueil';
import Contact from '../4_pages/Contact';
import CreerUnCompte from '../4_pages/CreerUnCompte';
import Kesako from '../4_pages/Kesako';

FlowRouter.route( '/', {
	name: 'home',
	action: function() {
		mount(Layout, { content: <Accueil /> });
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
FlowRouter.route( '/compte', {
	name: 'Creer Un Compte',
	action: function() {
		mount(Layout, { content: <CreerUnCompte /> });
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
