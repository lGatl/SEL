import axios from "axios";

const getData = (term, callback) => {
	const root = "https://nominatim.openstreetmap.org/search?q=";
	const end = "&format=json&polygon=1&addressdetails=1";
	axios.get(root + term + end)
		.then((response) => {
			
			callback(response);
		})
		.catch((error) => {
			callback(error);
		});
};

export default googleApi = {
  getData
}
