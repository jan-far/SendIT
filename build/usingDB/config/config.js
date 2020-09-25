"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var userRoles = {
  user: 1,
  admin: 2
};
var accessLevels = {
  user: userRoles.user || userRoles.admin,
  admin: userRoles.admin
};
var status = {
  "default": 'Processing'
};
var _default = {
  accessLevels: accessLevels,
  userRoles: userRoles,
  status: status
};
exports["default"] = _default;