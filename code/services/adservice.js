import mongoose from "mongoose";
import Advertisement from "../models/advertisement";
import monk from "monk";
import log from "./logservice";
import util from './utilservice';
import moment from 'moment';
//import db from "../util/dbUtil";
mongoose.Promise = global.Promise;
import config from '../config/config';
log.debug(config);
const db = monk(config.dbConnect);
const advertisement = db.get('advertisement');


let adservice = {};
adservice.getAdvertisement = function (typeOfAdvertisement) {
    console.log(typeOfAdvertisement);
    return new Promise(function (resolve, reject) {
        advertisement.find({ format: typeOfAdvertisement }).then(function (resData) {
            console.log("resData", (JSON.stringify(resData[0].advertHtml)));
            resolve(resData[0].advertHtml);
        }).catch(function (dbGetErr) {
            log.error("Error at Advertisement find at advertisement.find()", JSON.stringify(dbGetErr));
            reject(dbGetErr);
        });
    })
}
adservice.saveAdvertisement = function (advert) {
    return new Promise(function (resolve, reject) {
        if (_isAdvertValid(advert)) {
            advertisement.insert( new Advertisement(advert.name, advert.format, advert.impressions, advert.startDate, advert.endDate, advert.advertHtml)).
                then(function (status) {
                    log.debug("status", status);
                    resolve(status);
                });
        }
        else {
            log.error('Advert invalid');
            reject(new Error("Insert unsuccessfull"));
        }
    });
}

let _isAdvertValid = function (advertData) {
    if (util.isDefined(advertData) && util.isDefined(advertData.format)
        && util.isDefined(advertData.impressions) &&
        util.isDefined(advertData.startDate) && util.isDefined(advertData.endDate)
        && util.isDefined(advertData.advertHtml)&&_isFormatValid(advertData.format)) {
        if (_isDateValid(advertData.startDate) && _isDateValid(advertData.endDate)) {
            log.debug("_isDateValid is",true)
            return true;
        }
        else {
            log.error("Date is invalid at _isDateValid")
            return false;
        }
    }
    else {
        log.error("Data is invalid at _isAdvertValid")
        return false;
    }
}

let _isDateValid = function (dateToValidate) {
    log.debug("Date to validate at _isDateValid", dateToValidate+ "gh"+moment(dateToValidate, 'MM/DD/YYYY', true).isValid())
    return moment(dateToValidate, 'MM/DD/YYYY', true).isValid();
}
let _isFormatValid = function(formatToValidate){
    let set = new Set(['Top Banner','Interstitial','Site Skin','Bottom Banner','Hover']);
    if(set.has(formatToValidate)){
        log.debug('formatToValidate',formatToValidate);
        return true;
    }
    else{
        log.debug('formatToValidate at _isFormatValid',formatToValidate);
        return false;
    }
   
    
}

module.exports = adservice;
