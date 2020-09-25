"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Parcel = /*#__PURE__*/function () {
  function Parcel() {
    _classCallCheck(this, Parcel);

    this.parcel = [];
  }

  _createClass(Parcel, [{
    key: "create",
    value: function create(data, user) {
      var newParcel = {
        id: (0, _uuid.v4)(),
        email: data.email || '',
        weight: data.weight || '',
        destination: data.destination || '',
        phoneNo: data.phone || '',
        Owner: user.id,
        createdDate: _moment["default"].now(),
        modifiedDate: _moment["default"].now()
      };
      this.parcel.push(newParcel);
      return newParcel;
    }
  }, {
    key: "findOwner",
    value: function findOwner(owner) {
      return this.parcel.find(function (reflect) {
        return reflect.Owner === owner;
      });
    }
  }, {
    key: "findOne",
    value: function findOne(id) {
      return this.parcel.find(function (reflect) {
        return reflect.id === id;
      });
    }
  }, {
    key: "findAll",
    value: function findAll() {
      return this.parcel;
    }
  }, {
    key: "update",
    value: function update(id, data) {
      var Parcel = this.findOne(id);
      var index = this.parcel.indexOf(Parcel);
      this.parcel[index].email = data.email || Parcel.email;
      this.parcel[index].weight = data.weight || Parcel.weight;
      this.parcel[index].destination = data.destination || Parcel.destination;
      this.parcel[index].phoneNo = data.phoneNo || Parcel.phoneNo;
      this.parcel[index].modifiedDate = _moment["default"].now();
      return this.parcel[index];
    }
  }, {
    key: "delete",
    value: function _delete(id) {
      var Parcel = this.findOne(id);
      var index = this.parcel.indexOf(Parcel);
      this.parcel.splice(index, 1);
      return {};
    }
  }]);

  return Parcel;
}();

var _default = new Parcel();

exports["default"] = _default;