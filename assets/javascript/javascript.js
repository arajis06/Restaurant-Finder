$("button").on("click", function(event) {
    event.preventDefault();

    //clear locations
    $("#result-table").empty();

    // Grabbing and storing the data property value from the button

  
    var location = $("#location-input").val().trim();


    // URL and key for MapQuest Geocoding API
    // APP ID: G7xVIDYXhT4pqjxrcBFy 
    // APP CODE: CrOqGzcuG4spwb1SS7-YVQ
    var queryURLgeo = "https://geocoder.api.here.com/6.2/geocode.json?app_id=G7xVIDYXhT4pqjxrcBFy&app_code=CrOqGzcuG4spwb1SS7-YVQ&searchtext=" + location;


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
        console.log(results.Latitude)
        console.log(results.Longitude)

        var offset = 0;

        // URL and key for Zomato API
        function zomato() {
            // !!!!! URL may need changed to match search criteria
            var queryURLzomato = "https://developers.zomato.com/api/v2.1/search?start=" + offset + "&count=10&lat=" + results.Latitude + "&lon=" + results.Longitude + "&apikey=ae4575e5962528d6786d05daee388045";


            $.ajax({
                url: queryURLzomato,
                method: "GET"
            })
            // After data comes back from the request
            .then(function(response2) {
                console.log(response2);

                var results2 = response2.restaurants
                console.log(results2)

                for (var i = 0; i < results2.length; i++) {
            
                    var newRow = $("<tr>").append(
                        $("<td>").html("<img class=img-fluid img-thumbnail src= " + results2[i].restaurant.thumb +"></>" ),
                        $("<td>").text(results2[i].restaurant.name),
                        $("<td>").text(results2[i].restaurant.location.address),
                        $("<td>").text(results2[i].restaurant.cuisines),
                        $("<td>").text(results2[i].restaurant.user_rating.aggregate_rating),
                        $("<td>").html("<a href=" + results2[i].restaurant.menu_url + ">Menu</a>"),
                    );
                                    
                    // Append the new row to the table
                    $("#result-table").append(newRow);
                }
                    // when More Results button is clicked, the next 10 restaurants are added to the list
                var moreResultsButton = $("<button>").text("More Results")
                moreResultsButton.on("click", function(){
                    offset += 10;
                    zomato();
                    $("#result-table").append(newRow);
                    moreResultsButton.hide();
                })


                $("#result-table").append(moreResultsButton)
                console.log(moreResultsButton)
            })
        }

    zomato();

    // make a directions link for each 
    // when you press the directions link:
    // 1. enter your current location into an input field that opens
    // 2. end location pulls from results2[i].restaurant.location.address of restaurant clicked on.
    // 3. results get put into query URL
    // 4. hide table, recent searches, and search fields
    // 5. display direction results on page in place of table


    var startRoute = $("#start-route").val().trim();
    var endRoute = results2[i].restaurant.location.address

    var queryURLdirections = "https://www.mapquestapi.com/directions/v2/route?key=KEY&from=115+Pope+Lane+Duncansville+PA&to=932+Freeport+Rd%2C+Pittsburgh+15238&outFormat=json&ambiguities=ignore&routeType=fastest&doReverseGeocode=false&enhancedNarrative=false&avoidTimedConditions=false"

    console.log(queryURLdirections)

    })



})




// if anyone needs access to the firebase account the email is "acnproject01@gmail.com" pw: gitcheckout01
// // made that gmail for this project 
// var firebaseConfig = {
//     apiKey: "AIzaSyCF_6CAISGlBiTGlO0_YDuZ8gM9-4yRoeo",
//     authDomain: "acn-bootcamp-project-01.firebaseapp.com",
//     databaseURL: "https://acn-bootcamp-project-01.firebaseio.com",
//     projectId: "acn-bootcamp-project-01",
//     storageBucket: "acn-bootcamp-project-01.appspot.com",
//     messagingSenderId: "532356596825",
//     appId: "1:532356596825:web:87d4b837e270adec"
// }