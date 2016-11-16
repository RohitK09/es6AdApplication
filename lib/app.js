'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _adservice = require('./services/adservice');

var _adservice2 = _interopRequireDefault(_adservice);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_winston2.default.level = 'debug';
//import routes from 'routes';

var log = _winston2.default;

var app = (0, _express2.default)();
/***
 * 
 */
app.use(_bodyParser2.default.json());
app.use('/api/getAdvertisement/:typeOfAdvert', function (req, res) {
  var typeOfAdvert = req.params.typeOfAdvert;
  _adservice2.default.getAdvertisement(typeOfAdvert).then(function (htmlData) {
    res.send(htmlData);
  }).catch(function (err) {
    //sending empty response 
    log.error("Error at getAdvertisement ", JSON.stringify(err));
    res.send("");
  });
});

app.post('/api/saveAdvertisement', function (req, res) {

  _adservice2.default.saveAdvertisement(req.body).then(function (resData) {
    res.send("Data Inserted Successfuly");
  }, function (err) {
    log.error("Caught Error ,while saving the Advert");
    res.send('Not Saved Please check ur input Data');
  }).catch(function (err) {
    res.send('Not Saved Please check ur input Data');
    log.error("Caught Error ,while saving the Advert");
  });
});

app.server = _http2.default.createServer(app);
app.server.listen(3000);