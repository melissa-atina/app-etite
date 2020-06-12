
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
        })
        .then((result) => {
            // foodApp.displayFood (result)
            console.log(result.restaurants)
            
        });
	}
    
    // foodApp.displayFood = (result) => {
    //     // organize result 

    //     //for each item in the array, append new li with content from our 'content' array
    //     response.forEach((item) => {
    //         // each restaurant object is here
    //         const title = $('<h2>').text(item.restaurant.name);
    //         const rating = $('<p>').text(item.restaurant.user_rating["aggregate_rating"]);
    //         const address = $('<p>').text(item.restaurant.location["address"]);
    //         const container = $('<li>').append(title, rating, address);
    //         $('ul').append(container);
    //         // console.log(container)
    //         // $('ul').text(title);
    //         response.push(title, rating, address)
    //         })
    //     }
        //function that gives random integer
            // function getRandomInt(max) {
            //     return Math.floor(Math.random() * Math.floor(max)) + 1;
            // }

        //for each 'restaurant' in the response array, give each block a random "position" between 1 and 9
            // response.forEach(item => {
            // response.position = getRandomInt(30);
            //     });

        //sort our array based on random "position" value, and makes sure that no li's are repeated on the page
            // response.sort(function(a, b) {
            //     return a.position - b.position
            // });

        // the number of blocks(li) to show on the page
            // response.length = 2;



    response.init = () => {
        foodApp.foodEntity(207);
        }

    $(function() {
        response.init();
    })
