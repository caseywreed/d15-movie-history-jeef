"use strict";

let $ = require('jquery');

var Handlebars = require("hbsfy/runtime");
var movieTemplate = require('../templates/movie-list.hbs');
var savedTemplate = require('../templates/final-card.hbs');


let displayAll = function(movieResultsArray) {
    return new Promise(function(resolve, reject){
        // GROSS!
      for (var movie in movieResultsArray.movies) {
        movieResultsArray.movies[movie].id = movie
      }
      let movieList = {movies: movieResultsArray};
      $(".mhMain").html("");
      $(".mhMain").append(savedTemplate(movieList));
      resolve(movieResultsArray);
    })
  };

module.exports = {displayAll};
