"use strict";

let $ = require('jquery'),
    hb = require("./hbcontrols"),
    firebase = require("./firebaseConfig");



function getSongs(callback) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: 'https://music-history-54c84.firebaseio.com/songs.json',
    }).done(function (songData) {
      resolve(songData);
    });
  });
}


function saveMovie(songFormObj) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: 'https://music-history-54c84.firebaseio.com/songs.json',
      type: 'POST',  // used for first time posting to DB
      data: JSON.stringify(songFormObj),
      dataType: 'json'
    }).done(function (songId) {
      resolve(songId);
    });
  });
}


function deleteMovie(songId) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: `https://music-history-54c84.firebaseio.com/songs/${songId}.json`,
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
