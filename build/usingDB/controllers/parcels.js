"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _uuid = require("uuid");

var _index = _interopRequireDefault(require("../index"));

var _config = _interopRequireDefault(require("../config/config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Parcel = {
  create: function create(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var text, values, _yield$db$query, rows;

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
              text = "INSERT INTO \n        parcels(id, email, weight, destination, phone, owner_id, status, location, created_date, modified_date)\n        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)\n        returning *";
              values = [(0, _uuid.v4)(), req.body.email, req.body.weight, req.body.destination, req.body.phone, req.user.id, _config["default"].status["default"], req.body.location, (0, _moment["default"])(new Date()), (0, _moment["default"])(new Date())];
              _context.prev = 4;
              _context.next = 7;
              return _index["default"].query(text, values);

            case 7:
              _yield$db$query = _context.sent;
              rows = _yield$db$query.rows;
              return _context.abrupt("return", res.status(200).send({
                message: 'Parcel created successfuly',
                Parcel: rows[0]
              }));

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](4);
              return _context.abrupt("return", res.status(400).send({
                err: _context.t0,
                message: 'Error when creating parcel, Please try again!'
              }));

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[4, 12]]);
    }))();
  },
  getUserParcel: function getUserParcel(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var findAll, _yield$db$query2, rows, rowCount;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              findAll = 'SELECT * FROM parcels WHERE owner_id=$1';
              _context2.prev = 1;
              _context2.next = 4;
              return _index["default"].query(findAll, [req.user.id]);

            case 4:
              _yield$db$query2 = _context2.sent;
              rows = _yield$db$query2.rows;
              rowCount = _yield$db$query2.rowCount;
              return _context2.abrupt("return", res.status(200).send({
                rows: rows,
                rowCount: rowCount
              }));

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](1);
              return _context2.abrupt("return", res.status(400).send({
                err: _context2.t0,
                message: 'You have not sent any parcel!'
              }));

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 10]]);
    }))();
  },
  getOneParcel: function getOneParcel(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var text, _yield$db$query3, rows;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              text = 'SELECT * FROM parcels WHERE id = $1 AND owner_id = $2';
              _context3.prev = 1;
              _context3.next = 4;
              return _index["default"].query(text, [req.params.id, req.user.id]);

            case 4:
              _yield$db$query3 = _context3.sent;
              rows = _yield$db$query3.rows;

              if (rows[0]) {
                _context3.next = 8;
                break;
              }

              return _context3.abrupt("return", res.status(404).send({
                message: 'parcel not found'
              }));

            case 8:
              return _context3.abrupt("return", res.status(200).send(rows[0]));

            case 11:
              _context3.prev = 11;
              _context3.t0 = _context3["catch"](1);
              return _context3.abrupt("return", res.status(400).send(_context3.t0));

            case 14:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[1, 11]]);
    }))();
  },
  updateParcel: function updateParcel(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var findOneQuery, updateOneQuery, _yield$db$query4, rows, values, response;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              findOneQuery = 'SELECT * FROM parcels WHERE id=$1 AND owner_id = $2';
              updateOneQuery = "UPDATE parcels\n          SET destination=$1,modified_date=$2\n          WHERE id=$3 AND owner_id = $4 returning *";
              _context4.prev = 2;
              _context4.next = 5;
              return _index["default"].query(findOneQuery, [req.params.id, req.user.id]);

            case 5:
              _yield$db$query4 = _context4.sent;
              rows = _yield$db$query4.rows;

              if (rows[0]) {
                _context4.next = 9;
                break;
              }

              return _context4.abrupt("return", res.status(404).send({
                message: 'parcel not found'
              }));

            case 9:
              values = [req.body.destination || rows[0].destination, (0, _moment["default"])(new Date()), req.params.id, req.user.id];
              _context4.next = 12;
              return _index["default"].query(updateOneQuery, values);

            case 12:
              response = _context4.sent;
              return _context4.abrupt("return", res.status(200).send(response.rows[0]));

            case 16:
              _context4.prev = 16;
              _context4.t0 = _context4["catch"](2);
              return _context4.abrupt("return", res.status(400).send(_context4.t0));

            case 19:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[2, 16]]);
    }))();
  },
  updateParcelStatus: function updateParcelStatus(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var findOneQuery, updateOneQuery, _yield$db$query5, rows, values, response;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              findOneQuery = 'SELECT * FROM parcels WHERE id=$1';
              updateOneQuery = "UPDATE parcels SET status=$1,modified_date=$2\n          WHERE id=$3 returning *";
              _context5.prev = 2;
              _context5.next = 5;
              return _index["default"].query(findOneQuery, [req.params.id]);

            case 5:
              _yield$db$query5 = _context5.sent;
              rows = _yield$db$query5.rows;

              if (rows[0]) {
                _context5.next = 9;
                break;
              }

              return _context5.abrupt("return", res.status(404).send({
                message: 'parcel not found'
              }));

            case 9:
              values = [req.body.status || rows[0].status, (0, _moment["default"])(new Date()), req.params.id];
              _context5.next = 12;
              return _index["default"].query(updateOneQuery, values);

            case 12:
              response = _context5.sent;
              return _context5.abrupt("return", res.status(200).send(response.rows[0]));

            case 16:
              _context5.prev = 16;
              _context5.t0 = _context5["catch"](2);
              return _context5.abrupt("return", res.status(400).send({
                err: _context5.t0,
                message: 'Failed to update parcel status! Try again...'
              }));

            case 19:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[2, 16]]);
    }))();
  },
  updateParcelLocation: function updateParcelLocation(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var findOneQuery, updateOneQuery, _yield$db$query6, rows, values, response;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              findOneQuery = 'SELECT * FROM parcels WHERE id=$1';
              updateOneQuery = "UPDATE parcels SET location=$1,modified_date=$2\n          WHERE id=$3 returning *";
              _context6.prev = 2;
              _context6.next = 5;
              return _index["default"].query(findOneQuery, [req.params.id]);

            case 5:
              _yield$db$query6 = _context6.sent;
              rows = _yield$db$query6.rows;

              if (rows[0]) {
                _context6.next = 9;
                break;
              }

              return _context6.abrupt("return", res.status(404).send({
                message: 'parcel not found'
              }));

            case 9:
              values = [req.body.location || rows[0].status, (0, _moment["default"])(new Date()), req.params.id];
              _context6.next = 12;
              return _index["default"].query(updateOneQuery, values);

            case 12:
              response = _context6.sent;
              return _context6.abrupt("return", res.status(200).send(response.rows[0]));

            case 16:
              _context6.prev = 16;
              _context6.t0 = _context6["catch"](2);
              return _context6.abrupt("return", res.status(400).send({
                err: _context6.t0,
                message: 'Failed to update parcel location! Try again...'
              }));

            case 19:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[2, 16]]);
    }))();
  },
  cancelParcel: function cancelParcel(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      var deleteQuery, _yield$db$query7, rows;

      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              deleteQuery = 'DELETE FROM parcels WHERE id=$1 AND owner_id = $2 returning *';
              _context7.prev = 1;
              _context7.next = 4;
              return _index["default"].query(deleteQuery, [req.params.id, req.user.id]);

            case 4:
              _yield$db$query7 = _context7.sent;
              rows = _yield$db$query7.rows;

              if (rows[0]) {
                _context7.next = 8;
                break;
              }

              return _context7.abrupt("return", res.status(404).send({
                message: 'parcel not found'
              }));

            case 8:
              return _context7.abrupt("return", res.status(200).send({
                message: 'deleted'
              }));

            case 11:
              _context7.prev = 11;
              _context7.t0 = _context7["catch"](1);
              return _context7.abrupt("return", res.status(400).send({
                err: _context7.t0,
                message: 'Failed to cancel parcel order! Try again...'
              }));

            case 14:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[1, 11]]);
    }))();
  }
};
var _default = Parcel;
exports["default"] = _default;