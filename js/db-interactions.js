"use strict";

let $ = require('jquery'),
    firebase = require("./firebaseConfig");

function searchMovies(searchQuery) {
  return new Promise( function (resolve, reject) {
    $.ajax({
      url: `http://www.omdbapi.com/?s=${searchQuery}&y=&plot=short&r=json&page=1`
    }).done(function(movieData) {
      // console.log(movieData.Search[0].Title);
      resolve(movieData);
    });
  });
}


module.exports = {
  searchMovies
};