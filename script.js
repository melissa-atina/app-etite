const foodApp = {};
foodApp.apiKey = "ef7bb4cac402a95c8319040f2339e230";
foodApp.apiUrl = "https://developers.zomato.com/api/v2.1/search";

// HEADER BUTTON
// ON START, button scrolls them to the cuisine select menu
$('.scroll').on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $(`main`).offset().top
    },
        'slow');
})

// make empty array for our API response
const response = [];

// first API call based on cuisine that user selects
foodApp.foodEntity = (localeNum, cuisine) => {
    $.ajax({
        url: foodApp.apiUrl,
        method: 'GET',
        dataType: 'json',
        headers: {
            "user-key": foodApp.apiKey,
        },
        data: {
            entity_id: `${localeNum}`,
            entity_type: 'subzone',
            cuisines: `${cuisine}`,
            count: 1,
        },
    }).then((result) => {
        
        //find number of pages and store in a variable
        const resultpp = result.results_found;

        //divide const by 4 and should return # of various pages in the cuisine array
        const noOfpages = (Math.ceil(resultpp / 4));

        let randomPage = 1;
        //if noOfPages >= 60, randomize
        if (noOfpages >= 60) {
            randomPage = (Math.ceil(Math.random()* 60));
        } else {
            //randomizes if noOfPages <60
            randomPage = (Math.ceil(Math.random()* noOfpages));
        }

    
        // 2nd API call and pass the randomPage as start param
        $.ajax({
				url: foodApp.apiUrl,
				method: "GET",
				dataType: "json",
				headers: {
					"user-key": foodApp.apiKey,
				},
				data: {
					entity_id: `${localeNum}`,
					entity_type: "subzone",
					cuisines: `${cuisine}`,
					start: randomPage,
					count: 4,
				},
			})
            .then((result) => {
                foodApp.displayFood(result);
            })
    })
}
   
// CUISINE SELECTION SECTION
foodApp.displayFood = (result) => {
    $('.result').empty();
    $('.result-header').empty();

    const userCuisineSelect = $('select option:selected').text();

    const appendHeader = `
        <h3>You Chose</h3> <span>${userCuisineSelect}!</span>
    `;
    $('.result-header').append(appendHeader);
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
        } else {
            image = 'http://lorempixel.com/200/200/food';
        }

        const container = `
        <div class="results-box">
            <div class="results-image">
                    <img src="${image}" alt="${title}" class="placeholder-content">
            </div>

            <div class="results-text">
                <h3>${title}</h3>
                <p><i class="fas fa-star"></i> Rating: ${rating}</p>
                <p><i class="fas fa-map-marker-alt"></i> ${address}</p>
                <button><a href="${website}">Take Me There</a></button>
            </div>
        </div>
        `;
        $('.result').append(container)
        // push title to response array we created earlier
        response.push(image, title, rating, address)
    })
}

// LOCATION SELECT SECTION
foodApp.init = () => {

    $('form').on('submit', function (event) {
        event.preventDefault();
        const locale = $('input[name=user-input-locale]:checked').val();
        const localeNum = parseInt(locale);
        const cuisine = $('select[name="cuisine"]').val();

        foodApp.foodEntity(localeNum, cuisine);
    })

    // locale select button scroll
    $('input').change(function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $('.cuisine-select').offset().top
        },
        'slow');
    })


    // cuisine select button scroll
    $('.submit-btn').on('click', function (e) {
        $('html, body').animate({
            scrollTop: $('.user-results').offset().top
        },
        'slow');
    })
    
}


$(function() {
    foodApp.init();
})