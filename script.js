const foodApp = {};
foodApp.apiKey = "ef7bb4cac402a95c8319040f2339e230";
foodApp.apiUrl = "https://developers.zomato.com/api/v2.1/search";

// HEADER BUTTON
// ON START, button scrolls them to the cuisine select menu
$('.scroll').on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $(`#select-menu`).offset().top
    },
        'slow');
})



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
            count: 1,
        },
    }).then((result) => {
        // console.log(result)
        
        const resultpp = result.results_found;
        console.log(resultpp)
        //here we want to look at result.results_found and store in a const

        //divide const by 2 and should return # of various pages in the cuisine array
        const noOfpages = (Math.ceil(resultpp / 2));
        // console.log(noOfpages)
        //we want a fully randomized number of restaurants

        //1- # of pages <50 or >50
        //we want to assign the random page based on if it provides less than or  more than 50
        let randomPage = 1;
        // console.log(noOfpages)
        if (noOfpages >= 50) {
            randomPage = (Math.ceil(Math.random()* 50));
            //this one would apply to all restaurants that have greater than 50 pages
        } else {
            randomPage = (Math.ceil(Math.random()* noOfpages));
            console.log('else')
        }
        // console.log(randomPage)
        //since we can start on any page we want, we want to generate a random page number
        //create a 2nd API call and pass the randomizeStart as start param
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
                start: randomPage,
                count: 2,
            },
        }).then((result) => {
            // console.log(result)
            foodApp.displayFood(result)

        })

        //we will get 20 random restaurants from our API
        //then randomly select 2
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
            
            let image = 1;
            if (item.restaurant.thumb != "") {
                image = $('<img>').attr('src', item.restaurant.thumb);
                console.log(item.restaurant.thumb)
            } else {
                image = $('<img>').attr('src', 'http://lorempixel.com/200/200/food')
                console.log('placeholder')
            }

            // const container = $('<li>').addClass('foodInfo').append(title, address, rating);
            // const foodImg = $('<li>').addClass('foodImg').append(image);
            // console.log(foodImg);
            const container = $('<li>').append(image, title, address, rating);
            $('ul').append(container);

        
            // push title to response array we created earlier
            response.push(image, title, rating, address)
        })
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