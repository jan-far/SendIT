"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
// import 'babel-polyfill';

// const Parcel = require("./controller/parcelController");

_dotenv2.default.config();
app.use(_express2.default.json());
app.use(_express2.default.urlencoded({ extended: false }));
// app.use(Parcel);

// simple route
app.get("/", function (req, res) {
  res.json({ message: "Welcome to janfar application." });
});

// set port, listen for requests
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log("Server is running on port " + PORT + ".");
});