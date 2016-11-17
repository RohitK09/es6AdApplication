"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _advertisement = require("../models/advertisement");

var _advertisement2 = _interopRequireDefault(_advertisement);

var _monk = require("monk");

var _monk2 = _interopRequireDefault(_monk);

var _logservice = require("./logservice");

var _logservice2 = _interopRequireDefault(_logservice);

var _utilservice = require("./utilservice");

var _utilservice2 = _interopRequireDefault(_utilservice);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _config = require("../config/config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import db from "../util/dbUtil";
_mongoose2.default.Promise = global.Promise;

_logservice2.default.debug(_config2.default);
var db = (0, _monk2.default)(_config2.default.dbConnect);
var advertisement = db.get('advertisement');

var adservice = {};
adservice.getAdvertisement = function (typeOfAdvertisement) {
    console.log(typeOfAdvertisement);
    return new Promise(function (resolve, reject) {
        advertisement.find({
            "format": typeOfAdvertisement, "impressions": { "$gt": 0 }, "startDate": { "$lt": new Date() }, "endDate": {
                "$gte": new Date()
            }
        }).then(function (listOfAdverts) {
            console.log(JSON.stringify(listOfAdverts));
            if (listOfAdverts.length > 1) {
                _getAndUpdateSingleAdvert(typeOfAdvertisement).then(function (resData) {
                    resolve(resData.advertHtml);
                }).catch(function (dbGetErr) {
                    _logservice2.default.error("Error at Advertisement find at advertisement.find()", JSON.stringify(dbGetErr));
                    reject(dbGetErr);
                });
            } else {
                if (listOfAdverts.length === 1) {
                    _getAndUpdateSingleAdvert(typeOfAdvertisement).then(function (resData) {
                        console.log(JSON.stringify(resData));
                        resolve(resData.advertHtml);
                    }).catch(function (err) {
                        reject(err);
                    });
                } else {
                    reject('No Data found');
                }
            }
        });
    });
};
adservice.saveAdvertisement = function (advert) {
    return new Promise(function (resolve, reject) {
        if (_isAdvertValid(advert)) {
            advertisement.insert(new _advertisement2.default(advert.name, advert.format, advert.impressions, advert.startDate, advert.endDate, advert.advertHtml, false)).then(function (status) {
                _logservice2.default.debug("status", status);
                resolve(status);
            });
        } else {
            _logservice2.default.error('Advert invalid');
            reject(new Error("Insert unsuccessfull"));
        }
    });
};

var _isAdvertValid = function _isAdvertValid(advertData) {
    if (_utilservice2.default.isDefined(advertData) && _utilservice2.default.isDefined(advertData.format) && _utilservice2.default.isDefined(advertData.impressions) && _utilservice2.default.isDefined(advertData.startDate) && _utilservice2.default.isDefined(advertData.endDate) && _utilservice2.default.isDefined(advertData.advertHtml) && _isFormatValid(advertData.format)) {
        if (_isDateValid(advertData.startDate) && _isDateValid(advertData.endDate)) {
            _logservice2.default.debug("_isDateValid is", true);
            return true;
        } else {
            _logservice2.default.error("Date is invalid at _isDateValid");
            return false;
        }
    } else {
        _logservice2.default.error("Data is invalid at _isAdvertValid");
        return false;
    }
};

var _isDateValid = function _isDateValid(dateToValidate) {
    _logservice2.default.debug("Date to validate at _isDateValid", dateToValidate + "gh" + (0, _moment2.default)(dateToValidate, 'MM/DD/YYYY', true).isValid());
    return (0, _moment2.default)(dateToValidate, 'MM/DD/YYYY', true).isValid();
};
var _isFormatValid = function _isFormatValid(formatToValidate) {
    var set = new Set(['Top Banner', 'Interstitial', 'Site Skin', 'Bottom Banner', 'Hover']); //To Restrict the val
    if (set.has(formatToValidate)) {
        _logservice2.default.debug('formatToValidate', formatToValidate);
        return true;
    } else {
        _logservice2.default.debug('formatToValidate at _isFormatValid', formatToValidate);
        return false;
    }
};
var _CheckForArray = function _CheckForArray(listOfAdverts) {
    if (listOfAdverts.length > 1) {
        return true;
    } else {
        return false;
    }
};

var _getAndUpdateSingleAdvert = function _getAndUpdateSingleAdvert(typeOfAdvertisement) {
    console.log('Test:', typeOfAdvertisement);
    return advertisement.findOneAndUpdate({ "format": typeOfAdvertisement, "impressions": { "$gt": 0 }, "startDate": { "$lt": new Date() }, "endDate": { "$gte": new Date() }, "isCalled": false }, {
        $inc: { "impressions": -1 },
        $set: { "isCalled": true }
    });
};

module.exports = adservice;