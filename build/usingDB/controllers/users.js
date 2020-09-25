"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _uuid = require("uuid");

var _helper = _interopRequireDefault(require("../config/helper"));

var _config = _interopRequireDefault(require("../config/config"));

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var User = {
  create: function create(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var hashPassword, createQuery, values, _yield$db$query, rows, token, _rows;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.password || !req.body.phone)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", res.status(404).send({
                message: 'Some values are missing!'
              }));

            case 2:
              if (_helper["default"].isValidEmail(req.body.email)) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return", res.status(404).send({
                message: 'Please enter a valid email address!'
              }));

            case 4:
              hashPassword = _helper["default"].hashPassword(req.body.password);
              createQuery = "INSERT INTO \n        users(id, firstname, lastname, email, password, phone, location, role, created_date, modified_date)\n        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)\n        returning *";
              values = [(0, _uuid.v4)(), req.body.firstname, req.body.lastname, req.body.email, hashPassword, req.body.phone, req.body.location, _config["default"].userRoles.user, (0, _moment["default"])(new Date()), (0, _moment["default"])(new Date())];
              _context.prev = 7;
              _context.next = 10;
              return _index["default"].query(createQuery, values);

            case 10:
              _yield$db$query = _context.sent;
              rows = _yield$db$query.rows;
              token = _helper["default"].generateToken(rows[0].id);
              _rows = _slicedToArray(rows, 1);
              req.session = _rows[0];
              console.log(req.session.user);
              return _context.abrupt("return", res.status(200).send({
                message: 'User successfully created',
                token: token
              }));

            case 19:
              _context.prev = 19;
              _context.t0 = _context["catch"](7);

              if (!(_context.t0.routine === '_bt_check_unique')) {
                _context.next = 23;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                message: 'User with EMAIL already exist'
              }));

            case 23:
              return _context.abrupt("return", res.status(400).send(_context.t0.detail));

            case 24:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[7, 19]]);
    }))();
  },
  login: function login(req, res, next) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var text, _yield$db$query2, rows, token;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(!req.body.email || !req.body.password)) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return", res.status(404).send({
                message: 'Some values are missing!'
              }));

            case 2:
              if (_helper["default"].isValidEmail(req.body.email)) {
                _context2.next = 4;
                break;
              }

              return _context2.abrupt("return", res.status(404).send({
                message: 'Please enter a valid email address!'
              }));

            case 4:
              text = 'SELECT * FROM users WHERE email = $1';
              _context2.prev = 5;
              _context2.next = 8;
              return _index["default"].query(text, [req.body.email]);

            case 8:
              _yield$db$query2 = _context2.sent;
              rows = _yield$db$query2.rows;

              if (rows[0]) {
                _context2.next = 12;
                break;
              }

              return _context2.abrupt("return", res.status(400).send({
                message: 'The credentials you provided is incorrect'
              }));

            case 12:
              if (_helper["default"].comparePassword(rows[0].password, req.body.password)) {
                _context2.next = 14;
                break;
              }

              return _context2.abrupt("return", res.status(400).send({
                message: 'The credentials you provided is incorrect, check your password'
              }));

            case 14:
              // console.log(rows[0]);
              token = _helper["default"].generateToken(rows[0].id);
              req.authenticated.email = req.body.email; // console.log('auth', req.authenticated);

              res.status(200).send({
                message: 'User login successful!',
                Profile: rows[0],
                Token: token
              });
              next();
              _context2.next = 23;
              break;

            case 20:
              _context2.prev = 20;
              _context2.t0 = _context2["catch"](5);
              return _context2.abrupt("return", res.status(400).send(_context2.t0));

            case 23:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[5, 20]]);
    }))();
  },
  getUser: function getUser(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var findOneQuery, _yield$db$query3, rows, token;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              findOneQuery = 'SELECT * FROM users WHERE id=$1';
              _context3.prev = 1;
              _context3.next = 4;
              return _index["default"].query(findOneQuery, [req.user.id]);

            case 4:
              _yield$db$query3 = _context3.sent;
              rows = _yield$db$query3.rows;
              token = _helper["default"].generateToken(rows[0].id);
              return _context3.abrupt("return", res.status(200).send({
                message: 'User found successfully!',
                Profile: rows[0],
                Token: token
              }));

            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3["catch"](1);
              console.log(_context3.t0);
              return _context3.abrupt("return", res.status(400).send(_context3.t0));

            case 14:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[1, 10]]);
    }))();
  }
};
var Admin = {
  create: function create(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var hashPassword, createQuery, values, _yield$db$query4, rows, token;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!(!req.body.firstname || !req.body.email || !req.body.password)) {
                _context4.next = 2;
                break;
              }

              return _context4.abrupt("return", res.status(404).send('Some values are missing!'));

            case 2:
              if (_helper["default"].isValidEmail(req.body.email)) {
                _context4.next = 4;
                break;
              }

              return _context4.abrupt("return", res.status(404).send('Please enter a valid email address'));

            case 4:
              hashPassword = _helper["default"].hashPassword(req.body.password);
              createQuery = "INSERT INTO \n        users(id, firstname, lastname, email, password, phone, location, role, created_date, modified_date)\n        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)\n        returning *";
              values = [(0, _uuid.v4)(), req.body.firstname, req.body.lastname, req.body.email, hashPassword, req.body.phone, req.body.location, _config["default"].userRoles.admin, (0, _moment["default"])(new Date()), (0, _moment["default"])(new Date())];
              _context4.prev = 7;
              _context4.next = 10;
              return _index["default"].query(createQuery, values);

            case 10:
              _yield$db$query4 = _context4.sent;
              rows = _yield$db$query4.rows;
              token = _helper["default"].generateToken(rows[0].id);
              return _context4.abrupt("return", res.status(200).send({
                message: 'Admin successfully created',
                token: token
              }));

            case 16:
              _context4.prev = 16;
              _context4.t0 = _context4["catch"](7);

              if (!(_context4.t0.routine === '_bt_check_unique')) {
                _context4.next = 20;
                break;
              }

              return _context4.abrupt("return", res.status(400).send({
                message: 'User with EMAIL already exist'
              }));

            case 20:
              return _context4.abrupt("return", res.status(400).send(_context4.t0.detail));

            case 21:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[7, 16]]);
    }))();
  }
};
var _default = {
  User: User,
  Admin: Admin
};
exports["default"] = _default;