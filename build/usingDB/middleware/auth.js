"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _index = _interopRequireDefault(require("../index"));

var _config = _interopRequireDefault(require("../config/config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var userRole = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var token, text, decoded, _yield$db$query, rows;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            token = req.headers['x-access-token'];

            if (token) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(400).send({
              message: 'Token is not provided'
            }));

          case 3:
            _context.prev = 3;
            text = 'SELECT * FROM users WHERE id = $1';
            decoded = _jsonwebtoken["default"].verify(token, process.env.SECRET);
            _context.next = 8;
            return _index["default"].query(text, [decoded.userId]);

          case 8:
            _yield$db$query = _context.sent;
            rows = _yield$db$query.rows;

            if (!(rows[0].role === _config["default"].accessLevels.user || _config["default"].accessLevels.admin)) {
              _context.next = 15;
              break;
            }

            req.user = {
              id: decoded.userId
            };
            next();
            _context.next = 16;
            break;

          case 15:
            return _context.abrupt("return", res.status(403).send({
              'Oops!': 'You are not authorized'
            }));

          case 16:
            _context.next = 21;
            break;

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](3);
            return _context.abrupt("return", res.status(400).send(_context.t0));

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 18]]);
  }));

  return function userRole(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var adminRole = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var token, decoded, text, _yield$db$query2, rows;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            token = req.headers['x-access-token'];

            if (token) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", res.status(400).send({
              message: 'Token is not provided'
            }));

          case 3:
            _context2.prev = 3;
            _context2.next = 6;
            return _jsonwebtoken["default"].verify(token, process.env.SECRET);

          case 6:
            decoded = _context2.sent;
            text = 'SELECT * FROM users WHERE id = $1';
            _context2.next = 10;
            return _index["default"].query(text, [decoded.userId]);

          case 10:
            _yield$db$query2 = _context2.sent;
            rows = _yield$db$query2.rows;

            if (!(rows[0].role === _config["default"].accessLevels.admin)) {
              _context2.next = 17;
              break;
            }

            req.user = {
              id: decoded.userId
            };
            next();
            _context2.next = 18;
            break;

          case 17:
            return _context2.abrupt("return", res.status(403).send({
              'Oops!': 'You are not authorized'
            }));

          case 18:
            _context2.next = 23;
            break;

          case 20:
            _context2.prev = 20;
            _context2.t0 = _context2["catch"](3);
            return _context2.abrupt("return", res.status(400).send(_context2.t0));

          case 23:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 20]]);
  }));

  return function adminRole(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = {
  userRole: userRole,
  adminRole: adminRole
};
exports["default"] = _default;