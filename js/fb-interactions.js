"use strict";

let $ = require('jquery'),
    hb = require("./hbcontrols"),
    db = require("./db-interactions"),
    firebase = require("./firebaseConfig");



function getMovies() {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: 'https://movie-history-7fd8a.firebaseio.com/movies.json',
    }).done(function (movieData) {
      resolve(movieData);
    });
  });
}


function saveMovie(movieObj) {
  // console.log("fb 22 movie object", movieObj);
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: 'https://movie-history-7fd8a.firebaseio.com/movies.json',
      type: 'POST',  // used for first time posting to DB
      data: JSON.stringify(movieObj),
      dataType: 'json'
    }).done(function (movieID) {
      resolve(movieID);
    });
  });
}


function deleteMovie(movieId) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: `https://movie-history-7fd8a.firebaseio.com/movies/${movieId}.json`,
      type: 'DELETE'
    }).done(function (data) {
      resolve(data);
    });
  });
}


function getSong(songId) {
  return new Promise(function (resolve, reject) {
  $.ajax({
      url: `https://music-history-54c84.firebaseio.com/songs/${songId}.json`
    }).done(function (songData) {
      console.log("songData", songData);
      resolve(songData);
    }).fail(function(error) {
      reject(error);
    });
  });
}


module.exports = {saveMovie, deleteMovie, getMovies};
