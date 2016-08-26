"use strict";

let $ = require('jquery'),
    // db = require("./db-interaction"),
    // templates = require("./dom-builder"),
    login = require("./user");

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
//****************************************************************
