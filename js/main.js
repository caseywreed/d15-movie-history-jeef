"use strict";

let $ = require('jquery'),
    db = require("./db-interactions"),
    fb = require("./fb-interactions"),
    hb = require("./hbcontrols"),
    login = require("./user"),
    firebase = require("firebase/app"),
    setRating = require("./rating"),
    userId = "",
    myMovies = [],
    movieResultsArray = [],
    user;


function loadIntialMoviesToDOM() {
 // var userId = firebase.auth().userId.uid;
  $("hb-main").html("");
  fb.getMovies(userId)
  .then(function(movieData){
    var movieIdArr = Object.keys(movieData);
    movieIdArr.forEach(function(key, val){
      movieData[key].id = key;
    });
    console.log("movie obj with ID added", movieData);
    hb.displayAll(movieData)
    .then(function(){
      setRating($('.rating'), movieData);
    });
  });
}
//***************************************************************
// User login section. Should ideally be in its own module
$("#loginLink").click(function(evt) {
  console.log("clicked auth");
  $('#loginLink').off('click');
  login()
  .then(function (result) {
    // $('#loginLink').children('a').html('Logout').parent().attr('id',"logOut");
     $('#loginLink').html('Logout').attr('id',"logOut");
    // var token = result.credential.accessToken;
    user = result.user;
    console.log(user);
    console.log("logged in user", user.uid);
    userId = user.uid;
    let loginToast = `<span><img class="login-img" src="${user.photoURL}"><h6>${user.displayName} successfully logged in!</h6></span>`
    Materialize.toast(loginToast, 2000)
    loadIntialMoviesToDOM();
  });
});


//****************************************************************


$("a").click(function(e){
    e.preventDefault();
});

$("#searchMovies").click( ()=> searchUntrackedMovies() );

// SORTING SECTION
// Work towards using displayAll to work alongside these FB calls

$("#untracked-button").click(function () {
  $(".breadcrumb-target").html("Search Field (Including Movies You've Saved)")
  searchUntrackedMovies()
})

$("#unwatched-button").click(function () {
  $(".breadcrumb-target").html("Your Unwatched Movies")
  sortUnwatched()
})

$("#watched-button").click(function () {
  $(".breadcrumb-target").html("Your Watched Movies")
  sortWatched()
})

$("#rating-slider").on('mouseup', function () {
  let currentRating = $("#rating-slider").val()
  $(".breadcrumb-target").html(`Movies You've Rated ${currentRating} Stars`)
  sortByRating()
})

function sortUnwatched () {
  let selectedUserMovies = {}
  fb.getMovies(userId)
  .then(function (fbMovieData) {
    // console.log("fbMovieData", fbMovieData)
    for (var movie in fbMovieData) {
      if (fbMovieData[movie].Rating === 0) {
        selectedUserMovies[movie] = fbMovieData[movie];
      }
    }

    if(Object.keys(selectedUserMovies).length === 0){
      $('.mhMain').html('<h4 class="center-align">You have no unwatched movies.</h4>')
    } else {
      hb.displayAll(selectedUserMovies)
      .then(function () {
       setRating($('.rating'), selectedUserMovies);
     });
    }
  })
}

function sortWatched () {
  let selectedUserMovies = {}
  fb.getMovies(userId)
  .then(function (fbMovieData) {
    // console.log("fbMovieData", fbMovieData)
    for (var movie in fbMovieData) {
      if (fbMovieData[movie].Rating) {
        selectedUserMovies[movie] = fbMovieData[movie];
      }
    }
    console.log("selectedUserMovies", selectedUserMovies)
    hb.displayAll(selectedUserMovies)
    .then(function (movieResults) {
     setRating($('.rating'), movieResults);
   });
  })
}

function sortByRating () {
  let selectedUserMovies = {}
  let userRating = $("#rating-slider").val()
  fb.getMovies(userId)
  .then(function (fbMovieData) {
    // console.log("fbMovieData", fbMovieData)
    for (var movie in fbMovieData) {
      if (fbMovieData[movie].Rating == userRating) {
        selectedUserMovies[movie] = fbMovieData[movie];
      }
    }

    if(Object.keys(selectedUserMovies).length === 0){
      $('.mhMain').html(`<h4 class="center-align">You have no movies currently rated ${userRating}.</h4>`)
    } else {
      hb.displayAll(selectedUserMovies)
      .then(function () {
       setRating($('.rating'), selectedUserMovies);
     });
    }
  })
}

function searchUntrackedMovies(){
    let searchQuery = $("#movieTitleInput").val();

    if(searchQuery === ''){
      $('.mhMain').html('<h4 class="center-align">You need to enter a search term above.</h4>')
      return;
    }

    console.log("clicked search");
    if (user !== undefined) {

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
    }
}


$(document).on("click", ".addButton", function() {
  let movieID = $(this).data("add-id");
  let movieObject = db.buildMovieObject(movieID, userId);
  fb.saveMovie(movieObject);
  Materialize.toast("Movie saved!", 4000)
});

$(document).on("click", ".deleteChip", function(evt) {
  let movieID = $(this).data("delete-id");
  console.log("movieID", movieID);
    fb.deleteMovie(movieID)
    .then(function(){
      $(`#movieCard${movieID}`).remove();
      Materialize.toast("Movie deleted!", 4000)
  });
});
