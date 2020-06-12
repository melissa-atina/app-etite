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
            const title = $('<h2>').text(item.restaurant.name);
            const rating = $('<p>').text(item.restaurant.user_rating["aggregate_rating"]);
            const address = $('<p>').text(item.restaurant.location["address"]);
            const container = $('<li>').append(title, rating, address);
            $('ul').append(container);
            // console.log(container)
            // $('ul').text(title);
            // push title to response array we created earlier
            
            const randomItem = [Math.floor(Math.random() * response.length)]
            console.log(randomItem)

            response.push(title, rating, address)
        })
    }
        // Do stuff w your response $HERE
        // console.log(response) // example


foodApp.init = () => {
    foodApp.foodEntity(207);
}   

$(function() {
    foodApp.init();
})