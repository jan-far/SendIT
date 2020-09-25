"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _users = _interopRequireDefault(require("./users"));

var _parcels = _interopRequireDefault(require("./parcels"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.use(_users["default"]);
router.use(_parcels["default"]);
var _default = router;
exports["default"] = _default;