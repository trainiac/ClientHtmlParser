'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actionToObjects = undefined;

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _fp = require('lodash/fp');

var _fp2 = _interopRequireDefault(_fp);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  Functions that handle building API URLs
*/
const apiHost = 'https://api.com';
const getUrl = _fp2.default.curry((protocol, host, path, query) => _url2.default.format({
  protocol: protocol, host: host, path: path, query: query
}));
const getAPIEndpoint = Reflect.apply(getUrl, undefined, apiHost.split('://'));
const getSpecificAPIEndpoint = getAPIEndpoint('/action');

function callApi(endpoint) {

  return (0, _nodeFetch2.default)(endpoint).then(response => response.json().then(json => ({ json: json, response: response }))).then((_ref) => {
    let json = _ref.json,
        response = _ref.response;


    if (!response.ok) {

      throw new Error(`${ json } ${ response }`);
    }

    return {
      response: response,
      json: json
    };
  });
}

const actionToObjects = exports.actionToObjects = _fp2.default.flow(query => ({ q: query }) // eslint-disable-line id-length

, getSpecificAPIEndpoint, callApi);
//# sourceMappingURL=api.js.map