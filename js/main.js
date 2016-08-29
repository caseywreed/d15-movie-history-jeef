"use strict";

let $ = require('jquery'),
    db = require("./db-interactions"),
    fb = require("./fb-interactions"),
    hb = require("./hbcontrols"),
    login = require("./user"),
    firebase = require("firebase/app"),
    userId = "",
    movieResultsArray = [];


function loadMoviesToDOM() {
 // var userId = firebase.auth().userId.uid;
  $("hb-main").html("");
  fb.getMovies()
  .then(function(movieData){
    var movieIdArr = Object.keys(movieData);
    movieIdArr.forEach(function(key){
      movieData[key].id = key;
    });
    console.log("movie obj with ID added", movieData);
    hb.displayAll(movieData);
  });
}
//***************************************************************
// User login section. Should ideally be in its own module
$("#loginLink").click(function() {
  console.log("clicked auth");
  login()
  .then(function (result) {
    // var token = result.credential.accessToken;
    let user = result.user;
    console.log("logged in user", user.uid);
    userId = user.uid;//uid is the key to building a proper firebase app!
    loadMoviesToDOM();
    // console.log("logged in user", user.uid);
    // userId = user.uid;
    // loadSongsToDOM();
  });
});


//****************************************************************


$("a").click(function(e){
    e.preventDefault();
});

$("#searchMovies").click(function() {
  let searchQuery = $("#movieTitle").val();
  console.log("clicked search");

  db.searchMovies(searchQuery).then( function (movieTitles) {
    var movieTitlesArray = [];
    $.each(movieTitles.Search, function (index, key) {
      movieTitlesArray.push(key.Title);
    });

    for (var i = 0; i < movieTitlesArray.length; i++ ) {
      movieTitlesArray[i] = movieTitlesArray[i].replace(/\s/g, '+');
    }

      console.log(movieTitlesArray);
      db.secondMovieCall(movieTitlesArray);
  });

});

$(document).on("click", ".addButton", function() {
  let movieID = $(this).data("add-id");
  let movieObject = db.buildMovieObject(movieID, userId);
  fb.saveMovie(movieObject);
  console.log("main 60 movie saved", movieObject);
});

$(document).on("click", ".deleteChip", function() {
  let movieID = $(this).data("delete-id");
  console.log("movieID", movieID);
    fb.deleteMovie(movieID)
    .then(function(data){
    loadMoviesToDOM();
  });
});

// $(document).on("click", ".delete-btn", function () {
//   let songId = $(this).data("delete-id");
//   console.log("songId", songId);
//   console.log("button clicked");
//     db.deleteSong(songId)
//     .then(function(data){
//       loadSongsToDOM();
//     });
// });





// $(document).on("click", ".miscButton", function() {
//   let movieID = $(this).data("add-id");
//   db.buildMovieObject(movieID);
// });



