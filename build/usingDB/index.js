"use strict";

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var pool = new _pg.Pool({
  connectionString: process.env.DEV_DATABASE_URL
});

var query = function query(text, params) {
  return new Promise(function (resolve, reject) {
    pool.query(text, params).then(function (res) {
      resolve(res);
    })["catch"](function (err) {
      reject(err);
    });
  });
};

module.exports = {
  query: query
};