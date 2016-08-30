"use strict";
  let fb = require('./fb-interactions'),
       $ = require('jquery');

function setRating(el, moviesObj){

  // max rating, i.e. number of stars you want
  let maxRating = 10;
  // callback to run after setting the rating
  let saveRatingFB = function(ratingID){
    //this will only work in Chrome until I can figure out a way to get the evt param passed in
    let movieID = $(event.target).parent().data('rating-id');
    let newRating = {Rating : ratingID};
    fb.editMovie(newRating, movieID);
    // .then(() => Materialize.toast(`<h6>Movie rating was updated to ${newRating.rating}!</h6>`, 2000))
  }

  let movieKeys = Object.keys(moviesObj);

  Array.from(el).forEach((e, i) => {
    let currentRating = moviesObj[movieKeys[i]].Rating;
    //sets up rating for each movie saved
    rating(e, currentRating, maxRating, saveRatingFB);
  })
  // let myRating = rating(el, currentRating, maxRating, saveRatingFB)
}

module.exports = setRating;
