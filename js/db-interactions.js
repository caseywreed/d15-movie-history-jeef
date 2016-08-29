"use strict";

let $ = require('jquery'),
    firebase = require("./firebaseConfig");

function searchMovies(searchQuery) {
  return new Promise( function (resolve, reject) {
    $.ajax({
      url: `http://www.omdbapi.com/?s=${searchQuery}&y=&plot=short&r=json&page=1`
    }).done(function(movieData) {
      console.log("movieData", movieData);
      // console.log(movieArray.Object.Title);
      // $.each(movieArray.Object.Search.Title);
      // console.log("movieArray", movieArray);
      resolve(movieData);
      var movieTitles = [];






      // secondMovieCall(movieData);

    });
  });
}



function secondMovieCall(movieData){
  console.log("movie data", movieData);
    Promise.all([
    $.ajax({
      url: `http://www.omdbapi.com/?t=${movieData[0]}&y=&pvlot=short&r=json`,
    }),
    $.ajax({
      url: `http://www.omdbapi.com/?t=${movieData[1]}&y=&plot=short&r=json`,
    }),
    $.ajax({
      url: `http://www.omdbapi.com/?t=${movieData[2]}&y=&plot=short&r=json`,
    }),
    $.ajax({
      url: `http://www.omdbapi.com/?t=${movieData[3]}&y=&plot=short&r=json`,
    }),
    $.ajax({
      url: `http://www.omdbapi.com/?t=${movieData[4]}&y=&plot=short&r=json`,
    }),
    $.ajax({
      url: `http://www.omdbapi.com/?t=${movieData[5]}&y=&plot=short&r=json`,
    }),
    $.ajax({
      url: `http://www.omdbapi.com/?t=${movieData[6]}&y=&plot=short&r=json`,
    }),
    $.ajax({
      url: `http://www.omdbapi.com/?t=${movieData[7]}&y=&plot=short&r=json`,
    }),
    $.ajax({
      url: `http://www.omdbapi.com/?t=${movieData[8]}&y=&plot=short&r=json`,
    }),
    $.ajax({
      url: `http://www.omdbapi.com/?t=${movieData[9]}&y=&plot=short&r=json`,
    })
    ]).then(function(data){
      console.log(data);


    });
}

// function ajaxCalls () {
//   Promise.all([
//       $.each()
//     ])
// }

module.exports = { searchMovies, secondMovieCall };
