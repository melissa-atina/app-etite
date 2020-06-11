
    const foodApp = {};
    foodApp.apiKey = "ef7bb4cac402a95c8319040f2339e230";
    foodApp.apiUrl = "https://developers.zomato.com/api/v2.1/search";

    // make empty array for our API response
    const response = [];
    
    // call zomato API with cuisine query
    foodApp.foodEntity = (cuisine) => {
        $.ajax({
            url: foodApp.apiUrl,
            method: 'GET',
            dataType: 'json',
            headers: {
                "user-key": foodApp.apiKey,
            },
            data: {
                city_id: 89,
                cuisines: cuisine ,
                // data: 'json',
                // count: 2
                // q: "toronto"
            },
        }).then((result) => {
            // console.log(result.restaurants)
            foodApp.displayFood(result)
        });
	}


		foodApp.displayFood = (result) => {
			// organize result
			result.restaurants.forEach((item) => {
		// each restaurant object is here
				const title = item.restaurant.name;
				const rating = item.restaurant.user_rating["aggregate_rating"];
				const address = item.restaurant.location["address"];

				
				// push title to response array we created earlier
				response.push(title, rating, address)
			})
		}
            // Do stuff w your response $HERE
            // console.log(response) // example
	
	function randomFood(response) {
		return Math.floor(Math.random() * Math.floor(response.length))
	}
	console.log(randomFood)

    
    // hmmmm okay so this works but what’s happening is that
    // this function ⤵ gets called BEFORE the response comes back from
    // your api call - so either you will need to put all your stuff $HERE↖ so that code runs after you get a response back, or wrap all this code in an async function, and then await the API response

    console.log(response) // this will run before the API reponse so `response` will show as empty


    foodApp.init = () => {
        foodApp.foodEntity(207);
    }   

    $(function() {
        foodApp.init();
    })
    