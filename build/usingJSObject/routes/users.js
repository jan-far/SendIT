"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _userController = _interopRequireDefault(require("../controller/userController"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = require('express').Router();

router.get('/users', _auth["default"].verifyToken, _userController["default"].getUser);
router.post('/auth/signup', _auth["default"].ValidateRegisterBody, _userController["default"].create);
router.post('/auth/signin', _userController["default"].login);
var _default = router;
exports["default"] = _default;