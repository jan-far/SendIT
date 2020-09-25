"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ValidateRegisterBody = {
  userValidator: function userValidator(req, res, next) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var msg, requestBodySchema, _requestBodySchema$va, error;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              msg = '';
              _context.prev = 1;
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
                'confirm password': _joi["default"].string().valid(_joi["default"].ref('password')).required().messages({
                  'any.only': 'Repeat password must match password'
                }),
                phone: _joi["default"].number(),
                location: _joi["default"].string().alphanum().required()
              });
              _requestBodySchema$va = requestBodySchema.validate(_objectSpread({}, req.body)), error = _requestBodySchema$va.error; // console.log(JSON.parse(value));

              console.log(error); // Check if error was found duruing validtion

              if (!error) {
                _context.next = 8;
                break;
              }

              msg = error.details[0].message.replace('"', '').replace('"', '').replace('firstname', 'First name').replace('lastname', 'Last name').replace('email', 'Email').replace('password', 'Password');
              return _context.abrupt("return", res.status(400).send({
                message: "".concat(msg)
              }));

            case 8:
              req.body.email = req.body.email.toLowerCase();
              next();
              _context.next = 15;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](1);
              res.status(_context.t0.c || 500).json({
                statusCode: _context.t0.c || 500,
                response: _context.t0.message
              });

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 12]]);
    }))();
  },
  parcelValidator: function parcelValidator(req, res, next) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var msg, requestBodySchema, _requestBodySchema$va2, error;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              msg = '';
              _context2.prev = 1;
              requestBodySchema = _joi["default"].object({
                email: _joi["default"].string().email({
                  minDomainSegments: 2,
                  tlds: {
                    allow: ['com', 'net', 'org']
                  }
                }).required(),
                destination: _joi["default"].string().required(),
                weight: _joi["default"].number().required(),
                phone: _joi["default"].number(),
                location: _joi["default"].string().alphanum().required()
              });
              _requestBodySchema$va2 = requestBodySchema.validate(_objectSpread({}, req.body)), error = _requestBodySchema$va2.error; // Check if error was found duruing validtion

              if (!error) {
                _context2.next = 7;
                break;
              }

              msg = error.details[0].message.replace('"', '').replace('"', '').replace('weight', 'Weight').replace('destination', 'Destination').replace('email', 'Email').replace('phone', 'Phone');
              return _context2.abrupt("return", res.status(400).send({
                message: "".concat(msg)
              }));

            case 7:
              next();
              _context2.next = 13;
              break;

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](1);
              res.status(_context2.t0.c || 500).json({
                statusCode: _context2.t0.c || 500,
                response: _context2.t0.message
              });

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 10]]);
    }))();
  }
};
var _default = ValidateRegisterBody;
exports["default"] = _default;