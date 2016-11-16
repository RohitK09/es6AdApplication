import mongoose from 'mongoose';

class Advertisement {

    constructor(name, format, impressions, startDate, endDate,advertHtml) {
        this.name = name;
        this.format = format;
        this.impressions = impressions;
        this.startDate = new Date(startDate);
        this.endDate = new Date(endDate);
        this.advertHtml = advertHtml;
    }



}

//let Advertisement = mongoose.model('advertisement', advertisementSchema);
module.exports = Advertisement;