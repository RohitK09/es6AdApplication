'use strict';

var utilService = {};

utilService.isDefined = function (jsonObj) {
    console.log('method called');
    if (jsonObj !== null && jsonObj !== undefined) {
        return true;
    }
    log.debug('found null, undefined at');
    return false;
};
module.exports = utilService;