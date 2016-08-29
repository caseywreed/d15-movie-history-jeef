"use strict";

let $ = require('jquery');

var Handlebars = require("hbsfy/runtime");
var movieTemplate = require('../templates/movie-list.hbs');
var savedTemplate = require('../templates/final-card.hbs');
// var searchTemplate = require('../templates/title.hbs');
// var movieResultsArray = require('./main.js');

// Register a partial
// Handlebars.registerPartial("tagLine", require('../templates/partials/tagline.hbs'));

// Create a custome helper that we can call inside an expression in
// our markup
// Handlebars.registerHelper("inc", function(value) {
//   return parseInt(value) + 1;
// });

let displayAll = function(movieResultsArray) {
    console.log("results", movieResultsArray);
    let movieList = {movies: movieResultsArray};
    $(".mhMain").html("");
    $(".mhMain").append(savedTemplate(movieList));
    // $("#ssPop").prop('disabled', true);
  };

module.exports = {displayAll};

