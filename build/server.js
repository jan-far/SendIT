"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _clientSessions = _interopRequireDefault(require("client-sessions"));

require("@babel/polyfill");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _cors = _interopRequireDefault(require("cors"));

var _middleware = require("./usingDB/middleware");

var _routes = _interopRequireDefault(require("./usingJSObject/routes"));

var _routes2 = _interopRequireDefault(require("./usingDB/routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();

_dotenv["default"].config();

app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use('/', _express["default"]["static"](_path["default"].join(__dirname, '.')));
app.use(_express["default"]["static"]('UI'));
app.use('/asset', _express["default"]["static"](_path["default"].join(__dirname, 'asset')));
app.use((0, _clientSessions["default"])({
  cookieName: 'authenticated',
  secret: 'thisisjustsomethingrandom',
  duration: 60 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  cookie: {// httpOnly: false,
    // secure: false,
  }
})); // app.use((req, res, next) => {
//   if (req.authenticated) {
//     res.setHeader('X-Seen-You', 'true');
//     next()
//   } else {
//     // setting a property will automatically cause a Set-Cookie response
//     // to be sent
//     req.authenticated = true;
//     res.setHeader('X-authenticated', 'false');
//     next()
//   }
// });
// app.use(userSession);

var ref = process.env.TYPE === 'db' ? _routes2["default"] : _routes["default"];
app.use('/api/v1', ref);
app.get('/test', function (req, res) {
  res.status(200).send('Welcome to janfar application.');
}); // simple route

app.get('/', function (req, res) {
  res.sendFile(_path["default"].join(__dirname, '/index.html'));
}); // set port, listen for requests

var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  // `Server is running on port ${PORT}.`;
  console.log("Server is running on port ".concat(PORT, "."));
});
var _default = app;
exports["default"] = _default;