"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _uuid = require("uuid");

var _helper = _interopRequireDefault(require("../controller/helper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var User = /*#__PURE__*/function () {
  function User() {
    _classCallCheck(this, User);

    this.user = [];
  }

  _createClass(User, [{
    key: "create",
    value: function create(data) {
      var hashed = _helper["default"].hashPassword(data.password);

      var newUser = {
        id: (0, _uuid.v4)(),
        firstName: data.firstname,
        lastName: data.lastname,
        email: data.email,
        phoneNo: data.phone,
        password: hashed,
        location: data.location,
        RegisteredDate: _moment["default"].now(),
        modifiedDate: _moment["default"].now()
      };
      this.user.push(newUser);
      console.log(newUser);
      return newUser;
    }
  }, {
    key: "findOne",
    value: function findOne(id) {
      return this.user.find(function (reflect) {
        return reflect.id === id;
      });
    }
  }, {
    key: "findByEmail",
    value: function findByEmail(email) {
      return this.user.find(function (reflect) {
        return reflect.email === email;
      });
    }
  }, {
    key: "findAll",
    value: function findAll() {
      return this.user;
    }
  }, {
    key: "update",
    value: function update(id, data) {
      var User = this.findOne(id);
      var index = this.user.indexOf(User);
      this.user[index].email = data.email || User.email;
      this.user[index].weight = data.weight || User.weight;
      this.user[index].destination = data.destination || User.destination;
      this.user[index].phoneNo = data.phoneNo || User.phoneNo;
      this.user[index].modifiedDate = _moment["default"].now();
      return this.user[index];
    }
  }, {
    key: "delete",
    value: function _delete(id) {
      var User = this.findOne(id);
      var index = this.user.indexOf(User);
      this.user.splice(index, 1);
      return {};
    }
  }, {
    key: "deleteMany",
    value: function deleteMany() {
      var User = this.findAll();
      var index = this.user.indexOf(User);
      this.user.splice(index, 1);
    }
  }]);

  return User;
}();

var _default = new User();

exports["default"] = _default;