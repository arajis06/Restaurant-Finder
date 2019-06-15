var firebaseConfig = {
    apiKey: "AIzaSyCKuzH3ntItnEcZRvnlYGPSugCMMLe40ro",
    authDomain: "project-1-b75e9.firebaseapp.com",
    databaseURL: "https://project-1-b75e9.firebaseio.com",
    projectId: "project-1-b75e9",
    storageBucket: "project-1-b75e9.appspot.com",
    messagingSenderId: "782607092533",
    appId: "1:782607092533:web:a50d6049c4f7f174"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
var database = firebase.database();

var city = "";
var address = "";
var cuisines = "";
var rating = 0;

// Capture Button Click
$("button").on("click", function(event) {
    // Don't refresh the page!
    event.preventDefault();

    // Capture user inputs and store them into variables
    city = $("#data-location").val().trim();

    console.log(city);

    database.ref().push({
      location: city
    });
});

  // Firebase watcher + initial loader HINT: .on("value")
  //database.ref().on("child_added", function(childSnapshot) {
    database.ref().on("value", function(snapshot) {

    // Log everything that's coming out of snapshot
    console.log(snapshot.val().location);

    //change the html to reflect
    $("#city-display").text(snapshot.val().location);
    $("#address-display").text(snapshot.val().address);
    $("#cusine-display").text(snapshot.val().cuisines);
    $("#rating-display").text(snapshot.val().rating);

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

 
    