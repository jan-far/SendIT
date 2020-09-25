"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _userController = _interopRequireDefault(require("./userController"));

var _parcelController = _interopRequireDefault(require("./parcelController"));

var _helper = _interopRequireDefault(require("./helper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  userController: _userController["default"],
  parcelController: _parcelController["default"],
  helper: _helper["default"]
};
exports["default"] = _default;