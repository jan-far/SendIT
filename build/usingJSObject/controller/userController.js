"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireDefault(require("../models/user"));

var _helper = _interopRequireDefault(require("./helper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var User = {
  create: function create(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var user, token;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.password || !req.body.phone) {
                res.status(404).send('Some values are missing!');
              }

              if (!_helper["default"].isValidEmail(req.body.email)) {
                res.status(404).send('Please enter a valid email address');
              }

              _context.next = 4;
              return _user["default"].create(req.body);

            case 4:
              user = _context.sent;
              token = _helper["default"].generateToken(user);
              return _context.abrupt("return", res.status(200).send({
                message: 'User registered successfully',
                token: token
              }));

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  login: function login(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var user, passwordIsValid;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(!req.body.email || !req.body.password)) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return", res.status(400).send({
                message: 'Some values are missing'
              }));

            case 2:
              if (_helper["default"].isValidEmail(req.body.email)) {
                _context2.next = 4;
                break;
              }

              return _context2.abrupt("return", res.status(400).send({
                message: 'Please enter a valid email address'
              }));

            case 4:
              _context2.next = 6;
              return _user["default"].findByEmail(req.body.email);

            case 6:
              user = _context2.sent;

              if (user) {
                _context2.next = 9;
                break;
              }

              return _context2.abrupt("return", res.status(404).send({
                message: 'User Not found.'
              }));

            case 9:
              passwordIsValid = _helper["default"].comparePassword(user.password, req.body.password);

              if (passwordIsValid) {
                _context2.next = 12;
                break;
              }

              return _context2.abrupt("return", res.status(401).send({
                accessToken: null,
                message: 'Invalid Password!'
              }));

            case 12:
              return _context2.abrupt("return", res.status(200).send({
                id: user.id,
                firstname: user.firstName,
                lastname: user.lastName,
                email: user.email
              }));

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  getUser: function getUser(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var user;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _user["default"].findAll();

            case 2:
              user = _context3.sent;
              return _context3.abrupt("return", res.status(200).send(_objectSpread({}, user)));

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  },
  getAuser: function getAuser(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var user;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _user["default"].findOne(req.param.id);

            case 2:
              user = _context4.sent;
              return _context4.abrupt("return", res.status(200).send({
                user: user
              }));

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))();
  }
};
var _default = User;
exports["default"] = _default;