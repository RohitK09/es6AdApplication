'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Advertisement = function Advertisement(name, format, impressions, startDate, endDate, advertHtml) {
    _classCallCheck(this, Advertisement);

    this.name = name;
    this.format = format;
    this.impressions = impressions;
    this.startDate = new Date(startDate);
    this.endDate = new Date(endDate);
    this.advertHtml = advertHtml;
};

//let Advertisement = mongoose.model('advertisement', advertisementSchema);


module.exports = Advertisement;