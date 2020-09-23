Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

const _express = _interopRequireDefault(require('express'));

require('babel-polyfill');

const _dotenv = _interopRequireDefault(require('dotenv'));

const _route = _interopRequireDefault(require('./usingJSObject/routes/route'));

const _route2 = _interopRequireDefault(require('./usingDB/routes/route'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();

_dotenv.default.config();

app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: false,
}));
const ref = process.env.TYPE === 'db' ? _route2.default : _route.default;
app.use('/api/v1', ref); // simple route

app.get('/', (req, res) => {
  res.status(200).send('Welcome to janfar application.');
}); // set port, listen for requests

const PORT = process.env.PORT || 3000;
const running = app.listen(PORT, () => {
  'Server is running on port '.concat(PORT, '.');
  console.log('Server is running on port '.concat(PORT, '.'));
});
const _default = app;
exports.default = _default;
