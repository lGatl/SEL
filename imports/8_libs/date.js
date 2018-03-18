export const dateToFormat = date => {
	let jour = date.getDate();
	let mois = date.getMonth()+1;
	let annee = date.getFullYear();
	return jour +"/"+mois+"/"+annee;
};
