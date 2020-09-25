"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _parcels = _interopRequireDefault(require("../controllers/parcels"));

var _middleware = require("../middleware");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)(); // Create a parcel delivery order

router.post('/parcels', _middleware.validator.parcelValidator, _middleware.auth.userRole, _parcels["default"].create); // Fetch all parcel delivery orders

router.get('/parcels', _middleware.auth.userRole, _parcels["default"].getUserParcel); // Fetch a specific parcel delivery order

router.get('/parcels/:id', _middleware.auth.userRole, _parcels["default"].getOneParcel); // Update a parcel destination delivery order

router.put('/parcels/:id/destination', _middleware.auth.userRole, _parcels["default"].updateParcel); // Cancel the specific parcel delivery order

router["delete"]('/parcels/:id/cancel', _middleware.auth.userRole, _parcels["default"].cancelParcel); // Change the status of a specific parcel delivery order

router.put('/parcels/:id/status', _middleware.auth.adminRole, _parcels["default"].updateParcelStatus); // Change the present location of a specific parcel delivery order

router.put('/parcels/:id/presentLocation', _middleware.auth.adminRole, _parcels["default"].updateParcelLocation);
var _default = router;
exports["default"] = _default;