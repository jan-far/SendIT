"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _parcelController = _interopRequireDefault(require("../controller/parcelController"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.post('/parcels', _auth["default"].verifyToken, _parcelController["default"].create);
router.get('/parcels', _auth["default"].verifyToken, _parcelController["default"].getAll);
router.get('/parcels/:id', _auth["default"].verifyToken, _parcelController["default"].getOne);
router.get('/users/:id/parcels', _auth["default"].verifyToken, _parcelController["default"].get_for_a_user);
router.put('/parcels/:id', _auth["default"].verifyToken, _parcelController["default"].update);
router.put('/parcels/:id/cancel', _auth["default"].verifyToken, _parcelController["default"]["delete"]);
var _default = router;
exports["default"] = _default;