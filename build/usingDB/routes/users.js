"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _users = _interopRequireDefault(require("../controllers/users"));

var _middleware = require("../middleware");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.post('/auth/signup', _middleware.validator.userValidator, _users["default"].User.create);
router.post('/auth/signin', _users["default"].User.login);
router.get('/users', _middleware.auth.userRole, _users["default"].User.getUser);
router.post('/admin/signup', _middleware.validator.userValidator, _users["default"].Admin.create);
var _default = router;
exports["default"] = _default;