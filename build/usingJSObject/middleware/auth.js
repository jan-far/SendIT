"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _user = _interopRequireDefault(require("../models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Auth = {
  /**
     * Verify Token
     */
  verifyToken: function verifyToken(req, res, next) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var token, decoded, user;
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
              _context.next = 6;
              return _jsonwebtoken["default"].verify(token, process.env.SECRET);

            case 6:
              decoded = _context.sent;
              // const text = 'SELECT * FROM users WHERE id = $1';
              // const { rows } = await db.query(text, [decoded.userId]);
              // if (!rows[0]) {
              //     return res.status(400).send({ 'message': 'The token you provided is invalid' });
              // }
              user = _user["default"].findOne(decoded.userId.id);

              if (user) {
                _context.next = 10;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                message: 'The token you provided is invalid'
              }));

            case 10:
              req.user = {
                id: decoded.userId.id
              };
              return _context.abrupt("return", next());

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](3);
              return _context.abrupt("return", res.status(400).send(_context.t0));

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 14]]);
    }))();
  },
  ValidateRegisterBody: function ValidateRegisterBody(req, res, next) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var msg, requestBodySchema, _requestBodySchema$va, error;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              msg = ''; // // Check For Email Repeat
              // const emailCheck = await User.findAll(req.body.email.toLowerCase());
              // if (emailCheck) {
              //   msg = `User with email ${req.body.email.toLowerCase()} already registered`;
              //   res.status(400).send(msg);
              // }

              try {
                requestBodySchema = _joi["default"].object({
                  firstname: _joi["default"].string().min(3).max(20).required(),
                  lastname: _joi["default"].string().min(3).max(20).required(),
                  email: _joi["default"].string().email({
                    minDomainSegments: 2,
                    tlds: {
                      allow: ['com', 'net', 'org']
                    }
                  }).required(),
                  password: _joi["default"].string().alphanum().min(7).max(30).required(),
                  phone: _joi["default"].number()
                });
                _requestBodySchema$va = requestBodySchema.validate(_objectSpread({}, req.body)), error = _requestBodySchema$va.error; // Check if error was found duruing validtion

                if (error) {
                  msg = error.details[0].message.replace('"', '').replace('"', '').replace('firstname', 'First name').replace('lastname', 'Last name').replace('email', 'Email').replace('password', 'Password');
                  res.status(400).send(msg);
                }

                req.body.email = req.body.email.toLowerCase();
                next();
              } catch (error) {
                res.status(error.c || 500).json({
                  statusCode: error.c || 500,
                  response: error.message
                });
              }

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  }
};
var _default = Auth;
exports["default"] = _default;