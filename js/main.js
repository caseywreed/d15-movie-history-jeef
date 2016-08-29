"use strict";

var $ = require('jquery'),
    db = require("./db-interactions"),
    // templates = require("./dom-builder"),
    login = require("./user"),
    movieResultsArray = [];

let userId = "";


//***************************************************************
// User login section. Should ideally be in its own module
$("#loginLink").click(function() {
  console.log("clicked auth");
  login()
  .then(function (result) {
    // var token = result.credential.accessToken;
    let user = result.user;
    // console.log("logged in user", user.uid);
    userId = user.uid;
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



    // var token = result.credential.accessToken;
    // console.log("logged in user", user.uid);
    // loadSongsToDOM();

});