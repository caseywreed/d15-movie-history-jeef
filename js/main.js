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

function buildMovieObj() {
  let movieObj = {
    uid: currentUser,
    title: $("#form--title").val(),
    actors: $("#form--actors").val(),
    year: $("#form--year").val(),
    rating: $("#form--rating").val(),
    watched: null
  };
  return movieObj;
}
//****************************************************************


$("a").click(function(e){
    e.preventDefault();
});

$("#searchMovies").click(function() {
  let searchQuery = $("#movieTitle").val();

  // console.log("clicked search");
  // console.log(searchQuery);

  db.searchMovies(searchQuery).then( function (movieTitles) {
    movieResultsArray = [];
    $.each(movieTitles.Search, function (index, key) {
      let currentMovie = {
        "Title": key.Title,
        "Type": key.Type,
        "Year": key.Year
      };
      movieResultsArray.push(currentMovie);
    });
  });




    // var token = result.credential.accessToken;
    // console.log("logged in user", user.uid);
    // loadSongsToDOM();

});