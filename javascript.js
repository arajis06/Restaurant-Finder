$("button").on("click", function(event) {
    event.preventDefault();

    // Grabbing and storing the data property value from the button
    var location = $("#data-location").val().trim();

    // URL and key for MapQuest Geocoding API
    // APP ID: G7xVIDYXhT4pqjxrcBFy 
    // APP CODE: CrOqGzcuG4spwb1SS7-YVQ
    var queryURLgeo = "https://geocoder.api.here.com/6.2/geocode.json?app_id=G7xVIDYXhT4pqjxrcBFy&app_code=CrOqGzcuG4spwb1SS7-YVQ&searchtext=" + location;
    
    // "http://open.mapquestapi.com/geocoding/v1/address?app_id=G7xVIDYXhT4pqjxrcBFy&app_code=CrOqGzcuG4spwb1SS7-YVQ&location=" + location;


    $.ajax({
        url: queryURLgeo,
        method: "GET"
    })
        // After data comes back from the request
        .then(function(response) {
        console.log(queryURLgeo);
        console.log(response);

        // storing the data from the AJAX request in the results variable
        var results = response.Response.View[0].Result[0].Location.NavigationPosition[0]
        console.log(results)

        })

    })


// URL and key for Zomato API
// !!!!! URL may need changed to match search criteria
// var queryURLzomato = "https://ZomatoraygorodskijV1.p.rapidapi.com/getCuisinesByCoordinates&api_key=ae4575e5962528d6786d05daee388045";