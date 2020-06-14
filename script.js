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

// first API call based on cuisine that user selects
foodApp.foodEntity = (cuisine) => {
    $.ajax({
        url: foodApp.apiUrl,
        method: 'GET',
        dataType: 'json',
        headers: {
            "user-key": foodApp.apiKey,
        },
        data: {
            entity_type: 'subzone',
            entity_id: 87141,
            cuisines: `${cuisine}`,
            count: 1,
        },
    }).then((result) => {
        console.log(result)
        // console.log(city)
        
        const resultpp = result.results_found;
        // console.log(resultpp)
        //here we want to look at result.results_found and store in a const

        //divide const by 2 and should return # of various pages in the cuisine array
        const noOfpages = (Math.ceil(resultpp / 4));
        // console.log(noOfpages)
        //we want a fully randomized number of restaurants

        //1- # of pages <50 or >50
        //we want to assign the random page based on if it provides less than or  more than 50
        //since we can start on any page we want, we want to generate a random page number

        let randomPage = 1;
        // console.log(noOfpages)
        if (noOfpages >= 60) {
            randomPage = (Math.ceil(Math.random()* 60));
            //this one would apply to all restaurants that have greater than 50 pages
        } else {
            randomPage = (Math.ceil(Math.random()* noOfpages));
            console.log('else')
        }
        // console.log(randomPage)
        // 2nd API call and pass the randomPage as start param
        $.ajax({
            url: foodApp.apiUrl,
            method: 'GET',
            dataType: 'json',
            headers: {
                "user-key": foodApp.apiKey,
            },
            data: {
                entity_type: 'subzone',
                entity_id: 87141,
                cuisines: `${cuisine}`,
                start: randomPage,
                count: 4,
            },
        }).then((result) => {
            console.log(result)
            foodApp.displayFood(result)

        })
    })
}
        


foodApp.displayFood = (result) => {
    $('.result').empty();
    // organize result
    result.restaurants.forEach((item) => {
        // each restaurant object is here

        const title = item.restaurant.name;
        const rating = item.restaurant.user_rating["aggregate_rating"];
        const address = item.restaurant.location["address"];
        const website = item.restaurant.url;
        
        let image = 1;
        if (item.restaurant.thumb != "") {
            image = item.restaurant.thumb;
            console.log(item.restaurant.thumb)
        } else {
            image = 'http://lorempixel.com/200/200/food'
            console.log('placeholder')
        }

        const container = `
        <div class="results-box">
            <div class="results-image">
                <img src="${image}" alt="${title}">
            </div>
            <div class="results-text">
                <h3>${title}</h3>
                <p><i class="fas fa-star"></i> Rating: ${rating}</p>
                <p><i class="fas fa-map-marker-alt"></i> ${address}</p>
                <button><a href="${website}">Take Me There</a></button>
            </div>
        </div>
        `
        $('.result').append(container)
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



//brings user to next section upon selecting cuisine
$('select').on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $(`#user-results`).offset().top
    },
        'slow');
})

$(function() {
    foodApp.init();
})