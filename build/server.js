"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

require("babel-polyfill");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _route = _interopRequireDefault(require("./usingJSObject/routes/route"));

var _route2 = _interopRequireDefault(require("./usingDB/routes/route"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();

_dotenv["default"].config();

app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
var ref = process.env.TYPE === "db" ? _route2["default"] : _route["default"];
app.use('/api/v1', ref); // simple route

app.get("/", function (req, res) {
  res.status(200).send("Welcome to janfar application.");
}); // set port, listen for requests

var PORT = process.env.PORT || 3000;
var running = app.listen(PORT, function () {
  "Server is running on port ".concat(PORT, ".");
  console.log("Server is running on port ".concat(PORT, "."));
});
var _default = app;
exports["default"] = _default;