$(function() {



const foodApp = {};

foodApp.apiKey = "ef7bb4cac402a95c8319040f2339e230";
foodApp.url = "https://developers.zomato.com/api/v2.1/search";


foodApp.getFood = () => {
//gets food data
$.ajax({
	url: foodApp.url,
	method: 'GET',
	dataType: 'json',
	headers: {
		"user-key": foodApp.url,
	},
	data: {
		city_id: 89,
		cuisines: '411',
		count: 2
		// q: "toronto"
	}
}).then(function (response) {
	console.log('something is happening');
	console.log(response.restaurants);
});
}

foodApp.displayFood = () => {
	//displays food data
}



})