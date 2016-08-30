"use strict";

let $ = require('jquery');

var Handlebars = require("hbsfy/runtime");
var movieTemplate = require('../templates/movie-list.hbs');
var savedTemplate = require('../templates/final-card.hbs');


let displayAll = function(movieResults) {
    return new Promise(function(resolve, reject){
        // GROSS!
      var movieIdArr = Object.keys(movieResults);
      movieIdArr.forEach(function(key, val){
        movieResults[key].id = key;
      });
      let movieList = {movies: movieResults};
      $(".mhMain").html("");
      $(".mhMain").append(savedTemplate(movieList));
      resolve(movieResults);
    })
  };

module.exports = {displayAll};
