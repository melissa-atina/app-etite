const foodApp = {};
foodApp.apiKey = "ef7bb4cac402a95c8319040f2339e230";
foodApp.apiUrl = "https://developers.zomato.com/api/v2.1/search";

//shuffel array function
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
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
            cuisines: `${cuisine}`,
            // data: 'json',
            // count: 2
            // q: "toronto"
        },
    }).then((result) => {
        // console.log(result.restaurants)
        foodApp.displayFood(result)
        })
    }


    foodApp.displayFood = (result) => {
        $('ul').empty();
        // organize result
        result.restaurants.forEach((item) => {
            // each restaurant object is here
            const title = $('<h2>').text(item.restaurant.name);
            const rating = $('<p>').text(item.restaurant.user_rating["aggregate_rating"]);
            const address = $('<p>').text(item.restaurant.location["address"]);
            const container = $('<li>').append(title, rating, address);
            $('ul').append(container);
            // push title to response array we created earlier
            response.push(title, rating, address)
        })
        shuffleArray(response)
    }

    foodApp.updateTitle = (subject) => {
        $('#page-title').find('span').text(subject)
    }
    
    foodApp.init = () => {
        
        $('#cuisine').on('change',function() {
            const cuisineName = $(this).find(':selected').text();
            const cuisine = this.value;
            foodApp.updateTitle(cuisineName);
            foodApp.foodEntity(cuisine);
        })
    }   

$(function() {
    foodApp.init();
})