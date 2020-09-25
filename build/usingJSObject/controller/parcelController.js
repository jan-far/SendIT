"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Parcel = _interopRequireDefault(require("../models/Parcel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Parcel = {
  create: function create(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var parcel;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!req.body.email && !req.body.weight && !req.body.destination && !req.body.phone)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                message: 'All fields are required'
              }));

            case 2:
              _context.next = 4;
              return _Parcel["default"].create(req.body, req.user);

            case 4:
              parcel = _context.sent;
              return _context.abrupt("return", res.status(200).send(parcel));

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  getAll: function getAll(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var parcels;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _Parcel["default"].findAll();

            case 2:
              parcels = _context2.sent;
              return _context2.abrupt("return", res.status(200).send(parcels));

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  getOne: function getOne(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var parcel;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _Parcel["default"].findOne(req.params.id);

            case 2:
              parcel = _context3.sent;

              if (parcel) {
                _context3.next = 5;
                break;
              }

              return _context3.abrupt("return", res.status(404).send({
                message: 'parcel not found'
              }));

            case 5:
              return _context3.abrupt("return", res.status(200).send(parcel));

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  },
  get_for_a_user: function get_for_a_user(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var owner;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _Parcel["default"].findOwner(req.params.id);

            case 2:
              owner = _context4.sent;

              if (owner) {
                _context4.next = 5;
                break;
              }

              return _context4.abrupt("return", res.status(404).send({
                message: 'You have not sent any parcel!'
              }));

            case 5:
              return _context4.abrupt("return", res.status(200).send({
                owner: owner // message: 'Done!',

              }));

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))();
  },
  update: function update(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var parcel, updatedParcel;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _Parcel["default"].findOne(req.params.id);

            case 2:
              parcel = _context5.sent;

              if (parcel) {
                _context5.next = 5;
                break;
              }

              return _context5.abrupt("return", res.status(404).send({
                message: 'parcel not found'
              }));

            case 5:
              _context5.next = 7;
              return _Parcel["default"].update(req.params.id, req.body);

            case 7:
              updatedParcel = _context5.sent;
              return _context5.abrupt("return", res.status(200).send({
                updatedParcel: updatedParcel,
                message: 'Parcel successfully updated'
              }));

            case 9:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }))();
  },
  "delete": function _delete(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var parcel;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return _Parcel["default"].findOne(req.params.id);

            case 2:
              parcel = _context6.sent;

              if (parcel) {
                _context6.next = 5;
                break;
              }

              return _context6.abrupt("return", res.status(404).send({
                message: 'parcel not found'
              }));

            case 5:
              _context6.next = 7;
              return _Parcel["default"]["delete"](req.params.id);

            case 7:
              return _context6.abrupt("return", res.status(204).send({
                message: 'Parcel successfully canceled'
              }));

            case 8:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }))();
  }
};
var _default = Parcel;
exports["default"] = _default;