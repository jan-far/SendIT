"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getauthenticated;

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

function getauthenticated(_x, _x2, _x3) {
  return _getauthenticated.apply(this, arguments);
}

function _getauthenticated() {
  _getauthenticated = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var findOneQuery, _yield$db$query, rows, _rows, _rows2;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!req.authenticated) {
              _context.next = 18;
              break;
            }

            findOneQuery = 'SELECT * FROM parcels WHERE email=$1';
            console.log(req.authenticated);
            _context.prev = 3;
            _context.next = 6;
            return _index["default"].query(findOneQuery, [req.authenticated.id]);

          case 6:
            _yield$db$query = _context.sent;
            rows = _yield$db$query.rows;

            // if (rows === [] || !rows) {
            //   req.authenticated.reset();
            //   res.redirect('/auth/signin');
            //   console.log(rows);
            // } else
            if (!rows === []) {
              console.log('user', req.authenticated.user);
              _rows = _slicedToArray(rows, 1);
              req.user = _rows[0];
              delete req.user.password; // delete the password from the authenticated

              _rows2 = _slicedToArray(rows, 1);
              req.authenticated.user = _rows2[0];
              // refresh the authenticated value
              // finishing processing the middleware and run the route
              next();
            }

            next();
            _context.next = 16;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](3);
            console.log(_context.t0);
            next();

          case 16:
            _context.next = 20;
            break;

          case 18:
            console.log('unset');
            next();

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 12]]);
  }));
  return _getauthenticated.apply(this, arguments);
}